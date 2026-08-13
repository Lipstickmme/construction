import { Link } from 'react-router-dom'
import { images } from '@/data/images'
import { site } from '@/data/site'
import { Img } from './Img'

type LogoProps = {
  /** `light` uses the reversed-out mark, for the navy footer. */
  variant?: 'dark' | 'light'
  className?: string
}

const boxClass = 'h-11 w-40'
const markClass = 'object-contain object-left'

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const label = `${site.name} ${site.nameSuffix}`

  return (
    <Link
      to="/"
      className={`block shrink-0 ${className}`}
      aria-label={`${label} — home`}
    >
      {variant === 'light' ? (
        <Img
          slot={images.logoLight}
          alt={label}
          loading="eager"
          placeholder="compact"
          className={boxClass}
          imgClassName={markClass}
        />
      ) : (
        <>
          {/* The dark mark would disappear on the dark theme's background, so
              swap to the reversed-out one there. */}
          <Img
            slot={images.logo}
            alt={label}
            loading="eager"
            placeholder="compact"
            className={`${boxClass} dark:hidden`}
            imgClassName={markClass}
          />
          <Img
            slot={images.logoLight}
            alt={label}
            loading="eager"
            placeholder="compact"
            className={`${boxClass} hidden dark:block`}
            imgClassName={markClass}
          />
        </>
      )}
    </Link>
  )
}
