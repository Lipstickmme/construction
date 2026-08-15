import {
  INBOUND_SECRET,
  adminClient,
  json,
  normaliseSubject,
  parseAddress,
  secretsMatch,
  text,
} from './_shared'

/**
 * Receives mail forwarded by the Cloudflare Email Worker.
 *
 * The worker has already parsed the MIME, so this route only has to file the
 * message: find or open the thread, then insert. It is authenticated with a
 * shared secret rather than left open, since anything reaching it appears in
 * the dashboard as genuine correspondence.
 *
 * Delivery is retried on failure, so inserts are made idempotent by the
 * unique index on `message_id`.
 */
export const config = { runtime: 'edge' }

type Payload = {
  from?: string
  fromName?: string
  to?: string
  subject?: string
  text?: string
  html?: string
  messageId?: string
  inReplyTo?: string
  hasAttachments?: boolean
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  if (!INBOUND_SECRET) {
    console.error('INBOUND_SECRET is not set; refusing inbound mail')
    return json(503, { error: 'Inbound mail is not configured.' })
  }

  const presented = request.headers.get('x-axis-inbound-secret') ?? ''
  if (!secretsMatch(presented, INBOUND_SECRET)) {
    return json(401, { error: 'Unauthorised' })
  }

  try {
    const payload = (await request.json()) as Payload
    const from = parseAddress(text(payload.from, 320))

    if (!from.email) return json(400, { error: 'Missing sender' })

    const subject = text(payload.subject, 300) || '(no subject)'
    const matchSubject = normaliseSubject(subject)
    const messageId = text(payload.messageId, 300) || null
    const inReplyTo = text(payload.inReplyTo, 300) || null
    const db = adminClient()

    // Already filed? Delivery retries must not duplicate a conversation.
    if (messageId) {
      const { data: seen } = await db
        .from('email_messages')
        .select('id')
        .eq('message_id', messageId)
        .maybeSingle()

      if (seen) return json(200, { ok: true, duplicate: true })
    }

    // Prefer the header trail: if this answers something we sent, it belongs
    // on that thread whatever the subject has been rewritten to.
    let threadId: string | null = null

    if (inReplyTo) {
      const { data: parent } = await db
        .from('email_messages')
        .select('thread_id')
        .eq('message_id', inReplyTo)
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
      to_email: text(payload.to, 320),
      subject,
      body_text: text(payload.text, 100000) || null,
      body_html: text(payload.html, 200000) || null,
      message_id: messageId,
      in_reply_to: inReplyTo,
      has_attachments: Boolean(payload.hasAttachments),
    })

    // A concurrent delivery of the same message loses the race on the unique
    // index; that is the desired outcome, not an error worth reporting.
    if (messageError && messageError.code !== '23505') throw messageError

    return json(200, { ok: true, thread_id: threadId })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Could not file that message.' })
  }
}
