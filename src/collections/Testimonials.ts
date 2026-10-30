import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'School', useAsTitle: 'name' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'relation', type: 'text', admin: { description: 'e.g. Parent of Aarav, Class V' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
  ],
}
