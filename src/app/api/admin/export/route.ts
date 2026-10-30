import { currentUser } from '@/lib/auth'
import { findMany } from '@/lib/db'

const cell = (v: unknown) => {
  const t = v == null ? '' : String(v)
  return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t
}

/** Excel-friendly CSV of all enquiries. */
export async function GET() {
  if (!(await currentUser())) return new Response('Unauthorized', { status: 401 })
  const { docs } = await findMany<Record<string, string>>('enquiries', { limit: 100000, sort: { createdAt: -1 } })
  const header = ['Date', 'Type', 'Student / Name', 'Parent', 'Class', 'Phone', 'Email', 'Message', 'Status', 'Notes']
  const rows = docs.map((d) =>
    [new Date(d.createdAt).toLocaleString('en-IN'), d.type, d.studentName, d.parentName, d.classApplying, d.phone, d.email, d.message, d.status, d.notes]
      .map(cell)
      .join(','),
  )
  return new Response('﻿' + [header.join(','), ...rows].join('\n'), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
