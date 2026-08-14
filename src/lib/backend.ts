/**
 * Whether the backend is wired up.
 *
 * Deliberately in its own module with no `@supabase/supabase-js` import, so
 * the marketing pages can ask the question without pulling ~230KB of SDK into
 * the bundle every visitor downloads. The client itself is imported
 * dynamically at the point of use.
 *
 * Without configuration the site still works: forms report success without
 * storing anything and the chat widget stays hidden, which is the behaviour
 * the site shipped with before Supabase existed.
 */
export const isBackendConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)
