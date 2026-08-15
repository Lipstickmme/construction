import { useCallback, useEffect, useState } from 'react'
import { requireSupabase } from '@/lib/supabase'

type Status = 'new' | 'in_progress' | 'closed'

type Enquiry = {
  id: string
  created_at: string
  status: Status
  name: string
  company: string | null
  email: string
  phone: string | null
  discipline: string | null
  scope: string
}

type Application = {
  id: string
  created_at: string
  status: Status
  role_title: string
  name: string
  email: string
  experience: string
}

type InboxRecord = Enquiry | Application

const statuses: Array<{ value: Status; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'closed', label: 'Closed' },
]

function when(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function isEnquiry(record: InboxRecord): record is Enquiry {
  return 'scope' in record
}

function StatusPill({ status }: { status: Status }) {
  const tone =
    status === 'new'
      ? 'bg-orange text-white'
      : status === 'in_progress'
        ? 'bg-yellow text-black'
        : 'border border-hairline bg-fog text-body'

  return (
    <span className={`index-num px-2 py-1 uppercase ${tone}`}>
      {statuses.find((entry) => entry.value === status)?.label}
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-hairline py-4">
      <p className="index-num text-concrete uppercase">{label}</p>
      <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-ink">
        {value}
      </p>
    </div>
  )
}

/** Shared list-and-detail view for both form inboxes. */
function Inbox({
  table,
  title,
  empty,
}: {
  table: 'enquiries' | 'applications'
  title: string
  empty: string
}) {
  const [records, setRecords] = useState<InboxRecord[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error: loadError } = await requireSupabase()
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })

    if (loadError) setError(loadError.message)
    else setRecords((data as InboxRecord[]) ?? [])
    setLoading(false)
  }, [table])

  useEffect(() => {
    setSelectedId(null)
    load()
  }, [load])

  const setStatus = async (id: string, status: Status) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, status } : record,
      ),
    )

    const { error: updateError } = await requireSupabase()
      .from(table)
      .update({ status })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      load()
    }
  }

  const selected = records.find((record) => record.id === selectedId) ?? null

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        <p className="text-sm">
          {records.filter((record) => record.status === 'new').length} new of{' '}
          {records.length}
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-6 border-l-2 border-orange bg-white p-4 text-sm">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ul className="self-start border-t border-hairline bg-white">
          {loading && (
            <li className="p-6 text-sm text-body">Loading…</li>
          )}

          {!loading && records.length === 0 && (
            <li className="p-6 text-sm text-body">{empty}</li>
          )}

          {records.map((record) => (
            <li key={record.id} className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setSelectedId(record.id)}
                className={`flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-fog ${
                  record.id === selectedId ? 'bg-fog' : ''
                }`}
              >
                <div>
                  <p className="font-display text-base font-bold text-ink">
                    {record.name}
                  </p>
                  <p className="mt-1 text-sm">
                    {isEnquiry(record)
                      ? (record.company ?? record.email)
                      : record.role_title}
                  </p>
                  <p className="mt-2 text-xs text-concrete">
                    {when(record.created_at)}
                  </p>
                </div>
                <StatusPill status={record.status} />
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <div className="bg-white p-6 lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-ink">
                {selected.name}
              </h2>
              <a
                href={`mailto:${selected.email}`}
                className="link-wipe font-display text-sm font-semibold text-ink"
              >
                Reply by email
              </a>
            </div>

            <p className="mt-1 text-xs text-concrete">
              {when(selected.created_at)}
            </p>

            <div className="mt-6">
              {isEnquiry(selected) ? (
                <>
                  <Field label="Email" value={selected.email} />
                  {selected.company && (
                    <Field label="Company" value={selected.company} />
                  )}
                  {selected.phone && (
                    <Field label="Phone" value={selected.phone} />
                  )}
                  {selected.discipline && (
                    <Field label="Discipline" value={selected.discipline} />
                  )}
                  <Field label="Scope" value={selected.scope} />
                </>
              ) : (
                <>
                  <Field label="Role" value={selected.role_title} />
                  <Field label="Email" value={selected.email} />
                  <Field label="Experience" value={selected.experience} />
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setStatus(selected.id, status.value)}
                  className={`index-num border px-3 py-2 uppercase transition-colors ${
                    selected.status === status.value
                      ? 'border-black bg-black text-white'
                      : 'border-hairline text-body hover:border-black hover:text-ink'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminEnquiries() {
  return (
    <Inbox
      table="enquiries"
      title="Enquiries"
      empty="No enquiries yet. Submissions from the contact form land here."
    />
  )
}

export function AdminApplications() {
  return (
    <Inbox
      table="applications"
      title="Applications"
      empty="No applications yet. Submissions from the careers page land here."
    />
  )
}
