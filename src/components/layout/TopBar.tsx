import { Mail, SocialIcon } from '@/components/ui/Icon'
import { site } from '@/data/site'

/** Thin utility strip above the header: contact email left, socials right. */
export function TopBar() {
  return (
    <div className="border-b border-line bg-surface">
      <div className="shell flex h-9 items-center justify-between gap-4">
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2 text-[0.7rem] text-body transition-colors hover:text-ink"
        >
          <Mail className="size-3.5" />
          <span>
            Email: <span className="text-gold">{site.email}</span>
          </span>
        </a>

        <ul className="flex items-center gap-3">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="block text-body transition-colors hover:text-ink"
              >
                <SocialIcon name={social.icon} className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
