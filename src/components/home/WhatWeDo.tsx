import { OfferingIcon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { offerings } from '@/data/services'

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="shell py-16 lg:py-24">
      <SectionHeading
        align="center"
        eyebrow="What we do"
        title={
          <>
            Transforming Visions into{' '}
            <span className="highlight-gold">Iconic Structures.</span>
          </>
        }
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {offerings.map((offering) => (
          <li
              key={offering.id}
              className="group relative rounded-xl border border-line bg-surface p-8 transition-shadow hover:shadow-card"
            >
              {offering.badge && (
                <span className="absolute top-6 right-6 rounded-full bg-surface-muted px-3 py-1 font-display text-[0.62rem] font-semibold tracking-[0.12em] text-ink uppercase">
                  {offering.badge}
                </span>
              )}

              <OfferingIcon name={offering.icon} className="size-11 text-ink" />

              <h3 className="mt-8 font-display text-xl leading-snug font-bold text-ink">
                {offering.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {offering.description}
              </p>

              <span className="mt-6 block h-0.5 w-10 rounded-full bg-gold transition-all group-hover:w-16" />
            </li>
        ))}
      </ul>
    </section>
  )
}
