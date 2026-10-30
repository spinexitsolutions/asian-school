import sanitizeHtml from 'sanitize-html'

import type { Field } from './schema'

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export const cleanHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'hr', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) },
  })

const str = (v: unknown, max = 10000) => (v == null ? '' : String(v)).trim().slice(0, max)

const media = (v: unknown) => {
  if (!v || typeof v !== 'object') return null
  const m = v as Record<string, unknown>
  if (typeof m.url !== 'string' || !/^(\/media\/|\/images\/|https:\/\/)/.test(m.url)) return null
  return {
    url: m.url,
    thumb: typeof m.thumb === 'string' ? m.thumb : undefined,
    alt: str(m.alt, 200),
    width: Number(m.width) || undefined,
    height: Number(m.height) || undefined,
    name: m.name ? str(m.name, 200) : undefined,
    size: Number(m.size) || undefined,
    type: m.type ? str(m.type, 100) : undefined,
  }
}

export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super('Please check the highlighted fields.')
  }
}

/**
 * Coerce form input to the shape described by `fields`, dropping unknown keys.
 * Returns the clean data plus a plain-text password if one was entered.
 */
export function normalize(fields: Field[], input: Record<string, unknown>, path = ''): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const errors: Record<string, string> = {}

  for (const f of fields) {
    const v = input?.[f.name]
    const key = path + f.name
    switch (f.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'textarea':
      case 'icon':
        out[f.name] = str(v, 'maxLength' in f && f.maxLength ? f.maxLength : 10000)
        break
      case 'select':
        out[f.name] = f.options.some((o) => o.value === v) ? v : (f.options[0]?.value ?? '')
        break
      case 'richtext':
        out[f.name] = cleanHtml(str(v, 200000))
        break
      case 'number':
        out[f.name] = v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v)
        break
      case 'date': {
        const d = v ? new Date(String(v)) : null
        out[f.name] = d && !Number.isNaN(d.getTime()) ? d.toISOString() : null
        break
      }
      case 'checkbox':
        out[f.name] = Boolean(v)
        break
      case 'image':
      case 'file':
        out[f.name] = media(v)
        break
      case 'gallery':
        out[f.name] = Array.isArray(v) ? v.map(media).filter(Boolean) : []
        break
      case 'slug':
        out[f.name] = slugify(str(v) || str(input?.[f.from]))
        break
      case 'password':
        if (str(v)) out[f.name] = str(v, 200)
        break
      case 'array': {
        const items = Array.isArray(v) ? v.slice(0, f.max ?? 200) : []
        out[f.name] = items.map((item, i) => normalize(f.fields, item as Record<string, unknown>, `${key}.${i}.`))
        break
      }
    }
    const value = out[f.name]
    if (f.required && f.type !== 'password' && (value === '' || value == null || (Array.isArray(value) && value.length === 0))) {
      errors[key] = `${f.label} is required`
    }
    if (f.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) errors[key] = 'Enter a valid email'
  }

  if (Object.keys(errors).length) throw new ValidationError(errors)
  return out
}
