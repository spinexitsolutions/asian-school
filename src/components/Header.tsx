'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  ArrowRight,
  CaretDown,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  List,
  Phone,
  X,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'

import { navItems } from './nav-links'

type Props = {
  schoolName: string
  location?: string | null
  logoUrl: string
  phone?: string | null
  altPhone?: string | null
  email?: string | null
  topbarText?: string | null
  socials: { facebook?: string | null; instagram?: string | null; youtube?: string | null; x?: string | null }
}

const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`

export function Header({ schoolName, location, logoUrl, phone, altPhone, email, topbarText, socials }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('lenis-stopped', open)
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const socialLinks = [
    { href: socials.facebook, Icon: FacebookLogo, label: 'Facebook' },
    { href: socials.youtube, Icon: YoutubeLogo, label: 'YouTube' },
    { href: socials.instagram, Icon: InstagramLogo, label: 'Instagram' },
    { href: socials.x, Icon: XLogo, label: 'X' },
  ]

  return (
    <>
      {/* ─────────── Top bar ─────────── */}
      <div className="relative z-50 hidden bg-brand-900 text-white md:block">
        <div className="container-x flex h-11 items-center justify-between gap-6 text-[13px]">
          <p className="flex items-center gap-2 font-semibold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame-400" />
            {topbarText}
          </p>
          <div className="flex items-center gap-5 text-white/85">
            {phone && (
              <a href={tel(phone)} className="flex items-center gap-1.5 hover:text-flame-400">
                <Phone size={15} weight="fill" className="text-flame-400" /> {phone}
              </a>
            )}
            {altPhone && (
              <a href={tel(altPhone)} className="hidden hover:text-flame-400 lg:inline">
                {altPhone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="hidden items-center gap-1.5 hover:text-flame-400 lg:flex">
                <EnvelopeSimple size={15} weight="fill" className="text-flame-400" /> {email}
              </a>
            )}
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href || '#'}
                  target={href ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-flame-400 hover:text-brand-950"
                >
                  <Icon size={14} weight="fill" />
                </a>
              ))}
            </div>
            <Link href="/admissions#enquiry" className="rounded-full bg-laurel-600 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-laurel-500">
              Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────── Brand row ─────────── */}
      <div className="relative z-40 bg-white">
        <div className="container-x flex h-[84px] items-center justify-between gap-4 md:h-[104px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 md:gap-4" aria-label={`${schoolName} – Home`}>
            <Image src={logoUrl} alt={`${schoolName} logo`} width={88} height={88} priority className="h-14 w-14 shrink-0 object-contain md:h-[78px] md:w-[78px]" />
            <span className="min-w-0 leading-tight">
              <span className="block font-heading text-[15px] font-bold uppercase text-brand-800 sm:text-[19px] md:text-[24px]">{schoolName}</span>
              {location && <span className="mt-0.5 block truncate text-[12px] text-mute sm:text-[14px]">{location}</span>}
              <span className="mt-1 hidden text-[12.5px] font-semibold text-laurel-600 md:block">CBSE Affiliated · English Medium · Nursery to XII</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            {phone && (
              <a href={tel(phone)} className="hidden items-center gap-3 lg:flex">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Phone size={22} weight="fill" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[12px] text-mute">Call for admission</span>
                  <span className="block font-heading text-[16px] font-semibold text-ink">{phone}</span>
                </span>
              </a>
            )}
            <Link href="/admissions" className="btn btn-red ml-3 hidden !px-6 !py-3.5 sm:inline-flex">
              Apply Now <ArrowRight size={16} weight="bold" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white xl:hidden"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────── Navigation bar (sticky) ─────────── */}
      <header
        className={clsx(
          'sticky top-0 z-40 hidden bg-brand-700 text-white transition-shadow duration-500 xl:block',
          scrolled && 'shadow-[0_10px_30px_-12px_rgba(7,22,58,0.6)]',
        )}
      >
        <div className="container-x flex h-[58px] items-center justify-between">
          <Link
            href="/"
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
            className={clsx(
              'flex items-center overflow-hidden transition-all duration-500 ease-[var(--ease-spring)]',
              scrolled ? 'mr-4 w-11 opacity-100' : 'w-0 opacity-0',
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
              <Image src={logoUrl} alt="" width={40} height={40} className="rounded-full object-contain" />
            </span>
          </Link>
          <nav aria-label="Main" className="flex-1">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={clsx(
                      'relative flex h-[58px] items-center gap-1 px-3.5 text-[15px] font-semibold transition-colors',
                      isActive(item.href) ? 'bg-brand-900/40 text-flame-400' : 'text-white/90 hover:bg-brand-900/30 hover:text-white',
                    )}
                  >
                    {item.label}
                    {item.children && <CaretDown size={12} weight="bold" className="transition-transform duration-300 group-hover:rotate-180" />}
                    <span
                      className={clsx(
                        'absolute inset-x-0 bottom-0 h-[3px] origin-left bg-flame-400 transition-transform duration-500 ease-[var(--ease-spring)]',
                        isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full z-10 w-64 translate-y-2 opacity-0 transition-all duration-300 ease-[var(--ease-spring)] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-b-2xl border-t-[3px] border-flame-400 bg-white p-2 shadow-[var(--shadow-lift)]">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="group/item flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] font-medium text-ink-2 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            >
                              {c.label}
                              <ArrowRight size={14} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/admissions#enquiry"
            className={clsx('btn btn-gold !px-5 !py-2.5 !text-[14px] transition-opacity duration-500', scrolled ? 'opacity-100' : 'pointer-events-none opacity-0')}
            tabIndex={scrolled ? 0 : -1}
          >
            Enquire Now
          </Link>
        </div>
      </header>

      {/* ─────────── Mobile drawer ─────────── */}
      <div
        className={clsx('fixed inset-0 z-50 overflow-hidden xl:hidden', open ? 'visible' : 'invisible')}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={clsx('absolute inset-0 bg-brand-950/50 backdrop-blur-sm transition-opacity duration-500', open ? 'opacity-100' : 'opacity-0')}
        />
        <aside
          className={clsx(
            'absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[var(--ease-spring)]',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Image src={logoUrl} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-soft">
              <X size={20} weight="bold" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            <ul>
              {navItems.map((item, i) => (
                <li
                  key={item.label}
                  className={clsx('transition-all duration-500 ease-[var(--ease-out-expo)]', open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0')}
                  style={{ transitionDelay: open ? `${80 + i * 35}ms` : '0ms' }}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-semibold text-ink"
                        aria-expanded={expanded === item.label}
                      >
                        {item.label}
                        <CaretDown size={16} className={clsx('transition-transform duration-300', expanded === item.label && 'rotate-180')} />
                      </button>
                      <div className={clsx('grid transition-[grid-template-rows] duration-500 ease-[var(--ease-spring)]', expanded === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                        <ul className="overflow-hidden pl-4">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} tabIndex={open && expanded === item.label ? 0 : -1} className="block rounded-lg px-4 py-2.5 text-[15px] text-ink-2 hover:text-brand-600">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      className={clsx('block rounded-xl px-4 py-3 text-[16px] font-semibold', isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink')}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-line p-5">
            <Link href="/admissions" tabIndex={open ? 0 : -1} className="btn btn-primary w-full">
              Apply Now <ArrowRight size={16} weight="bold" />
            </Link>
            {phone && (
              <a href={tel(phone)} tabIndex={open ? 0 : -1} className="btn btn-outline w-full">
                <Phone size={16} weight="fill" /> {phone}
              </a>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}
