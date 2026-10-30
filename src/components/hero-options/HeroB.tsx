import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Megaphone } from '@phosphor-icons/react/dist/ssr'

import { fallbackImages } from '@/content/defaults'
import type { HeroProps } from './types'

/** B — Cinematic full-bleed photo, centred headline, stats dock and notice ticker. */
export function HeroB({ stats, notices }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <div className="absolute inset-0">
        <Image src={fallbackImages.campus} alt="School campus" fill priority sizes="100vw" className="kenburns object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,22,58,0.55)_0%,rgba(7,22,58,0.88)_75%)]" />
      <div className="container-x relative flex min-h-[640px] flex-col items-center justify-center pb-44 pt-24 text-center lg:min-h-[720px]">
        <span className="label-pill label-pill--light" data-reveal>
          Admissions Open 2027–28
        </span>
        <h1 className="mt-7 max-w-4xl font-heading text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.035em]" data-reveal style={{ ['--d' as string]: '100ms' }}>
          Shaping <span className="text-flame-400">Bright Futures</span> in the Heart of Chomu
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/80" data-reveal style={{ ['--d' as string]: '200ms' }}>
          CBSE affiliated · English medium · Nursery to XII · Science, Arts &amp; Commerce
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal style={{ ['--d' as string]: '300ms' }}>
          <Link href="/admissions" className="btn btn-gold !px-8 !py-4">
            Apply Now <ArrowRight size={18} weight="bold" />
          </Link>
          <Link href="/contact" className="btn btn-glass !px-8 !py-4">
            Book a Campus Visit
          </Link>
        </div>
      </div>

      {/* Stats dock */}
      <div className="absolute inset-x-0 bottom-14 z-10">
        <div className="container-x">
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur-xl md:grid-cols-4" data-reveal>
            {stats.map((s, i) => (
              <div key={s.label} className={`px-6 py-5 text-center ${i > 0 ? 'md:border-l md:border-white/15' : ''}`}>
                <p className="font-heading text-3xl font-bold">{s.value}</p>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.12em] text-white/65">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-11 items-center bg-laurel-600">
        <span className="relative z-10 flex h-full items-center gap-2 bg-laurel-700 px-5 text-[13px] font-bold uppercase tracking-wide">
          <Megaphone size={16} weight="fill" /> Notices
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0" aria-hidden={k === 1}>
                {notices.map((n) => (
                  <li key={n.title} className="flex items-center gap-3 whitespace-nowrap px-8 text-[14px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-flame-400" /> {n.title}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
