import { useEffect, useState } from 'react'
import { ChevronDown } from '@/components/ui/Icon'
import { sectionNav } from '@/data/navigation'

/**
 * Section navigator that sits under the hero and sticks beneath the header
 * once you scroll past it. Clicking an entry jumps to that section; the entry
 * underlines itself while its section is the one in view.
 */
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = sectionNav
      .map((item) => document.getElementById(item.targetId))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    // Accumulated across callbacks: a batch only reports sections whose
    // visibility *changed*, so deciding from one batch alone would let a
    // section that is merely entering beat one already on screen.
    const onScreen = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id)
          else onScreen.delete(entry.target.id)
        }

        if (onScreen.size === 0) return

        // Whichever section currently on screen sits highest wins.
        const topmost = [...onScreen]
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => el !== null)
          .reduce((closest, el) =>
            el.getBoundingClientRect().top < closest.getBoundingClientRect().top
              ? el
              : closest,
          )
        setActive(topmost.id)
      },
      // Band roughly level with the sticky bars, so a section counts as
      // "current" once its top passes under them.
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sticky top-[72px] z-40 border-b border-line bg-surface-muted">
      <nav aria-label="Page sections" className="shell flex items-stretch gap-6">
        <span className="hidden items-center font-display text-[0.62rem] font-semibold tracking-[0.18em] text-body uppercase lg:flex">
          Menu
        </span>

        <ul className="grid flex-1 grid-cols-2 sm:grid-cols-4">
          {sectionNav.map((item) => {
            const isActive = active === item.targetId

            return (
              <li key={item.targetId}>
                <a
                  href={`#${item.targetId}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex w-full items-center justify-center gap-2 border-b-2 py-3.5 font-display text-[0.82rem] font-medium transition-colors sm:justify-start ${
                    isActive
                      ? 'border-navy text-ink dark:border-gold'
                      : 'border-transparent text-ink/80 hover:text-ink'
                  }`}
                >
                  {item.label}
                  <ChevronDown className="size-3.5" />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
