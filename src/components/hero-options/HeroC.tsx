import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bell, Phone } from '@phosphor-icons/react/dist/ssr'

import { fallbackImages } from '@/content/defaults'
import type { HeroProps } from './types'

/** C — Framed bento: rounded photo card with text panel, plus notices & admission tiles. */
export function HeroC({ stats, notices, phone }: HeroProps) {
  return (
    <section className="bg-soft py-6 lg:py-8">
      <div className="container-x grid gap-5 lg:grid-cols-12">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] lg:col-span-8 lg:min-h-[640px]" data-reveal="zoom">
          <Image src={fallbackImages.campus} alt="School campus" fill priority sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[12.5px] font-bold uppercase tracking-wide text-brand-700 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-leaf-500" /> CBSE Affiliated · Est. 2010
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-[1.6rem] bg-white p-6 sm:inset-x-6 sm:bottom-6 sm:p-8 lg:right-auto lg:max-w-[600px]">
            <h1 className="font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              Nurturing <span className="text-brand-600">Bright Minds</span> for a <span className="text-laurel-600">Better Tomorrow</span>
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">Quality education, strong values and modern learning — Nursery to Class XII.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn btn-primary">
                Apply for Admission <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/about" className="btn btn-outline">
                Explore
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <div className="card flex flex-col overflow-hidden !rounded-[2rem]" data-reveal="right">
            <div className="flex items-center justify-between px-6 pb-3 pt-5">
              <p className="flex items-center gap-2 font-heading text-[17px] font-semibold">
                <Bell size={20} weight="fill" className="text-laurel-600" /> Latest Notices
              </p>
              <Link href="/notices" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
            <ul className="divide-y divide-line px-6 pb-4">
              {notices.slice(0, 3).map((n) => {
                const d = new Date(n.date)
                return (
                  <li key={n.title} className="flex gap-3 py-3">
                    <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-600 text-white">
                      <span className="text-[14px] font-bold leading-none">{d.getDate()}</span>
                      <span className="text-[9px] font-semibold uppercase">{d.toLocaleString('en-IN', { month: 'short' })}</span>
                    </span>
                    <p className="text-[14px] font-medium leading-snug text-ink">{n.title}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 p-6 text-white" data-reveal="right" style={{ ['--d' as string]: '100ms' }}>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-flame-400/30 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 p-4">
                  <p className="font-heading text-2xl font-bold">{s.value}</p>
                  <p className="text-[12px] text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="relative mt-4 flex items-center justify-between rounded-2xl bg-flame-400 px-5 py-4 font-semibold text-brand-950">
                <span className="flex items-center gap-2">
                  <Phone size={18} weight="fill" /> {phone}
                </span>
                <ArrowRight size={16} weight="bold" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
