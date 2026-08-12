import type { ReactNode } from 'react'
import { ChevronDown } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { images, type ImageSlot } from '@/data/images'
import { site } from '@/data/site'

type PageHeroProps = {
  title: string
  /** Breadcrumb trail shown above the title, e.g. `HOME - CONTACT`. */
  crumb?: string
  subtitle?: string
  /** Defaults to the shared inner-page hero background. */
  image?: ImageSlot
  /** Anchor the chevron scrolls to. */
  scrollTo?: string
  children?: ReactNode
}

/**
 * Shared hero for every inner page: background image under a navy wash, with
 * a centred title, tagline and a chevron down into the page body.
 */
export function PageHero({
  title,
  crumb,
  subtitle = site.heroSubtitle,
  image = images.aboutHero,
  scrollTo = '#page-body',
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Img
        slot={image}
        alt=""
        loading="eager"
        placeholder="plain"
        className="absolute inset-0 -z-10 size-full"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/80" />

      <div className="shell flex min-h-[19rem] flex-col items-center justify-center py-16 text-center lg:min-h-[22rem]">
        {crumb && (
          <p className="font-display text-[0.62rem] font-semibold tracking-[0.2em] text-white/70 uppercase">
            {crumb}
          </p>
        )}

        <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 font-display text-sm font-semibold text-white/80">
            {subtitle}
          </p>
        )}

        {children}

        <a
          href={scrollTo}
          aria-label="Scroll to page content"
          className="mt-8 text-white/80 transition-colors hover:text-gold"
        >
          <ChevronDown className="size-7" />
        </a>
      </div>
    </section>
  )
}
