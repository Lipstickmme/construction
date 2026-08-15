import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

export type ChatMessage = {
  id: string
  created_at: string
  sender: 'visitor' | 'agent'
  body: string
}

const STORAGE_KEY = 'axis-chat-session'

/**
 * The visitor half of the live chat.
 *
 * Visitors are signed in anonymously, so every row they create carries a real
 * `auth.uid()` and row level security can grant them their own thread and
 * nothing else. No bearer token of our own invention, no service role in the
 * browser. The session id is kept in localStorage so a reload lands back in
 * the same conversation.
 */
export function useVisitorChat() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<'idle' | 'starting' | 'ready' | 'error'>(
    'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const startingRef = useRef(false)

  /** Anonymous sign-in, reused if this browser already has a session. */
  const ensureAuth = useCallback(async () => {
    const client = supabase
    if (!client) throw new Error('Chat is unavailable.')

    const { data } = await client.auth.getSession()
    if (data.session) return data.session.user.id

    const { data: signIn, error: signInError } =
      await client.auth.signInAnonymously()
    if (signInError) throw signInError

    return signIn.user?.id ?? null
  }, [])

  // Rejoin an existing conversation on mount.
  useEffect(() => {
    const client = supabase
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!client || !stored) return

    let cancelled = false

    const rejoin = async () => {
      const { data: session } = await client
        .from('chat_sessions')
        .select('id')
        .eq('id', stored)
        .maybeSingle()

      // Readable only by its owner. If it has gone (storage cleared on this
      // browser, row deleted), forget it rather than showing an empty shell.
      if (!session) {
        window.localStorage.removeItem(STORAGE_KEY)
        return
      }

      const { data: rows } = await client
        .from('chat_messages')
        .select('id, created_at, sender, body')
        .eq('session_id', stored)
        .order('created_at', { ascending: true })

      if (cancelled) return
      setMessages((rows as ChatMessage[]) ?? [])
      setSessionId(stored)
      setStatus('ready')
    }

    rejoin().catch(() => window.localStorage.removeItem(STORAGE_KEY))
    return () => {
      cancelled = true
    }
  }, [])

  // Live updates for whichever session is open.
  useEffect(() => {
    const client = supabase
    if (!client || !sessionId) return

    const channel = client
      .channel(`chat-visitor-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const incoming = payload.new as ChatMessage
          setMessages((current) =>
            current.some((message) => message.id === incoming.id)
              ? current
              : [...current, incoming],
          )
        },
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [sessionId])

  /** Opens a conversation and posts the first message. */
  const start = useCallback(
    async (visitor: { name: string; email: string; message: string }) => {
      const client = supabase
      if (!client || startingRef.current) return

      startingRef.current = true
      setStatus('starting')
      setError(null)

      try {
        const visitorId = await ensureAuth()

        const { data: session, error: sessionError } = await client
          .from('chat_sessions')
          .insert({
            visitor_id: visitorId,
            visitor_name: visitor.name || null,
            visitor_email: visitor.email || null,
          })
          .select('id')
          .single()

        if (sessionError) throw sessionError

        // Select the row back and show it immediately rather than waiting for
        // the realtime echo, because a slow or blocked websocket would otherwise
        // leave the visitor staring at an empty thread. The subscription
        // dedupes by id when its copy arrives.
        const { data: first, error: messageError } = await client
          .from('chat_messages')
          .insert({
            session_id: session.id,
            sender: 'visitor',
            body: visitor.message,
          })
          .select('id, created_at, sender, body')
          .single()

        if (messageError) throw messageError

        window.localStorage.setItem(STORAGE_KEY, session.id)
        setMessages([first as ChatMessage])
        setSessionId(session.id)
        setStatus('ready')

        // Raise the flag by email. A failure here must not break the chat, so
        // it is deliberately not awaited into the error path.
        fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kind: 'chat',
            payload: {
              session_id: session.id,
              name: visitor.name,
              email: visitor.email,
              message: visitor.message,
            },
          }),
        }).catch(() => {})
      } catch (caught) {
        setError(
          caught instanceof Error
            ? caught.message
            : 'We could not open the chat just now.',
        )
        setStatus('error')
      } finally {
        startingRef.current = false
      }
    },
    [ensureAuth],
  )

  /** Posts a follow-up into an open conversation. */
  const send = useCallback(
    async (body: string) => {
      const client = supabase
      if (!client || !sessionId || !body.trim()) return

      const { data: sent, error: sendError } = await client
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender: 'visitor',
          body: body.trim(),
        })
        .select('id, created_at, sender, body')
        .single()

      if (sendError) {
        setError('That message did not send. Try again.')
        return
      }

      // Shown straight away; the subscription dedupes its own copy by id.
      const message = sent as ChatMessage
      setMessages((current) =>
        current.some((entry) => entry.id === message.id)
          ? current
          : [...current, message],
      )
    },
    [sessionId],
  )

  return { sessionId, messages, status, error, start, send }
}
