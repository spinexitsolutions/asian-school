import Link from 'next/link'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

import { PageBanner } from '@/components/PageBanner'
import { Photo } from '@/components/Photo'
import { getNews } from '@/lib/data'
import { formatDate } from '@/lib/format'
import type { Media } from '@/cms/types'

export const metadata = { title: 'News & Events' }

const filters = [
  { key: '', label: 'All' },
  { key: 'news', label: 'News' },
  { key: 'event', label: 'Events' },
  { key: 'achievement', label: 'Achievements' },
]

type Args = { searchParams: Promise<{ type?: string; page?: string }> }

export default async function NewsPage({ searchParams }: Args) {
  const { type = '', page = '1' } = await searchParams
  const category = filters.some((f) => f.key === type) ? type : ''
  const res = await getNews({ limit: 9, category: category || undefined, page: Math.max(1, Number(page) || 1) })

  return (
    <>
      <PageBanner title="News & Events" crumbs={[{ label: 'Notices', href: '/notices' }]} intro="Stories, events and achievements from our school community." />
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
            {filters.map((f) => (
              <Link
                key={f.key}
                href={f.key ? `/news?type=${f.key}` : '/news'}
                className={clsx('rounded-full px-5 py-2.5 text-[14px] font-semibold ring-1 transition-colors', category === f.key ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-2 ring-line hover:text-brand-600')}
              >
                {f.label}
              </Link>
            ))}
          </div>
          {res.docs.length === 0 ? (
            <p className="card mx-auto max-w-xl p-10 text-center text-mute">No posts yet. Please check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {res.docs.map((n, i) => (
                <Link key={n.id} href={`/news/${n.slug}`} className="card card-hover group block overflow-hidden" data-reveal style={{ ['--d' as string]: `${(i % 3) * 80}ms` }}>
                  <Photo media={n.cover as Media} size="card" label={n.category} className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" sizes="(min-width:1024px) 33vw, 50vw" />
                  <div className="p-6">
                    <p className="flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-laurel-600">
                      <CalendarBlank size={14} weight="bold" /> {formatDate(n.date)} · {n.category}
                    </p>
                    <h2 className="mt-2 font-heading text-[18px] font-semibold leading-snug group-hover:text-brand-600">{n.title}</h2>
                    {n.excerpt && <p className="mt-2 line-clamp-3 text-[14.5px] text-ink-2">{n.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {res.totalPages > 1 && (
            <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
              {Array.from({ length: res.totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={`/news?${new URLSearchParams({ ...(category ? { type: category } : {}), page: String(i + 1) })}`}
                  className={clsx('flex h-11 w-11 items-center justify-center rounded-full font-semibold ring-1', res.page === i + 1 ? 'bg-brand-600 text-white ring-brand-600' : 'ring-line hover:text-brand-600')}
                >
                  {i + 1}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
