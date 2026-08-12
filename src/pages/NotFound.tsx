import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icon'

export default function NotFound() {
  return (
    <section className="shell flex flex-col items-center py-28 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-6 font-display text-3xl font-bold text-ink sm:text-4xl">
        This page isn't on the plans.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-body">
        The page you're after has moved or never existed. Head back to the home
        page, or tell us what you were looking for.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-white uppercase"
      >
        Back to home
        <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
