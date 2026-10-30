export const formatDate = (iso?: string | null, opts: Intl.DateTimeFormatOptions = {}) =>
  iso
    ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', ...opts })
    : ''

export const telHref = (phone?: string | null) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined)

export const youtubeId = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m?.[1] ?? null
}
