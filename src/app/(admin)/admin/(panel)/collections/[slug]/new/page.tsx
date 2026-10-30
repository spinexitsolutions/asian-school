import { notFound } from 'next/navigation'

import { getCollection } from '@/cms/schema'
import { DocForm } from '@/components/admin/DocForm'
import { requireUser } from '@/lib/auth'

type Args = { params: Promise<{ slug: string }> }

const initialFor = (slug: string): Record<string, unknown> => {
  const today = new Date().toISOString()
  switch (slug) {
    case 'notices':
      return { date: today, category: 'general' }
    case 'news':
      return { date: today, category: 'news', status: 'published' }
    case 'gallery':
      return { date: today, category: 'events', photos: [] }
    case 'downloads':
      return { date: today, category: 'syllabus' }
    case 'careers':
      return { open: true, type: 'full-time' }
    case 'pages':
      return { status: 'published' }
    case 'toppers':
      return { featured: true, year: `${new Date().getFullYear() - 1}–${String(new Date().getFullYear()).slice(2)}` }
    case 'users':
      return { role: 'editor' }
    default:
      return {}
  }
}

export default async function NewDocPage({ params }: Args) {
  const { slug } = await params
  const def = getCollection(slug)
  if (!def || def.noCreate) notFound()
  await requireUser(def.adminOnly ? 'admin' : undefined)
  return (
    <DocForm
      kind="collection"
      slug={slug}
      id={null}
      sections={def.sections}
      initial={initialFor(slug)}
      title={`New ${def.singular.toLowerCase()}`}
      backHref={`/admin/collections/${slug}`}
      canDelete={false}
    />
  )
}
