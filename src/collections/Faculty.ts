import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  labels: { singular: 'Faculty Member', plural: 'Faculty' },
  admin: { group: 'School', useAsTitle: 'name', defaultColumns: ['name', 'designation', 'department', 'order'] },
  defaultSort: 'order',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'designation', type: 'text', required: true },
        { name: 'department', type: 'text' },
      ],
    },
    { name: 'qualification', type: 'text' },
    { name: 'experience', type: 'text', admin: { description: 'e.g. 12 years' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar', description: 'Lower shows first' } },
  ],
}
