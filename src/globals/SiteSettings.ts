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
            { name: 'schoolName', type: 'text', required: true, defaultValue: 'The Asian School' },
            { name: 'location', type: 'text', defaultValue: 'Chomu, Jaipur' },
            { name: 'tagline', type: 'text', defaultValue: 'Rooted in values. Ready for the world.' },
            { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Square PNG/SVG works best. A crest is shown if empty.' } },
            { name: 'affiliation', type: 'text', admin: { description: 'e.g. Affiliated to CBSE, New Delhi · Affiliation No. 17XXXXX' } },
            { name: 'established', type: 'text', admin: { description: 'Year founded, e.g. 2005' } },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', defaultValue: '+91 90000 00000' },
            { name: 'altPhone', type: 'text' },
            { name: 'whatsapp', type: 'text', admin: { description: 'Number with country code, digits only, e.g. 919000000000' } },
            { name: 'email', type: 'email', defaultValue: 'info@asianschoolchomu.in' },
            { name: 'notificationEmail', type: 'email', admin: { description: 'New enquiries are emailed here (falls back to the email above).' } },
            { name: 'address', type: 'textarea', defaultValue: 'Chomu, Jaipur District, Rajasthan 303702' },
            { name: 'officeHours', type: 'text', defaultValue: 'Mon – Sat · 8:00 AM – 2:30 PM' },
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
          label: 'Announcement',
          fields: [
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
                'The Asian School, Chomu — a progressive English-medium school nurturing curious, confident and kind learners from Nursery to Class XII.',
            },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Share image (for WhatsApp / Facebook previews)' },
          ],
        },
      ],
    },
  ],
}
