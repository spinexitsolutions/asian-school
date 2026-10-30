import Image from 'next/image'
import Link from 'next/link'
import { CaretRight, Clock, EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, XLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr'

import { telHref } from '@/lib/format'
import { footerGroups, visibleLinks } from './nav-links'

type Settings = {
  schoolName: string
  tagline?: string | null
  address?: string | null
  phone?: string | null
  altPhone?: string | null
  email?: string | null
  officeHours?: string | null
  affiliation?: string | null
  established?: string | null
  mapEmbedUrl?: string | null
  facebook?: string | null
  instagram?: string | null
  youtube?: string | null
  x?: string | null
}

export function Footer({ s, logoUrl, hidden = [] }: { s: Settings; logoUrl: string; hidden?: string[] }) {
  const socials = [
    { href: s.facebook, Icon: FacebookLogo, label: 'Facebook' },
    { href: s.youtube, Icon: YoutubeLogo, label: 'YouTube' },
    { href: s.instagram, Icon: InstagramLogo, label: 'Instagram' },
    { href: s.x, Icon: XLogo, label: 'X' },
  ]

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white print:hidden">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,var(--color-brand-500)_0_60%,var(--color-laurel-500)_60%_85%,var(--color-flame-400)_85%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-1">
              <Image src={logoUrl} alt="" width={60} height={60} className="h-full w-full rounded-full object-contain" />
            </span>
            <div>
              <p className="font-heading text-[17px] font-bold leading-tight">{s.schoolName}</p>
              <p className="mt-1 text-[12.5px] text-flame-400">
                {s.affiliation}
                {s.established && ` · Est. ${s.established}`}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/65">
            CBSE English Medium School committed to academic excellence, innovation and holistic development.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href || '#'}
                target={href ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-flame-400 hover:text-brand-950"
              >
                <Icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((g) => (
          <div key={g.title} className="lg:col-span-2">
            <h3 className="text-[16px] font-semibold">{g.title}</h3>
            <span className="mt-3 block h-[3px] w-10 rounded-full bg-flame-400" />
            <ul className="mt-5 space-y-2.5">
              {visibleLinks(g.links, hidden).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-[14.5px] text-white/70 transition-colors hover:text-flame-400">
                    <CaretRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-4">
          <h3 className="text-[16px] font-semibold">Contact Us</h3>
          <span className="mt-3 block h-[3px] w-10 rounded-full bg-flame-400" />
          <ul className="mt-5 space-y-4 text-[14.5px] text-white/75">
            {s.address && (
              <li className="flex gap-3">
                <MapPin size={20} weight="fill" className="mt-0.5 shrink-0 text-flame-400" />
                {s.address}
              </li>
            )}
            {s.phone && (
              <li className="flex gap-3">
                <Phone size={20} weight="fill" className="mt-0.5 shrink-0 text-flame-400" />
                <span>
                  <a href={telHref(s.phone)} className="hover:text-white">
                    {s.phone}
                  </a>
                  {s.altPhone && (
                    <>
                      {' | '}
                      <a href={telHref(s.altPhone)} className="hover:text-white">
                        {s.altPhone}
                      </a>
                    </>
                  )}
                </span>
              </li>
            )}
            {s.email && (
              <li className="flex gap-3">
                <EnvelopeSimple size={20} weight="fill" className="mt-0.5 shrink-0 text-flame-400" />
                <a href={`mailto:${s.email}`} className="hover:text-white">
                  {s.email}
                </a>
              </li>
            )}
            {s.officeHours && (
              <li className="flex gap-3">
                <Clock size={20} weight="fill" className="mt-0.5 shrink-0 text-flame-400" />
                {s.officeHours}
              </li>
            )}
          </ul>
          <Link href="/admissions" className="btn btn-gold mt-7">
            Apply Now
          </Link>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {s.schoolName}, Chomu. All Rights Reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            {!hidden.includes('/mandatory-disclosure') && (
              <Link href="/mandatory-disclosure" className="hover:text-white">
                Mandatory Disclosure
              </Link>
            )}
            <Link href="/admin" className="hover:text-white">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
