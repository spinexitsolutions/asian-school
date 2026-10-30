import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Images' },
  admin: { group: 'Library', description: 'All photos used on the website. Large photos are compressed automatically.' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      { name: 'thumb', width: 480, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'card', width: 960, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
    adminThumbnail: 'thumb',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Short description',
      admin: { description: 'Describe the photo in a few words (helps Google and visually impaired visitors).' },
    },
  ],
}
