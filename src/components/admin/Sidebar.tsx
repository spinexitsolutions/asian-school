'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ArrowSquareOut, List, SignOut, X } from '@phosphor-icons/react'

import { logout } from '@/app/(admin)/admin/actions'
import { AdminIcon } from './AdminIcon'

export type NavGroup = { title: string; items: { href: string; label: string; icon: string; badge?: number }[] }

export function Sidebar({ groups, user }: { groups: NavGroup[]; user: { name: string; email: string; role: string } }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft" aria-label="Open menu">
          <List size={20} weight="bold" />
        </button>
        <span className="font-heading text-[15px] font-bold">Admin Panel</span>
        <Image src="/images/logo.png" alt="" width={32} height={32} />
      </header>

      <div className={clsx('fixed inset-0 z-40 bg-brand-950/50 transition-opacity lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setOpen(false)} />

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-brand-950 text-white transition-transform duration-500 ease-[var(--ease-spring)] lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
            <Image src="/images/logo.png" alt="" width={40} height={40} className="rounded-full" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-heading text-[14px] font-bold">The Asian International</p>
            <p className="text-[12px] text-white/55">Admin Panel</p>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto text-white/60 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Admin">
          {groups.map((g) => (
            <div key={g.title} className="mt-4 first:mt-1">
              <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/35">{g.title}</p>
              <ul className="space-y-0.5">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className={clsx(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors',
                        isActive(it.href) ? 'bg-white text-brand-800 shadow-sm' : 'text-white/75 hover:bg-white/8 hover:text-white',
                      )}
                    >
                      <AdminIcon name={it.icon} size={19} className={isActive(it.href) ? 'text-brand-600' : ''} />
                      <span className="flex-1">{it.label}</span>
                      {!!it.badge && <span className="rounded-full bg-laurel-500 px-2 py-0.5 text-[11px] font-bold text-white">{it.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-flame-400 font-heading font-bold text-brand-950">{user.name.charAt(0).toUpperCase()}</span>
            <Link href="/admin/account" className="min-w-0 flex-1 leading-tight hover:opacity-80">
              <p className="truncate text-[14px] font-semibold">{user.name}</p>
              <p className="truncate text-[12px] capitalize text-white/50">{user.role}</p>
            </Link>
            <form action={logout}>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white" aria-label="Log out" title="Log out">
                <SignOut size={18} />
              </button>
            </form>
          </div>
          <a href="/" target="_blank" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white/8 py-2 text-[13px] font-medium text-white/80 hover:bg-white/15">
            View website <ArrowSquareOut size={14} />
          </a>
        </div>
      </aside>
    </>
  )
}
