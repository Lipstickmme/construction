import { Navigate, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { ServiceSidebar } from '@/components/services/ServiceSidebar'
import { TiltImage } from '@/components/ui/TiltImage'
import { serviceContent, type ServiceBlock } from '@/data/serviceContent'
import { services } from '@/data/services'

function Block({ block }: { block: ServiceBlock }) {
  if (block.kind === 'h') {
    return (
      <h3 className="mt-9 font-display text-base font-bold text-ink">
        {block.text}
      </h3>
    )
  }

  if (block.kind === 'p') {
    return (
      <p className="mt-4 text-sm leading-relaxed text-body">{block.text}</p>
    )
  }

  if (block.kind === 'list') {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-sm leading-relaxed text-body before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-full before:bg-gold before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="mt-6 space-y-4">
      {block.items.map((item) => (
        <li
          key={item.term}
          className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-body"
        >
          <span className="font-display font-bold text-ink">{item.term}</span>
          {' — '}
          {item.text}
        </li>
      ))}
    </ul>
  )
}

/**
 * One template for all seven service pages — hero, sidebar, feature image and
 * body copy. Content lives in `services` in `src/data/services.ts`.
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((entry) => entry.id === slug)
  const content = slug ? serviceContent[slug] : undefined

  if (!service || !content) return <Navigate to="/services" replace />

  return (
    <>
      <PageHero title={service.title} />

      <section id="page-body" className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-14">
          <ServiceSidebar />

          <div>
            <div className="relative isolate overflow-hidden rounded-sm">
              <TiltImage slot={service.image} className="aspect-16/9 w-full" max={5} />

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
              {content.heading}
            </h2>

            {content.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
