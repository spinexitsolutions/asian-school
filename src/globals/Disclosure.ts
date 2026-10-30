import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Disclosure: GlobalConfig = {
  slug: 'disclosure',
  label: 'Mandatory Public Disclosure',
  admin: { group: 'Pages', description: 'Board-mandated disclosure (Appendix-IX for CBSE schools).' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'enabled', type: 'checkbox', label: 'Show this page on the website', defaultValue: true },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text' },
              ],
            },
            { name: 'file', type: 'upload', relationTo: 'documents', admin: { description: 'Optional document link' } },
          ],
        },
      ],
    },
  ],
}
