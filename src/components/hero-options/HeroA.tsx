import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Student, Trophy } from '@phosphor-icons/react/dist/ssr'

import { fallbackImages } from '@/content/defaults'
import type { HeroProps } from './types'

/** A — White split: big type on the left, layered photo collage on the right. */
export function HeroA({ stats, established }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="dots-bg pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-flame-100 blur-3xl" />
      <div className="container-x relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <span className="label-pill" data-reveal>
            CBSE Affiliated · Since {established}
          </span>
          <h1 className="mt-6 font-heading text-[clamp(2.6rem,5.4vw,4.8rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Where every child{' '}
            <span className="relative inline-block text-brand-600">
              learns
              <svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full text-flame-400" preserveAspectRatio="none" aria-hidden>
                <path d="M2 14 C 50 4, 150 4, 198 12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            , grows &amp; <span className="text-laurel-600">shines.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[17.5px] leading-relaxed text-ink-2" data-reveal style={{ ['--d' as string]: '160ms' }}>
            Quality CBSE education from Nursery to Class XII in Chomu — with smart classrooms, caring teachers and strong values.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ['--d' as string]: '240ms' }}>
            <Link href="/admissions" className="btn btn-primary !px-7 !py-4">
              Apply for Admission <ArrowRight size={18} weight="bold" />
            </Link>
            <Link href="/about" className="btn btn-outline !px-7 !py-4">
              Explore School
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-5" data-reveal style={{ ['--d' as string]: '320ms' }}>
            <div className="flex -space-x-3">
              {['bg-brand-600', 'bg-laurel-600', 'bg-flame-500', 'bg-leaf-600'].map((c, i) => (
                <span key={c} className={`flex h-11 w-11 items-center justify-center rounded-full ${c} text-white ring-4 ring-white`}>
                  <Student size={20} weight="fill" />
                </span>
              ))}
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-ink">{stats[0]?.value} Students</p>
              <p className="flex items-center gap-1 text-[13px] text-mute">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} weight="fill" className="text-flame-500" />
                ))}
                <span className="ml-1">Trusted by families across Chomu</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6" data-reveal="zoom">
          <div className="relative mx-auto aspect-[5/5.2] max-w-[560px]">
            <div className="absolute right-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-[2.5rem] rounded-tl-[8rem] shadow-[var(--shadow-lift)]">
              <Image src={fallbackImages.campus} alt="School campus" fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[46%] w-[44%] overflow-hidden rounded-[2rem] ring-8 ring-white shadow-[var(--shadow-lift)]">
              <Image src={fallbackImages.director} alt="" fill sizes="260px" className="object-cover object-top" />
            </div>
            <div className="absolute bottom-[14%] right-[4%] rounded-2xl bg-white p-4 shadow-[var(--shadow-lift)] ring-1 ring-line">
              <p className="font-heading text-3xl font-bold text-brand-600">{stats[1]?.value}</p>
              <p className="text-[12.5px] text-mute">{stats[1]?.label}</p>
            </div>
            <div className="absolute left-[6%] top-[14%] flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-[var(--shadow-lift)] ring-1 ring-line">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-flame-400 text-brand-950">
                <Trophy size={22} weight="fill" />
              </span>
              <div>
                <p className="font-heading text-[15px] font-semibold text-ink">{stats[3]?.value} Years</p>
                <p className="text-[12px] text-mute">of excellence</p>
              </div>
            </div>
            <span className="absolute -right-3 -top-3 h-20 w-20 rounded-full border-[10px] border-laurel-500/80" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
