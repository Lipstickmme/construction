import { Navigate, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { ServiceSidebar } from '@/components/services/ServiceSidebar'
import { Img } from '@/components/ui/Img'
import { services } from '@/data/services'

/**
 * One template for all seven service pages — hero, sidebar, feature image and
 * body copy. Content lives in `services` in `src/data/services.ts`.
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((entry) => entry.id === slug)

  if (!service) return <Navigate to="/services" replace />

  return (
    <>
      <PageHero title={service.title} />

      <section id="page-body" className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-14">
          <ServiceSidebar />

          <div>
            <div className="relative isolate overflow-hidden rounded-sm">
              <Img slot={service.image} className="aspect-16/9 w-full" />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="font-display text-[0.62rem] font-semibold tracking-[0.2em] text-white/80 uppercase">
                  Services
                </span>
                <span className="mt-2 block h-0.5 w-6 rounded-full bg-gold" />

                <h2 className="mt-3 font-display text-2xl leading-tight font-bold text-white sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/80">
                  {service.tagline}
                </p>
              </div>
            </div>

            <h2 className="mt-12 font-display text-xl font-bold text-ink">
              {service.detailHeading}
            </h2>

            {service.detailBody.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-body"
              >
                {paragraph}
              </p>
            ))}

            {service.detailBullets && (
              <ul className="mt-8 space-y-4">
                {service.detailBullets.map((bullet) => (
                  <li
                    key={bullet.term}
                    className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-body"
                  >
                    <span className="font-display font-bold text-ink">
                      {bullet.term}
                    </span>
                    : {bullet.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
