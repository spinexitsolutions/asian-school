import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings', description: 'School name, logo, contact details and social links used across the site.' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'School',
          fields: [
            { name: 'schoolName', type: 'text', required: true, defaultValue: 'The Asian International School' },
            { name: 'location', type: 'text', defaultValue: 'Radha Swami Bagh, Chomu, Jaipur' },
            { name: 'tagline', type: 'text', defaultValue: 'Nurturing bright minds for a better tomorrow.' },
            { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Square PNG works best. The default school logo is shown if empty.' } },
            { name: 'affiliation', type: 'text', defaultValue: 'CBSE Affiliated', admin: { description: 'e.g. Affiliated to CBSE, New Delhi · Affiliation No. 17XXXXX' } },
            { name: 'established', type: 'text', defaultValue: '2010', admin: { description: 'Year founded, e.g. 2005' } },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', defaultValue: '+91 98297 51651' },
            { name: 'altPhone', type: 'text', defaultValue: '+91 99296 05547' },
            { name: 'whatsapp', type: 'text', defaultValue: '919829751651', admin: { description: 'Number with country code, digits only, e.g. 919000000000' } },
            { name: 'email', type: 'email', defaultValue: 'asianchomu@gmail.com' },
            { name: 'notificationEmail', type: 'email', admin: { description: 'New enquiries are emailed here (falls back to the email above).' } },
            { name: 'address', type: 'textarea', defaultValue: 'Near Barala Hospital, Radha Swami Bagh, Chomu, Rajasthan – 303704' },
            { name: 'officeHours', type: 'text', defaultValue: 'Mon – Sat · 8:00 AM – 3:00 PM' },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'Google Maps embed link',
              admin: { description: 'Google Maps → Share → Embed a map → copy only the src="…" link.' },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'facebook', type: 'text' },
            { name: 'instagram', type: 'text' },
            { name: 'youtube', type: 'text' },
            { name: 'x', type: 'text', label: 'X (Twitter)' },
          ],
        },
        {
          label: 'Top bar & announcement',
          fields: [
            { name: 'topbarText', type: 'text', defaultValue: 'Your Search Will End Here!', label: 'Top bar slogan' },
            { name: 'announcementEnabled', type: 'checkbox', label: 'Show announcement bar', defaultValue: true },
            { name: 'announcementText', type: 'text', defaultValue: 'Admissions open for session 2027–28 · Nursery to Class XI' },
            { name: 'announcementLink', type: 'text', defaultValue: '/admissions' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'The Asian International School, Chomu (Jaipur) — CBSE affiliated English medium school from Nursery to Class XII with Science, Arts & Commerce. Est. 2010.',
            },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Share image (for WhatsApp / Facebook previews)' },
          ],
        },
      ],
    },
  ],
}
