import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { serviceCards } from '@/data/services'

export function ServicesRail() {
  const railRef = useRef<HTMLUListElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    // One card plus its gap, so the rail lands on a card edge either way.
    const step = rail.firstElementChild?.clientWidth ?? rail.clientWidth
    rail.scrollBy({ left: direction * (step + 24), behavior: 'smooth' })
  }

  return (
    <section id="our-services" className="relative overflow-hidden bg-navy py-16 lg:py-24">
      {/* Faint blueprint grid, as in the reference. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="Our services"
            title={
              <>
                Public and private
                <br />
                <span className="text-gold">construction.</span>
              </>
            }
          />

          <div className="flex items-end justify-between gap-6">
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              Whether it's building infrastructure for the public good or
              fulfilling private development needs, both sectors contribute to
              the growth and progress of the construction industry. With a
              skilled and rigorously trained team on board, we are a one-stop
              solution to all your construction needs and requirements.
            </p>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous services"
                className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next services"
                className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <ul
          ref={railRef}
          className="rail no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {serviceCards.map((card) => (
            <li
              key={card.id}
              className="relative w-[15rem] shrink-0 snap-start sm:w-[17rem]"
            >
              <Link to={`/services#${card.id}`} className="group block">
                <Img
                  slot={card.image}
                  className="aspect-3/4 w-full rounded-sm"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block bg-gold px-2.5 py-1 font-display text-[0.6rem] font-semibold tracking-[0.1em] text-navy uppercase">
                    {card.tag}
                  </span>
                  <h3 className="mt-3 font-display text-lg leading-snug font-bold text-white">
                    {card.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="shell mt-10 text-center text-sm text-white/70">
          Have a project in mind? You're welcome to send a{' '}
          <Link to="/contact" className="font-medium text-gold underline underline-offset-4">
            message
          </Link>{' '}
          or{' '}
          <Link to="/contact#call-back" className="font-medium text-gold underline underline-offset-4">
            give us a call.
          </Link>
        </p>
      </div>
    </section>
  )
}
