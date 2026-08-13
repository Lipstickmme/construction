import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'

export function CapabilityGrid() {
  return (
    <section id="capabilities" className="shell scroll-mt-24 py-24 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <p className="kicker text-ink">What we do</p>
          <h2 className="mt-6 max-w-xl text-[clamp(2rem,4.5vw,3.5rem)]">
            Six disciplines, one accountable team.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-md text-base leading-relaxed lg:pb-3">
            We hold every trade a heavy industrial project needs in-house, so
            the interfaces where programmes usually slip sit inside our
            organisation rather than between contracts.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal
            as="li"
            key={capability.id}
            delay={(index % 3) * 90}
            className="group border-b border-hairline sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-child(odd)]:border-r-0"
          >
            <Link
              to={`/capabilities/${capability.id}`}
              className="flex h-full flex-col p-8 transition-colors duration-500 hover:bg-fog lg:p-10"
            >
              <span className="index-num text-orange">{capability.index}</span>

              <h3 className="mt-8 font-display text-xl leading-tight font-bold text-ink lg:text-2xl">
                {capability.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-relaxed">
                {capability.summary}
              </p>

              <span className="mt-8 inline-flex items-center gap-3 font-display text-xs font-semibold tracking-widest text-ink uppercase">
                <span className="h-px w-6 bg-orange transition-all duration-500 group-hover:w-10" />
                Explore
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
