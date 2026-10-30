import { currentUser } from '@/lib/auth'
import { findMany } from '@/lib/db'
import type { Media } from '@/cms/types'

/** Media library for the image picker. ?type=image|file&page=1 */
export async function GET(request: Request) {
  if (!(await currentUser())) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
  const type = url.searchParams.get('type')
  const filter = type === 'image' ? { type: { $regex: '^image/' } } : type === 'file' ? { type: { $not: { $regex: '^image/' } } } : {}
  const res = await findMany<Media & { id: string }>('media', { filter, limit: 48, skip: (page - 1) * 48, sort: { createdAt: -1 } })
  return Response.json({ items: res.docs, total: res.total, page })
}
