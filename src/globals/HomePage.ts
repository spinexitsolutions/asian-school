import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { iconField } from '../fields/icon'
import { revalidateGlobal } from '../hooks/revalidate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: { group: 'Pages', description: 'Everything on the homepage. Empty fields fall back to the default text.' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text' },
            {
              name: 'heroTitle',
              type: 'text',
              admin: { description: 'Wrap a word in *stars* to show it in gold italics, e.g. Where curious minds *bloom*' },
            },
            { name: 'heroText', type: 'textarea' },
            { name: 'heroImages', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 3, admin: { description: 'Up to 3 photos (main arch + two small)' } },
          ],
        },
        {
          label: 'Numbers',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 1200+' } },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Introduction',
          fields: [
            { name: 'introTitle', type: 'text' },
            { name: 'introText', type: 'textarea' },
            { name: 'introImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Pillars',
          fields: [
            {
              name: 'pillars',
              type: 'array',
              maxRows: 6,
              fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea', required: true }, iconField()],
            },
          ],
        },
        {
          label: 'Principal',
          fields: [
            { name: 'principalName', type: 'text' },
            { name: 'principalRole', type: 'text' },
            { name: 'principalPhoto', type: 'upload', relationTo: 'media' },
            { name: 'principalMessage', type: 'textarea' },
          ],
        },
        {
          label: 'Call to action',
          fields: [
            { name: 'ctaTitle', type: 'text' },
            { name: 'ctaText', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
