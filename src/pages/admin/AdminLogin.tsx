import { useState, type FormEvent } from 'react'
import { Logo } from '@/components/ui/Logo'
import { supabase } from '@/lib/supabase'

/** Staff sign-in. Accounts are created in the Supabase dashboard, not here. */
export function AdminLogin({ notice }: { notice?: string }) {
  const [state, setState] = useState<'idle' | 'sending'>('idle')
  const [error, setError] = useState<string | null>(null)

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const client = supabase
    if (!client) return

    const form = new FormData(event.currentTarget)
    setState('sending')
    setError(null)

    // A staff login and an anonymous chat session cannot share a browser
    // profile, so clear whatever is there before signing in.
    await client.auth.signOut()

    const { error: signInError } = await client.auth.signInWithPassword({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    })

    if (signInError) {
      setError(signInError.message)
      setState('idle')
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-black px-6">
      <div className="w-full max-w-sm">
        <Logo variant="light" />

        <h1 className="mt-10 font-display text-3xl font-bold text-white">
          Staff sign in
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-concrete">
          {notice ??
            'Enquiries, applications and live chat for Axis Construction.'}
        </p>

        <form onSubmit={signIn} className="mt-8 space-y-4">
          <label className="block">
            <span className="index-num mb-2 block text-concrete uppercase">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full border border-white/20 bg-charcoal px-4 py-3 text-sm text-white focus:border-orange focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="index-num mb-2 block text-concrete uppercase">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full border border-white/20 bg-charcoal px-4 py-3 text-sm text-white focus:border-orange focus:outline-none"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-orange">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            className="w-full bg-orange px-6 py-4 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-yellow hover:text-black disabled:opacity-70"
          >
            {state === 'sending' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
