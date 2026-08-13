import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/data/capabilities'

export function Metrics() {
  return (
    <section className="border-y border-hairline bg-fog py-20">
      <div className="shell">
        <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 90}>
              <dd className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none font-bold text-ink">
                <CountUp value={metric.value} />
                <span className="text-orange">+</span>
              </dd>
              <dt className="mt-4 border-t border-hairline pt-4 font-display text-xs font-medium tracking-widest text-body uppercase">
                {metric.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
