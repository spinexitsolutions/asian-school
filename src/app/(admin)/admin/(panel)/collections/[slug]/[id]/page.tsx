import { notFound } from 'next/navigation'

import { getCollection } from '@/cms/schema'
import { DocForm } from '@/components/admin/DocForm'
import { requireUser } from '@/lib/auth'
import { findById } from '@/lib/db'

type Args = { params: Promise<{ slug: string; id: string }> }

const previewPath: Record<string, (d: Record<string, unknown>) => string> = {
  news: (d) => `/news/${d.slug}`,
  applications: (d) => `/admissions/application/${d.applicationNo}?t=${d.token}`,
  downloads: () => '/downloads',
  gallery: (d) => `/gallery/${d.slug}`,
  pages: (d) => `/${d.slug}`,
  notices: () => '/notices',
  toppers: () => '/achievers',
  faculty: () => '/faculty',
  facilities: () => '/facilities',
  careers: () => '/careers',
}

export default async function EditDocPage({ params }: Args) {
  const { slug, id } = await params
  const def = getCollection(slug)
  if (!def) notFound()
  const user = await requireUser(def.adminOnly ? 'admin' : undefined)
  const doc = await findById<Record<string, unknown>>(slug, id)
  if (!doc) notFound()
  return (
    <DocForm
      kind="collection"
      slug={slug}
      id={id}
      sections={def.sections}
      initial={doc}
      title={String(doc[def.titleField] || def.singular)}
      backHref={`/admin/collections/${slug}`}
      canDelete={(!['enquiries', 'applications'].includes(slug) || user.role === 'admin') && !(slug === 'users' && id === user.id)}
      previewHref={previewPath[slug]?.(doc)}
    />
  )
}
