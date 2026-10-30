import type { CollectionConfig } from 'payload'
import { loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: { group: 'School', useAsTitle: 'title', defaultColumns: ['title', 'type', 'open'] },
  access: {
    read: ({ req }) => (req.user ? true : { open: { equals: true } }),
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. PGT Physics' } },
    {
      type: 'row',
      fields: [
        { name: 'department', type: 'text' },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'full-time',
          options: [
            { label: 'Full time', value: 'full-time' },
            { label: 'Part time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
          ],
        },
      ],
    },
    { name: 'requirements', type: 'textarea' },
    { name: 'open', type: 'checkbox', label: 'Accepting applications', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
