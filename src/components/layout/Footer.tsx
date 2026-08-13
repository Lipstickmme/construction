import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { capabilities } from '@/data/capabilities'
import { footerNav } from '@/data/navigation'
import { site } from '@/data/site'

const columnLabel = 'index-num text-concrete uppercase'

export function Footer() {
  return (
    <footer className="bg-black text-concrete">
      <div className="hazard h-1.5" />

      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            {site.descriptor}
          </p>
        </div>

        <div>
          <p className={columnLabel}>Navigate</p>
          <ul className="mt-5 space-y-3">
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-wipe text-sm text-white/80 transition-colors hover:text-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={columnLabel}>Capabilities</p>
          <ul className="mt-5 space-y-3">
            {capabilities.slice(0, 5).map((capability) => (
              <li key={capability.id}>
                <Link
                  to={`/capabilities/${capability.id}`}
                  className="link-wipe text-sm text-white/80 transition-colors hover:text-orange"
                >
                  {capability.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={columnLabel}>Contact</p>
          {/* Placeholder details — swap the `contact` block in data/site.ts. */}
          <address className="mt-5 space-y-4 text-sm not-italic">
            <a
              href={`mailto:${site.contact.email}`}
              className="link-wipe block text-white/80 transition-colors hover:text-orange"
            >
              {site.contact.email}
            </a>
            <p>{site.contact.phone}</p>
            <p className="leading-relaxed">
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="index-num uppercase transition-colors hover:text-orange"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} {site.suffix}. All rights
            reserved.
          </p>
          <p className="text-concrete/70">
            Contact details on this site are placeholders.
          </p>
        </div>
      </div>
    </footer>
  )
}
