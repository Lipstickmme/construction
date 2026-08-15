# Email setup

How `Contact@axisconstructionltd.com` sends and receives, and how it reaches
the dashboard.

## What each piece actually does

**Resend only sends.** It is a delivery API: your server hands it a message and
it delivers. There is no inbox, no webmail, no login for reading mail. Verifying
the domain proved you own it so mail *from* it is not treated as spam — it did
not create any addresses. `website@axisconstructionltd.com` in `FORM_FROM` is a
label on outgoing mail, not a mailbox; nobody can send to it.

**Cloudflare Email Routing receives.** It owns the MX records for the domain and
decides what happens to each incoming message. It is free.

Put together:

```
someone emails Contact@axisconstructionltd.com
                    │
       Cloudflare Email Routing (MX)
                    │
          Email Worker  ──────────►  forwards a copy to your normal inbox
                    │                (so mail is never lost)
                    └──────────────►  POST /api/inbound-email
                                             │
                                     Supabase: email_threads / email_messages
                                             │
                                       /admin → Email tab
                                             │
                          reply ──► POST /api/send-email ──► Resend ──► them
```

The forward happens **first and independently**. If the site, the database or
the worker is having a bad day, the message still lands in a real inbox. The
dashboard is a convenience on top, never the only copy.

---

## 1. Cloudflare Email Routing

DNS is already on Cloudflare, so this is a few clicks.

1. Cloudflare dashboard → your domain → **Email** → **Email Routing** → Enable.
   It offers to add the MX and SPF records; accept.

   ⚠️ **Check Resend first.** Resend's verification adds records too. Its MX
   normally sits on a `send.` subdomain, which coexists with Email Routing on
   the root fine. If Resend put an MX on the **root**, the two conflict — move
   Resend's to a subdomain before enabling routing, or receiving will break.

2. **Destination addresses** → add the personal or work inbox that should get
   the forwarded copy (a Gmail address is fine). Cloudflare emails it a
   verification link; click it.

## 2. Deploy the Email Worker

```bash
cd cloudflare/email-worker
npm install
npx wrangler login
```

Edit `wrangler.toml`:

| Variable | Set it to |
| --- | --- |
| `FORWARD_TO` | the destination address you verified above |
| `WEBHOOK_URL` | `https://your-live-domain/api/inbound-email` |

Then set the shared secret and deploy. Generate the secret with
`openssl rand -hex 32`, or any long random string:

```bash
npx wrangler secret put INBOUND_SECRET     # paste the secret
npx wrangler deploy
```

Add **the same value** in Vercel → Settings → Environment Variables as
`INBOUND_SECRET`, then redeploy. The endpoint refuses everything without it —
anything reaching it shows up in the dashboard as genuine correspondence, so it
is not left open.

## 3. Point the address at the worker

Cloudflare → Email → Email Routing → **Routing rules** → Create:

- Custom address: `contact@axisconstructionltd.com`
- Action: **Send to a Worker** → `axis-inbound-email`

A catch-all rule to the same worker also works if you want every address on the
domain in one place.

## 4. Tell the site which address it speaks as

Vercel → Settings → Environment Variables:

| Name | Value |
| --- | --- |
| `MAILBOX_ADDRESS` | `Axis Construction <Contact@axisconstructionltd.com>` |
| `INBOUND_SECRET` | the value from step 2 |

`MAILBOX_ADDRESS` is what dashboard replies are sent as, and it must be at the
domain verified in Resend. Redeploy afterwards.

## 5. Run the migration

Supabase SQL Editor → paste `supabase/migrations/0002_email.sql` → Run. It
creates `email_threads` and `email_messages`, admin-only row level security, and
adds both to the realtime publication so mail lands in an open dashboard without
a reload. Safe to run more than once.

---

## Checking it works

`https://your-site/api/health` should now report:

```json
"inboundEmail": "configured",
"mailbox": "Axis Construction <Contact@axisconstructionltd.com>"
```

Then send a real message to `Contact@axisconstructionltd.com` from any account:

1. A copy should arrive at your `FORWARD_TO` inbox within seconds.
2. It should appear in `/admin` → **Email**, marked unread.
3. Reply from the dashboard. It arrives from `Contact@axisconstructionltd.com`,
   threaded under the original in their mail client.
4. Reply to *that*, and it should land back on the same conversation rather
   than opening a second one.

If the forward arrives but the dashboard stays empty, the worker reached
Cloudflare but not the site. `npx wrangler tail` in `cloudflare/email-worker`
shows the response the webhook gave — a 401 there means `INBOUND_SECRET` does
not match between Cloudflare and Vercel.

---

## Also replying from Gmail

If you would rather answer from your normal mail client and still have it come
from the company address, Resend provides SMTP credentials (`smtp.resend.com`,
username `resend`, password = your API key). Gmail → Settings → Accounts →
**Send mail as** → add `Contact@axisconstructionltd.com` using those. Replies
then leave through the domain you have already verified.

Those replies will not appear in the dashboard — it only records what it sends
itself. Pick one habit or accept a partial record.

---

## Deliberate limits

- **Attachments are not stored.** A message carrying them is flagged in the
  dashboard, and the full copy with the files is in your forwarded inbox.
  Storing them would mean Supabase Storage and a virus-scanning question.
- **Inbound HTML is rendered as plain text.** Displaying a stranger's markup
  inside an authenticated dashboard is how you get an XSS, so the text part is
  shown and the HTML kept in the database unrendered.
- **No spam filtering of our own.** Cloudflare drops the obvious cases; anything
  it passes reaches the dashboard. If it becomes a problem, filter in the worker
  before calling the webhook.
