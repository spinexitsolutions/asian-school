import { randomBytes } from 'crypto'
import { revalidatePath } from 'next/cache'

import { count, getGlobalDoc, insertDoc } from '@/lib/db'
import { notifyStaff } from '@/lib/notify'
import { storePrivate } from '@/lib/storage'

const recent = new Map<string, number[]>()
const limited = (ip: string) => {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > 5
}

const TEXT_FIELDS: Record<string, number> = {
  classApplying: 40,
  studentName: 120,
  dob: 10,
  gender: 10,
  bloodGroup: 10,
  category: 30,
  religion: 40,
  previousSchool: 200,
  previousClass: 100,
  transportStop: 100,
  fatherName: 120,
  fatherOccupation: 100,
  fatherPhone: 20,
  motherName: 120,
  motherOccupation: 100,
  motherPhone: 20,
  email: 120,
  address: 500,
}

const DOCS: [string, string, boolean][] = [
  ['photo', 'Student photo', true],
  ['birthCertificate', 'Birth certificate', true],
  ['reportCard', 'Previous report card', false],
  ['transferCertificate', 'Transfer certificate', false],
  ['aadhaarCard', 'Aadhaar card', false],
]

const phoneOk = (v: string) => /^[+\d][\d\s-]{8,15}$/.test(v)

/** Full online admission form (multipart). Returns the application number and private link. */
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return Response.json({ error: 'Too many applications from this connection. Please call the school office.' }, { status: 429 })

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return Response.json({ error: 'The upload was too large or interrupted. Please try again.' }, { status: 400 })
  }
  if (String(form.get('company') ?? '')) return Response.json({ error: 'Invalid submission' }, { status: 400 })

  const data: Record<string, unknown> = {}
  for (const [key, max] of Object.entries(TEXT_FIELDS)) data[key] = String(form.get(key) ?? '').trim().slice(0, max)
  data.transport = form.get('transport') === 'yes'

  const errors: Record<string, string> = {}
  if (String(data.studentName).length < 2) errors.studentName = "Enter the student's full name"
  if (!data.classApplying) errors.classApplying = 'Select a class'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.dob))) errors.dob = 'Enter date of birth'
  if (!data.gender) errors.gender = 'Select gender'
  if (String(data.fatherName).length < 2) errors.fatherName = "Enter father's / guardian's name"
  if (!phoneOk(String(data.fatherPhone))) errors.fatherPhone = 'Enter a valid mobile number'
  if (data.motherPhone && !phoneOk(String(data.motherPhone))) errors.motherPhone = 'Enter a valid mobile number'
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) errors.email = 'Enter a valid email'
  if (String(data.address).length < 5) errors.address = 'Enter the full address'
  if (form.get('declaration') !== 'yes') errors.declaration = 'Please accept the declaration'
  for (const [key, label, required] of DOCS) {
    const f = form.get(key)
    if (required && !(f instanceof File && f.size > 0)) errors[key] = `${label} is required`
  }
  if (Object.keys(errors).length) return Response.json({ error: 'Please correct the highlighted fields.', errors }, { status: 400 })

  try {
    for (const [key, label] of DOCS) {
      const f = form.get(key)
      data[key] = f instanceof File && f.size > 0 ? await storePrivate(f, label) : null
    }
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 })
  }

  const admissions = await getGlobalDoc<{ session?: string }>('admissions-page').catch(() => null)
  const year = new Date().getFullYear()
  const serial = (await count('applications')) + 1
  const applicationNo = `AIS-${year}-${String(serial).padStart(4, '0')}${randomBytes(1).toString('hex').toUpperCase()}`
  const token = randomBytes(16).toString('hex')

  await insertDoc('applications', { ...data, applicationNo, token, status: 'received', session: admissions?.session || '2027–28' })
  revalidatePath('/admin', 'layout')
  await notifyStaff(`New admission application ${applicationNo}: ${data.studentName}`, {
    'Application No.': applicationNo,
    Student: String(data.studentName),
    Class: String(data.classApplying),
    Father: String(data.fatherName),
    Mobile: String(data.fatherPhone),
  })

  return Response.json({ applicationNo, token })
}
