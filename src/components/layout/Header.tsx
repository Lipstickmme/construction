import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Close, Menu } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { mainNav, secondaryNav } from '@/data/navigation'
import { SecondaryNav } from './SecondaryNav'
import { ThemeToggle } from './ThemeToggle'

const navItemClass = (isActive: boolean) =>
  `relative flex items-center gap-1 py-1 font-display text-[0.72rem] font-medium tracking-[0.09em] uppercase transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:rounded-full after:bg-navy after:transition-opacity after:content-[''] dark:after:bg-gold ${
    isActive ? 'text-ink after:opacity-100' : 'text-body hover:text-ink after:opacity-0'
  }`

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  // Route changes should always dismiss any open menu.
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    if (!openMenu) return

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openMenu])

  return (
    <header className="sticky top-0 z-50 bg-surface/95 shadow-sm backdrop-blur">
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav
          ref={navRef}
          aria-label="Main"
          className="hidden lg:block"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const isOpen = openMenu === item.label

              return (
                <li
                  key={item.to}
                  className="relative"
                  onMouseEnter={() =>
                    setOpenMenu(item.children ? item.label : null)
                  }
                >
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => navItemClass(isActive)}
                    >
                      {item.label}
                    </NavLink>

                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className="ml-1 text-body transition-colors hover:text-ink"
                      >
                        <ChevronDown
                          className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && isOpen && (
                    <div className="absolute top-full left-0 z-50 w-72 pt-3">
                      <ul className="rounded-lg border border-line bg-surface p-2 shadow-card">
                        {item.children.map((child) => (
                          <li key={child.to + child.label}>
                            <Link
                              to={child.to}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-surface-muted hover:text-ink"
                            >
                              {child.label}
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <Close className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* The deep-link bar belongs to the home page only. */}
      {pathname === '/' && <SecondaryNav />}

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-surface px-5 pb-8 lg:hidden"
        >
          <nav aria-label="Main (mobile)">
            <ul className="divide-y divide-line">
              {mainNav.map((item) => (
                <li key={item.to} className="py-2">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block py-2 font-display text-sm font-medium tracking-wide uppercase ${
                        isActive ? 'text-ink' : 'text-body'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {item.children && (
                    <ul className="mb-1 ml-3 space-y-1 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <li key={child.to + child.label}>
                          <Link
                            to={child.to}
                            className="block py-1 text-sm text-body"
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

          {pathname === '/' &&
            secondaryNav.map((group) => (
              <div key={group.label} className="mt-6">
                <p className="font-display text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase">
                  {group.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.to + item.label}>
                      <Link to={item.to} className="block py-1.5 text-sm text-body">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </header>
  )
}
