import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../lib/access'
import { slugField } from '../fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News & Event', plural: 'News & Events' },
  admin: { group: 'Updates', useAsTitle: 'title', defaultColumns: ['title', 'category', 'date', '_status'] },
  defaultSort: '-date',
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'news',
          options: [
            { label: 'News', value: 'news' },
            { label: 'Event', value: 'event' },
            { label: 'Achievement', value: 'achievement' },
          ],
        },
        { name: 'date', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
        { name: 'venue', type: 'text', admin: { condition: (data) => data?.category === 'event' } },
      ],
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', label: 'Short summary', maxLength: 260 },
    { name: 'content', type: 'richText' },
    slugField(),
  ],
}
