import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { ChevronRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { responsibilityContent } from '@/data/responsibility'

/** Index for the three Corporate Responsibility sub-pages. */
export default function CorporateResponsibility() {
  return (
    <>
      <PageHero
        title="Corporate Responsibility"
        crumb="Home - Corporate Responsibility"
      />

      <section id="page-body" className="shell py-16 lg:py-20">
        <p className="max-w-2xl text-sm leading-relaxed text-body">
          Our commitments on people, community and environment — and the
          measures we hold ourselves to on every site.
        </p>

        <ul className="mt-10 grid gap-7 md:grid-cols-3">
          {responsibilityContent.map((page) => (
            <li
              key={page.slug}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-transform hover:-translate-y-1"
            >
              <Img slot={page.image} className="aspect-16/11 w-full" />

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-base font-bold text-ink">
                  {page.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                  {page.sections[0].paragraphs[0].slice(0, 150)}…
                </p>

                <Link
                  to={`/corporate-responsibility/${page.slug}`}
                  className="mt-5 inline-flex items-center gap-1 self-start font-display text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  Read More
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
