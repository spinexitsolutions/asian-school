import { notFound } from 'next/navigation'

import { getGlobal } from '@/cms/schema'
import { DocForm } from '@/components/admin/DocForm'
import { globalDefaults } from '@/content/defaults'
import { requireUser } from '@/lib/auth'
import { getGlobalDoc } from '@/lib/db'

type Args = { params: Promise<{ slug: string }> }

const preview: Record<string, string> = {
  'home-page': '/',
  'about-page': '/about',
  'academics-page': '/academics',
  'admissions-page': '/admissions',
  disclosure: '/mandatory-disclosure',
  'transport-page': '/transport',
  'school-info': '/school-info',
  'site-settings': '/',
  'site-pages': '/',
}

export async function generateMetadata({ params }: Args) {
  return { title: getGlobal((await params).slug)?.label ?? 'Not found' }
}

export default async function GlobalPage({ params }: Args) {
  const { slug } = await params
  const def = getGlobal(slug)
  if (!def) notFound()
  await requireUser()
  // Never saved yet → start from the text currently shown on the website.
  const saved = await getGlobalDoc<Record<string, unknown>>(slug)
  const initial = { ...(globalDefaults[slug] ?? {}), ...(saved ?? {}) }
  return (
    <DocForm kind="global" slug={slug} sections={def.sections} initial={initial} title={def.label} description={def.description} previewHref={preview[slug]} />
  )
}
