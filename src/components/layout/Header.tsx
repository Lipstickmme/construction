import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { site } from '@/data/site'

type HeaderProps = {
  onOpenMenu: () => void
  menuOpen: boolean
}

/**
 * Minimal fixed bar: wordmark, a contact link and the menu trigger. All
 * navigation lives in the drawer. Gains a solid background once scrolled so
 * it reads over both the dark hero and the white page below it.
 */
export function Header({ onOpenMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/92 py-3 shadow-[0_1px_0_rgb(12_13_14/0.08)] backdrop-blur'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="shell flex items-center justify-between gap-6">
        <Logo variant={scrolled ? 'dark' : 'light'} />

        <div className="flex items-center gap-6">
          <Link
            to="/contact"
            className={`link-wipe hidden font-display text-sm font-medium transition-colors sm:block ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            {site.contact.email}
          </Link>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
            className="group flex items-center gap-3"
          >
            <span
              className={`index-num uppercase transition-colors ${
                scrolled ? 'text-ink' : 'text-white'
              }`}
            >
              Menu
            </span>
            <span
              className={`flex size-10 flex-col items-center justify-center gap-[5px] border transition-colors ${
                scrolled
                  ? 'border-ink/15 group-hover:border-orange'
                  : 'border-white/30 group-hover:border-orange'
              }`}
            >
              <span
                className={`h-px w-4 transition-all duration-300 group-hover:w-5 ${
                  scrolled ? 'bg-ink' : 'bg-white'
                } group-hover:bg-orange`}
              />
              <span
                className={`h-px w-5 transition-all duration-300 group-hover:w-4 ${
                  scrolled ? 'bg-ink' : 'bg-white'
                } group-hover:bg-orange`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
