import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { ChevronRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { services } from '@/data/services'

export default function Services() {
  return (
    <>
      <PageHero title="Services" crumb="Home - Services" />

      <section id="page-body" className="shell py-16 lg:py-20">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.id}
              id={service.id}
              className="flex scroll-mt-32 flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-transform hover:-translate-y-1"
            >
              <Img slot={service.image} className="aspect-16/11 w-full" />

              <div className="flex flex-1 flex-col p-6">
                <span className="eyebrow self-start">Services</span>

                <h2 className="mt-4 font-display text-base leading-snug font-bold text-ink">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                  {service.excerpt}
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-1 self-start font-display text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  Learn More
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
