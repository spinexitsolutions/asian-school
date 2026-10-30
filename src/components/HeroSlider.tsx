'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { ArrowRight, CaretLeft, CaretRight, Trophy } from '@phosphor-icons/react'

import { Stars } from './Stars'

export type Slide = {
  src: string
  alt: string
  bannerOnly?: boolean | null
  badge?: string | null
  title?: string | null
  text?: string | null
  buttonLabel?: string | null
  buttonLink?: string | null
}

type Props = {
  slides: Slide[]
  stats: { value: string; label: string }[]
  schoolName: string
  logoUrl: string
  established?: string | null
}

export function HeroSlider({ slides, stats, schoolName, logoUrl, established }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length

  const go = useCallback((d: number) => setActive((a) => (a + d + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const t = setTimeout(() => go(1), 6500)
    return () => clearTimeout(t)
  }, [active, paused, count, go])

  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative min-h-[620px] md:min-h-[680px] lg:h-[calc(100dvh-170px)] lg:max-h-[820px]">
        {slides.map((s, i) => {
          const on = i === active
          return (
            <div
              key={i}
              aria-hidden={!on}
              className={clsx('absolute inset-0 transition-opacity duration-[1200ms] ease-[var(--ease-out-expo)]', on ? 'z-10 opacity-100' : 'z-0 opacity-0')}
            >
              {s.bannerOnly ? (
                <>
                  <Image src={s.src} alt="" fill sizes="100vw" className="scale-110 object-cover opacity-40 blur-2xl" />
                  <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-contain" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className={clsx('object-cover', on && 'kenburns')} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/20" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-950/70 to-transparent" />
                  <div className="container-x relative flex h-full items-center py-16">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-12">
                      <div className="text-white lg:col-span-7">
                        {s.badge && (
                          <span
                            className={clsx('inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-700 transition-all duration-700', on ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}
                            style={{ transitionDelay: on ? '200ms' : '0ms' }}
                          >
                            <span className="h-2 w-2 rounded-full bg-laurel-500" />
                            {s.badge}
                          </span>
                        )}
                        {s.title && (
                          <h1
                            className={clsx('heading-xl mt-6 max-w-[15ch] !text-[clamp(2.4rem,5.6vw,4.6rem)] transition-all duration-1000 ease-[var(--ease-out-expo)]', on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}
                            style={{ transitionDelay: on ? '320ms' : '0ms' }}
                          >
                            <Stars text={s.title} />
                          </h1>
                        )}
                        {s.text && (
                          <p
                            className={clsx('mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 transition-all duration-1000 ease-[var(--ease-out-expo)]', on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}
                            style={{ transitionDelay: on ? '440ms' : '0ms' }}
                          >
                            {s.text}
                          </p>
                        )}
                        <div
                          className={clsx('mt-9 flex flex-wrap gap-3 transition-all duration-1000 ease-[var(--ease-out-expo)]', on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}
                          style={{ transitionDelay: on ? '560ms' : '0ms' }}
                        >
                          {s.buttonLabel && s.buttonLink && (
                            <Link href={s.buttonLink} tabIndex={on ? 0 : -1} className="btn btn-primary !px-7 !py-4">
                              {s.buttonLabel} <ArrowRight size={18} weight="bold" />
                            </Link>
                          )}
                          <Link href="/about" tabIndex={on ? 0 : -1} className="btn btn-glass !px-7 !py-4">
                            Explore Our School
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {/* Floating stats card (desktop) */}
        {!slides[active]?.bannerOnly && (
          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            <div className="container-x flex h-full items-center justify-end">
              <div className="pointer-events-auto w-[360px] rounded-3xl bg-white/10 p-5 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-xl" data-reveal="right">
                <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-0.5">
                    <Image src={logoUrl} alt="" width={44} height={44} className="rounded-full object-contain" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-[15px] font-semibold">{schoolName}</p>
                    <p className="text-[12px] text-white/65">Excellence since {established || '2010'}</p>
                  </div>
                  <span className="rounded-md bg-white/15 px-2 py-1 text-[10.5px] font-bold tracking-wider">CBSE</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {stats.slice(0, 4).map((st) => (
                    <div key={st.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                      <p className="font-heading text-2xl font-bold">{st.value}</p>
                      <p className="mt-0.5 text-[12px] text-white/65">{st.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[13px] ring-1 ring-white/10">
                  <Trophy size={18} weight="fill" className="text-flame-400" /> CBSE English Medium · Nursery to XII
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-emerald-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Admissions Open
                  </span>
                  <Link href="/admissions" className="btn btn-gold !px-4 !py-2.5 !text-[13px]">
                    Apply Now <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {count > 1 && (
          <div className="absolute inset-x-0 bottom-24 z-30 md:bottom-28">
            <div className="container-x flex items-center gap-4">
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={clsx('h-2 rounded-full transition-all duration-500 ease-[var(--ease-spring)]', i === active ? 'w-10 bg-flame-400' : 'w-2 bg-white/50 hover:bg-white')}
                  />
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white hover:text-brand-800">
                  <CaretLeft size={18} weight="bold" />
                </button>
                <button type="button" aria-label="Next slide" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white hover:text-brand-800">
                  <CaretRight size={18} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
