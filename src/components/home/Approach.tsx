import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { approachPoints } from '@/data/capabilities'
import { images } from '@/data/images'

export function Approach() {
  return (
    <section className="shell py-24 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="kicker text-ink">Our approach</p>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">
            One contractor
            <br />
            for the whole job.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed">
            Energy work sets the bar. The certification, the traceability, the
            shutdown discipline a hydrocarbon plant demands. We work to the same
            bar on civils, structures and buildings, which is usually why
            clients end up handing us the rest of the site as well.
          </p>

          <ul className="mt-10 space-y-px border-y border-hairline">
            {approachPoints.map((point, index) => (
              <li
                key={point}
                className="group flex items-center gap-5 py-4 transition-colors duration-500 hover:bg-fog"
              >
                <span className="index-num text-orange">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-base font-medium text-ink transition-transform duration-500 group-hover:translate-x-1">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="relative">
          {/* Offset yellow block, echoing the hazard motif. */}
          <div
            aria-hidden="true"
            className="absolute -top-5 -right-5 h-full w-full bg-yellow"
          />
          <Tilt max={7}>
            <Img slot={images.siteReview} className="relative aspect-4/3 w-full" />
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
