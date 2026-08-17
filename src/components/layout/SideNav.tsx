import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { mainNav } from '@/data/navigation'
import { site } from '@/data/site'

type SideNavProps = {
  open: boolean
  onClose: () => void
}

/**
 * Off-canvas navigation panel. Slides in from the right, staggers its links
 * in behind it, traps focus while open and restores it on close.
 */
export function SideNav({ open, onClose }: SideNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setExpanded(null)
      return
    }

    restoreFocusTo.current = document.activeElement as HTMLElement
    // Hold the page still behind the panel.
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Move focus into the panel once it has painted.
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      cancelAnimationFrame(raf)
      document.body.style.overflow = overflow
      restoreFocusTo.current?.focus()
    }
  }, [open, onClose])

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-70 flex h-dvh w-full max-w-[30rem] flex-col bg-charcoal transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="hazard h-1.5 shrink-0" />

        <div className="flex items-center justify-between px-8 py-7">
          <span className="index-num text-concrete uppercase">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 text-white"
          >
            <span className="index-num uppercase">Close</span>
            <span className="relative grid size-9 place-items-center border border-white/20 transition-colors group-hover:border-orange">
              <span className="absolute h-px w-4 rotate-45 bg-current transition-colors group-hover:bg-orange" />
              <span className="absolute h-px w-4 -rotate-45 bg-current transition-colors group-hover:bg-orange" />
            </span>
          </button>
        </div>

        <nav
          aria-label="Primary"
          className="no-scrollbar flex-1 overflow-y-auto px-8"
        >
          <ul>
            {mainNav.map((item, index) => (
              <li
                key={item.to}
                className="border-b border-white/10"
                style={{
                  // Links cascade in behind the panel once it has travelled.
                  transitionDelay: `${180 + index * 60}ms`,
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(1.25rem)',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex flex-1 items-baseline gap-4 py-5 font-display text-3xl font-bold tracking-tight transition-colors sm:text-4xl ${
                        isActive
                          ? 'text-orange'
                          : 'text-white hover:text-orange'
                      }`
                    }
                  >
                    <span className="index-num text-concrete">
                      {item.index}
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                      {item.label}
                    </span>
                  </NavLink>

                  {item.children && (
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      aria-label={`${item.label} sub-menu`}
                      onClick={() =>
                        setExpanded(
                          expanded === item.label ? null : item.label,
                        )
                      }
                      className="grid size-8 shrink-0 place-items-center border border-white/20 text-white transition-colors hover:border-orange hover:text-orange"
                    >
                      <span
                        className={`text-lg leading-none transition-transform duration-300 ${
                          expanded === item.label ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                  )}
                </div>

                {item.children && expanded === item.label && (
                  <ul className="mb-5 space-y-1 border-l border-orange/50 pl-5">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-concrete transition-colors hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="shrink-0 px-8 py-8 transition-opacity duration-700"
          style={{
            transitionDelay: '520ms',
            opacity: open ? 1 : 0,
          }}
        >
          <p className="index-num text-concrete uppercase">Get in touch</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="link-wipe mt-3 inline-block font-display text-base font-medium break-all text-white"
          >
            {site.contact.email}
          </a>
          {site.contact.phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="link-wipe mt-1 block font-display text-base font-medium text-white"
            >
              {phone.display}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
