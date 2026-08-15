import {
  FORWARD_TO,
  MAILBOX,
  RESEND_API_KEY,
  RESEND_WEBHOOK_SECRET,
  adminClient,
  escapeHtml,
  json,
  normaliseSubject,
  ownAddresses,
  parseAddress,
  sendEmail,
  text,
  verifyResendWebhook,
} from './_shared'

/**
 * Receives mail through Resend Inbound.
 *
 * Resend holds the MX records for the domain, accepts the message, and posts
 * an `email.received` webhook here. That payload is metadata only — sender,
 * recipient, subject, attachment list — so the body is fetched separately
 * from `GET /emails/receiving/{id}`. Resend keeps its own copy either way, so
 * a failure in this route loses nothing.
 */
export const config = { runtime: 'edge' }

type ReceivedEmail = {
  id: string
  from: string
  to: string[]
  subject: string
  html: string | null
  text: string | null
  headers: Record<string, string> | null
  message_id: string
}

/** Header lookup that does not care how the sending client cased the name. */
function header(headers: Record<string, string> | null, name: string): string {
  if (!headers) return ''
  const wanted = name.toLowerCase()
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === wanted) return value
  }
  return ''
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  if (!RESEND_WEBHOOK_SECRET) {
    console.error('RESEND_WEBHOOK_SECRET is not set; refusing inbound mail')
    return json(503, { error: 'Inbound mail is not configured.' })
  }

  // Read the body as raw text: the signature covers the exact bytes sent, so
  // parsing first and re-serialising would break verification.
  const rawBody = await request.text()

  // The response stays deliberately vague — an attacker probing this endpoint
  // learns nothing — but the reason is logged, so Vercel's function log says
  // exactly which check failed.
  const verified = await verifyResendWebhook(rawBody, request.headers)
  if (!verified.ok) {
    console.error(`Rejected inbound webhook: ${verified.reason}`)
    return json(401, { error: 'Unauthorised' })
  }

  try {
    const event = JSON.parse(rawBody) as {
      type?: string
      data?: { email_id?: string }
    }

    // Resend can be configured to send other events to the same endpoint.
    if (event.type !== 'email.received') {
      return json(200, { ok: true, ignored: event.type ?? 'unknown' })
    }

    const emailId = text(event.data?.email_id, 64)
    if (!emailId) return json(400, { error: 'Missing email_id' })

    const db = adminClient()

    // Retries deliver the same id; filing it twice would duplicate the thread.
    const { data: seen } = await db
      .from('email_messages')
      .select('id')
      .eq('message_id', `resend-in:${emailId}`)
      .maybeSingle()

    if (seen) return json(200, { ok: true, duplicate: true })

    const response = await fetch(
      `https://api.resend.com/emails/receiving/${emailId}`,
      { headers: { Authorization: `Bearer ${RESEND_API_KEY}` } },
    )

    if (!response.ok) {
      console.error('Could not fetch received email:', await response.text())
      return json(502, { error: 'Could not retrieve the message body.' })
    }

    const email = (await response.json()) as ReceivedEmail
    const from = parseAddress(email.from)
    if (!from.email) return json(400, { error: 'Missing sender' })

    const subject = text(email.subject, 300) || '(no subject)'
    const matchSubject = normaliseSubject(subject)
    const inReplyTo = text(header(email.headers, 'in-reply-to'), 300) || null

    // Prefer the header trail: if this answers something we sent, it belongs
    // on that thread whatever the subject has been rewritten to.
    let threadId: string | null = null

    if (inReplyTo) {
      const { data: parent } = await db
        .from('email_messages')
        .select('thread_id')
        .eq('in_reply_to', inReplyTo)
        .maybeSingle()

      if (parent) threadId = parent.thread_id
    }

    // Otherwise match the correspondent and the subject, which is how a
    // client that drops In-Reply-To still lands in the right place.
    if (!threadId) {
      const { data: existing } = await db
        .from('email_threads')
        .select('id')
        .eq('participant_email', from.email)
        .ilike('subject', matchSubject)
        .maybeSingle()

      if (existing) threadId = existing.id
    }

    if (!threadId) {
      const { data: created, error: threadError } = await db
        .from('email_threads')
        .insert({
          subject: matchSubject,
          participant_email: from.email,
          participant_name: from.name || null,
        })
        .select('id')
        .single()

      if (threadError) throw threadError
      threadId = created.id
    }

    const { error: messageError } = await db.from('email_messages').insert({
      thread_id: threadId,
      direction: 'inbound',
      from_email: from.email,
      from_name: from.name || null,
      to_email: (email.to ?? []).join(', ').slice(0, 320),
      subject,
      body_text: text(email.text, 100000) || null,
      body_html: text(email.html, 200000) || null,
      // Resend's own id, so a redelivery is recognised. The RFC Message-ID is
      // kept separately for threading replies in the recipient's client.
      message_id: `resend-in:${emailId}`,
      in_reply_to: text(email.message_id, 300) || null,
    })

    if (messageError && messageError.code !== '23505') throw messageError

    // Safety copy to a real mailbox, so the dashboard is never the only place
    // a message exists. Failure here must not fail the webhook.
    //
    // Refused if the target is one of our own addresses, or if the message
    // came from one: either would forward the copy straight back into this
    // webhook and loop until the sending quota is gone.
    const ours = ownAddresses()
    const forwardTarget = parseAddress(FORWARD_TO).email

    if (FORWARD_TO && (ours.has(forwardTarget) || ours.has(from.email))) {
      console.warn(
        `Refusing to forward ${from.email} to ${forwardTarget}: that is a mail loop. ` +
          'FORWARD_TO must be a mailbox on another domain.',
      )
    } else if (FORWARD_TO) {
      const body = email.text?.trim() || 'See the dashboard for the full message.'
      sendEmail({
        to: FORWARD_TO,
        from: MAILBOX,
        subject: `Fwd: ${subject}`,
        html: `<p style="color:#5c6467;font:400 13px/1.6 system-ui">From ${escapeHtml(
          email.from,
        )}</p><div style="color:#0c0d0e;font:400 15px/1.6 system-ui">${escapeHtml(
          body,
        ).replace(/\n/g, '<br>')}</div>`,
        text: `From ${email.from}\n\n${body}`,
        replyTo: from.email,
      }).catch((error) => console.error('forward failed:', error))
    }

    return json(200, { ok: true, thread_id: threadId })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Could not file that message.' })
  }
}
