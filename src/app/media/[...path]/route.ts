import { readFile, stat } from 'fs/promises'
import path from 'path'

import { UPLOAD_DIR } from '@/lib/storage'

const types: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

/** Serves files uploaded from the admin panel (local storage mode). */
export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path
  const file = path.resolve(/*turbopackIgnore: true*/ UPLOAD_DIR, ...parts)
  if (!file.startsWith(UPLOAD_DIR + path.sep)) return new Response('Not found', { status: 404 })
  try {
    await stat(file)
    const body = await readFile(file)
    return new Response(body, {
      headers: {
        'content-type': types[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
