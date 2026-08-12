import { Link } from 'react-router-dom'
import { site } from '@/data/site'

type LogoProps = {
  /** `light` renders the wordmark in white for use on the navy footer. */
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Inline mark so the header never renders a broken image. To use real
 * artwork instead, swap this SVG for <Img slot={images.logo} />.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} ${site.nameSuffix} — home`}
    >
      <svg
        viewBox="0 0 40 44"
        className={`h-10 w-9 shrink-0 ${isLight ? 'text-white' : 'text-navy dark:text-white'}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 44V14l6-4v-4l4 3 4-3v4l6 4v30H4Z" opacity=".95" />
        <path d="M26 44V20l5-3 5 3v24H26Z" opacity=".7" />
        <rect x="8" y="20" width="4" height="5" fill="#f6ce4a" />
        <rect x="16" y="20" width="4" height="5" fill="#f6ce4a" />
        <rect x="8" y="29" width="4" height="5" fill="#f6ce4a" />
        <rect x="16" y="29" width="4" height="5" fill="#f6ce4a" />
        <rect x="29" y="26" width="4" height="5" fill="#f6ce4a" />
      </svg>
      <span className="leading-none">
        <span
          className={`block font-display text-xl font-bold tracking-tight ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          {site.name}
        </span>
        <span
          className={`block font-display text-[0.78rem] font-normal tracking-[0.02em] ${
            isLight ? 'text-white/75' : 'text-body'
          }`}
        >
          {site.nameSuffix}
        </span>
      </span>
    </Link>
  )
}
