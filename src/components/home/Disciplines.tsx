import { useState } from 'react'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { disciplines } from '@/data/capabilities'
import { images } from '@/data/images'

export function Disciplines() {
  const [openId, setOpenId] = useState<string | null>(disciplines[0].id)

  return (
    <section className="bg-fog py-24 lg:py-32">
      <div className="shell grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative lg:sticky lg:top-28">
          <Tilt max={6}>
            <Img
              slot={images.roadwork}
              className="aspect-4/5 w-full"
              imgClassName="grayscale transition-all duration-[1200ms] ease-out hover:grayscale-0"
            />
          </Tilt>
          <div className="hazard absolute right-0 bottom-0 h-1.5 w-2/3" />
        </Reveal>

        <div>
          <Reveal>
            <p className="kicker text-ink">Civil scope</p>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)]">
              The civil side
              <br />
              of the business.
            </h2>
          </Reveal>

          <div className="mt-12">
            {disciplines.map((discipline, index) => {
              const isOpen = openId === discipline.id
              const panelId = `discipline-${discipline.id}`

              return (
                <Reveal
                  key={discipline.id}
                  delay={index * 70}
                  className="border-t border-hairline last:border-b"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : discipline.id)}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span className="index-num text-orange">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`flex-1 font-display text-xl font-bold transition-colors ${
                          isOpen ? 'text-orange' : 'text-ink group-hover:text-orange'
                        }`}
                      >
                        {discipline.title}
                      </span>
                      <span
                        className={`relative grid size-8 shrink-0 place-items-center border transition-colors ${
                          isOpen
                            ? 'border-orange text-orange'
                            : 'border-hairline text-ink group-hover:border-orange'
                        }`}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span
                          className={`absolute h-3 w-px bg-current transition-transform duration-300 ${
                            isOpen ? 'scale-y-0' : ''
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div id={panelId} className="pr-8 pb-7 pl-12">
                      <p className="text-sm leading-relaxed">
                        {discipline.body}
                      </p>
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
