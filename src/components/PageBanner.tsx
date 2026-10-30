import Image from 'next/image'
import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

import { fallbackImages } from '@/content/defaults'

/** Blue banner at the top of every inner page with title and breadcrumb. */
export function PageBanner({
  title,
  intro,
  crumbs = [],
  children,
}: {
  title: string
  intro?: string | null
  crumbs?: { label: string; href?: string }[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <Image src={fallbackImages.campus} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/60" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flame-400/20 blur-3xl" aria-hidden />
      <div className="container-x relative py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/70" data-reveal>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              <CaretRight size={12} />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <CaretRight size={12} />
            <span className="text-flame-400">{title}</span>
          </span>
        </nav>
        <h1 className="heading-xl mt-5 max-w-3xl" data-reveal style={{ ['--d' as string]: '80ms' }}>
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/80" data-reveal style={{ ['--d' as string]: '160ms' }}>
            {intro}
          </p>
        )}
        <div className="tri-rule mt-7" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {children}
      </div>
    </section>
  )
}
