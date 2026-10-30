import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowRight, CheckCircle, Medal } from '@phosphor-icons/react/dist/ssr'

export type HeroTopper = { name: string; score: string; className: string; photo?: string | null }

type Props = {
  schoolName: string
  logoUrl: string
  established?: string | null
  title: string
  points: string[]
  stats: { value: string; label: string }[]
  toppers: HeroTopper[]
  resultsYear?: string | null
  backgroundUrl: string
  /** True while showing sample toppers (none chosen in the admin panel yet). */
  placeholder?: boolean
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
export function Hero({ schoolName, logoUrl, established, title, points, stats, toppers, resultsYear, backgroundUrl, placeholder }: Props) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="dots-bg pointer-events-none absolute -left-10 top-10 h-60 w-72 opacity-70 [mask-image:radial-gradient(black,transparent_70%)]" />

      {/* Slanted campus photo, kept inside the page container so the layout stays centred */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="container-x relative h-full">
          <div className="absolute inset-y-6 right-4 w-[58%] overflow-hidden rounded-r-[2rem] sm:right-6">
            <div className="absolute inset-0 bg-flame-400 [clip-path:polygon(17%_0,100%_0,100%_100%,0_100%)]" />
            <div className="absolute inset-0 bg-laurel-500 [clip-path:polygon(18.6%_0,100%_0,100%_100%,1.6%_100%)]" />
            <div className="absolute inset-0 bg-brand-700 [clip-path:polygon(20%_0,100%_0,100%_100%,3%_100%)]">
              <Image src={backgroundUrl} alt="" fill priority sizes="56vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-10 py-12 lg:min-h-[660px] lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-5">
          <span className="label-pill" data-reveal>
            CBSE Affiliated · Est. {established || '2010'}
          </span>
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

        <div className="relative z-10 flex flex-col gap-5 lg:col-span-6 lg:col-start-7 lg:h-full lg:justify-end">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] lg:hidden" data-reveal="zoom">
            <Image src={backgroundUrl} alt={`${schoolName} campus`} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="rounded-[2rem] bg-brand-800 p-5 text-white shadow-2xl ring-1 ring-white/15 sm:p-6 lg:ml-auto lg:mr-6 lg:w-[86%] lg:bg-brand-950/75 lg:backdrop-blur-md" data-reveal="zoom">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-heading text-[18px] font-semibold">
                <Medal size={24} weight="fill" className="text-flame-400" /> Board Toppers
              </p>
              {resultsYear && <span className="rounded-full bg-flame-400 px-3 py-1 text-[12px] font-bold text-brand-950">{resultsYear}</span>}
            </div>
            <div className={`mt-5 grid gap-4 ${toppers.length === 1 ? 'grid-cols-1' : toppers.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {toppers.slice(0, 3).map((t, i) => (
                <div key={`${t.name}-${i}`} className={`text-center ${''}`}>
                  <div className="relative mx-auto aspect-square w-full max-w-[104px]">
                    <div className="absolute -inset-1 rounded-full bg-[conic-gradient(var(--color-flame-400),var(--color-laurel-500),var(--color-flame-400))]" />
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-brand-50 ring-4 ring-brand-800">
                      {t.photo ? (
                        <Image src={t.photo} alt={t.name} fill sizes="140px" className="object-cover object-top" />
                      ) : (
                        <div className="dots-bg flex h-full w-full items-center justify-center">
                          <Image src={logoUrl} alt="" width={44} height={44} className="opacity-30 mix-blend-multiply grayscale" />
                        </div>
                      )}
                    </div>
                    {i === 0 && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-flame-400 px-2 py-0.5 text-[11px] font-bold text-brand-950">#1</span>
                    )}
                  </div>
                  <p className="mt-3 font-heading text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold text-flame-400">{t.score}</p>
                  <p className="text-[13px] font-semibold leading-tight">{t.name}</p>
                  <p className="mt-0.5 text-[12px] text-white/60">{t.className}</p>
                </div>
              ))}
            </div>
            {placeholder ? (
              <p className="mt-5 rounded-2xl bg-white/10 px-4 py-2.5 text-center text-[12.5px] text-white/75">
                Toppers&apos; photos &amp; results are updated from the admin panel every year.
              </p>
            ) : (
              <Link
                href="/achievers"
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-[14px] font-semibold text-white/90 transition-colors hover:bg-white/15"
              >
                View all achievers <ArrowRight size={14} weight="bold" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
