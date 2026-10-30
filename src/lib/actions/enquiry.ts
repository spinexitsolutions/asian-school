'use server'

import { headers } from 'next/headers'
import { insertDoc } from '@/lib/db'
import { notifyStaff } from '@/lib/notify'

export type EnquiryState = { ok: boolean; message: string; errors?: Record<string, string> }

const recent = new Map<string, number[]>()

/** Very small in-memory rate limit: 5 submissions per IP per 10 minutes. */
function rateLimited(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > 5
}

const field = (data: FormData, name: string, max = 200) => String(data.get(name) ?? '').trim().slice(0, max)
export async function submitEnquiry(_prev: EnquiryState, data: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (field(data, 'company')) return { ok: true, message: 'Thank you! We will contact you soon.' }

  const doc = {
    type: field(data, 'type') === 'contact' ? 'contact' : 'admission',
    studentName: field(data, 'studentName', 120),
    parentName: field(data, 'parentName', 120),
    classApplying: field(data, 'classApplying', 40),
    phone: field(data, 'phone', 20),
    email: field(data, 'email', 120),
    message: field(data, 'message', 2000),
    status: 'new',
  }

  const errors: Record<string, string> = {}
  if (doc.studentName.length < 2) errors.studentName = 'Please enter a name.'
  if (!/^[+\d][\d\s-]{8,15}$/.test(doc.phone)) errors.phone = 'Please enter a valid mobile number.'
  if (doc.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doc.email)) errors.email = 'Please enter a valid email.'
  if (doc.type === 'admission' && !doc.classApplying) errors.classApplying = 'Please select a class.'
  if (Object.keys(errors).length) return { ok: false, message: 'Please correct the highlighted fields.', errors }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return { ok: false, message: 'Too many submissions. Please call us instead.' }

  try {
    await insertDoc('enquiries', doc)
    await notifyStaff(`New ${doc.type} enquiry: ${doc.studentName}`, {
      Name: doc.studentName,
      Parent: doc.parentName,
      Class: doc.classApplying,
      Phone: doc.phone,
      Email: doc.email,
      Message: doc.message,
    })
    return { ok: true, message: 'Thank you! Your enquiry has been received. Our team will call you soon.' }
  } catch (err) {
    console.error('[enquiry] save failed', err)
    return { ok: false, message: 'Sorry, something went wrong. Please call us at the number below.' }
  }
}
