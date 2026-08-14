import { Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { images } from '@/data/images'
import { leader } from '@/data/site'

/**
 * Leadership note, sitting between the metrics and the civil scope — a face
 * and a position after the numbers, before the detail.
 */
export function Leadership() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative">
          {/* Orange plate offset behind the portrait. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 h-full w-full bg-orange"
          />
          <Tilt max={6}>
            <Img
              slot={images.ceo}
              className="relative aspect-4/5 w-full"
              imgClassName="object-top"
            />
          </Tilt>
        </Reveal>

        <div>
          <Reveal>
            <p className="kicker text-white">Leadership</p>

            <blockquote className="mt-8 font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-bold text-white">
              “{leader.quote}”
            </blockquote>

            <div className="mt-10 flex items-center gap-5 border-t border-white/15 pt-8">
              <span className="h-10 w-px bg-orange" />
              <div>
                <p className="font-display text-base font-bold text-white">
                  {leader.name}
                </p>
                <p className="mt-0.5 text-sm text-concrete">{leader.role}</p>
              </div>
            </div>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-white/70">
              {leader.bio}
            </p>

            <Link
              to="/about"
              className="link-wipe mt-10 inline-block font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:text-orange"
            >
              About the company
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
