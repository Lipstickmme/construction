import { useState, type FormEvent } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'
import { site } from '@/data/site'

const fieldClass =
  'w-full border border-hairline bg-surface px-4 py-3.5 text-sm text-ink transition-colors focus:border-orange focus:outline-none'
const labelClass =
  'index-num mb-2 block text-concrete uppercase'

export default function Contact() {
  const [sent, setSent] = useState(false)

  // Stub handler — point this at a real endpoint when one exists.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHeader index="06" title="Start a conversation.">
        Tell us the scope, the site and the window. We will come back with
        what it actually takes.
      </PageHeader>

      <section className="shell grid gap-16 py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:py-28">
        <Reveal>
          {sent ? (
            <div className="border border-hairline bg-fog p-10">
              <span className="index-num text-orange">Received</span>
              <p className="mt-4 text-base leading-relaxed">
                Thanks — your enquiry is with us. This form is a front-end stub,
                so nothing has actually been sent yet; wire it to an endpoint
                before going live.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Name</span>
                  <input type="text" name="name" required className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>Company</span>
                  <input type="text" name="company" className={fieldClass} />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Email</span>
                <input type="email" name="email" required className={fieldClass} />
              </label>

              <label className="block">
                <span className={labelClass}>Discipline</span>
                <select name="discipline" className={fieldClass}>
                  <option value="">Select a capability</option>
                  {capabilities.map((capability) => (
                    <option key={capability.id} value={capability.id}>
                      {capability.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>Scope</span>
                <textarea name="scope" rows={6} required className={fieldClass} />
              </label>

              <button
                type="submit"
                className="group inline-flex items-center gap-4 bg-black px-9 py-5 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-orange"
              >
                Send enquiry
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={140}>
          {/* Placeholder details — replace the `contact` block in data/site.ts. */}
          <div className="border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Email</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-wipe mt-2 inline-block font-display text-lg font-medium text-ink"
            >
              {site.contact.email}
            </a>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Telephone</p>
            <p className="mt-2 font-display text-lg font-medium text-ink">
              {site.contact.phone}
            </p>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Office</p>
            <address className="mt-2 text-base leading-relaxed not-italic">
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Hours</p>
            <p className="mt-2 text-base">{site.contact.hours}</p>
          </div>

          <p className="mt-10 bg-fog p-5 text-xs leading-relaxed text-body">
            These contact details are placeholders. Replace the{' '}
            <code className="text-ink">contact</code> block in{' '}
            <code className="text-ink">src/data/site.ts</code> with the real
            ones and every page updates.
          </p>
        </Reveal>
      </section>
    </>
  )
}
