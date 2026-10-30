import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { iconField } from '../fields/icon'
import { revalidateGlobal } from '../hooks/revalidate'

export const AcademicsPage: GlobalConfig = {
  slug: 'academics-page',
  label: 'Academics Page',
  admin: { group: 'Pages' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'stages',
      type: 'array',
      labels: { singular: 'Stage', plural: 'Stages' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { description: 'e.g. Foundational Years' } },
            { name: 'classes', type: 'text', required: true, admin: { description: 'e.g. Nursery – UKG' } },
          ],
        },
        { name: 'text', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'focus', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
    {
      name: 'approach',
      type: 'array',
      label: 'Teaching approach',
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }, iconField()],
    },
    {
      name: 'cocurricular',
      type: 'array',
      label: 'Co-curricular activities',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
}
