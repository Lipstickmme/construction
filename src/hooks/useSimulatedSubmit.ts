import { useState, type FormEvent } from 'react'

export type SubmitState = 'idle' | 'sending' | 'sent'

/**
 * Simulates a successful submit for every form on the site.
 *
 * There is no backend yet, so `submit` runs a short pending state and then
 * reports success. Swap the timeout for a real `fetch` when an endpoint
 * exists — the states and the markup around them do not need to change.
 */
export function useSimulatedSubmit(delayMs = 900) {
  const [state, setState] = useState<SubmitState>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state === 'sending') return

    setState('sending')
    window.setTimeout(() => setState('sent'), delayMs)
  }

  const reset = () => setState('idle')

  return { state, submit, reset }
}
