import 'server-only'

import bcrypt from 'bcryptjs'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '@/cms/types'
import { findById } from './db'

export const SESSION_COOKIE = 'ais_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function secret() {
  const value = process.env.AUTH_SECRET
  if (!value && process.env.NODE_ENV === 'production') throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(value || 'local-dev-secret-change-me')
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12)
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash)

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret())
  ;(await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
}

export async function destroySession() {
  ;(await cookies()).delete(SESSION_COOKIE)
}

/** The signed-in staff user, or null. Always re-reads the user so deleted accounts lose access. */
export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    if (!payload.sub) return null
    return await findById<User>('users', payload.sub)
  } catch {
    return null
  }
}

export async function requireUser(role?: 'admin') {
  const user = await currentUser()
  if (!user) redirect('/admin/login')
  if (role && user.role !== role) redirect('/admin')
  return user
}
