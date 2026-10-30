'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const KEY = 'ais-intro-seen'

/**
 * Opening animation: logo and school name on navy, a three-colour loader,
 * then the curtain lifts. Plays once per browser session.
 * An inline script in the layout hides it before paint for repeat views.
 */
export function Intro({ schoolName, logoUrl }: { schoolName: string; logoUrl: string }) {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')
  // Read the "already seen" flag once, even if React runs this effect twice.
  const seenRef = useRef<boolean | null>(null)

  useEffect(() => {
    if (seenRef.current === null) {
      try {
        seenRef.current = Boolean(sessionStorage.getItem(KEY))
        sessionStorage.setItem(KEY, '1')
      } catch {
        seenRef.current = false
      }
    }
    if (seenRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done')
      return
    }
    document.documentElement.classList.add('intro-playing')
    const t1 = setTimeout(() => setPhase('out'), 1700)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.documentElement.classList.remove('intro-playing')
      window.dispatchEvent(new Event('intro:done'))
    }, 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.documentElement.classList.remove('intro-playing')
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={clsx(
        'intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-brand-950 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]',
        phase === 'out' && '-translate-y-full',
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-600/40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-flame-400/20 blur-[100px]" />
      <div className={clsx('relative flex flex-col items-center px-6 text-center transition-opacity duration-500', phase === 'out' && 'opacity-0')}>
        <span className="intro-logo flex h-28 w-28 items-center justify-center rounded-full bg-white p-2 shadow-[0_0_0_10px_rgba(255,255,255,0.06)] sm:h-32 sm:w-32">
          <Image src={logoUrl} alt="" width={120} height={120} priority className="rounded-full object-contain" />
        </span>
        <p className="intro-line mt-7 text-[11px] font-bold uppercase tracking-[0.35em] text-flame-400" style={{ animationDelay: '350ms' }}>
          Welcome to
        </p>
        <p className="intro-line mt-2 font-heading text-[clamp(1.4rem,4vw,2.4rem)] font-bold uppercase leading-tight text-white" style={{ animationDelay: '500ms' }}>
          {schoolName}
        </p>
        <p className="intro-line mt-2 text-[14px] text-white/60" style={{ animationDelay: '650ms' }}>
          Chomu, Jaipur · CBSE Affiliated
        </p>
        <div className="mt-8 flex h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <span className="intro-bar h-full bg-brand-500" style={{ animationDelay: '600ms' }} />
          <span className="intro-bar h-full bg-laurel-500" style={{ animationDelay: '900ms' }} />
          <span className="intro-bar h-full bg-flame-400" style={{ animationDelay: '1150ms' }} />
        </div>
      </div>
    </div>
  )
}
