import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/data/images'
import { capabilities } from '@/data/capabilities'

export default function Capabilities() {
  return (
    <>
      <PageHeader underlay={images.steelStructure} index="03" title="Capabilities">
        Every trade a heavy industrial project needs, held in-house and
        answerable to one programme.
      </PageHeader>

      <section className="shell py-20 lg:py-28">
        <ul className="border-t border-hairline">
          {capabilities.map((capability, index) => (
            <Reveal as="li" key={capability.id} delay={index * 70}>
              <Link
                to={`/capabilities/${capability.id}`}
                className="group grid items-start gap-6 border-b border-hairline py-10 transition-colors duration-500 hover:bg-fog lg:grid-cols-[6rem_1fr_auto] lg:gap-10 lg:px-6"
              >
                <span className="index-num pt-2 text-orange">
                  {capability.index}
                </span>

                <div>
                  <h2 className="font-display text-2xl leading-tight font-bold text-ink transition-transform duration-500 group-hover:translate-x-1.5 lg:text-3xl">
                    {capability.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed">
                    {capability.summary}
                  </p>
                </div>

                <span className="index-num self-center text-ink uppercase">
                  View →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
