import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: { group: 'Pages' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'story', type: 'textarea', label: 'Our story', admin: { description: 'Separate paragraphs with an empty line.' } },
    {
      type: 'row',
      fields: [
        { name: 'vision', type: 'textarea' },
        { name: 'mission', type: 'textarea' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    {
      name: 'timeline',
      type: 'array',
      labels: { singular: 'Milestone', plural: 'Milestones' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'year', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
          ],
        },
        { name: 'text', type: 'textarea' },
      ],
    },
    {
      name: 'leaders',
      type: 'array',
      labels: { singular: 'Leader', plural: 'Leadership' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
          ],
        },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'message', type: 'textarea' },
      ],
    },
  ],
}
