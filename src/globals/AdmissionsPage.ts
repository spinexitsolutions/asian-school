import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const AdmissionsPage: GlobalConfig = {
  slug: 'admissions-page',
  label: 'Admissions Page',
  admin: { group: 'Pages' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'session', type: 'text', admin: { description: 'e.g. 2027–28' } },
    {
      name: 'steps',
      type: 'array',
      labels: { singular: 'Step', plural: 'Admission steps' },
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    {
      name: 'eligibility',
      type: 'array',
      label: 'Age criteria',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'className', type: 'text', required: true, label: 'Class' },
            { name: 'age', type: 'text', required: true, label: 'Age as on 31 March' },
          ],
        },
      ],
    },
    { name: 'documentsRequired', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'feeStructure', type: 'upload', relationTo: 'documents', label: 'Fee structure (PDF)' },
    { name: 'prospectus', type: 'upload', relationTo: 'documents', label: 'Prospectus (PDF)' },
    {
      name: 'faqs',
      type: 'array',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }],
    },
  ],
}
