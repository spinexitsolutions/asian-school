'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'

type Item = { src: string; thumb: string; alt: string; width: number; height: number }

export function LightboxGrid({ items }: { items: Item[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const close = useCallback(() => setIndex(null), [])
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, go])

  const current = index !== null ? items[index] : null

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {items.map((it, i) => (
          <button
            key={it.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-brand-50"
            data-reveal="zoom"
            style={{ ['--d' as string]: `${(i % 4) * 60}ms` }}
          >
            <Image src={it.thumb} alt={it.alt} width={it.width} height={it.height} sizes="(min-width:1024px) 25vw, 50vw" className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
            <span className="absolute inset-0 bg-brand-950/0 transition-colors duration-500 group-hover:bg-brand-950/20" />
          </button>
        ))}
      </div>

      {current && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/95 p-4" onClick={close}>
          <button type="button" aria-label="Close" onClick={close} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X size={22} weight="bold" />
          </button>
          {items.length > 1 && (
            <>
              <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1) }} className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6">
                <CaretLeft size={22} weight="bold" />
              </button>
              <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1) }} className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6">
                <CaretRight size={22} weight="bold" />
              </button>
            </>
          )}
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[13px] text-white/70">
            {index! + 1} / {items.length}
          </p>
        </div>
      )}
    </>
  )
}
