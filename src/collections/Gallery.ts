import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { slugField } from '../fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Gallery Album', plural: 'Gallery Albums' },
  admin: { group: 'Updates', useAsTitle: 'title', defaultColumns: ['title', 'category', 'date'] },
  defaultSort: '-date',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', defaultValue: () => new Date().toISOString() },
        {
          name: 'category',
          type: 'select',
          defaultValue: 'campus',
          options: [
            { label: 'Campus', value: 'campus' },
            { label: 'Events & Celebrations', value: 'events' },
            { label: 'Sports', value: 'sports' },
            { label: 'Academics', value: 'academics' },
            { label: 'Trips', value: 'trips' },
          ],
        },
      ],
    },
    { name: 'cover', type: 'upload', relationTo: 'media', admin: { description: 'Leave empty to use the first photo.' } },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Select or drag in as many photos as you like.' },
    },
    {
      name: 'videos',
      type: 'array',
      labels: { singular: 'YouTube video', plural: 'YouTube videos' },
      fields: [{ name: 'url', type: 'text', required: true, label: 'YouTube link' }],
    },
    slugField(),
  ],
}
