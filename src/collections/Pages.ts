import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../lib/access'
import { slugField } from '../fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Extra Page', plural: 'Extra Pages' },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    description: 'Create additional simple pages (e.g. Privacy Policy, Rules & Regulations). They open at /your-slug.',
  },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'infoRows',
      type: 'array',
      label: 'Information table',
      labels: { singular: 'Row', plural: 'Rows' },
      admin: { description: 'Optional two-column table (e.g. Affiliation No. → 17XXXXX).' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text' },
          ],
        },
        { name: 'file', type: 'upload', relationTo: 'documents' },
      ],
    },
    { name: 'content', type: 'richText' },
    slugField(),
  ],
}
