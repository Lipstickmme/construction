import { Mail, SocialIcon } from '@/components/ui/Icon'
import { site } from '@/data/site'

/** Thin utility strip above the header: contact email left, socials right. */
export function TopBar() {
  return (
    <div className="border-b border-line bg-surface">
      <div className="shell flex h-11 items-center justify-between gap-4">
        <a
          href={`mailto:${site.email}`}
          className="flex min-w-0 items-center gap-2 text-[0.78rem] text-ink transition-colors hover:text-gold"
        >
          <Mail className="size-4 shrink-0" />
          <span className="truncate">
            <span className="hidden sm:inline">Email: </span>
            {site.email}
          </span>
        </a>

        <ul className="flex shrink-0 items-stretch self-stretch border-l border-line">
          {site.socials.map((social) => (
            <li key={social.label} className="flex border-r border-line">
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid w-11 place-items-center text-ink transition-colors hover:text-gold"
              >
                <SocialIcon name={social.icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
