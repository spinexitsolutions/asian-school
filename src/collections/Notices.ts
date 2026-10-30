import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: { group: 'Updates', useAsTitle: 'title', defaultColumns: ['title', 'category', 'date', 'pinned'] },
  defaultSort: '-date',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
        {
          name: 'category',
          type: 'select',
          defaultValue: 'general',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Admissions', value: 'admissions' },
            { label: 'Examinations', value: 'exams' },
            { label: 'Holidays', value: 'holidays' },
            { label: 'Events', value: 'events' },
          ],
        },
      ],
    },
    { name: 'details', type: 'textarea' },
    { name: 'attachment', type: 'upload', relationTo: 'documents', admin: { description: 'Optional PDF / circular' } },
    {
      name: 'pinned',
      type: 'checkbox',
      label: 'Show in the scrolling bar on the homepage',
      admin: { position: 'sidebar' },
    },
  ],
}
