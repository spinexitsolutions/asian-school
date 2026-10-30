'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/data'

export type EnquiryState = { ok: boolean; message: string; errors?: Record<string, string> }

const recent = new Map<string, number[]>()

/** Very small in-memory rate limit: 5 submissions per IP per 10 minutes. */
function rateLimited(ip: string) {
  const now = Date.now()
  const window = 10 * 60 * 1000
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < window)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > 5
}

const field = (data: FormData, name: string, max = 200) => String(data.get(name) ?? '').trim().slice(0, max)

export async function submitEnquiry(_prev: EnquiryState, data: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (field(data, 'company')) return { ok: true, message: 'Thank you! We will contact you soon.' }

  const type = field(data, 'type') === 'contact' ? 'contact' : 'admission'
  const studentName = field(data, 'studentName', 120)
  const parentName = field(data, 'parentName', 120)
  const classApplying = field(data, 'classApplying', 40)
  const phone = field(data, 'phone', 20)
  const email = field(data, 'email', 120)
  const message = field(data, 'message', 2000)

  const errors: Record<string, string> = {}
  if (studentName.length < 2) errors.studentName = 'Please enter a name.'
  if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) errors.phone = 'Please enter a valid mobile number.'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.'
  if (type === 'admission' && !classApplying) errors.classApplying = 'Please select a class.'
  if (Object.keys(errors).length) return { ok: false, message: 'Please correct the highlighted fields.', errors }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return { ok: false, message: 'Too many submissions. Please call us instead.' }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'enquiries',
      data: { type, studentName, parentName, classApplying, phone, email: email || undefined, message, status: 'new' },
      overrideAccess: true,
    })
    return { ok: true, message: 'Thank you! Your enquiry has been received. Our team will call you soon.' }
  } catch (err) {
    console.error('[enquiry] save failed', err)
    return { ok: false, message: 'Sorry, something went wrong. Please call us at the number below.' }
  }
}
