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
    <section className="shell grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div>
        <span className="eyebrow">Construction</span>
        <h1 className="mt-6 font-display text-4xl leading-[1.12] font-bold text-ink sm:text-5xl lg:text-[3.4rem]">
          We build the infrastructure{' '}
          <span className="highlight-gold">cities depend on.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-body">
          Civil engineering, commercial development and heavy infrastructure —
          planned, engineered and delivered by one accountable team, from first
          survey through to handover.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
          >
            Explore our services
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-surface-muted"
          >
            Talk to our team
          </Link>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-ink">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs tracking-wide text-body uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Signature treatment: a gold block offset behind the photograph. */}
      <HeroSlideshow />
    </section>
  )
}
