import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from '@/components/ui/Icon'
import { secondaryNav } from '@/data/navigation'

export function SecondaryNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (openIndex === null) return

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenIndex(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openIndex])

  return (
    <div
      ref={navRef}
      className="hidden border-b border-line bg-surface-muted lg:block"
      onMouseLeave={() => setOpenIndex(null)}
    >
      <nav aria-label="Site sections" className="shell">
        <ul className="grid grid-cols-4">
          {secondaryNav.map((group, index) => {
            const isOpen = openIndex === index

            return (
              <li key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onMouseEnter={() => setOpenIndex(index)}
                  onFocus={() => setOpenIndex(index)}
                  className={`group flex w-full items-center gap-2 border-b-2 py-3.5 font-display text-[0.82rem] font-medium transition-colors ${
                    isOpen
                      ? 'border-navy text-ink dark:border-gold'
                      : 'border-transparent text-ink/85 hover:text-ink'
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className={`size-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 z-40 w-72 rounded-b-lg border border-line border-t-0 bg-surface p-2 shadow-card">
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={() => setOpenIndex(null)}
                            className="block rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-surface-muted hover:text-ink"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
