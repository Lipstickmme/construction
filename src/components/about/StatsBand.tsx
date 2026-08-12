import { Bulb, Chat, Presentation, Users } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'
import { stats, type Stat } from '@/data/about'

function StatIcon({ icon }: { icon: Stat['icon'] }) {
  const className = 'size-8 text-white'
  if (icon === 'presentation') return <Presentation className={className} />
  if (icon === 'chat') return <Chat className={className} />
  if (icon === 'users') return <Users className={className} />
  return <Bulb className={className} />
}

export function StatsBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <Img
        slot={images.aboutStats}
        alt=""
        placeholder="plain"
        className="absolute inset-0 -z-10 size-full"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/90" />

      <div className="shell py-16 lg:py-20">
        <dl className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-center">
                <StatIcon icon={stat.icon} />
              </div>
              <dd className="mt-5 font-display text-4xl font-bold text-white">
                {stat.value}
              </dd>
              <dt className="mt-2 text-xs tracking-wide text-white/70">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
