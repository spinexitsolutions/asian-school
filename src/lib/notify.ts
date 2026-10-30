import 'server-only'

import nodemailer from 'nodemailer'

import { getGlobalDoc } from './db'

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

/** Email the school about a new enquiry / application, when SMTP is configured. Never throws. */
export async function notifyStaff(subject: string, rows: Record<string, string | undefined>) {
  if (!process.env.SMTP_HOST) return
  try {
    const settings = await getGlobalDoc<{ notificationEmail?: string; email?: string }>('site-settings')
    const to = settings?.notificationEmail || settings?.email || process.env.SMTP_USER
    if (!to) return
    const port = Number(process.env.SMTP_PORT || 465)
    await nodemailer
      .createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
      .sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to,
        subject,
        html: Object.entries(rows)
          .map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v || '-')}</p>`)
          .join(''),
      })
  } catch (err) {
    console.error('[notify] email failed', err)
  }
}
