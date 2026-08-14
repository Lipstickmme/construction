import { PageHeader } from '@/components/layout/PageHeader'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { Metrics } from '@/components/home/Metrics'
import { images } from '@/data/images'
import { site } from '@/data/site'

const principles = [
  {
    index: '01',
    title: 'Say the number early',
    body: 'An honest estimate given at week two is worth more than an optimistic one defended until week twenty. We would rather lose the bid than win it on a figure we do not believe.',
  },
  {
    index: '02',
    title: 'Own the interfaces',
    body: 'Most industrial programmes fail between contracts, not inside them. Holding every discipline in-house puts those seams under our management rather than in a meeting.',
  },
  {
    index: '03',
    title: 'Document as you build',
    body: 'Test packs assembled while the work goes in, not reconstructed from memory at handover. It is why our systems get accepted first time.',
  },
  {
    index: '04',
    title: 'Everyone goes home',
    body: 'Safety is not a value on a poster. It is the reason a job takes the time it takes, and the one variable we will not compress to hit a date.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader underlay={images.underlayAbout} index="02" title="We build the difficult half.">
        {site.descriptor}
      </PageHeader>

      <section className="shell grid gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <p className="kicker text-ink">Who we are</p>
          <h2 className="mt-6 text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Founded {site.founded}. Still run by people who have worn the boots.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-base leading-relaxed">
            Axis Construction began as a mechanical and piping contractor and
            grew by adding the trades our clients kept having to source
            elsewhere — steel fabrication, civils, commissioning support.
            Today those sit under one roof and one programme.
          </p>
          <p className="mt-6 text-base leading-relaxed">
            We work across process industry, power generation and offshore
            energy. The plant differs; the discipline of setting heavy
            equipment safely, to tolerance, inside a fixed window does not.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-20 lg:pb-28">
        <Reveal>
          <Tilt max={4}>
            <Img slot={images.approach} className="aspect-21/9 w-full" />
          </Tilt>
        </Reveal>
      </section>

      <Metrics />

      <section className="shell py-24 lg:py-32">
        <Reveal>
          <p className="kicker text-ink">How we operate</p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
            Four commitments we are willing to be held to.
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal
              as="li"
              key={principle.index}
              delay={(index % 2) * 100}
              className="bg-surface p-8 lg:p-10"
            >
              <span className="index-num text-orange">{principle.index}</span>
              <h3 className="mt-6 font-display text-xl font-bold text-ink">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed">{principle.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
