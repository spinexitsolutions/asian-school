'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ArrowUpRight, Phone } from '@phosphor-icons/react'

import { Crest } from './Crest'
import { menuGroups, primaryLinks } from './nav-links'

type Props = {
  schoolName: string
  location?: string | null
  logoUrl?: string | null
  phone?: string | null
  hasAnnouncement: boolean
}

export function Nav({ schoolName, location, logoUrl, phone, hasAnnouncement }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    // Passive scroll listener only toggles one boolean; no layout reads.
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open)
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  let i = 0

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 z-40 flex justify-center px-3 transition-[top] duration-700 ease-[var(--ease-spring)] sm:px-6',
          scrolled || !hasAnnouncement ? 'top-3 sm:top-4' : 'top-12 sm:top-14',
        )}
      >
        <nav
          aria-label="Main"
          className={clsx(
            'flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-700 ease-[var(--ease-spring)]',
            open
              ? 'bg-transparent'
              : scrolled
                ? 'bg-white/80 shadow-[0_10px_40px_-12px_rgba(14,26,51,0.18)] ring-1 ring-ink/[0.06] backdrop-blur-xl'
                : 'bg-white/60 ring-1 ring-ink/[0.05] backdrop-blur-md',
          )}
        >
          <Link href="/" className="relative z-10 flex items-center gap-3" aria-label={`${schoolName} home`}>
            {logoUrl ? (
              <Image src={logoUrl} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            ) : (
              <Crest size={44} />
            )}
            <span className="leading-none">
              <span className={clsx('block font-display text-[19px] tracking-[-0.02em] transition-colors', open ? 'text-white' : 'text-ink')}>
                {schoolName}
              </span>
              {location && (
                <span className={clsx('mt-1 block font-mono text-[9.5px] uppercase tracking-[0.24em]', open ? 'text-white/50' : 'text-mute')}>
                  {location}
                </span>
              )}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={clsx(
                    'relative rounded-full px-4 py-2 text-[14px] tracking-[-0.01em] transition-colors duration-300',
                    pathname.startsWith(l.href) ? 'text-ink' : 'text-ink-2 hover:text-ink',
                    open && 'pointer-events-none opacity-0',
                  )}
                >
                  {l.label}
                  {pathname.startsWith(l.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" aria-hidden />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/admissions"
              className={clsx(
                'group hidden items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-[14px] font-medium text-white transition-all duration-500 ease-[var(--ease-spring)] active:scale-[0.98] sm:inline-flex',
                open && 'pointer-events-none opacity-0',
              )}
            >
              Admissions
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gold-2 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight size={14} weight="light" />
              </span>
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={clsx(
                'relative h-11 w-11 rounded-full transition-colors duration-500',
                open ? 'bg-white/10 ring-1 ring-white/20' : 'bg-ink/[0.05] ring-1 ring-ink/[0.07] hover:bg-ink/[0.08]',
              )}
            >
              <span
                className={clsx(
                  'absolute left-1/2 top-1/2 h-px w-[18px] -translate-x-1/2 transition-transform duration-500 ease-[var(--ease-spring)]',
                  open ? 'rotate-45 bg-white' : '-translate-y-[4px] bg-ink',
                )}
              />
              <span
                className={clsx(
                  'absolute left-1/2 top-1/2 h-px -translate-x-1/2 transition-all duration-500 ease-[var(--ease-spring)]',
                  open ? 'w-[18px] -rotate-45 bg-white' : 'w-[12px] translate-x-[-3px] translate-y-[4px] bg-ink',
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu */}
      <div
        className={clsx(
          'fixed inset-0 z-30 overflow-y-auto bg-ink/[0.97] backdrop-blur-3xl transition-[opacity,visibility] duration-700 ease-[var(--ease-spring)]',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold/20 blur-[120px]" />
        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1180px] flex-col justify-between px-6 pb-10 pt-32">
          <div className="grid gap-12 md:grid-cols-3">
            {menuGroups.map((g) => (
              <div key={g.title}>
                <p className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.24em] text-gold-2">{g.title}</p>
                <ul className="space-y-1">
                  {g.links.map((l) => {
                    const d = 80 + i++ * 45
                    return (
                      <li key={l.href} className="overflow-hidden">
                        <Link
                          href={l.href}
                          tabIndex={open ? 0 : -1}
                          style={{ transitionDelay: open ? `${d}ms` : '0ms' }}
                          className={clsx(
                            'group flex items-center gap-3 py-1.5 font-display text-[2rem] leading-tight tracking-[-0.03em] text-white transition-all duration-[900ms] ease-[var(--ease-out-expo)] md:text-[2.4rem]',
                            open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
                          )}
                        >
                          <span className="transition-colors duration-300 group-hover:text-gold-2 group-hover:italic">
                            {l.label}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div
            className={clsx(
              'mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-white/70 transition-all delay-500 duration-700 sm:flex-row sm:items-center sm:justify-between',
              open ? 'opacity-100' : 'opacity-0',
            )}
          >
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-3 hover:text-white">
                <Phone size={18} weight="light" /> {phone}
              </a>
            )}
            <Link
              href="/admissions"
              tabIndex={open ? 0 : -1}
              className="group inline-flex w-max items-center gap-3 rounded-full bg-gold py-1.5 pl-6 pr-1.5 text-white"
            >
              Apply for admission
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
