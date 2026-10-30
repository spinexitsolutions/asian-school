'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { normalize, ValidationError } from '@/cms/normalize'
import { fieldsOf, getCollection, getGlobal } from '@/cms/schema'
import type { User } from '@/cms/types'
import { createSession, currentUser, destroySession, hashPassword, requireUser, verifyPassword } from '@/lib/auth'
import { seedContent } from '@/lib/seed'
import { count, deleteDoc, findOne, findRaw, insertDoc, setGlobalDoc, updateDoc } from '@/lib/db'

export type ActionResult = { ok: boolean; message: string; errors?: Record<string, string>; id?: string }

const refreshSite = () => revalidatePath('/', 'layout')

const fail = (err: unknown): ActionResult => {
  if (err instanceof ValidationError) return { ok: false, message: err.message, errors: err.errors }
  console.error('[admin]', err)
  return { ok: false, message: err instanceof Error ? err.message : 'Something went wrong' }
}

/* ───────────── Auth ───────────── */

export async function login(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const password = String(form.get('password') ?? '')
  try {
    const user = await findRaw('users', { email })
    if (!user || !(await verifyPassword(password, String(user.passwordHash ?? '')))) {
      return { ok: false, message: 'Wrong email or password.' }
    }
    await createSession(String(user._id))
  } catch (err) {
    return fail(err)
  }
  redirect('/admin')
}

/** Creates the very first admin account. Refuses once any user exists. */
export async function setupAdmin(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const name = String(form.get('name') ?? '').trim()
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const password = String(form.get('password') ?? '')
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: 'Enter your name and a valid email.' }
  if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' }
  try {
    if ((await count('users', { passwordHash: { $exists: true } })) > 0) return { ok: false, message: 'An admin account already exists. Please log in.' }
    const passwordHash = await hashPassword(password)
    // An account left over from the old admin (same email, no password here) is reused.
    const legacy = await findRaw('users', { email })
    const id = legacy ? String(legacy._id) : await insertDoc('users', { name, email, role: 'admin', passwordHash })
    if (legacy) await updateDoc('users', id, { name, role: 'admin', passwordHash })
    // Fresh install: load the starting content so everything is editable right away.
    await seedContent()
    refreshSite()
    await createSession(id)
  } catch (err) {
    return fail(err)
  }
  redirect('/admin')
}

export async function logout() {
  await destroySession()
  redirect('/admin/login')
}

export async function changePassword(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const user = await requireUser()
  const current = String(form.get('current') ?? '')
  const next = String(form.get('next') ?? '')
  if (next.length < 8) return { ok: false, message: 'New password must be at least 8 characters.' }
  const raw = await findRaw('users', { email: user.email })
  if (!raw || !(await verifyPassword(current, String(raw.passwordHash ?? '')))) return { ok: false, message: 'Current password is wrong.' }
  await updateDoc('users', user.id, { passwordHash: await hashPassword(next) })
  return { ok: true, message: 'Password changed.' }
}

/* ───────────── Content ───────────── */

export async function saveDocument(collection: string, id: string | null, input: Record<string, unknown>): Promise<ActionResult> {
  const def = getCollection(collection)
  if (!def) return { ok: false, message: 'Unknown section' }
  const user = await requireUser(def.adminOnly ? 'admin' : undefined)
  try {
    const data = normalize(fieldsOf(def), input)

    if (collection === 'users') {
      const email = String(data.email).toLowerCase()
      data.email = email
      const clash = await findOne<User>('users', { email })
      if (clash && clash.id !== id) return { ok: false, message: 'Another user already has this email.', errors: { email: 'Already used' } }
      if (data.password) data.passwordHash = await hashPassword(String(data.password))
      else if (!id) return { ok: false, message: 'Set a password for the new user.', errors: { password: 'Required' } }
      delete data.password
      if (id === user.id && data.role !== 'admin') return { ok: false, message: 'You cannot remove your own admin role.' }
    }

    if ('slug' in data) {
      data.slug = String(data.slug || '') || `item-${Date.now().toString(36)}`
      const clash = await findOne<{ id: string }>(collection, { slug: data.slug })
      if (clash && clash.id !== id) data.slug = `${data.slug}-${Date.now().toString(36).slice(-4)}`
    }

    let savedId = id
    if (id) await updateDoc(collection, id, data)
    else savedId = await insertDoc(collection, data)
    refreshSite()
    return { ok: true, message: 'Saved successfully.', id: savedId! }
  } catch (err) {
    return fail(err)
  }
}

export async function deleteDocument(collection: string, id: string): Promise<ActionResult> {
  const def = getCollection(collection)
  if (!def) return { ok: false, message: 'Unknown section' }
  const user = await requireUser(def.adminOnly || collection === 'enquiries' ? 'admin' : undefined)
  if (collection === 'users' && id === user.id) return { ok: false, message: 'You cannot delete your own account.' }
  try {
    await deleteDoc(collection, id)
    refreshSite()
    return { ok: true, message: 'Deleted.' }
  } catch (err) {
    return fail(err)
  }
}

export async function saveGlobal(slug: string, input: Record<string, unknown>): Promise<ActionResult> {
  const def = getGlobal(slug)
  if (!def) return { ok: false, message: 'Unknown page' }
  await requireUser()
  try {
    await setGlobalDoc(slug, normalize(fieldsOf(def), input))
    refreshSite()
    return { ok: true, message: 'Saved. The website is updated.' }
  } catch (err) {
    return fail(err)
  }
}

export async function setEnquiryStatus(id: string, status: string): Promise<ActionResult> {
  await requireUser()
  if (!['new', 'contacted', 'visit', 'admitted', 'closed'].includes(status)) return { ok: false, message: 'Invalid status' }
  await updateDoc('enquiries', id, { status })
  return { ok: true, message: 'Status updated.' }
}

export async function whoAmI() {
  return currentUser()
}
