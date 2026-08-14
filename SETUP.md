# Backend setup

The site is a static build with no server of its own. Everything behind the
forms, the admin dashboard and the live chat runs on two free services:

| Service | Free tier | What it does here |
| --- | --- | --- |
| **Supabase** | 500MB Postgres, 50k monthly users, 2M edge function calls, realtime included | Stores enquiries, applications and chat. Signs staff in. Streams chat both ways. Runs the one server-side function. |
| **Resend** | 3,000 emails/month, 100/day | Emails you when a form or a chat comes in. |

Supabase was the right pick over the alternatives because the four things
needed here — a database, an admin login, realtime for chat, and one piece of
server-side code to hold the Resend key — are all on the same free tier. A
separate Node server would mean paying for hosting and writing auth by hand.

Work through the three parts in order. Part 1 takes about ten minutes, part 2
depends on DNS propagation, part 3 is a few commands.

---

## Before you start: one thing about Resend

**Resend sends email. It does not receive it.**

For `Contact@axisconstructionltd.com` to actually receive the notifications,
that address needs a real mailbox somewhere — Google Workspace, Microsoft 365,
Zoho Mail (free for one domain), or whatever your domain registrar bundles. If
that mailbox does not exist yet, set it up first, or point `FORM_TO` at an
address that does exist. Otherwise Resend will report the message as sent and
it will go nowhere.

---

## Part 1 — Supabase

1. **Create the project.** [supabase.com](https://supabase.com) → New project.
   Free plan, region closest to your users. Save the database password.

2. **Create the schema.** SQL Editor → New query → paste the whole of
   `supabase/migrations/0001_init.sql` → Run. This creates four tables
   (`enquiries`, `applications`, `chat_sessions`, `chat_messages`), an
   `admins` table, and the row level security policies that make the whole
   thing safe to talk to from a browser.

3. **Turn on anonymous sign-ins.** Authentication → Sign In / Providers →
   enable **Anonymous sign-ins**. The chat widget uses this so each visitor
   gets a real identity and can be granted their own conversation and nobody
   else's. Without it the chat cannot open a session.

4. **Create your staff login.** Authentication → Users → Add user → enter an
   email and password, and tick *Auto Confirm User*. Copy the new user's UUID
   from the list.

5. **Make that user an admin.** SQL Editor:

   ```sql
   insert into public.admins (user_id, email)
   values ('paste-the-uuid-here', 'you@axisconstructionltd.com');
   ```

   Repeat steps 4–5 for anyone else who needs the dashboard. Removing someone
   is a single `delete from public.admins where user_id = '…';` — it takes
   effect immediately, no redeploy.

6. **Copy the keys.** Project Settings → API. Copy the **Project URL** and the
   **anon public** key into a `.env` file at the repo root:

   ```
   VITE_SUPABASE_URL=https://your-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

   `.env.example` has the template. The anon key is *meant* to be public — row
   level security is what protects the data, not key secrecy. The **service
   role** key is different: it bypasses every policy, so it must never appear
   in a `VITE_` variable or anywhere in this repo.

---

## Part 2 — Resend

1. **Sign up** at [resend.com](https://resend.com).

2. **Verify the domain.** Domains → Add Domain → `axisconstructionltd.com`.
   Resend gives you DNS records (a DKIM `TXT`, an SPF `TXT`, usually a
   `MX` for the return path). Add them at whoever hosts your DNS and wait for
   the status to go green. This usually takes minutes but can take hours.

   This step is not optional. Until the domain is verified, Resend only lets
   you send from `onboarding@resend.dev`, and only *to* the address that owns
   the Resend account — which is why the sample code you sent has a gmail
   address hard-coded in it. Verified domain means you can send from your own
   address to your own inbox.

3. **Create an API key.** API Keys → Create → *Sending access* is enough.
   Copy the `re_...` value now; it is not shown again.

4. **Decide the from address.** It has to be at the verified domain. Something
   like `Axis Website <website@axisconstructionltd.com>` is conventional — a
   send-only address, distinct from the mailbox receiving the notifications.

---

## Part 3 — Deploy the edge function

The function is the only place the Resend key exists, and the only path from
the public site into the `enquiries` and `applications` tables. The browser
cannot write to those tables at all.

```bash
npm install -g supabase          # or use npx supabase for each command
supabase login
supabase link --project-ref your-ref

supabase secrets set \
  RESEND_API_KEY=re_your_key_here \
  FORM_TO=Contact@axisconstructionltd.com \
  FORM_FROM="Axis Website <website@axisconstructionltd.com>" \
  ALLOWED_ORIGINS=https://axisconstructionltd.com

supabase functions deploy submit-form
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically —
you do not set those.

While testing locally, set `ALLOWED_ORIGINS=http://localhost:5173` as well
(comma-separated), or `*` to allow anything.

If you would rather not install the CLI: Edge Functions → Deploy a new
function in the Supabase dashboard, name it `submit-form`, and paste the
contents of `supabase/functions/submit-form/index.ts`. Set the same secrets
under Edge Functions → Secrets.

---

## Part 4 — Ship it

Set the two `VITE_` variables in your host's environment settings (Netlify:
Site configuration → Environment variables; Vercel: Project → Settings →
Environment variables), then redeploy. Vite bakes them in at build time, so a
rebuild is required after any change.

---

## Using it

- **Dashboard:** `/admin`, also linked at the bottom right of the footer.
  Sign in with the staff account from step 4.
- **Enquiries / Applications:** list on the left, full record on the right,
  three status buttons (New → In progress → Closed) and a reply-by-email link.
- **Chat:** conversations sort by most recent, an orange square marks ones
  nobody has answered. Replies appear in the visitor's widget instantly, and
  answering moves the conversation to In progress on its own.

## Checking it works

1. Submit the contact form on the live site.
2. It should appear in `/admin` within a second or two.
3. An email should reach `Contact@axisconstructionltd.com`. If the row is
   there but no email arrives, the problem is Resend, not Supabase — check
   Edge Functions → Logs for the response Resend gave, and confirm the domain
   is verified and `FORM_FROM` is at that domain.
4. Open the chat widget in a private window, send a message, and answer it
   from `/admin` → Chat in your normal window.

## What happens before any of this is configured

The site is deliberately fine without it. With `VITE_SUPABASE_URL` unset,
forms report success without sending anything (the behaviour the site shipped
with), the chat widget does not render, and `/admin` explains what is missing.
Nothing half-configured is ever shown to a visitor.

## Notes

- **Free projects pause after 7 days with no activity.** A live site with
  traffic will not hit this, but a project you set up and leave alone for a
  fortnight will need waking from the dashboard.
- **Spam.** Both forms carry a hidden honeypot field, and every submission is
  validated and length-capped server side. If you start getting hit properly,
  Supabase edge functions can sit behind Cloudflare Turnstile.
- **Attachments.** Applications are text only. CV uploads would need Supabase
  Storage, which is on the same free tier — say the word.
