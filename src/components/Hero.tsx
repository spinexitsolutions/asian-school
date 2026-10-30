import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowRight, CheckCircle, Medal, Phone } from '@phosphor-icons/react/dist/ssr'

import { telHref } from '@/lib/format'

export type HeroTopper = { name: string; score: string; className: string; photo?: string | null }

type Props = {
  schoolName: string
  logoUrl: string
  established?: string | null
  phone?: string | null
  title: string
  points: string[]
  stats: { value: string; label: string }[]
  toppers: HeroTopper[]
  resultsYear?: string | null
  backgroundUrl: string
}

/** "*word*" → blue, "_word_" → red. */
function HeroTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*|_[^_]+_)/g).map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) return <span key={i} className="text-brand-600">{part.slice(1, -1)}</span>
        if (part.startsWith('_') && part.endsWith('_')) return <span key={i} className="text-laurel-600">{part.slice(1, -1)}</span>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

/**
 * Homepage hero: school identity + headline on white, and a slanted blue
 * panel showcasing board toppers (or an admissions card when none are set).
 */
export function Hero({ schoolName, logoUrl, established, phone, title, points, stats, toppers, resultsYear, backgroundUrl }: Props) {
  const slant = '[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]'
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Slanted blue panel (desktop) */}
      <div className={`absolute inset-y-0 right-0 hidden w-[56%] bg-brand-700 lg:block ${slant}`} />
      <div className={`absolute inset-y-0 right-0 hidden w-[56%] lg:block ${slant}`}>
        <Image src={backgroundUrl} alt="" fill priority sizes="56vw" className="object-cover opacity-20 mix-blend-luminosity" />
      </div>
      <div className="absolute right-[44%] top-0 hidden h-full w-3 -skew-x-[10deg] bg-flame-400 lg:block" />
      <div className="absolute right-[45.5%] top-0 hidden h-full w-1.5 -skew-x-[10deg] bg-laurel-500 lg:block" />
      <div className="dots-bg pointer-events-none absolute -left-10 top-10 h-60 w-72 opacity-70 [mask-image:radial-gradient(black,transparent_70%)]" />

      <div className="container-x relative grid items-center gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <div className="hidden items-center gap-4 sm:flex" data-reveal>
            <Image src={logoUrl} alt="" width={84} height={84} priority className="h-[68px] w-[68px] shrink-0 object-contain sm:h-[84px] sm:w-[84px]" />
            <div className="leading-tight">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-laurel-600">Welcome to</p>
              <p className="mt-1 font-heading text-[clamp(1.25rem,2.3vw,1.9rem)] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-brand-700">
                {schoolName}
              </p>
              <p className="mt-1 text-[13.5px] font-medium text-mute">
                Chomu, Jaipur · CBSE Affiliated{established && ` · Est. ${established}`}
              </p>
            </div>
          </div>
          <div className="tri-rule sm:mt-6" aria-hidden data-reveal>
            <span />
            <span />
            <span />
          </div>
          <h1
            className="mt-6 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink"
            data-reveal
            style={{ ['--d' as string]: '80ms' }}
          >
            <HeroTitle text={title} />
          </h1>
          <ul className="mt-6 space-y-2.5" data-reveal style={{ ['--d' as string]: '160ms' }}>
            {points.map((x) => (
              <li key={x} className="flex items-center gap-3 text-[16px] font-medium text-ink-2">
                <CheckCircle size={22} weight="fill" className="shrink-0 text-leaf-500" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal style={{ ['--d' as string]: '240ms' }}>
            <Link href="/admissions#enquiry" className="btn btn-red !px-7 !py-4">
              Admission Enquiry <ArrowRight size={18} weight="bold" />
            </Link>
            <Link href="/achievers" className="btn btn-outline !px-7 !py-4">
              Our Achievers
            </Link>
          </div>
          <div className="mt-10 hidden max-w-md grid-cols-3 gap-3 lg:grid" data-reveal style={{ ['--d' as string]: '320ms' }}>
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="rounded-2xl bg-soft p-4 ring-1 ring-line">
                <p className="font-heading text-2xl font-bold text-brand-700">{s.value}</p>
                <p className="text-[12px] text-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2rem] bg-brand-800 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 lg:bg-brand-900/70 lg:backdrop-blur-md" data-reveal="zoom">
            <p className="mb-5 border-b border-white/10 pb-4 text-center font-heading text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
              {schoolName} · Chomu
            </p>
            {toppers.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-heading text-[18px] font-semibold">
                    <Medal size={24} weight="fill" className="text-flame-400" /> Board Toppers
                  </p>
                  {resultsYear && <span className="rounded-full bg-flame-400 px-3 py-1 text-[12px] font-bold text-brand-950">{resultsYear}</span>}
                </div>
                <div className={`mt-6 grid gap-4 ${toppers.length === 1 ? 'grid-cols-1' : toppers.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {toppers.slice(0, 3).map((t, i) => (
                    <div key={`${t.name}-${i}`} className={`text-center ${toppers.length === 3 ? (i === 0 ? '-mt-2' : 'mt-4') : ''}`}>
                      <div className="relative mx-auto aspect-square w-full max-w-[140px]">
                        <div className="absolute -inset-1 rounded-full bg-[conic-gradient(var(--color-flame-400),var(--color-laurel-500),var(--color-flame-400))]" />
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-brand-50 ring-4 ring-brand-800">
                          {t.photo ? (
                            <Image src={t.photo} alt={t.name} fill sizes="140px" className="object-cover object-top" />
                          ) : (
                            <div className="dots-bg flex h-full w-full items-center justify-center">
                              <span className="font-heading text-4xl font-bold text-brand-300">{t.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        {i === 0 && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-flame-400 px-2 py-0.5 text-[11px] font-bold text-brand-950">#1</span>
                        )}
                      </div>
                      <p className="mt-4 font-heading text-[clamp(1.2rem,2vw,1.7rem)] font-bold text-flame-400">{t.score}</p>
                      <p className="text-[13px] font-semibold leading-tight">{t.name}</p>
                      <p className="mt-0.5 text-[12px] text-white/60">{t.className}</p>
                    </div>
                  ))}
                </div>
                <Link href="/achievers" className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[14px] font-semibold text-white/90 transition-colors hover:bg-white/15">
                  View all achievers <ArrowRight size={14} weight="bold" />
                </Link>
              </>
            ) : (
              <>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image src={backgroundUrl} alt={`${schoolName} campus`} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
                  <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-brand-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-500" /> Admissions Open
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {stats.slice(0, 4).map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white/10 p-4">
                      <p className="font-heading text-2xl font-bold">{s.value}</p>
                      <p className="text-[12px] text-white/65">{s.label}</p>
                    </div>
                  ))}
                </div>
                {phone && (
                  <a href={telHref(phone)} className="mt-4 flex items-center justify-between rounded-2xl bg-flame-400 px-5 py-4 font-semibold text-brand-950">
                    <span className="flex items-center gap-2">
                      <Phone size={18} weight="fill" /> {phone}
                    </span>
                    <ArrowRight size={16} weight="bold" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
