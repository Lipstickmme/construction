# Setup

Everything runs through Vercel. The site, the API route behind the forms, and
the two services it talks to are all provisioned from and billed through the
Vercel dashboard, on free tiers.

| Piece | Where | Free tier |
| --- | --- | --- |
| Site + `/api/submit-form` | Vercel | Hobby plan |
| Database, staff auth, chat realtime | Supabase, added via Vercel Marketplace | 500MB Postgres, 50k monthly users |
| Notification email | Resend, added via Vercel Marketplace | 3,000/month, 100/day |

## Why not put the database on Vercel too

Vercel's own Postgres (Neon) would host the tables fine, but it gives you a
database and nothing else — no login system and no realtime. The staff
dashboard would need auth written and maintained by hand, and the live chat
would have to poll the server on a timer instead of messages simply arriving.
Supabase provides both on the same free tier, and going through the Vercel
Marketplace means one dashboard, one bill, and the connection variables pushed
into the project automatically. That is the practical version of "everything
through Vercel"; the alternative is more code doing a worse job.

---

## Before you start: one thing about Resend

**Resend sends email. It does not receive it.**

For `Contact@axisconstructionltd.com` to actually receive the notifications,
that address needs a real mailbox somewhere — Google Workspace, Microsoft 365,
Zoho Mail (free for one domain), or whatever your registrar bundles. If that
mailbox does not exist yet, set it up first or point `FORM_TO` at an address
that does. Otherwise Resend reports the message as sent and it goes nowhere.

---

## 1. Deploy the site

1. [vercel.com](https://vercel.com) → Add New → Project → import
   `Lipstickmme/construction`.
2. Framework preset is detected as Vite; build command `npm run build` and
   output directory `dist` are correct as offered.
3. Deploy. It will build and go live straight away — the forms report success
   without storing anything until the rest is connected, which is deliberate,
   and the chat widget stays hidden.

`vercel.json` in the repo handles the single-page-app rewrite, so deep links
like `/capabilities/oil-and-gas-facilities` resolve instead of 404ing, and sets
cache headers for the hashed assets and the photography.

## 2. Add Supabase from the Vercel Marketplace

1. In the project: **Storage** (or Integrations) → **Marketplace** →
   **Supabase** → Add. Pick the free plan and the region closest to your users.
2. Vercel creates the Supabase project and pushes its connection variables into
   this Vercel project automatically: `SUPABASE_URL`, `SUPABASE_ANON_KEY` and
   `SUPABASE_SERVICE_ROLE_KEY` are the three that matter here.

**Nothing to copy by hand.** Vite normally only exposes `VITE_`-prefixed
variables to the browser, which would mean duplicating two of those under new
names. `vite.config.ts` reads whichever naming the integration used —
unprefixed, `NEXT_PUBLIC_`, or `VITE_` — and defines the browser pair from it.
A `VITE_` variable you set yourself still wins, if you ever need to override.

The anon key is *meant* to be public — row level security is what protects the
data, not key secrecy. The service role key is the opposite: it bypasses every
policy. Never give it a `VITE_` prefix, and never put it in this repo.

## 3. Set up the database

Open the Supabase project from the Vercel integration panel.

1. **Schema.** SQL Editor → New query → paste the whole of
   `supabase/migrations/0001_init.sql` → Run. This creates `enquiries`,
   `applications`, `chat_sessions`, `chat_messages` and `admins`, plus the row
   level security policies that make the whole thing safe to reach from a
   browser.

2. **Anonymous sign-ins.** Authentication → Sign In / Providers → enable
   **Anonymous sign-ins**. The chat widget uses this so each visitor gets a
   real identity and can be granted their own conversation and nobody else's.
   Without it the chat cannot open a session.

3. **Your staff login.** Authentication → Users → Add user → email and
   password, tick *Auto Confirm User*. Copy the new user's UUID.

4. **Make that user an admin.** SQL Editor:

   ```sql
   insert into public.admins (user_id, email)
   values ('paste-the-uuid-here', 'you@axisconstructionltd.com');
   ```

   Repeat 3–4 for anyone else who needs the dashboard. Removing someone is
   `delete from public.admins where user_id = '…';` and takes effect
   immediately, no redeploy.

## 4. Add Resend

1. In Vercel: **Integrations** → **Marketplace** → **Resend** → Add. That
   provisions the account and injects `RESEND_API_KEY` into the project. (If
   you would rather sign up at [resend.com](https://resend.com) directly, do
   that and add `RESEND_API_KEY` to Vercel's environment variables yourself —
   the result is the same.)

2. **Verify the domain**, in the Resend dashboard: Domains → Add Domain →
   `axisconstructionltd.com`. Resend gives you DNS records (a DKIM `TXT`, an
   SPF `TXT`, usually an `MX` for the return path). Add them wherever your DNS
   lives and wait for the status to go green — usually minutes, occasionally
   hours.

   This step is not optional. Until the domain is verified, Resend only lets
   you send from `onboarding@resend.dev`, and only *to* the address that owns
   the Resend account — which is why the sample code has a gmail address
   hard-coded in it. A verified domain is what lets you send from your own
   address to your own inbox.

3. **Optionally set the addresses.** The function already defaults to
   `Contact@axisconstructionltd.com` for the recipient and
   `Axis Website <website@axisconstructionltd.com>` for the sender. Override
   either in Vercel → Settings → Environment Variables:

   | Name | Value |
   | --- | --- |
   | `FORM_TO` | where notifications arrive |
   | `FORM_FROM` | must be at the domain verified in step 2 |

   Using a send-only from-address distinct from the receiving mailbox is the
   usual convention.

## 5. Redeploy

Vite bakes `VITE_` variables in at build time, so the site needs one more
deploy to pick them up: Deployments → the latest one → Redeploy.

---

## Using it

- **Dashboard:** `/admin`, also linked at the bottom right of the footer. Sign
  in with the account from step 3.
- **Enquiries / Applications:** list on the left, full record on the right,
  three status buttons (New → In progress → Closed) and a reply-by-email link.
- **Chat:** conversations sort by most recent, an orange square marks the ones
  nobody has answered. Replies appear in the visitor's widget instantly, and
  answering moves a conversation to In progress by itself.

## Checking it works

**Start with `https://your-site.vercel.app/api/health`.** It reports which
variables the running function can actually see, without printing any of their
values:

```json
{
  "ready": true,
  "missing": [],
  "supabaseUrl": "https://lmgbnfovgqgatntthufg.supabase.co",
  "supabaseAnonKey": true,
  "supabaseServiceRoleKey": true,
  "resendApiKey": true,
  "formTo": "Contact@axisconstructionltd.com",
  "formFrom": "Axis Website <website@axisconstructionltd.com>"
}
```

`ready: false` lists exactly what is missing, and it warns if `FORM_FROM` is at
a different domain from `FORM_TO`, which is the usual reason mail reports as
sent and never arrives. Then:

1. Submit the contact form on the live site.
2. It should appear in `/admin` within a second or two.
3. An email should reach `Contact@axisconstructionltd.com`. If the row is
   there but no email arrives, the problem is Resend and not Supabase — check
   the function logs in Vercel (Deployments → Functions → `submit-form`) for
   the response Resend gave, and confirm the domain is verified and
   `FORM_FROM` is at that domain.
4. Open the chat widget in a private window, send a message, and answer it
   from `/admin` → Chat in your normal window.

## Local development

`npm run dev` runs the site but not the API route, so forms fall back to
reporting success without sending. To exercise the real path locally:

```bash
npm install -g vercel
vercel link
vercel env pull .env.local   # pulls every variable above
vercel dev
```

`.env.local` is gitignored.

---

## Notes

- **Free Supabase projects pause after 7 days with no activity.** A live site
  with traffic will not hit this; a project set up and left alone for a
  fortnight needs waking from the dashboard.
- **Spam.** Both forms carry a hidden honeypot field, and every submission is
  validated and length-capped server side. If it gets hit properly, the
  function can sit behind Cloudflare Turnstile.
- **Attachments.** Applications are text only. CV uploads would use Supabase
  Storage, on the same free tier — say the word.
- **Before any of this is configured** the site is deliberately fine: forms
  report success without sending, the chat widget does not render, and
  `/admin` explains what is missing. Nothing half-configured reaches a visitor.
