import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { requireSupabase } from '@/lib/supabase'
import type { ChatMessage } from '@/hooks/useVisitorChat'

type Session = {
  id: string
  created_at: string
  last_message_at: string
  visitor_name: string | null
  visitor_email: string | null
  status: 'new' | 'in_progress' | 'closed'
}

function when(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/**
 * Staff side of the live chat. Sessions and messages both stream over
 * realtime, so a reply typed here appears in the visitor's widget without
 * either side reloading.
 */
export default function AdminChat() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)
  const threadRef = useRef<HTMLOListElement>(null)

  const loadSessions = useCallback(async () => {
    const { data, error: loadError } = await requireSupabase()
      .from('chat_sessions')
      .select('*')
      .order('last_message_at', { ascending: false })

    if (loadError) setError(loadError.message)
    else setSessions((data as Session[]) ?? [])
  }, [])

  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  // Any new message reorders the inbox, so watch the whole table.
  useEffect(() => {
    const client = requireSupabase()
    const channel = client
      .channel('chat-admin-inbox')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_sessions' },
        () => loadSessions(),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          const incoming = payload.new as ChatMessage & { session_id: string }
          loadSessions()
          setActiveId((current) => {
            if (current === incoming.session_id) {
              setMessages((rows) =>
                rows.some((row) => row.id === incoming.id)
                  ? rows
                  : [...rows, incoming],
              )
            }
            return current
          })
        },
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [loadSessions])

  // Load the thread when a conversation is opened.
  useEffect(() => {
    if (!activeId) {
      setMessages([])
      return
    }

    let cancelled = false
    requireSupabase()
      .from('chat_messages')
      .select('id, created_at, sender, body')
      .eq('session_id', activeId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (!cancelled) setMessages((data as ChatMessage[]) ?? [])
      })

    return () => {
      cancelled = true
    }
  }, [activeId])

  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages])

  const reply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = draft.trim()
    if (!body || !activeId) return

    setDraft('')
    const client = requireSupabase()

    const { error: sendError } = await client
      .from('chat_messages')
      .insert({ session_id: activeId, sender: 'agent', body })

    if (sendError) {
      setError(sendError.message)
      setDraft(body)
      return
    }

    // Answering is what moves a conversation off the new pile.
    await client
      .from('chat_sessions')
      .update({ status: 'in_progress' })
      .eq('id', activeId)
  }

  const closeSession = async () => {
    if (!activeId) return
    await requireSupabase()
      .from('chat_sessions')
      .update({ status: 'closed' })
      .eq('id', activeId)
    loadSessions()
  }

  const active = sessions.find((session) => session.id === activeId) ?? null

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-ink">Live chat</h1>
        <p className="text-sm">
          {sessions.filter((session) => session.status === 'new').length}{' '}
          waiting of {sessions.length}
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-6 border-l-2 border-orange bg-white p-4 text-sm">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[20rem_1fr]">
        <ul className="border-t border-hairline bg-white">
          {sessions.length === 0 && (
            <li className="p-6 text-sm text-body">
              No conversations yet. The widget on the public site opens them.
            </li>
          )}

          {sessions.map((session) => (
            <li key={session.id} className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setActiveId(session.id)}
                className={`w-full p-5 text-left transition-colors hover:bg-fog ${
                  session.id === activeId ? 'bg-fog' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-sm font-bold text-ink">
                    {session.visitor_name || 'Website visitor'}
                  </p>
                  {session.status === 'new' && (
                    <span className="size-2 shrink-0 bg-orange" />
                  )}
                </div>
                <p className="mt-1 truncate text-xs text-concrete">
                  {session.visitor_email || 'No email left'}
                </p>
                <p className="mt-2 text-xs text-concrete">
                  {when(session.last_message_at)}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {active ? (
          <div className="flex h-[32rem] flex-col bg-white">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline p-5">
              <div>
                <p className="font-display text-base font-bold text-ink">
                  {active.visitor_name || 'Website visitor'}
                </p>
                <p className="mt-1 text-xs text-concrete">
                  Opened {when(active.created_at)}
                </p>
              </div>

              <div className="flex items-center gap-5">
                {active.visitor_email && (
                  <a
                    href={`mailto:${active.visitor_email}`}
                    className="link-wipe font-display text-sm font-semibold text-ink"
                  >
                    Email instead
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeSession}
                  className="index-num text-concrete uppercase transition-colors hover:text-orange"
                >
                  Close
                </button>
              </div>
            </header>

            <ol
              ref={threadRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto p-5"
            >
              {messages.map((message) => (
                <li
                  key={message.id}
                  className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    message.sender === 'agent'
                      ? 'ml-auto bg-black text-white'
                      : 'mr-auto border border-hairline bg-fog text-ink'
                  }`}
                >
                  {message.body}
                </li>
              ))}
            </ol>

            <form
              onSubmit={reply}
              className="flex gap-2 border-t border-hairline p-4"
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a reply"
                aria-label="Reply"
                className="w-full border border-hairline px-3 py-2.5 text-sm text-ink focus:border-orange focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-black px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-orange"
              >
                Send
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
