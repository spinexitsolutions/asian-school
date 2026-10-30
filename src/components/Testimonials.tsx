'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { CaretLeft, CaretRight, Quotes, Star } from '@phosphor-icons/react'

type Item = { quote: string; name: string; relation?: string | null; photo?: string | null }

/** Horizontal card slider with snap scrolling; arrows scroll one card at a time. */
export function Testimonials({ items }: { items: Item[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = () => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8)
  }

  useEffect(update, [])

  const scroll = (d: number) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('article')
    el.scrollBy({ left: d * ((card?.clientWidth ?? 360) + 20), behavior: 'smooth' })
  }

  return (
    <div>
      <div ref={track} onScroll={update} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6">
        {items.map((t, i) => (
          <article key={i} className="card card-hover relative w-[86%] shrink-0 snap-start p-7 sm:w-[420px]" data-reveal style={{ ['--d' as string]: `${Math.min(i, 3) * 90}ms` }}>
            <Quotes size={44} weight="fill" className="text-brand-100" />
            <div className="mt-2 flex gap-0.5 text-flame-500">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={16} weight="fill" />
              ))}
            </div>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">“{t.quote}”</p>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 font-heading text-lg font-bold text-white">{t.name.charAt(0)}</span>
              <div>
                <p className="font-semibold">{t.name}</p>
                {t.relation && <p className="text-[13px] text-mute">{t.relation}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-3">
        {[
          { d: -1, Icon: CaretLeft, label: 'Previous', disabled: atStart },
          { d: 1, Icon: CaretRight, label: 'Next', disabled: atEnd },
        ].map(({ d, Icon, label, disabled }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={() => scroll(d)}
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-all duration-300',
              disabled ? 'text-mute/50 ring-line' : 'bg-brand-600 text-white ring-brand-600 hover:bg-brand-700',
            )}
          >
            <Icon size={18} weight="bold" />
          </button>
        ))}
      </div>
    </div>
  )
}
