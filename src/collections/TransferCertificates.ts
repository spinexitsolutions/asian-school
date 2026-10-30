import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const TransferCertificates: CollectionConfig = {
  slug: 'transfer-certificates',
  labels: { singular: 'Transfer Certificate', plural: 'Transfer Certificates' },
  admin: {
    group: 'School',
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'admissionNo', 'tcNo', 'issueDate'],
    description: 'Parents can search and download TCs on the website by admission number.',
  },
  defaultSort: '-issueDate',
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'studentName', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'admissionNo', type: 'text', required: true, index: true, label: 'Admission No.' },
        { name: 'tcNo', type: 'text', label: 'TC No.' },
        { name: 'issueDate', type: 'date' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'documents', required: true, label: 'TC (PDF / scan)' },
  ],
}
