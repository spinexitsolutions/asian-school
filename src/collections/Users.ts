import type { CollectionConfig } from 'payload'
import { adminOnly, adminOnlyField } from '../lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Staff User', plural: 'Staff Users' },
  auth: true,
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'role'], group: 'Settings' },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: ({ req }) => Boolean(req.user),
    update: ({ req, id }) => (req.user as { role?: string } | null)?.role === 'admin' || req.user?.id === id,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      access: { update: adminOnlyField },
      options: [
        { label: 'Admin (full access, manages staff)', value: 'admin' },
        { label: 'Editor (manages website content)', value: 'editor' },
      ],
    },
  ],
}
