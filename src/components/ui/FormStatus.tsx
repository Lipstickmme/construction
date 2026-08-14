type SuccessProps = {
  title: string
  body: string
  onReset?: () => void
  resetLabel?: string
}

/** Confirmation panel shown once a form reports success. */
export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel = 'Send another',
}: SuccessProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-hairline bg-fog p-10"
    >
      <span className="grid size-11 place-items-center bg-orange text-white">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
      </span>

      <h3 className="mt-6 font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed">{body}</p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="link-wipe mt-6 font-display text-sm font-semibold text-ink"
        >
          {resetLabel}
        </button>
      )}
    </div>
  )
}
