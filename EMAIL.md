# Email setup

How `Contact@axisconstructionltd.com` sends and receives, and how both reach
the dashboard.

**No DNS migration is needed.** Everything runs on Resend, with DNS staying at
Namecheap.

## What each piece does

Resend used to be send-only, which is why an earlier version of this guide
routed incoming mail through Cloudflare. Resend now has an **Inbound** product:
it takes the MX records for the domain, accepts mail, and posts a webhook. That
removes the whole Cloudflare layer.

```
someone emails Contact@axisconstructionltd.com
                    │
        Resend Inbound (MX on the root domain)
                    │
        email.received webhook ──►  POST /api/inbound-email
                                          │
                                    fetches the body from
                                    GET /emails/receiving/{id}
                                          │
                              ┌───────────┴───────────┐
                              │                       │
                   Supabase email_threads    forwarded copy to
                   / email_messages          your normal inbox
                              │
                        /admin → Email tab
                              │
             reply ──► POST /api/send-email ──► Resend ──► them
```

Three copies of every message exist: Resend's own storage, your forwarded
inbox, and the dashboard. Losing one loses nothing.

The webhook carries **metadata only** — sender, recipient, subject, attachment
list. The body is fetched separately, which is deliberate on Resend's part: it
keeps large attachments out of a serverless request body.

---

## 1. Check the MX record

You already have this. In Namecheap → Advanced DNS → Mail Settings you should
see, on the **root** (`@`):

```
MX   @   inbound-smtp.eu-west-1.amazonses.com   priority 9
```

That is Resend Inbound. The other one, `MX send → feedback-smtp…`, is the
return path for *sending* and is unrelated.

⚠️ The inbound MX must have the **lowest priority number** of any MX on the
root, or mail routes elsewhere. With only one root MX, nothing to do.

## 2. Turn on receiving in Resend

Resend → **Domains** → `axisconstructionltd.com`. The domain needs *Receiving*
enabled as well as sending; if the panel offers an MX record you already added,
it should show as verified.

## 3. Create the webhook

Resend → **Webhooks** → Add:

| Field | Value |
| --- | --- |
| Endpoint URL | `https://axisconstructionltd.com/api/inbound-email` |
| Event | `email.received` |

Copy the **signing secret** it shows — it starts `whsec_`. That is the only
time it is displayed.

## 4. Environment variables

Vercel → Settings → Environment Variables:

| Name | Value |
| --- | --- |
| `RESEND_WEBHOOK_SECRET` | the `whsec_…` value from step 3 |
| `MAILBOX_ADDRESS` | `Axis Construction <Contact@axisconstructionltd.com>` |
| `FORWARD_TO` | your normal inbox, e.g. a Gmail address (optional but recommended) |

`MAILBOX_ADDRESS` is what dashboard replies are sent as, and must be at the
domain verified in Resend. `FORWARD_TO` gets a copy of everything that arrives,
so the dashboard is never the only place a message exists.

Redeploy afterwards.

## 5. Run the migration

Supabase SQL Editor → paste `supabase/migrations/0002_email.sql` → Run. It
creates `email_threads` and `email_messages`, admin-only row level security, and
adds both to the realtime publication so mail lands in an open dashboard without
a reload. Safe to run more than once.

---

## Checking it works

`https://your-site/api/health` should report:

```json
"inboundEmail": "configured",
"inboundForwardCopyTo": "you@gmail.com",
"mailbox": "Axis Construction <Contact@axisconstructionltd.com>"
```

Then send a real message to `Contact@axisconstructionltd.com` from any account:

1. It appears in `/admin` → **Email**, marked unread.
2. A copy arrives at your `FORWARD_TO` inbox.
3. Reply from the dashboard. It arrives from
   `Contact@axisconstructionltd.com`, threaded under the original.
4. Reply to *that*, and it lands back on the same conversation rather than
   opening a second one.

**If nothing arrives at all**, the MX is not routing — check it in Namecheap
and confirm Receiving is enabled on the domain in Resend.

**If Resend shows the message but the dashboard stays empty**, the webhook is
failing. Resend → Webhooks → the endpoint → its delivery log shows the response
the site gave:

| Response | Cause |
| --- | --- |
| `401 Unauthorised` | `RESEND_WEBHOOK_SECRET` does not match, or is unset in Vercel |
| `502` | the body fetch failed — usually `RESEND_API_KEY` lacks read access |
| `503` | `RESEND_WEBHOOK_SECRET` is not set at all |
| timeout | the deploy is cold or the function errored; check Vercel logs |

Signature failures are deliberately indistinguishable from the outside, so the
delivery log is where to look rather than the response body.

---

## Also replying from your own mail client

If you would rather answer from Gmail and still have it come from the company
address, Resend provides SMTP credentials (`smtp.resend.com`, username
`resend`, password = your API key). Gmail → Settings → Accounts → **Send mail
as** → add `Contact@axisconstructionltd.com` using those.

Those replies will not appear in the dashboard — it only records what it sends
itself. Pick one habit or accept a partial record.

---

## Deliberate limits

- **Attachments are not stored.** Resend keeps them and exposes them through
  its attachments API; the dashboard flags that a message has them, and the
  forwarded copy is in your inbox. Pulling them into Supabase Storage is a
  separate job, with a virus-scanning question attached.
- **Inbound HTML is rendered as plain text.** Displaying a stranger's markup
  inside an authenticated dashboard is how you get an XSS, so the text part is
  shown and the HTML kept in the database unrendered.
- **Webhooks older than five minutes are rejected**, so a captured request
  cannot be replayed later.
- **No spam filtering of our own.** Anything Resend accepts reaches the
  dashboard.
