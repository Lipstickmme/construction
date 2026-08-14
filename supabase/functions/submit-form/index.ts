// Supabase Edge Function (Deno) — the only path from the public site into the
// database for form submissions, and the only place the Resend key exists.
//
// The browser can never write to `enquiries` or `applications` directly: RLS
// grants those tables to admins only, and this function writes with the
// service role key. That way a leaked anon key cannot be used to stuff the
// inbox, and the Resend key never reaches the client at all.
//
// Deploy:  supabase functions deploy submit-form
// Secrets: supabase secrets set RESEND_API_KEY=... FORM_FROM=... FORM_TO=...

import { createClient } from 'npm:@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FORM_TO = Deno.env.get('FORM_TO') ?? 'Contact@axisconstructionltd.com'
const FORM_FROM =
  Deno.env.get('FORM_FROM') ?? 'Axis Website <website@axisconstructionltd.com>'
// Comma-separated list, or "*" while you are still setting things up.
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? '*')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } },
)

function corsHeaders(origin: string | null): Record<string, string> {
  const allow =
    ALLOWED_ORIGINS.includes('*') || (origin && ALLOWED_ORIGINS.includes(origin))
      ? (origin ?? '*')
      : ALLOWED_ORIGINS[0]

  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

/** Trim, cap and reject anything that is not a usable string. */
function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Renders a label/value table, skipping anything empty. */
function emailBody(rows: Array<[string, string]>): string {
  const cells = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#5c6467;font:500 12px/1.5 system-ui;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
           <td style="padding:6px 0;color:#0c0d0e;font:400 15px/1.6 system-ui">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
         </tr>`,
    )
    .join('')

  return `<table style="border-collapse:collapse">${cells}</table>`
}

async function sendEmail(subject: string, html: string, replyTo?: string) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set; skipping notification email')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FORM_FROM,
      to: [FORM_TO],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })

  if (!response.ok) {
    // The submission is already stored, so a mail failure must not fail the
    // request — the admin dashboard is the source of truth, email is a nudge.
    console.error('Resend rejected the message:', await response.text())
  }
}

Deno.serve(async (request) => {
  const cors = corsHeaders(request.headers.get('origin'))

  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: cors })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  const json = (status: number, payload: unknown) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })

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

      const { error } = await admin.from('enquiries').insert(record)
      if (error) throw error

      await sendEmail(
        `New enquiry — ${record.name}${record.company ? ` (${record.company})` : ''}`,
        emailBody([
          ['Name', record.name],
          ['Company', record.company ?? ''],
          ['Email', record.email],
          ['Phone', record.phone ?? ''],
          ['Discipline', record.discipline ?? ''],
          ['Scope', record.scope],
        ]),
        record.email,
      )

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

      const { error } = await admin.from('applications').insert(record)
      if (error) throw error

      await sendEmail(
        `Application — ${record.role_title} — ${record.name}`,
        emailBody([
          ['Role', record.role_title],
          ['Name', record.name],
          ['Email', record.email],
          ['Experience', record.experience],
        ]),
        record.email,
      )

      return json(200, { ok: true })
    }

    // Chat rows are written by the widget itself (the visitor has to own them
    // for RLS), so this branch only raises the flag by email.
    if (kind === 'chat') {
      const name = text(payload.name, 120) || 'Website visitor'
      const email = text(payload.email, 254)
      const message = text(payload.message, 4000)
      const sessionId = text(payload.session_id, 64)

      await sendEmail(
        `Live chat started — ${name}`,
        emailBody([
          ['Name', name],
          ['Email', email],
          ['First message', message],
          ['Session', sessionId],
          ['Reply in', 'Admin dashboard → Chat'],
        ]),
        isEmail(email) ? email : undefined,
      )

      return json(200, { ok: true })
    }

    return json(400, { error: 'Unknown form kind.' })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Something went wrong. Please try again.' })
  }
})
