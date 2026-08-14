import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AdminAuth = {
  user: User | null
  isAdmin: boolean
  loading: boolean
}

/**
 * Tracks the signed-in user and whether they are on the `admins` table.
 *
 * The membership check is a real query, not a claim read out of the token, so
 * revoking someone is a row delete and takes effect on their next load. RLS
 * enforces the same rule server side either way — this only decides what the
 * dashboard bothers to render.
 */
export function useAdminAuth(): AdminAuth {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = supabase
    if (!client) {
      setLoading(false)
      return
    }

    let cancelled = false

    const evaluate = async (next: User | null) => {
      if (!next || next.is_anonymous) {
        if (!cancelled) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
        }
        return
      }

      const { data } = await client
        .from('admins')
        .select('user_id')
        .eq('user_id', next.id)
        .maybeSingle()

      if (cancelled) return
      setUser(next)
      setIsAdmin(Boolean(data))
      setLoading(false)
    }

    client.auth.getUser().then(({ data }) => evaluate(data.user ?? null))

    const { data: listener } = client.auth.onAuthStateChange((_event, session) =>
      evaluate(session?.user ?? null),
    )

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [])

  return { user, isAdmin, loading }
}
