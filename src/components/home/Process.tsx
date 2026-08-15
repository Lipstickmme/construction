import { Reveal } from '@/components/ui/Reveal'
import { processSteps } from '@/data/capabilities'

export function Process() {
  return (
    <section className="shell py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="kicker text-ink">How we work</p>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">
            How a job actually runs.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed">
            Most overruns on industrial work come down to decisions nobody
            made early enough. We get the awkward questions asked while they
            are still cheap to answer.
          </p>
        </Reveal>

        <ol className="border-t border-hairline">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.index}
              delay={index * 90}
              className="group grid grid-cols-[auto_1fr] gap-6 border-b border-hairline py-8 transition-colors duration-500 hover:bg-fog sm:gap-10"
            >
              <span className="index-num pt-1.5 text-orange">
                {step.index}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
