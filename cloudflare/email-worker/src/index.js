import PostalMime from 'postal-mime'

/**
 * Cloudflare Email Worker for contact@axisconstructionltd.com.
 *
 * Two jobs, in this order of importance:
 *   1. Forward a copy to a real mailbox, so mail is never lost if the site,
 *      the database, or this worker is having a bad day.
 *   2. Parse it and post it to the site, where it appears in the dashboard.
 *
 * The forward happens first and independently: a failure to reach the site
 * must never cost you the message. MIME is parsed here rather than server
 * side so the API route only has to file clean fields.
 */
export default {
  async email(message, env, ctx) {
    // 1. Always forward first.
    if (env.FORWARD_TO) {
      try {
        await message.forward(env.FORWARD_TO)
      } catch (error) {
        console.error('forward failed:', error)
      }
    }

    if (!env.WEBHOOK_URL || !env.INBOUND_SECRET) {
      console.warn('WEBHOOK_URL or INBOUND_SECRET missing; forwarded only')
      return
    }

    // 2. Then hand a parsed copy to the dashboard.
    try {
      const email = await PostalMime.parse(message.raw)
      const from = email.from ?? {}

      const response = await fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-axis-inbound-secret': env.INBOUND_SECRET,
        },
        body: JSON.stringify({
          from: from.address ?? message.from,
          fromName: from.name ?? '',
          to: message.to,
          subject: email.subject ?? '',
          text: email.text ?? '',
          html: email.html ?? '',
          messageId: email.messageId ?? message.headers.get('message-id') ?? '',
          inReplyTo:
            email.inReplyTo ?? message.headers.get('in-reply-to') ?? '',
          hasAttachments: (email.attachments ?? []).length > 0,
        }),
      })

      // Surfaces in `wrangler tail` if the secret or the route is wrong.
      if (!response.ok) {
        console.error('webhook rejected:', response.status, await response.text())
      }
    } catch (error) {
      console.error('parse or webhook failed:', error)
    }
  },
}
