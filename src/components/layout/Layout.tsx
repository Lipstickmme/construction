import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CallMeBackTab } from './CallMeBackTab'
import { ChatWidget } from './ChatWidget'
import { Footer } from './Footer'
import { Header } from './Header'
import { TopBar } from './TopBar'

export function Layout() {
  const { pathname, hash } = useLocation()

  // React Router keeps scroll position across routes; reset it, but let
  // in-page anchors resolve themselves.
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <TopBar />
      <Header />

      {/*
        Main sits above the footer on its own opaque layer, so the footer —
        pinned to the bottom of the viewport — is revealed as the page content
        scrolls up off it. Below `lg` the footer is too tall for the effect,
        so it falls back to normal flow.
      */}
      <main id="main" className="relative z-10 flex-1 bg-bg">
        <Outlet />
      </main>

      <Footer />
      <CallMeBackTab />
      <ChatWidget />
    </div>
  )
}
