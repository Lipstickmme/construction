import { useState, type FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { services } from '@/data/services'
import { site, telHref } from '@/data/site'

const fieldClass =
  'w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-body/70'

/** Left rail on a service page: the other services, a quote form, a call card. */
export function ServiceSidebar() {
  const [sent, setSent] = useState(false)

  // Stub handler — point this at your form endpoint when one exists.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <aside className="space-y-8">
      <nav aria-label="Services">
        <ul className="overflow-hidden rounded-sm border border-line">
          {services.map((service) => (
            <li key={service.id} className="border-b border-line last:border-b-0">
              <NavLink
                to={`/services/${service.id}`}
                className={({ isActive }) =>
                  `block px-5 py-4 font-display text-sm leading-snug font-bold transition-colors ${
                    isActive
                      ? 'bg-navy text-white'
                      : 'bg-surface-muted text-ink hover:bg-surface'
                  }`
                }
              >
                {service.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-surface-muted p-6">
        <h2 className="font-display text-base font-bold text-ink">
          Get a Free Quote
        </h2>

        {sent ? (
          <p className="mt-4 text-sm leading-relaxed text-body">
            Thanks — we’ll come back to you with an estimate within one business
            day.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Your email address</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email Address"
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Your message</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Your message"
                className={fieldClass}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-sm bg-navy px-6 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Send email
            </button>
          </form>
        )}
      </div>

      <div className="flex items-start gap-4 rounded-sm border border-line p-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white">
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
          </svg>
        </span>

        <div>
          <p className="text-xs tracking-wide text-body uppercase">Call Us</p>
          <p className="mt-1 text-sm leading-relaxed text-ink">
            {site.phones.map((phone, index) => (
              <span key={phone}>
                <a href={telHref(phone)} className="hover:text-gold">
                  {phone}
                </a>
                {index < site.phones.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </aside>
  )
}
