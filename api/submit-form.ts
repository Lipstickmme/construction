import {
  FORM_TO,
  SERVICE_ROLE_KEY,
  SUPABASE_URL,
  adminClient,
  emailBody,
  isEmail,
  json,
  sendEmail,
  text,
} from './_shared'

/**
 * The only path from the public site into the form tables, and one of two
 * places the Resend key is used.
 *
 * The browser can never write to `enquiries` or `applications` directly: row
 * level security grants those tables to admins only, and this route writes
 * with the service role. A leaked anon key therefore cannot be used to stuff
 * the inbox, and the Resend key never reaches the client at all.
 */
export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Supabase server credentials are missing')
    return json(500, { error: 'The form is not available right now.' })
  }

  const db = adminClient()

  try {
    const input = await request.json()
    const kind = text(input?.kind, 20)
    const payload = input?.payload ?? {}

    // Honeypot: a real person never fills a field they cannot see. Report
    // success so a bot has nothing to tune against.
    if (text(payload.website, 200)) return json(200, { ok: true })

    if (kind === 'enquiry') {
      const record = {
        name: text(payload.name, 120),
        company: text(payload.company, 160) || null,
        email: text(payload.email, 254),
        phone: text(payload.phone, 40) || null,
        discipline: text(payload.discipline, 80) || null,
        scope: text(payload.scope, 5000),
      }

      if (!record.name || !record.scope || !isEmail(record.email)) {
        return json(400, { error: 'Please check the required fields.' })
      }

      const { error } = await db.from('enquiries').insert(record)
      if (error) throw error

      await sendEmail({
        to: FORM_TO,
        subject: `New enquiry: ${record.name}${record.company ? ` (${record.company})` : ''}`,
        html: emailBody([
          ['Name', record.name],
          ['Company', record.company ?? ''],
          ['Email', record.email],
          ['Phone', record.phone ?? ''],
          ['Discipline', record.discipline ?? ''],
          ['Scope', record.scope],
        ]),
        replyTo: record.email,
      })

      return json(200, { ok: true })
    }

    if (kind === 'application') {
      const record = {
        role_title: text(payload.role_title, 120) || 'Unspecified role',
        name: text(payload.name, 120),
        email: text(payload.email, 254),
        experience: text(payload.experience, 5000),
      }

      if (!record.name || !record.experience || !isEmail(record.email)) {
        return json(400, { error: 'Please check the required fields.' })
      }

      const { error } = await db.from('applications').insert(record)
      if (error) throw error

      await sendEmail({
        to: FORM_TO,
        subject: `Application: ${record.role_title}, ${record.name}`,
        html: emailBody([
          ['Role', record.role_title],
          ['Name', record.name],
          ['Email', record.email],
          ['Experience', record.experience],
        ]),
        replyTo: record.email,
      })

      return json(200, { ok: true })
    }

    // Chat rows are written by the widget itself (the visitor has to own them
    // for row level security), so this branch only raises the flag by email.
    if (kind === 'chat') {
      const name = text(payload.name, 120) || 'Website visitor'
      const email = text(payload.email, 254)
      const message = text(payload.message, 4000)
      const sessionId = text(payload.session_id, 64)

      await sendEmail({
        to: FORM_TO,
        subject: `Live chat started: ${name}`,
        html: emailBody([
          ['Name', name],
          ['Email', email],
          ['First message', message],
          ['Session', sessionId],
          ['Reply in', 'Admin dashboard, Chat tab'],
        ]),
        replyTo: isEmail(email) ? email : undefined,
      })

      return json(200, { ok: true })
    }

    return json(400, { error: 'Unknown form kind.' })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Something went wrong. Please try again.' })
  }
}
