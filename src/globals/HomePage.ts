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
          description: 'Top section of the homepage. Toppers on the right come from "Achievers & Toppers" (tick "Show in homepage hero").',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              admin: { description: 'Wrap words in *stars* to colour them blue, and in _underscores_ for red. e.g. Proud of our *achievers*, ready for _yours._' },
            },
            {
              name: 'heroPoints',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Point', plural: 'Points' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              type: 'row',
              fields: [
                { name: 'resultsYear', type: 'text', admin: { description: 'Shown on the toppers panel, e.g. 2025–26' } },
                { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Background photo behind the blue panel' } },
              ],
            },
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
                    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 2400+' } },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutTitle', type: 'text' },
            { name: 'aboutText', type: 'textarea', admin: { description: 'Separate paragraphs with an empty line.' } },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Why choose us',
          fields: [
            { name: 'whyTitle', type: 'text' },
            { name: 'whyText', type: 'textarea' },
            {
              name: 'pillars',
              type: 'array',
              maxRows: 8,
              fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea', required: true }, iconField()],
            },
          ],
        },
        {
          label: 'Message',
          description: 'Director / Principal message shown on the homepage.',
          fields: [
            { name: 'messageHeading', type: 'text', admin: { description: "e.g. Director's Message" } },
            { name: 'messageName', type: 'text' },
            { name: 'messageRole', type: 'text' },
            { name: 'messagePhoto', type: 'upload', relationTo: 'media' },
            { name: 'messageText', type: 'textarea', admin: { description: 'Separate paragraphs with an empty line.' } },
          ],
        },
        {
          label: 'Calendar',
          fields: [
            { name: 'calendarImage', type: 'upload', relationTo: 'media', label: 'School calendar image (this month)' },
            { name: 'calendarFile', type: 'upload', relationTo: 'documents', label: 'Full academic calendar (PDF)' },
          ],
        },
        {
          label: 'Admission banner',
          fields: [
            { name: 'ctaTitle', type: 'text' },
            { name: 'ctaText', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
