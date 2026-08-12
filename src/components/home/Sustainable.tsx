import { Check, ChevronRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { images } from '@/data/images'
import { capabilities, processSteps } from '@/data/services'

export function Sustainable() {
  return (
    <section id="process" className="shell scroll-mt-[8.5rem] py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Construction"
            title={
              <>
                Sustainable
                <br />
                Infrastructure
                <br />
                <span className="highlight-gold">Construction.</span>
              </>
            }
          />

          <p className="mt-8 font-display text-base font-bold text-ink">
            Building the idea of future
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-body">
            We believe in innovation and respecting our environment. That's why
            we have been focusing on sustainable architectural engineering. We
            embrace holistic development and support process.
          </p>

          <ul className="mt-8 space-y-4">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line text-ink">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 h-full w-full rounded-sm bg-gold"
          />
          <Img
            slot={images.sustainable}
            className="relative aspect-4/3 w-full rounded-sm shadow-card"
          />
        </div>
      </div>

      <ol
        id="process"
        className="mt-16 grid scroll-mt-[8.5rem] gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:grid-cols-3"
      >
        {processSteps.map((step, index) => (
          <li
            key={step.step}
            className="flex items-center gap-4 bg-surface px-6 py-6"
          >
            <span className="font-display text-lg font-bold text-ink">
              {step.step}
            </span>
            <span className="flex-1 font-display text-sm font-medium text-ink">
              {step.label}
            </span>
            {index < processSteps.length - 1 && (
              <ChevronRight className="size-4 shrink-0 text-body" />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
