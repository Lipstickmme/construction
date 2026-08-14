import { useRef, useState, type FormEvent } from 'react'
import { isBackendConfigured } from '@/lib/backend'

export type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

type Options = {
  kind: 'enquiry' | 'application'
  /** Fields not present in the form itself, e.g. the role being applied for. */
  extra?: Record<string, string>
}

/**
 * Posts a form to the `submit-form` edge function, which stores it and emails
 * the team. With no backend configured it falls back to reporting success
 * without sending anything, so the site is never broken by missing config —
 * check `isBackendConfigured` if you need to say so in the UI.
 */
export function useFormSubmit({ kind, extra }: Options) {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  // Read through a ref: `extra` is rebuilt every render, and the handler is
  // attached to the form long before submit happens.
  const extraRef = useRef(extra)
  extraRef.current = extra

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state === 'sending') return

    const form = event.currentTarget
    setState('sending')
    setError(null)

    if (!isBackendConfigured) {
      window.setTimeout(() => setState('sent'), 900)
      return
    }

    const payload: Record<string, string> = { ...extraRef.current }
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') payload[key] = value
    })

    try {
      // Dynamic: keeps the SDK out of the bundle until someone submits.
      const { requireSupabase } = await import('@/lib/supabase')

      const { data, error: invokeError } = await requireSupabase()
        .functions.invoke('submit-form', { body: { kind, payload } })

      if (invokeError || !data?.ok) {
        throw new Error(data?.error ?? 'We could not send that just now.')
      }

      form.reset()
      setState('sent')
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'We could not send that just now.',
      )
      setState('error')
    }
  }

  const reset = () => {
    setState('idle')
    setError(null)
  }

  return { state, error, submit, reset }
}
