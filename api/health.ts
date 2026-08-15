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
  // Kept in step with api/_shared.ts, which is what actually sends.
  const domain = process.env.MAIL_DOMAIN ?? 'axisconstructionsltd.com'
  const mailbox =
    process.env.MAILBOX_ADDRESS ?? `Axis Construction <Contact@${domain}>`
  const formTo = process.env.FORM_TO ?? `Contact@${domain}`
  const formFrom =
    process.env.FORM_FROM ?? `Axis Website <website@${domain}>`

  const missing = [
    !supabaseUrl && 'SUPABASE_URL',
    !anonKey && 'SUPABASE_ANON_KEY',
    !serviceRoleKey && 'SUPABASE_SERVICE_ROLE_KEY',
    !resendKey && 'RESEND_API_KEY',
  ].filter(Boolean)

  // Inbound mail is optional: the site works without it, so a missing secret
  // is reported rather than counted as not ready.
  const inboundReady = Boolean(webhookSecret)

  // Forwarding inbound mail to our own address loops it back into the webhook.
  // Catching that here is cheaper than noticing when the quota is gone.
  const forwardLoops =
    Boolean(forwardTo) &&
    [mailbox, formTo, formFrom].some(
      (value) =>
        (value.match(/@([^\s>]+)/)?.[0] ?? '').toLowerCase() ===
        (forwardTo.match(/@([^\s>]+)/)?.[0] ?? 'x').toLowerCase() &&
        (value.match(/([^\s<>]+@[^\s>]+)/)?.[1] ?? '').toLowerCase() ===
          (forwardTo.match(/([^\s<>]+@[^\s>]+)/)?.[1] ?? 'x').toLowerCase(),
    )

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
        warning: forwardLoops
          ? 'FORWARD_TO is one of this site\'s own addresses. Forwarding would loop mail back into the inbound webhook — set it to a mailbox on another domain, or leave it unset.'
          : null,
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
