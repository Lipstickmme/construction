import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icon'
import { HeroSlideshow } from './HeroSlideshow'

const stats = [
  { value: '25+', label: 'Years on site' },
  { value: '480', label: 'Projects delivered' },
  { value: '9', label: 'Countries' },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroSlideshow />

      {/* Navy wash over the artwork, plus a stronger fade on the left so the
          copy holds up against a busy photograph. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/80 via-navy-deep/30 to-transparent"
      />

      <div className="shell flex min-h-[34rem] flex-col justify-center py-24 lg:min-h-[40rem]">
        <div className="max-w-2xl">
          <span className="eyebrow bg-white/15 text-white">Construction</span>

          <h1 className="mt-6 font-display text-4xl leading-[1.3] font-bold text-white sm:text-5xl lg:text-[3.4rem]">
            We build the infrastructure
            <br />
            <span className="highlight-solid">cities depend on.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
            Civil engineering, commercial development and heavy infrastructure —
            planned, engineered and delivered by one accountable team, from
            first survey through to handover.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-navy uppercase transition-transform hover:-translate-y-0.5"
            >
              Explore our services
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
            >
              Talk to our team
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/20 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs tracking-wide text-white/65 uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
