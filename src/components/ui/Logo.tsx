import { Link } from 'react-router-dom'
import { site } from '@/data/site'

type LogoProps = {
  /** `light` reverses the mark out for dark backgrounds. */
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Wordmark with a drawn axis mark — two strokes crossing at an origin,
 * which is the whole idea in the name.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name} ${site.suffix} — home`}
    >
      <svg
        viewBox="0 0 28 28"
        className="size-7 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 25V6"
          stroke={isLight ? '#ffffff' : '#0c0d0e'}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          d="M3 25h19"
          stroke={isLight ? '#ffffff' : '#0c0d0e'}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          d="M9 19 22 6"
          stroke="#ff5c00"
          strokeWidth="2.5"
          strokeLinecap="square"
          className="origin-bottom-left transition-transform duration-500 group-hover:scale-110"
        />
        <circle cx="22" cy="6" r="2.5" fill="#ffc300" />
      </svg>

      <span
        className={`font-display text-lg leading-none font-bold tracking-tight ${
          isLight ? 'text-white' : 'text-ink'
        }`}
      >
        {site.name}
        <span className={isLight ? 'text-white/45' : 'text-concrete'}>
          {' '}
          {site.suffix}
        </span>
      </span>
    </Link>
  )
}
