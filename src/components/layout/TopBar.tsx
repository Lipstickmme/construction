import { useState } from 'react'
import { ChevronDown, Mail, SocialIcon } from '@/components/ui/Icon'
import { site, type Language } from '@/data/site'

/**
 * Thin utility strip above the header: contact email left, language switcher
 * and socials right. The switcher is presentational — wire it to your i18n
 * setup when there is one.
 */
export function TopBar() {
  const [language, setLanguage] = useState<Language>(site.languages[0])
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-line bg-surface">
      <div className="shell flex h-10 items-center justify-between gap-4">
        <a
          href={`mailto:${site.email}`}
          className="flex min-w-0 items-center gap-2 text-[0.72rem] text-body transition-colors hover:text-ink"
        >
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">
            <span className="hidden sm:inline">Email: </span>
            <span className="text-gold">{site.email}</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-5">
          {/* No room for the switcher alongside the address on a phone. */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-expanded={open}
              aria-label="Change language"
              onClick={() => setOpen((value) => !value)}
              onBlur={() => setOpen(false)}
              className="flex items-center gap-1.5 text-[0.72rem] text-body transition-colors hover:text-ink"
            >
              <span aria-hidden="true">{language.flag}</span>
              {language.label}
              <ChevronDown className="size-3" />
            </button>

            {open && (
              <ul className="absolute top-full right-0 z-50 mt-1 w-32 rounded-md border border-line bg-surface py-1 shadow-card">
                {site.languages.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      // onMouseDown beats the button's onBlur to the event.
                      onMouseDown={() => {
                        setLanguage(item)
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[0.72rem] text-body hover:bg-surface-muted hover:text-ink"
                    >
                      <span aria-hidden="true">{item.flag}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
    </div>
  )
}
