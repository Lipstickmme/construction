import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'
import { images } from '@/data/images'

export default function CapabilityDetail() {
  const { slug } = useParams()
  const capability = capabilities.find((entry) => entry.id === slug)

  if (!capability) return <Navigate to="/capabilities" replace />

  const others = capabilities.filter((entry) => entry.id !== capability.id)

  return (
    <>
      <PageHeader underlay={images.underlayCapability} index={capability.index} title={capability.title}>
        {capability.summary}
      </PageHeader>

      <section className="shell grid gap-14 py-20 lg:grid-cols-[1fr_20rem] lg:gap-20 lg:py-28">
        <div>
          <Reveal>
            {capability.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-base leading-relaxed first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <p className="kicker text-ink">Scope</p>
            <ul className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {capability.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 bg-surface p-6 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:pt-2">
          <p className="index-num text-concrete uppercase">Other capabilities</p>
          <ul className="mt-6 border-t border-hairline">
            {others.map((entry) => (
              <li key={entry.id} className="border-b border-hairline">
                <Link
                  to={`/capabilities/${entry.id}`}
                  className="group flex items-baseline gap-4 py-4 text-sm font-medium text-ink transition-colors hover:text-orange"
                >
                  <span className="index-num text-concrete">{entry.index}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    {entry.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="mt-10 block bg-black px-6 py-6 text-white transition-colors hover:bg-orange"
          >
            <span className="index-num uppercase">Enquire</span>
            <span className="mt-2 block font-display text-lg font-bold">
              Discuss this scope →
            </span>
          </Link>
        </aside>
      </section>
    </>
  )
}
