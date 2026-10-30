import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DownloadSimple, MagnifyingGlass, Plus } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

import { fieldsOf, getCollection, type Field } from '@/cms/schema'
import { AdminIcon } from '@/components/admin/AdminIcon'
import { RowActions, StatusSelect } from '@/components/admin/RowActions'
import { requireUser } from '@/lib/auth'
import { findMany } from '@/lib/db'

type Args = { params: Promise<{ slug: string }>; searchParams: Promise<{ q?: string; page?: string }> }

const PER_PAGE = 20

export async function generateMetadata({ params }: Args) {
  return { title: getCollection((await params).slug)?.label ?? 'Not found' }
}

function display(field: Field | undefined, value: unknown) {
  if (value == null || value === '') return <span className="text-mute/60">—</span>
  if (!field) return new Date(String(value)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  switch (field.type) {
    case 'checkbox':
      return value ? <span className="a-badge bg-leaf-50 text-leaf-500">Yes</span> : <span className="text-mute/60">—</span>
    case 'select':
      return <span className="a-badge bg-brand-50 text-brand-700">{field.options.find((o) => o.value === value)?.label ?? String(value)}</span>
    case 'date':
      return new Date(String(value)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    default:
      return String(value)
  }
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default async function ListPage({ params, searchParams }: Args) {
  const { slug } = await params
  const def = getCollection(slug)
  if (!def) notFound()
  const user = await requireUser(def.adminOnly ? 'admin' : undefined)
  const { q = '', page = '1' } = await searchParams
  const current = Math.max(1, Number(page) || 1)

  const filter = q.trim() ? { $or: def.searchFields.map((f) => ({ [f]: { $regex: escapeRegex(q.trim()), $options: 'i' } })) } : {}
  const { docs, total } = await findMany<Record<string, unknown>>(slug, { filter, sort: def.sort, limit: PER_PAGE, skip: (current - 1) * PER_PAGE })
  const pages = Math.max(1, Math.ceil(total / PER_PAGE))
  const fields = fieldsOf(def)
  const fieldByName = (n: string) => fields.find((f) => f.name === n)
  const label = (n: string) => (n === 'createdAt' ? 'Received' : fieldByName(n)?.label ?? n)
  const canDelete = slug === 'enquiries' || slug === 'applications' ? user.role === 'admin' : true
  const thumbField = fields.find((f) => f.type === 'image' || f.type === 'gallery')

  const pageHref = (p: number) => `?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
            <AdminIcon name={def.icon} size={24} />
          </span>
          <div>
            <h1 className="text-2xl font-bold">{def.label}</h1>
            <p className="text-[13.5px] text-mute">{def.description ?? `${total} item${total === 1 ? '' : 's'}`}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {slug === 'enquiries' && (
            <a href="/api/admin/export" className="a-btn a-btn-ghost">
              <DownloadSimple size={16} /> Download Excel
            </a>
          )}
          {!def.noCreate && (
            <Link href={`/admin/collections/${slug}/new`} className="a-btn a-btn-primary">
              <Plus size={16} weight="bold" /> Add {def.singular.toLowerCase()}
            </Link>
          )}
        </div>
      </div>

      <form className="relative max-w-md" role="search">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
        <input name="q" defaultValue={q} placeholder={`Search ${def.label.toLowerCase()}…`} className="a-input !pl-10" />
      </form>

      <div className="a-card overflow-hidden">
        {docs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <AdminIcon name={def.icon} size={40} className="text-brand-200" />
            <p className="font-semibold">{q ? 'Nothing matches your search.' : `No ${def.label.toLowerCase()} yet.`}</p>
            {!def.noCreate && !q && (
              <Link href={`/admin/collections/${slug}/new`} className="a-btn a-btn-primary mt-1">
                <Plus size={16} weight="bold" /> Add the first one
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="bg-soft text-[12px] uppercase tracking-wide text-mute">
                <tr>
                  {def.columns.map((c) => (
                    <th key={c} className="px-5 py-3 font-semibold">
                      {label(c)}
                    </th>
                  ))}
                  <th className="w-24 px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {docs.map((d) => {
                  const href = `/admin/collections/${slug}/${d.id}`
                  const thumbVal = thumbField ? d[thumbField.name] : null
                  const thumb = Array.isArray(thumbVal) ? thumbVal[0] : thumbVal
                  return (
                    <tr key={String(d.id)} className="group hover:bg-soft/60">
                      {def.columns.map((c, i) => (
                        <td key={c} className={clsx('px-5 py-3', i === 0 && 'font-semibold')}>
                          {slug === 'enquiries' && c === 'status' ? (
                            <StatusSelect id={String(d.id)} value={String(d.status ?? 'new')} />
                          ) : i === 0 ? (
                            <Link href={href} className="flex items-center gap-3 hover:text-brand-600">
                              {thumb && typeof thumb === 'object' && 'url' in thumb && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={(thumb as { thumb?: string; url: string }).thumb || (thumb as { url: string }).url} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                              )}
                              <span className="line-clamp-2">{String(d[c] ?? '(untitled)')}</span>
                            </Link>
                          ) : (
                            display(c === 'createdAt' ? undefined : fieldByName(c), d[c])
                          )}
                        </td>
                      ))}
                      <td className="px-5 py-3">
                        <RowActions slug={slug} id={String(d.id)} editHref={href} canDelete={canDelete && !(slug === 'users' && d.id === user.id)} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <nav className="flex items-center justify-between text-[14px]" aria-label="Pagination">
          <span className="text-mute">
            Page {current} of {pages} · {total} items
          </span>
          <div className="flex gap-2">
            {current > 1 && (
              <Link href={pageHref(current - 1)} className="a-btn a-btn-ghost !py-2">
                Previous
              </Link>
            )}
            {current < pages && (
              <Link href={pageHref(current + 1)} className="a-btn a-btn-ghost !py-2">
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
