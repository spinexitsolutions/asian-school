import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { iconField } from '../fields/icon'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: { group: 'School', useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: 'order',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true, maxLength: 220 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'points',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    iconField(),
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
