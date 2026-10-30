import Link from 'next/link'
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr'

import { AdminIcon } from '@/components/admin/AdminIcon'
import { requireUser } from '@/lib/auth'
import { count, findMany } from '@/lib/db'

export const metadata = { title: 'Dashboard' }

const quick = [
  { href: '/admin/collections/notices/new', label: 'Post a notice', icon: 'megaphone', tone: 'bg-brand-600' },
  { href: '/admin/collections/news/new', label: 'Add news / event', icon: 'newspaper', tone: 'bg-laurel-600' },
  { href: '/admin/collections/gallery/new', label: 'New gallery album', icon: 'images', tone: 'bg-flame-500' },
  { href: '/admin/collections/toppers/new', label: 'Add a topper', icon: 'medal', tone: 'bg-leaf-500' },
  { href: '/admin/globals/home-page', label: 'Edit homepage', icon: 'house', tone: 'bg-brand-800' },
  { href: '/admin/globals/site-settings', label: 'Contact & popup', icon: 'gear', tone: 'bg-ink-2' },
]

const statusTone: Record<string, string> = {
  new: 'bg-laurel-50 text-laurel-600',
  contacted: 'bg-brand-50 text-brand-700',
  visit: 'bg-flame-100 text-flame-500',
  admitted: 'bg-leaf-50 text-leaf-500',
  closed: 'bg-soft text-mute',
}

export default async function Dashboard() {
  const user = await requireUser()
  const [enquiries, newEnquiries, notices, news, albums, toppers, recent] = await Promise.all([
    count('enquiries'),
    count('enquiries', { status: 'new' }),
    count('notices'),
    count('news'),
    count('gallery'),
    count('toppers'),
    findMany<Record<string, string>>('enquiries', { limit: 6, sort: { createdAt: -1 } }),
  ])

  const stats = [
    { label: 'New enquiries', value: newEnquiries, icon: 'tray', href: '/admin/collections/enquiries', tone: 'text-laurel-600 bg-laurel-50' },
    { label: 'Total enquiries', value: enquiries, icon: 'tray', href: '/admin/collections/enquiries', tone: 'text-brand-600 bg-brand-50' },
    { label: 'Notices', value: notices, icon: 'megaphone', href: '/admin/collections/notices', tone: 'text-flame-500 bg-flame-100' },
    { label: 'News & events', value: news, icon: 'newspaper', href: '/admin/collections/news', tone: 'text-leaf-500 bg-leaf-50' },
    { label: 'Gallery albums', value: albums, icon: 'images', href: '/admin/collections/gallery', tone: 'text-brand-700 bg-brand-100' },
    { label: 'Achievers', value: toppers, icon: 'medal', href: '/admin/collections/toppers', tone: 'text-flame-500 bg-flame-100' },
  ]

  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 p-7 text-white sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-flame-400/25 blur-3xl" />
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-flame-400">Namaste 🙏</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          {greet}, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-2 max-w-xl text-white/75">What would you like to update today? All changes go live on the website instantly.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quick.map((q) => (
            <Link key={q.href} href={q.href} className="group rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/15">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${q.tone} text-white`}>
                <AdminIcon name={q.icon} size={20} />
              </span>
              <span className="mt-3 block text-[13.5px] font-semibold leading-snug">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="a-card p-5 transition hover:-translate-y-0.5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <AdminIcon name={s.icon} size={20} />
            </span>
            <p className="mt-4 font-heading text-3xl font-bold">{s.value}</p>
            <p className="text-[13px] text-mute">{s.label}</p>
          </Link>
        ))}
      </section>

      <section className="a-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
          <h2 className="text-lg font-bold">Latest enquiries</h2>
          <div className="flex gap-2">
            <a href="/api/admin/export" className="a-btn a-btn-ghost !py-2">
              <DownloadSimple size={16} /> Excel
            </a>
            <Link href="/admin/collections/enquiries" className="a-btn a-btn-primary !py-2">
              View all <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
        {recent.docs.length === 0 ? (
          <p className="px-6 py-12 text-center text-mute">No enquiries yet. Website form submissions will appear here.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.docs.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/collections/enquiries/${e.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3.5 hover:bg-soft/60">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-heading font-bold text-brand-600">{e.studentName?.charAt(0)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{e.studentName}</span>
                    <span className="block truncate text-[13px] text-mute">
                      {e.classApplying || e.type} · {e.phone}
                    </span>
                  </span>
                  <span className={`a-badge capitalize ${statusTone[e.status] ?? statusTone.new}`}>{e.status || 'new'}</span>
                  <span className="w-28 text-right text-[12.5px] text-mute">{new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
