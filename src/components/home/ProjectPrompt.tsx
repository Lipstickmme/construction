import { Link } from 'react-router-dom'

/**
 * The "Have a project in mind?" line that recurs between sections. `tone`
 * switches it for the navy bands.
 */
export function ProjectPrompt({
  tone = 'dark',
  className = '',
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  const isLight = tone === 'light'
  const linkClass = `font-medium underline underline-offset-4 ${
    isLight ? 'text-gold' : 'text-ink hover:text-gold'
  }`

  return (
    <p
      className={`text-center text-sm ${isLight ? 'text-white/70' : 'text-body'} ${className}`}
    >
      Have a project in mind? You’re welcome to send a{' '}
      <Link to="/contact#message" className={linkClass}>
        message
      </Link>{' '}
      or{' '}
      <Link to="/contact#call-back" className={linkClass}>
        give us a call.
      </Link>
    </p>
  )
}
