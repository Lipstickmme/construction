import {
  MAILBOX,
  adminClient,
  escapeHtml,
  isEmail,
  json,
  parseAddress,
  requireAdmin,
  sendEmail,
  text,
} from './_shared'

/**
 * Sends a reply from the dashboard as the company mailbox, and records it on
 * the thread so the conversation reads in one place.
 *
 * Staff-only: the caller's Supabase token is validated and checked against
 * the admins table before anything is sent. Without that, an open endpoint
 * would let anyone send mail as the company.
 */
export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const adminId = await requireAdmin(request)
  if (!adminId) return json(401, { error: 'Not signed in as staff.' })

  try {
    const input = await request.json()
    const threadId = text(input?.thread_id, 64)
    const body = text(input?.body, 50000)

    if (!threadId || !body) {
      return json(400, { error: 'A thread and a message are both required.' })
    }

    const db = adminClient()

    const { data: thread, error: threadError } = await db
      .from('email_threads')
      .select('id, subject, participant_email, participant_name')
      .eq('id', threadId)
      .maybeSingle()

    if (threadError) throw threadError
    if (!thread) return json(404, { error: 'That conversation no longer exists.' })
    if (!isEmail(thread.participant_email)) {
      return json(400, { error: 'That conversation has no valid reply address.' })
    }

    // Thread the reply onto the newest message we have from them, so it lands
    // in the right conversation in their mail client rather than as a new one.
    const { data: last } = await db
      .from('email_messages')
      .select('message_id')
      .eq('thread_id', threadId)
      .eq('direction', 'inbound')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const subject = thread.subject.match(/^re\s*:/i)
      ? thread.subject
      : `Re: ${thread.subject}`

    const html = `<div style="color:#0c0d0e;font:400 15px/1.6 system-ui,-apple-system,Segoe UI,sans-serif">${escapeHtml(
      body,
    ).replace(/\n/g, '<br>')}</div>`

    const resendId = await sendEmail({
      to: thread.participant_email,
      subject,
      html,
      text: body,
      from: MAILBOX,
      replyTo: parseAddress(MAILBOX).email,
      inReplyTo: last?.message_id ?? undefined,
    })

    if (!resendId) {
      return json(502, {
        error: 'Resend would not accept that message. Check the domain is verified.',
      })
    }

    const { error: insertError } = await db.from('email_messages').insert({
      thread_id: threadId,
      direction: 'outbound',
      from_email: parseAddress(MAILBOX).email,
      from_name: parseAddress(MAILBOX).name || null,
      to_email: thread.participant_email,
      subject,
      body_text: body,
      body_html: html,
      // Resend's id, not an RFC Message-ID. Stored so a send can be traced in
      // the Resend dashboard; it is not used for threading.
      message_id: `resend:${resendId}`,
    })

    if (insertError) throw insertError

    // Answering is what moves a conversation off the waiting pile.
    await db
      .from('email_threads')
      .update({ status: 'in_progress' })
      .eq('id', threadId)

    return json(200, { ok: true })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Could not send that reply.' })
  }
}
