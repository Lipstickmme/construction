import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { isBackendConfigured } from '@/lib/backend'
import { Footer } from './Footer'
import { Header } from './Header'
import { SideNav } from './SideNav'

// Lazy so the Supabase SDK loads after the page paints, not before it.
const ChatWidget = lazy(() =>
  import('@/components/chat/ChatWidget').then((module) => ({
    default: module.ChatWidget,
  })),
)

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Reset scroll between routes, but let in-page anchors resolve themselves.
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-80 focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Header onOpenMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
      <SideNav open={menuOpen} onClose={closeMenu} />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {isBackendConfigured && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  )
}
