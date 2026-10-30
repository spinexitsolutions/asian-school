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
    { name: 'content', type: 'richText' },
    slugField(),
  ],
}
