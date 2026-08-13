import { marqueeItems } from '@/data/capabilities'

/**
 * Continuous ticker. The list is rendered twice and the track translates by
 * exactly -50%, so the loop is seamless; the clone is hidden from screen
 * readers.
 */
export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-hairline bg-yellow py-5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((pass) => (
          <ul
            key={pass}
            aria-hidden={pass === 1}
            className="flex shrink-0 items-center"
          >
            {marqueeItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 px-10 font-display text-lg font-semibold tracking-tight text-black whitespace-nowrap"
              >
                {item}
                <span className="text-orange">✳</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
