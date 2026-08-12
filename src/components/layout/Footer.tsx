import { Link } from 'react-router-dom'
import { ArrowRight, SocialIcon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { footerLinks } from '@/data/navigation'
import { site, telHref } from '@/data/site'

const columnTitle =
  'font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55'

export function Footer() {
  return (
    <footer className="bg-navy text-white/70 lg:sticky lg:bottom-0 lg:z-0">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className={columnTitle}>About our company</p>
          <Logo variant="light" className="mt-6" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            {site.about}
          </p>
        </div>

        <div>
          <p className={columnTitle}>Quick links</p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {site.socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className={columnTitle}>Contact</p>
          <p className="mt-6 text-sm text-white/60">Give us a call</p>
          <p className="mt-3 font-display text-sm leading-relaxed font-bold text-gold">
            {site.phones.map((phone, index) => (
              <span key={phone}>
                <a href={telHref(phone)} className="hover:underline">
                  {phone}
                </a>
                {index < site.phones.length - 1 && ', '}
              </span>
            ))}
          </p>

          <p className="mt-8 text-sm text-white/60">Have a project in mind?</p>
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-display text-[0.78rem] font-semibold tracking-wide text-navy uppercase transition-transform hover:-translate-y-0.5"
          >
            Send a message
            <ArrowRight className="size-4" />
          </Link>

          <p className="mt-8 text-sm text-white/60">
            <a
              href={`mailto:${site.email}`}
              className="break-all transition-colors hover:text-gold"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} {site.nameSuffix}. All
            rights reserved.
          </p>

          <ul className="flex items-center gap-4">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="block text-white/55 transition-colors hover:text-gold"
                >
                  <SocialIcon name={social.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
