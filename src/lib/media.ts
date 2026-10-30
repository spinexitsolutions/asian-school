import type { FileRef, Media } from '@/cms/types'

type Upload = Media | FileRef | null | undefined

/** Resolve an uploaded image to something renderable (size 'thumb'/'card' → small version). */
export function img(upload: Upload | unknown, size?: 'thumb' | 'card') {
  if (!upload || typeof upload !== 'object' || !('url' in upload) || !upload.url) return null
  const m = upload as Media
  const url = size && m.thumb ? m.thumb : m.url
  const small = Boolean(size && m.thumb)
  const ratio = m.width && m.height ? m.height / m.width : 0.66
  return {
    url,
    alt: m.alt ?? '',
    width: small ? 640 : m.width || 1600,
    height: small ? Math.round(640 * ratio) : m.height || 1060,
    focal: undefined as string | undefined,
  }
}

export function fileUrl(upload: Upload | unknown) {
  if (!upload || typeof upload !== 'object' || !('url' in upload)) return null
  return (upload as FileRef).url || null
}
