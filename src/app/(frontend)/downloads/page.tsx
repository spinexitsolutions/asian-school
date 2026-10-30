import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, Books, BookOpenText, CalendarBlank, ClipboardText, DownloadSimple, FilePdf, Megaphone, TShirt, Folder } from '@phosphor-icons/react/dist/ssr'

import { PageBanner } from '@/components/PageBanner'
import { getDownloads, getSettings } from '@/lib/data'
import { formatDate, telHref } from '@/lib/format'
import { fileUrl } from '@/lib/media'

export const metadata = { title: 'Downloads', description: 'Syllabus, book lists, uniform list, holiday list and forms.' }

const categories = [
  { key: 'syllabus', label: 'Syllabus', Icon: BookOpenText, tone: 'bg-brand-600' },
  { key: 'books', label: 'Book Lists', Icon: Books, tone: 'bg-laurel-600' },
  { key: 'uniform', label: 'Uniform', Icon: TShirt, tone: 'bg-flame-500' },
  { key: 'holidays', label: 'Holidays & Calendar', Icon: CalendarBlank, tone: 'bg-leaf-600' },
  { key: 'forms', label: 'Forms', Icon: ClipboardText, tone: 'bg-brand-800' },
  { key: 'circulars', label: 'Circulars', Icon: Megaphone, tone: 'bg-laurel-700' },
  { key: 'other', label: 'Other', Icon: Folder, tone: 'bg-ink-2' },
]

type Args = { searchParams: Promise<{ type?: string }> }

export default async function DownloadsPage({ searchParams }: Args) {
  const { type = '' } = await searchParams
  const [{ docs }, s] = await Promise.all([getDownloads(), getSettings()])
  const used = categories.filter((c) => docs.some((d) => (d.category ?? 'other') === c.key))
  const shown = type ? docs.filter((d) => (d.category ?? 'other') === type) : docs

  return (
    <>
      <PageBanner title="Downloads" intro="Syllabus, book lists, uniform details, holiday list and forms — all in one place." />
      <section className="py-14 md:py-20">
        <div className="container-x max-w-5xl">
          <div className="mb-8 flex flex-wrap gap-2" data-reveal>
            <Link href="/downloads" className={clsx('rounded-full px-4 py-2 text-[14px] font-semibold ring-1', !type ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-2 ring-line hover:text-brand-600')}>
              All
            </Link>
            {used.map((c) => (
              <Link
                key={c.key}
                href={`/downloads?type=${c.key}`}
                className={clsx('rounded-full px-4 py-2 text-[14px] font-semibold ring-1', type === c.key ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-2 ring-line hover:text-brand-600')}
              >
                {c.label}
              </Link>
            ))}
          </div>

          <ul className="space-y-3">
            {shown.map((d, i) => {
              const cat = categories.find((c) => c.key === (d.category ?? 'other')) ?? categories[6]
              const href = fileUrl(d.file) || d.link || null
              const isFile = Boolean(fileUrl(d.file))
              return (
                <li key={d.id} className="card card-hover flex flex-wrap items-center gap-4 p-4 sm:p-5" data-reveal style={{ ['--d' as string]: `${Math.min(i, 6) * 50}ms` }}>
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${cat.tone} text-white`}>
                    <cat.Icon size={24} weight="duotone" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-[16.5px] font-semibold leading-snug">{d.title}</p>
                    <p className="text-[13px] text-mute">
                      {cat.label}
                      {d.classes && ` · ${d.classes}`}
                      {d.date && ` · ${formatDate(d.date)}`}
                    </p>
                  </div>
                  {href ? (
                    <a href={href} target={isFile ? '_blank' : undefined} rel="noreferrer" className={clsx('btn !py-2.5', isFile ? 'btn-red' : 'btn-primary')}>
                      {isFile ? (
                        <>
                          <FilePdf size={18} weight="fill" /> Download
                        </>
                      ) : (
                        <>
                          Open <ArrowRight size={16} weight="bold" />
                        </>
                      )}
                    </a>
                  ) : (
                    <span className="rounded-full bg-flame-50 px-4 py-2 text-[13px] font-semibold text-flame-600 ring-1 ring-flame-400/30">Available at school office</span>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:flex-row sm:items-center" data-reveal>
            <p className="flex items-center gap-3 text-[15px] text-ink-2">
              <DownloadSimple size={24} weight="duotone" className="shrink-0 text-brand-600" /> Can’t find a document? Contact the school office and we will share it.
            </p>
            {s.phone && (
              <a href={telHref(s.phone)} className="btn btn-outline">
                Call {s.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
