import type { Field } from 'payload'

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** URL slug, auto-filled from another field (usually the title) when left empty. */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Page address. Leave empty to create it from the title automatically.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return toSlug(value)
        const source = data?.[from]
        return typeof source === 'string' ? toSlug(source) : value
      },
    ],
  },
})
