import { Link } from 'react-router-dom'
import { images } from '@/data/images'
import { site } from '@/data/site'
import { Img } from './Img'

type LogoProps = {
  /** `light` uses the reversed-out mark, for the navy footer. */
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const label = `${site.name} ${site.nameSuffix}`

  return (
    <Link
      to="/"
      className={`block shrink-0 ${className}`}
      aria-label={`${label} — home`}
    >
      <Img
        slot={variant === 'light' ? images.logoLight : images.logo}
        alt={label}
        loading="eager"
        placeholder="compact"
        // Sized by height, with the box wide enough for the mark's 3.47:1
        // ratio so `contain` never has to shrink it to fit the width.
        className="h-12 w-48"
        fit="contain"
        imgClassName="object-left"
      />
    </Link>
  )
}
