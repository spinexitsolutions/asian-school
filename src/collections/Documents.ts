import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Document (PDF)', plural: 'Documents (PDF)' },
  admin: { group: 'Library', useAsTitle: 'title', description: 'PDFs such as fee structure, circulars, certificates.' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  upload: { mimeTypes: ['application/pdf', 'image/*'] },
  fields: [{ name: 'title', type: 'text', required: true }],
}
