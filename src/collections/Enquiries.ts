import type { CollectionConfig, PayloadRequest } from 'payload'
import { adminOnly, loggedIn } from '../lib/access'

const csvCell = (value: unknown) => {
  const text = value == null ? '' : String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'type', 'classApplying', 'phone', 'status', 'createdAt'],
    description: 'Admission and contact form submissions from the website.',
    components: { beforeListTable: ['@/components/admin/ExportEnquiries'] },
  },
  defaultSort: '-createdAt',
  access: {
    // Website visitors submit through a server action (with spam checks) that
    // writes via the Local API, so the public REST endpoint stays closed.
    create: loggedIn,
    read: loggedIn,
    update: loggedIn,
    delete: adminOnly,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create' || !process.env.SMTP_HOST) return doc
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings', req })
          const to = settings?.notificationEmail || settings?.email
          if (!to) return doc
          await req.payload.sendEmail({
            to,
            subject: `New ${doc.type === 'admission' ? 'admission' : 'contact'} enquiry: ${doc.studentName}`,
            html: `<h2>New enquiry from the website</h2>
              <p><b>Name:</b> ${doc.studentName}</p>
              <p><b>Parent:</b> ${doc.parentName ?? '-'}</p>
              <p><b>Class:</b> ${doc.classApplying ?? '-'}</p>
              <p><b>Phone:</b> ${doc.phone}</p>
              <p><b>Email:</b> ${doc.email ?? '-'}</p>
              <p><b>Message:</b> ${doc.message ?? '-'}</p>`,
          })
        } catch (err) {
          req.payload.logger.error({ err }, 'Could not send enquiry email')
        }
        return doc
      },
    ],
  },
  endpoints: [
    {
      path: '/export',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        const { docs } = await req.payload.find({ collection: 'enquiries', limit: 0, sort: '-createdAt', req })
        const header = ['Date', 'Type', 'Student / Name', 'Parent', 'Class', 'Phone', 'Email', 'Message', 'Status']
        const rows = docs.map((d) =>
          [
            new Date(d.createdAt).toLocaleString('en-IN'),
            d.type,
            d.studentName,
            d.parentName,
            d.classApplying,
            d.phone,
            d.email,
            d.message,
            d.status,
          ]
            .map(csvCell)
            .join(','),
        )
        // BOM so Excel opens UTF-8 correctly.
        const body = '﻿' + [header.join(','), ...rows].join('\n')
        return new Response(body, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
          },
        })
      },
    },
  ],
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'admission',
          options: [
            { label: 'Admission', value: 'admission' },
            { label: 'General / Contact', value: 'contact' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Visit scheduled', value: 'visit' },
            { label: 'Admitted', value: 'admitted' },
            { label: 'Closed', value: 'closed' },
          ],
        },
      ],
    },
    { name: 'studentName', type: 'text', required: true, label: 'Student / Visitor name', maxLength: 120 },
    { name: 'parentName', type: 'text', maxLength: 120 },
    { name: 'classApplying', type: 'text', label: 'Class applying for', maxLength: 40 },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', required: true, maxLength: 20 },
        { name: 'email', type: 'email' },
      ],
    },
    { name: 'message', type: 'textarea', maxLength: 2000 },
    { name: 'notes', type: 'textarea', label: 'Internal notes (staff only)' },
  ],
}
