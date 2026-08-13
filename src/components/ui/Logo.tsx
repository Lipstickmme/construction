import { Link } from 'react-router-dom'
import { images } from '@/data/images'
import { site } from '@/data/site'

type LogoProps = {
  /** `light` uses the light-lettering mark, for dark backgrounds. */
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const slot = variant === 'light' ? images.logoLight : images.logoDark
  const label = `${site.name} ${site.suffix}`

  return (
    <Link
      to="/"
      className={`block shrink-0 ${className}`}
      aria-label={`${label} — home`}
    >
      <img
        src={slot.src}
        alt={label}
        width={144}
        height={60}
        className="h-11 w-auto object-contain"
      />
    </Link>
  )
}
