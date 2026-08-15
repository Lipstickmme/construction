/**
 * Configuration check: `GET /api/health` on the deployed site.
 *
 * Reports which environment variables the running function can actually see,
 * so a misconfigured deploy can be diagnosed without reading logs or guessing
 * from a silently failing form.
 *
 * Secrets are reported as booleans only. The Supabase URL and the two form
 * addresses are echoed in full because none of them are secret — the URL is
 * already in the browser bundle and the addresses are already on the site.
 */
export const config = { runtime: 'edge' }

function pick(names: string[]): string {
  for (const name of names) {
    const value = process.env[name]
    if (value) return value
  }
  return ''
}

export default function handler(): Response {
  const supabaseUrl = pick([
    'SUPABASE_URL',
    'VITE_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
  ])

  const serviceRoleKey = pick([
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_SECRET_KEY',
  ])

  const anonKey = pick([
    'VITE_SUPABASE_ANON_KEY',
    'SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  ])

  const resendKey = process.env.RESEND_API_KEY ?? ''
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET ?? ''
  const forwardTo = process.env.FORWARD_TO ?? ''
  const mailbox =
    process.env.MAILBOX_ADDRESS ??
    'Axis Construction <Contact@axisconstructionltd.com>'
  const formTo = process.env.FORM_TO ?? 'Contact@axisconstructionltd.com'
  const formFrom =
    process.env.FORM_FROM ?? 'Axis Website <website@axisconstructionltd.com>'

  const missing = [
    !supabaseUrl && 'SUPABASE_URL',
    !anonKey && 'SUPABASE_ANON_KEY',
    !serviceRoleKey && 'SUPABASE_SERVICE_ROLE_KEY',
    !resendKey && 'RESEND_API_KEY',
  ].filter(Boolean)

  // Inbound mail is optional: the site works without it, so a missing secret
  // is reported rather than counted as not ready.
  const inboundReady = Boolean(webhookSecret)

  // The from address has to be at a domain verified in Resend. Catching the
  // obvious mismatch here saves a round of "it says sent but nothing arrives".
  const fromDomain = formFrom.match(/@([^\s>]+)/)?.[1] ?? null
  const toDomain = formTo.match(/@([^\s>]+)/)?.[1] ?? null

  return new Response(
    JSON.stringify(
      {
        ready: missing.length === 0,
        missing,
        supabaseUrl: supabaseUrl || null,
        supabaseAnonKey: Boolean(anonKey),
        supabaseServiceRoleKey: Boolean(serviceRoleKey),
        resendApiKey: Boolean(resendKey),
        inboundEmail: inboundReady ? 'configured' : 'not configured (optional)',
        inboundForwardCopyTo: forwardTo || null,
        mailbox,
        formTo,
        formFrom,
        note:
          fromDomain && toDomain && fromDomain !== toDomain
            ? `Sending from ${fromDomain} to ${toDomain}. ${fromDomain} is the domain that must be verified in Resend.`
            : null,
      },
      null,
      2,
    ),
    {
      status: missing.length === 0 ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    },
  )
}
