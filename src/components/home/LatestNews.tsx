import { Link } from 'react-router-dom'
import { ChevronRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { latestNews } from '@/data/news'

export function LatestNews() {
  return (
    <section id="news" className="shell scroll-mt-[8.5rem] py-16 lg:py-24">
      <SectionHeading align="center" eyebrow="Testimonials" title="Latest News">
        As the complexity of buildings to increase, the field of architecture
        became multi-disciplinary with technological expertise and discpline.
      </SectionHeading>

      <ul className="mt-14 grid gap-7 md:grid-cols-3">
        {latestNews.map((post) => (
          <li
            key={post.id}
            className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-transform hover:-translate-y-1"
          >
            <Img slot={post.image} className="aspect-16/11 w-full" />

            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs tracking-wide text-body uppercase">
                {post.date} · {post.category}
              </span>

              <h3 className="mt-3 font-display text-base leading-snug font-bold text-ink">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                {post.excerpt}
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1 self-start font-display text-sm font-medium text-ink transition-colors hover:text-gold"
              >
                Read more
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
