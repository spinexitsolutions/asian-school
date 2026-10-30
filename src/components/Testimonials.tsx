'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

type Item = { quote: string; name: string; relation: string }

export function Testimonials({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), 7000)
    return () => clearTimeout(t)
  }, [active, paused, items.length])

  const go = (d: number) => setActive((a) => (a + d + items.length) % items.length)

  return (
    <div
      className="grid gap-10 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-reveal
    >
      <div className="relative min-h-[260px] lg:col-span-9 md:min-h-[230px]">
        {items.map((item, i) => (
          <figure
            key={i}
            aria-hidden={i !== active}
            className={clsx(
              'absolute inset-0 transition-all duration-[900ms] ease-[var(--ease-out-expo)]',
              i === active ? 'translate-y-0 opacity-100 blur-0' : 'pointer-events-none translate-y-6 opacity-0 blur-sm',
            )}
          >
            <blockquote className="display text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.2] text-ink">“{item.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft font-display text-lg text-gold">
                {item.name.charAt(0)}
              </span>
              <span>
                <span className="block font-medium">{item.name}</span>
                <span className="block text-[13px] text-mute">{item.relation}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end">
        <p className="font-mono text-[12px] tracking-[0.2em] text-mute">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          {[
            { d: -1, Icon: ArrowLeft, label: 'Previous' },
            { d: 1, Icon: ArrowRight, label: 'Next' },
          ].map(({ d, Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => go(d)}
              className="flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-ink/15 transition-all duration-500 ease-[var(--ease-spring)] hover:bg-ink hover:text-white active:scale-95"
            >
              <Icon size={20} weight="light" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
