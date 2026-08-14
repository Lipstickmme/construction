import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useVisitorChat } from '@/hooks/useVisitorChat'

const fieldClass =
  'w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink transition-colors focus:border-orange focus:outline-none'

function Bubble({ sender, body }: { sender: 'visitor' | 'agent'; body: string }) {
  const isVisitor = sender === 'visitor'
  return (
    <li
      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
        isVisitor
          ? 'ml-auto bg-black text-white'
          : 'mr-auto border border-hairline bg-fog text-ink'
      }`}
    >
      {body}
    </li>
  )
}

/**
 * Live chat, bottom right of every public page. Hidden entirely when the
 * backend is not configured, and on the admin side, where staff answer these
 * conversations rather than start them.
 */
export function ChatWidget() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [isStaff, setIsStaff] = useState(false)
  const [draft, setDraft] = useState('')
  const threadRef = useRef<HTMLOListElement>(null)
  const { sessionId, messages, status, error, start, send } = useVisitorChat()

  // A signed-in, non-anonymous user is staff; they get the dashboard, not this.
  useEffect(() => {
    const client = supabase
    if (!client) return

    let cancelled = false
    client.auth.getUser().then(({ data }) => {
      if (!cancelled) setIsStaff(Boolean(data.user) && !data.user?.is_anonymous)
    })

    return () => {
      cancelled = true
    }
  }, [])

  // Keep the newest message in view.
  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages, open])

  // Staff answer these from the dashboard rather than opening new ones.
  if (isStaff || pathname.startsWith('/admin')) return null

  const openConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = String(form.get('message') ?? '').trim()
    if (!message) return

    start({
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      message,
    })
  }

  const sendFollowUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = draft.trim()
    if (!body) return
    setDraft('')
    send(body)
  }

  return (
    <div className="fixed right-5 bottom-5 z-70 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <section
          aria-label="Live chat"
          className="flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col border border-hairline bg-surface shadow-2xl"
        >
          <header className="flex items-center justify-between bg-black px-5 py-4">
            <div>
              <p className="index-num text-orange uppercase">Live chat</p>
              <p className="mt-1 font-display text-sm font-bold text-white">
                Ask us anything
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center text-white transition-colors hover:text-orange"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </header>

          {sessionId ? (
            <>
              <ol
                ref={threadRef}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-5"
              >
                {messages.map((message) => (
                  <Bubble
                    key={message.id}
                    sender={message.sender}
                    body={message.body}
                  />
                ))}
                {messages.length === 1 && (
                  <li className="mt-1 text-xs text-body">
                    Someone will pick this up shortly. You can close the window,
                    the conversation is kept.
                  </li>
                )}
              </ol>

              <form
                onSubmit={sendFollowUp}
                className="flex gap-2 border-t border-hairline p-3"
              >
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type a message"
                  aria-label="Message"
                  className={fieldClass}
                />
                <button
                  type="submit"
                  className="shrink-0 bg-black px-4 font-display text-sm font-semibold text-white transition-colors hover:bg-orange"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <form
              onSubmit={openConversation}
              className="flex flex-1 flex-col gap-3 overflow-y-auto p-5"
            >
              <p className="text-sm leading-relaxed">
                Tell us what you need and we will reply here. Leave an email and
                we can follow up if you have gone by the time we answer.
              </p>

              <input
                name="name"
                placeholder="Name"
                aria-label="Name"
                className={fieldClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                aria-label="Email"
                className={fieldClass}
              />
              <textarea
                name="message"
                rows={3}
                required
                placeholder="How can we help?"
                aria-label="Message"
                className={fieldClass}
              />

              {error && (
                <p role="alert" className="text-xs text-orange">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'starting'}
                className="bg-black px-5 py-3 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-orange disabled:opacity-70"
              >
                {status === 'starting' ? 'Opening…' : 'Start chat'}
              </button>
            </form>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close live chat' : 'Open live chat'}
        className="grid size-14 place-items-center bg-orange text-white shadow-xl transition-colors hover:bg-black"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M5 5l14 14M19 5L5 19" />
          ) : (
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
          )}
        </svg>
      </button>
    </div>
  )
}
