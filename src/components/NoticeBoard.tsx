'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { ArrowRight, FilePdf } from '@phosphor-icons/react'

export type NoticeItem = { id: string; title: string; date: string; category?: string | null; details?: string | null; fileUrl?: string | null }

const tabs = [
  { key: 'all', label: 'Latest' },
  { key: 'general', label: 'Notice' },
  { key: 'admissions', label: 'Admission' },
  { key: 'exams', label: 'Exams/Results' },
  { key: 'holidays', label: 'Holidays' },
]

export function NoticeBoard({ notices }: { notices: NoticeItem[] }) {
  const [tab, setTab] = useState('all')
  const list = (tab === 'all' ? notices : notices.filter((n) => n.category === tab)).slice(0, 6)

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between bg-brand-600 px-6 py-4 text-white">
        <h3 className="text-[19px] font-bold">Notice Board</h3>
        <Link href="/notices" className="inline-flex items-center gap-1 text-[13px] font-semibold text-white/85 hover:text-white">
          View all <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 pt-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={clsx(
              'relative shrink-0 px-3 pb-3 pt-1 text-[13.5px] font-semibold transition-colors',
              tab === t.key ? 'text-brand-600' : 'text-mute hover:text-ink',
            )}
          >
            {t.label}
            <span className={clsx('absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-brand-600 transition-transform duration-300', tab === t.key ? 'scale-x-100' : 'scale-x-0')} />
          </button>
        ))}
      </div>
      <ul className="max-h-[400px] flex-1 divide-y divide-line overflow-y-auto">
        {list.length === 0 && <li className="px-6 py-12 text-center text-[14px] text-mute">No notices in this category yet.</li>}
        {list.map((n) => {
          const d = new Date(n.date)
          return (
            <li key={n.id} className="group flex gap-4 px-6 py-4 transition-colors hover:bg-brand-50/60">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
                <span className="text-[18px] font-bold leading-none">{d.getDate().toString().padStart(2, '0')}</span>
                <span className="mt-1 text-[10.5px] font-semibold uppercase">{d.toLocaleString('en-IN', { month: 'short' })}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold leading-snug text-ink group-hover:text-brand-700">{n.title}</p>
                {n.details && <p className="mt-1 line-clamp-2 text-[13.5px] text-mute">{n.details}</p>}
                {n.fileUrl && (
                  <a href={n.fileUrl} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-laurel-600 hover:underline">
                    <FilePdf size={15} weight="fill" /> Download
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
