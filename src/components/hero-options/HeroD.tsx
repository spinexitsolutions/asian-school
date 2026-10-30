import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Medal } from '@phosphor-icons/react/dist/ssr'

import { fallbackImages } from '@/content/defaults'
import type { HeroProps } from './types'

const toppers = [
  { name: 'Topper Name', score: '96.2%', cls: 'XII Science' },
  { name: 'Topper Name', score: '95.4%', cls: 'XII Commerce' },
  { name: 'Topper Name', score: '95.0%', cls: 'X' },
]

/** D — Diagonal blue panel with an achievements spotlight (results season hero). */
export function HeroD({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-y-0 right-0 hidden w-[56%] bg-brand-700 [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[56%] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block">
        <Image src={fallbackImages.campus} alt="" fill sizes="56vw" className="object-cover opacity-20 mix-blend-luminosity" />
      </div>
      <div className="absolute right-[44%] top-0 hidden h-full w-3 -skew-x-[10deg] bg-flame-400 lg:block" />
      <div className="absolute right-[45.5%] top-0 hidden h-full w-1.5 -skew-x-[10deg] bg-laurel-500 lg:block" />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <span className="label-pill" data-reveal>
            Results 2025–26
          </span>
          <h1 className="mt-6 font-heading text-[clamp(2.4rem,4.8vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Proud of our <span className="text-brand-600">achievers</span>, ready for <span className="text-laurel-600">yours.</span>
          </h1>
          <ul className="mt-7 space-y-3" data-reveal style={{ ['--d' as string]: '160ms' }}>
            {['100% CBSE board results', 'Science, Arts & Commerce up to XII', 'Smart classes & experienced faculty'].map((x) => (
              <li key={x} className="flex items-center gap-3 text-[16px] font-medium text-ink-2">
                <CheckCircle size={22} weight="fill" className="text-leaf-500" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ['--d' as string]: '240ms' }}>
            <Link href="/admissions" className="btn btn-red !px-7 !py-4">
              Admission Enquiry <ArrowRight size={18} weight="bold" />
            </Link>
            <Link href="/achievers" className="btn btn-outline !px-7 !py-4">
              All Results
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3" data-reveal style={{ ['--d' as string]: '320ms' }}>
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="rounded-2xl bg-soft p-4 ring-1 ring-line">
                <p className="font-heading text-2xl font-bold text-brand-700">{s.value}</p>
                <p className="text-[12px] text-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2rem] bg-brand-800 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 lg:bg-white/5 lg:backdrop-blur-md" data-reveal="zoom">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-heading text-[18px] font-semibold">
                <Medal size={24} weight="fill" className="text-flame-400" /> Board Toppers
              </p>
              <span className="rounded-full bg-flame-400 px-3 py-1 text-[12px] font-bold text-brand-950">2025–26</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {toppers.map((t, i) => (
                <div key={i} className={`text-center ${i === 0 ? '-mt-2' : 'mt-4'}`}>
                  <div className="relative mx-auto aspect-square w-full max-w-[140px]">
                    <div className="absolute -inset-1 rounded-full bg-[conic-gradient(var(--color-flame-400),var(--color-laurel-500),var(--color-flame-400))]" />
                    <div className="dots-bg relative flex h-full w-full items-center justify-center rounded-full bg-brand-50 ring-4 ring-brand-800">
                      <Image src="/images/logo.png" alt="" width={56} height={56} className="opacity-30 mix-blend-multiply grayscale" />
                    </div>
                    {i === 0 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-flame-400 px-2 py-0.5 text-[11px] font-bold text-brand-950">#1</span>}
                  </div>
                  <p className="mt-4 font-heading text-[clamp(1.2rem,2vw,1.7rem)] font-bold text-flame-400">{t.score}</p>
                  <p className="text-[13px] font-semibold">{t.name}</p>
                  <p className="text-[12px] text-white/60">{t.cls}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-center text-[13.5px] text-white/80">
              Toppers&apos; photos & results are updated from the admin panel every year.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
