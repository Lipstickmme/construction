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
    body: 'We would rather give you an honest figure in week two than defend an optimistic one until week twenty. If that loses us the bid, so be it. Winning on a number we do not believe helps nobody.',
  },
  {
    index: '02',
    title: 'Own the joins',
    body: 'Industrial programmes tend to come unstuck between contracts, not inside them. Keeping every discipline in-house means those joins are ours to manage instead of something that gets argued about in a meeting.',
  },
  {
    index: '03',
    title: 'Write it down as you build',
    body: 'Test packs get put together while the work is going in. Nobody enjoys reconstructing them from memory at handover, and it shows in how long acceptance takes.',
  },
  {
    index: '04',
    title: 'Everyone goes home',
    body: 'Safety is the reason a job takes as long as it takes. It is the one thing on the programme we will not squeeze to hit a date, and our supervisors know they will be backed for stopping work.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader underlay={images.ceoSite} index="02" title="Who we are.">
        {site.descriptor}
      </PageHeader>

      <section className="shell grid gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <p className="kicker text-ink">Who we are</p>
          <h2 className="mt-6 text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Founded {site.founded}, and still run by people who have worn the boots.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-base leading-relaxed">
            Axis started out as a mechanical and piping contractor. We grew by
            picking up the trades our clients kept having to go elsewhere for.
            Steel fabrication, civils, commissioning support. These days they
            all sit under one roof and one programme.
          </p>
          <p className="mt-6 text-base leading-relaxed">
            We work across process industry, power generation and offshore
            energy. The plant changes from job to job. Setting heavy equipment
            safely, to tolerance, inside a window that will not move does not.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-20 lg:pb-28">
        <Reveal>
          <Tilt max={4}>
            <Img slot={images.civilWorks} className="aspect-21/9 w-full" />
          </Tilt>
        </Reveal>
      </section>

      <Metrics />

      <section className="shell py-24 lg:py-32">
        <Reveal>
          <p className="kicker text-ink">How we operate</p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
            Four things we will happily be held to.
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
