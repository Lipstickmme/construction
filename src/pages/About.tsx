import { BrandStrip } from '@/components/about/BrandStrip'
import { StatsBand } from '@/components/about/StatsBand'
import { ValueCards } from '@/components/about/ValueCards'
import { PageHero } from '@/components/layout/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { Img } from '@/components/ui/Img'
import { aboutIntro, aboutPanels, leader } from '@/data/about'
import { images } from '@/data/images'

export default function About() {
  const [welcome, ...paragraphs] = aboutIntro

  return (
    <>
      <PageHero title="About" crumb="Home - About" />

      <section id="page-body" className="shell py-14 lg:py-16">
        <p className="text-sm leading-relaxed text-body">{welcome}</p>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-6 text-sm leading-relaxed text-body">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="bg-surface-muted py-16 lg:py-20">
        <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl leading-snug font-bold text-ink lg:text-4xl">
              Inspiration, innovation, and opportunities.
            </h2>

            <Accordion
              items={aboutPanels}
              variant="solid"
              icon="chevron"
              className="mt-8"
            />
          </div>

          <figure className="mx-auto w-full max-w-sm">
            <Img
              slot={images.aboutFeature}
              className="aspect-4/5 w-full rounded-sm shadow-card"
            />
            <figcaption className="mt-5 text-center">
              <span className="block font-display text-base font-bold text-ink">
                {leader.name}
              </span>
              <span className="mt-1 block text-xs tracking-wide text-body uppercase">
                {leader.role}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="pt-16 lg:pt-20">
        <ValueCards />
      </div>

      <StatsBand />
      <BrandStrip />
    </>
  )
}
