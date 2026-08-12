import { useState, type FormEvent } from 'react'
import { ChevronLeft, Close } from '@/components/ui/Icon'

/**
 * Gold tab pinned to the right edge. Submitting is a no-op stub — wire the
 * handler up to your booking endpoint when there is one.
 */
export function CallMeBackTab() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 items-start md:flex">
      {open && (
        <div className="mr-0 w-72 rounded-l-lg border border-line bg-surface p-5 shadow-float">
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-sm font-bold text-ink">
              Request a call back
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close call back form"
              className="text-body hover:text-ink"
            >
              <Close className="size-4" />
            </button>
          </div>

          {submitted ? (
            <p className="mt-4 text-sm leading-relaxed text-body">
              Thanks — we'll ring you back within one business day.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink placeholder:text-body/70"
                />
              </label>
              <label className="block">
                <span className="sr-only">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink placeholder:text-body/70"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-md bg-navy px-4 py-2.5 font-display text-[0.72rem] font-semibold tracking-wide text-white uppercase"
              >
                Call me back
              </button>
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex flex-col items-center gap-2 rounded-l-md bg-gold px-2 py-5 text-navy shadow-float"
      >
        <ChevronLeft
          className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
        <span
          className="font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Call me back
        </span>
      </button>
    </div>
  )
}
