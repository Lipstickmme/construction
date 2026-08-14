import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { isBackendConfigured } from './backend'

/**
 * The Supabase client.
 *
 * Import this module dynamically (`await import('@/lib/supabase')`) from
 * anything on the marketing side — a static import would put the SDK in the
 * bundle every visitor downloads. Check `isBackendConfigured` from
 * `./backend` first; that module is SDK-free and safe to import statically.
 */
export const supabase: SupabaseClient | null = isBackendConfigured
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storageKey: 'axis-auth',
        },
      },
    )
  : null

/** Narrowing helper, so callers get a non-null client or an explicit failure. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    )
  }
  return supabase
}

export { isBackendConfigured }
