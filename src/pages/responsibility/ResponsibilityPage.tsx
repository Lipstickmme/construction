import { Navigate, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { Img } from '@/components/ui/Img'
import { findResponsibilityPage } from '@/data/responsibility'

/**
 * One template for all three Corporate Responsibility sub-pages — hero,
 * illustration, then headed prose. Content lives in `data/responsibility.ts`.
 */
export default function ResponsibilityPage() {
  const { slug } = useParams()
  const page = slug ? findResponsibilityPage(slug) : undefined

  if (!page) return <Navigate to="/corporate-responsibility" replace />

  return (
    <>
      <PageHero title={page.title} crumb="Home - Corporate Responsibility" />

      <section id="page-body" className="shell py-14 lg:py-16">
        <Img
          slot={page.image}
          className="mx-auto aspect-16/9 w-full max-w-2xl rounded-sm"
          imgClassName="object-contain"
        />

        <div className="mt-12">
          {page.sections.map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-display text-base font-bold text-ink">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-body"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
