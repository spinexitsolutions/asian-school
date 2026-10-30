import type { Document, Media } from '@/payload-types'

type Upload = Media | Document | string | null | undefined

/** Resolve an upload relation (populated doc or bare id) to something renderable. */
export function img(upload: Upload, size?: 'thumb' | 'card') {
  if (!upload || typeof upload === 'string') return null
  const media = upload as Media
  const sized = size ? media.sizes?.[size]?.url : null
  const url = sized || media.url
  if (!url) return null
  return {
    url,
    alt: (media as Media).alt ?? '',
    width: (size && media.sizes?.[size]?.width) || media.width || 1600,
    height: (size && media.sizes?.[size]?.height) || media.height || 1200,
    focal: media.focalX != null ? `${media.focalX}% ${media.focalY}%` : undefined,
  }
}

export function fileUrl(upload: Upload) {
  if (!upload || typeof upload === 'string') return null
  return upload.url ?? null
}
