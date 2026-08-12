import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chat, Close } from '@/components/ui/Icon'
import { site, telHref } from '@/data/site'

/**
 * Floating chat launcher. The panel is a static hand-off card — swap the body
 * for a live chat embed when one is available.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[17rem] rounded-xl border border-line bg-surface p-5 shadow-float">
          <p className="font-display text-sm font-bold text-ink">
            Talk to our team
          </p>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Tell us about your project and we'll match you with the right
            engineer.
          </p>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-md bg-navy px-4 py-2.5 text-center font-display text-[0.72rem] font-semibold tracking-wide text-white uppercase"
          >
            Send a message
          </Link>
          <a
            href={telHref(site.phones[0])}
            className="mt-2 block text-center text-xs text-body hover:text-ink"
          >
            or call {site.phones[0]}
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="grid size-14 place-items-center rounded-full bg-navy text-white shadow-float transition-transform hover:scale-105"
      >
        {open ? <Close className="size-5" /> : <Chat className="size-5" />}
      </button>
    </div>
  )
}
