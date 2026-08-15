-- Paste into the Supabase SQL editor after running 0001_init.sql.
-- Every row should read OK. Safe to run any number of times.

select 'tables' as check, case
         when count(*) = 5 then 'OK'
         else 'MISSING — expected 5, found ' || count(*)
       end as result
from information_schema.tables
where table_schema = 'public'
  and table_name in
      ('admins', 'enquiries', 'applications', 'chat_sessions', 'chat_messages')

union all
select 'row level security', case
         when bool_and(relrowsecurity) then 'OK'
         else 'NOT ENABLED on at least one table'
       end
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in
      ('admins', 'enquiries', 'applications', 'chat_sessions', 'chat_messages')

union all
select 'policies', case
         when count(*) >= 12 then 'OK (' || count(*) || ')'
         else 'INCOMPLETE — expected 12, found ' || count(*)
       end
from pg_policies where schemaname = 'public'

union all
select 'is_admin() function', case
         when count(*) = 1 then 'OK' else 'MISSING'
       end
from pg_proc
where proname = 'is_admin' and pronamespace = 'public'::regnamespace

union all
select 'realtime on chat tables', case
         when count(*) = 2 then 'OK'
         else 'INCOMPLETE — found ' || count(*) || ' of 2'
       end
from pg_publication_tables
where pubname = 'supabase_realtime'
  and tablename in ('chat_sessions', 'chat_messages')

union all
select 'anonymous sign-ins', case
         when count(*) > 0 then 'OK — ' || count(*) || ' anonymous visitor(s) so far'
         else 'NONE YET — expected until someone opens the chat'
       end
from auth.users where is_anonymous

union all
select 'admin accounts', case
         when count(*) > 0 then 'OK (' || count(*) || ')'
         else 'NONE YET — run grant-admin.sql'
       end
from public.admins;



-- Granting dashboard access is a separate one-off: see grant-admin.sql.
-- Revoking someone takes effect on their next page load, no redeploy:
--
--   delete from public.admins
--    where user_id = (select id from auth.users
--                      where lower(email) = lower('them@axisconstructionsltd.com'));
