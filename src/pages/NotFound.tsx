import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-black">
      <div className="shell text-center">
        <span className="index-num text-orange">Error 404</span>
        <h1 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] text-white">
          Off the grid.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-white/70">
          That page is not on the drawings. Head back and we will point you
          somewhere useful.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-4 bg-orange px-9 py-5 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-black"
        >
          Back to home →
        </Link>
      </div>
    </section>
  )
}
