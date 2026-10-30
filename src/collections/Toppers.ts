import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Toppers: CollectionConfig = {
  slug: 'toppers',
  labels: { singular: 'Achiever', plural: 'Achievers & Toppers' },
  admin: { group: 'School', useAsTitle: 'name', defaultColumns: ['name', 'className', 'score', 'year'] },
  defaultSort: '-year',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'className', type: 'text', label: 'Class / Stream', required: true, admin: { description: 'e.g. Class XII Science' } },
        { name: 'score', type: 'text', label: 'Score / Award', required: true, admin: { description: 'e.g. 97.4% or State Gold' } },
        { name: 'year', type: 'text', required: true, defaultValue: () => String(new Date().getFullYear()) },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', label: 'Show on homepage', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
