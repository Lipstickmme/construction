import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { requireSupabase } from '@/lib/supabase'

type Thread = {
  id: string
  created_at: string
  last_message_at: string
  subject: string
  participant_email: string
  participant_name: string | null
  status: 'new' | 'in_progress' | 'closed'
}

type Message = {
  id: string
  created_at: string
  thread_id: string
  direction: 'inbound' | 'outbound'
  from_email: string
  from_name: string | null
  subject: string | null
  body_text: string | null
  body_html: string | null
  has_attachments: boolean
}

function when(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/**
 * Mail addressed to the company mailbox, and replies sent back from it.
 *
 * Inbound message bodies are external content, so they are rendered as plain
 * text rather than as their original HTML — displaying that would mean
 * running a stranger's markup inside an authenticated dashboard.
 */
export default function AdminEmail() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeIdRef = useRef<string | null>(null)
  activeIdRef.current = activeId

  const loadThreads = useCallback(async () => {
    const { data, error: loadError } = await requireSupabase()
      .from('email_threads')
      .select('*')
      .order('last_message_at', { ascending: false })

    if (loadError) setError(loadError.message)
    else setThreads((data as Thread[]) ?? [])
  }, [])

  const loadMessages = useCallback(async (threadId: string) => {
    const { data } = await requireSupabase()
      .from('email_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })

    setMessages((data as Message[]) ?? [])
  }, [])

  useEffect(() => {
    loadThreads()
  }, [loadThreads])

  useEffect(() => {
    if (!activeId) {
      setMessages([])
      return
    }
    loadMessages(activeId)
  }, [activeId, loadMessages])

  // New mail should land in an open dashboard without a reload.
  useEffect(() => {
    const client = requireSupabase()
    const channel = client
      .channel('email-inbox')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'email_threads' },
        () => loadThreads(),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'email_messages' },
        (payload) => {
          const incoming = payload.new as Message
          loadThreads()
          if (activeIdRef.current !== incoming.thread_id) return
          setMessages((rows) =>
            rows.some((row) => row.id === incoming.id)
              ? rows
              : [...rows, incoming],
          )
        },
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [loadThreads])

  const reply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = draft.trim()
    if (!body || !activeId || sending) return

    setSending(true)
    setError(null)

    try {
      const client = requireSupabase()
      const { data: session } = await client.auth.getSession()
      const token = session.session?.access_token
      if (!token) throw new Error('Your session has expired. Sign in again.')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thread_id: activeId, body }),
      })

      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? 'Could not send that reply.')
      }

      setDraft('')
      // The send is recorded server side; pull the thread back rather than
      // guessing what was stored.
      await loadMessages(activeId)
      await loadThreads()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not send.')
    } finally {
      setSending(false)
    }
  }

  const setStatus = async (status: Thread['status']) => {
    if (!activeId) return
    await requireSupabase()
      .from('email_threads')
      .update({ status })
      .eq('id', activeId)
    loadThreads()
  }

  const active = threads.find((thread) => thread.id === activeId) ?? null

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-ink">Email</h1>
        <p className="text-sm">
          {threads.filter((thread) => thread.status === 'new').length} unread of{' '}
          {threads.length}
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-6 border-l-2 border-orange bg-white p-4 text-sm">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[22rem_1fr]">
        <ul className="self-start border-t border-hairline bg-white">
          {threads.length === 0 && (
            <li className="p-6 text-sm leading-relaxed text-body">
              Nothing yet. Mail sent to the company address appears here once
              the Cloudflare route is live.
            </li>
          )}

          {threads.map((thread) => (
            <li key={thread.id} className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setActiveId(thread.id)}
                className={`w-full p-5 text-left transition-colors hover:bg-fog ${
                  thread.id === activeId ? 'bg-fog' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`font-display text-sm text-ink ${
                      thread.status === 'new' ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {thread.participant_name || thread.participant_email}
                  </p>
                  {thread.status === 'new' && (
                    <span className="mt-1 size-2 shrink-0 bg-orange" />
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-body">
                  {thread.subject}
                </p>
                <p className="mt-2 text-xs text-concrete">
                  {when(thread.last_message_at)}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {active ? (
          <div className="bg-white">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline p-6">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  {active.subject}
                </h2>
                <p className="mt-1 text-sm">
                  {active.participant_name
                    ? `${active.participant_name} · ${active.participant_email}`
                    : active.participant_email}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={`mailto:${active.participant_email}`}
                  className="link-wipe font-display text-sm font-semibold text-ink"
                >
                  Open in mail app
                </a>
                <button
                  type="button"
                  onClick={() => setStatus(active.status === 'closed' ? 'new' : 'closed')}
                  className="index-num text-concrete uppercase transition-colors hover:text-orange"
                >
                  {active.status === 'closed' ? 'Reopen' : 'Close'}
                </button>
              </div>
            </header>

            <ol className="divide-y divide-hairline">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className={`p-6 ${message.direction === 'outbound' ? 'bg-fog' : ''}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-sm font-bold text-ink">
                      {message.direction === 'outbound'
                        ? 'You'
                        : message.from_name || message.from_email}
                    </p>
                    <p className="text-xs text-concrete">
                      {when(message.created_at)}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-ink">
                    {message.body_text?.trim() ||
                      '(no plain-text body — open it in your mail app)'}
                  </p>

                  {message.has_attachments && (
                    <p className="mt-3 index-num text-orange uppercase">
                      Has attachments, see your mail app
                    </p>
                  )}
                </li>
              ))}
            </ol>

            <form onSubmit={reply} className="border-t border-hairline p-6">
              <label className="block">
                <span className="index-num mb-2 block text-concrete uppercase">
                  Reply as the company mailbox
                </span>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={5}
                  placeholder="Type your reply"
                  className="w-full border border-hairline px-4 py-3 text-sm text-ink focus:border-orange focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={sending || !draft.trim()}
                className="mt-4 bg-black px-8 py-4 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-orange disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send reply'}
              </button>
            </form>
          </div>
        ) : (
          <p className="bg-white p-6 text-sm text-body">
            Pick a conversation to read and reply.
          </p>
        )}
      </div>
    </div>
  )
}
