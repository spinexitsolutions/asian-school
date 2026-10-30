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
          label: 'Slider',
          fields: [
            {
              name: 'slides',
              type: 'array',
              labels: { singular: 'Slide', plural: 'Slides' },
              admin: { description: 'Large banner slider at the top of the homepage. Use wide photos (1920×900 or bigger).' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                {
                  name: 'bannerOnly',
                  type: 'checkbox',
                  label: 'Ready-made banner / poster (show image only, no text on top)',
                  admin: { description: 'Tick this for designed posters such as topper results or admission banners.' },
                },
                {
                  type: 'collapsible',
                  label: 'Text on slide',
                  admin: { condition: (_, sibling) => !sibling?.bannerOnly },
                  fields: [
                    { name: 'badge', type: 'text', admin: { description: 'Small label, e.g. CBSE Affiliated · Est. 2010' } },
                    { name: 'title', type: 'text', admin: { description: 'Wrap words in *stars* to colour them, e.g. Nurturing *Bright* Minds' } },
                    { name: 'text', type: 'textarea' },
                    {
                      type: 'row',
                      fields: [
                        { name: 'buttonLabel', type: 'text' },
                        { name: 'buttonLink', type: 'text' },
                      ],
                    },
                  ],
                },
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
