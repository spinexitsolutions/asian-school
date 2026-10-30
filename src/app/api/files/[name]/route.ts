import { readFile } from 'fs/promises'
import path from 'path'

import { currentUser } from '@/lib/auth'
import { findOne } from '@/lib/db'
import { PRIVATE_DIR } from '@/lib/storage'

const DOC_FIELDS = ['photo', 'birthCertificate', 'reportCard', 'transferCertificate', 'aadhaarCard']

/** Private application documents: staff, or the parent with the application link (?t=token). */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  if (!/^[a-f0-9]{32}\.(webp|pdf)$/.test(name)) return new Response('Not found', { status: 404 })
  const url = `/api/files/${name}`

  let allowed = Boolean(await currentUser())
  if (!allowed) {
    const token = new URL(request.url).searchParams.get('t')
    if (token && /^[a-f0-9]{32}$/.test(token)) {
      const app = await findOne<Record<string, { url?: string } | null>>('applications', { token })
      allowed = Boolean(app && DOC_FIELDS.some((f) => app[f]?.url === url))
    }
  }
  if (!allowed) return new Response('Not found', { status: 404 })

  try {
    const body = await readFile(path.join(/*turbopackIgnore: true*/ PRIVATE_DIR, name))
    return new Response(body, {
      headers: {
        'content-type': name.endsWith('.pdf') ? 'application/pdf' : 'image/webp',
        'cache-control': 'private, no-store',
        'x-robots-tag': 'noindex',
      },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
