import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atlasbridge-theme'

/**
 * Light is the default regardless of the OS setting — the reference site is
 * white and has no dark mode, so following `prefers-color-scheme` would show
 * visitors on a dark-themed OS a site that doesn't match the brand. Dark mode
 * stays available, but only once someone opts into it with the toggle.
 */
function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
