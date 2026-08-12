import { useState } from 'react'
import { ChevronDown, Minus, Plus } from './Icon'

export type AccordionItem = {
  id: string
  title: string
  body: string
}

type AccordionProps = {
  items: AccordionItem[]
  /** `solid` fills the open header navy (home page); `outline` keeps it light. */
  variant?: 'solid' | 'outline'
  /** Toggle affordance. Defaults to `plus` for solid, `chevron` for outline. */
  icon?: 'plus' | 'chevron'
  /** Item open on first render. Pass null to start fully collapsed. */
  defaultOpenId?: string | null
  className?: string
}

export function Accordion({
  items,
  variant = 'solid',
  icon = variant === 'solid' ? 'plus' : 'chevron',
  defaultOpenId = items[0]?.id ?? null,
  className = '',
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)
  const isSolid = variant === 'solid'

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `accordion-panel-${item.id}`

        const headerClass = isSolid
          ? isOpen
            ? 'bg-navy text-white'
            : 'border border-line bg-surface text-ink hover:bg-surface-muted'
          : 'border border-line bg-surface text-ink hover:bg-surface-muted'

        return (
          <div key={item.id} id={item.id} className="scroll-mt-32">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={`flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-display text-sm font-bold transition-colors ${headerClass}`}
              >
                {item.title}
                {icon === 'plus' ? (
                  isOpen ? (
                    <Minus className="size-4 shrink-0" />
                  ) : (
                    <Plus className="size-4 shrink-0" />
                  )
                ) : (
                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </button>
            </h3>

            {isOpen && (
              <div id={panelId} className="px-5 py-4">
                <p className="text-sm leading-relaxed text-body">{item.body}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
