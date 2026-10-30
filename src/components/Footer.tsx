import Link from 'next/link'
import { ArrowUpRight, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'

import { telHref } from '@/lib/format'
import { menuGroups } from './nav-links'

type Settings = {
  schoolName: string
  tagline?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  affiliation?: string | null
  facebook?: string | null
  instagram?: string | null
  youtube?: string | null
  x?: string | null
}

export function Footer({ s }: { s: Settings }) {
  const socials = [
    { label: 'Instagram', href: s.instagram },
    { label: 'Facebook', href: s.facebook },
    { label: 'YouTube', href: s.youtube },
    { label: 'X', href: s.x },
  ].filter((x) => x.href)

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1280px] px-5 pb-10 pt-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow eyebrow--dark">Visit us</p>
            <p className="mt-6 max-w-sm font-display text-3xl leading-[1.1] tracking-[-0.02em]">
              {s.tagline || 'Rooted in values. Ready for the world.'}
            </p>
            <ul className="mt-8 space-y-4 text-[15px] text-white/70">
              {s.address && (
                <li className="flex gap-3">
                  <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-gold-2" />
                  <span className="whitespace-pre-line">{s.address}</span>
                </li>
              )}
              {s.phone && (
                <li className="flex gap-3">
                  <Phone size={20} weight="light" className="mt-0.5 shrink-0 text-gold-2" />
                  <a href={telHref(s.phone)} className="hover:text-white">
                    {s.phone}
                  </a>
                </li>
              )}
              {s.email && (
                <li className="flex gap-3">
                  <EnvelopeSimple size={20} weight="light" className="mt-0.5 shrink-0 text-gold-2" />
                  <a href={`mailto:${s.email}`} className="hover:text-white">
                    {s.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {menuGroups.map((g) => (
              <div key={g.title}>
                <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">{g.title}</p>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-gold-2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 select-none overflow-hidden" aria-hidden>
          <p className="display whitespace-nowrap text-[17vw] leading-[0.8] text-white/[0.06] lg:text-[15.5vw] xl:text-[200px]">
            The Asian <em className="!text-gold/30">School</em>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {s.schoolName}, Chomu. {s.affiliation}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {socials.map((x) => (
              <a key={x.label} href={x.href!} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                {x.label} <ArrowUpRight size={12} weight="light" />
              </a>
            ))}
            <Link href="/admin" className="hover:text-white">
              Staff login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
