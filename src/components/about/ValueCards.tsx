import { Bulb, Globe, Handshake, Users } from '@/components/ui/Icon'
import { valueCards, type ValueCard } from '@/data/about'

function ValueIcon({ icon }: { icon: ValueCard['icon'] }) {
  const className = 'size-9 text-ink'
  if (icon === 'users') return <Users className={className} />
  if (icon === 'handshake') return <Handshake className={className} />
  if (icon === 'globe') return <Globe className={className} />
  return <Bulb className={className} />
}

export function ValueCards() {
  return (
    <section className="shell pb-16 lg:pb-20">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valueCards.map((card) => (
          <li
            key={card.title}
            className="rounded-lg border border-line bg-surface p-7 text-center shadow-card"
          >
            <div className="flex justify-center">
              <ValueIcon icon={card.icon} />
            </div>
            <h3 className="mt-5 font-display text-sm font-bold text-ink">
              {card.title}
            </h3>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-body">
              {card.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
