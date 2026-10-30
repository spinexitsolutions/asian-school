/**
 * Create an admin account, or reset its password if the email already exists.
 *
 *   npm run create-admin -- you@example.com YourPassword123 "Your Name"
 */
import bcrypt from 'bcryptjs'

import { findRaw, insertDoc, updateDoc } from '../lib/db'

const [email, password, ...nameParts] = process.argv.slice(2)
const name = nameParts.join(' ') || 'Administrator'

if (!email || !password || password.length < 8) {
  console.log('Usage: npm run create-admin -- you@example.com YourPassword123 "Your Name"')
  console.log('(password must be at least 8 characters)')
  process.exit(1)
}

const passwordHash = await bcrypt.hash(password, 12)
const existing = await findRaw('users', { email: email.toLowerCase() })
if (existing) {
  await updateDoc('users', String(existing._id), { passwordHash, role: 'admin' })
  console.log(`✔ Password reset. Log in at /admin with ${email.toLowerCase()}`)
} else {
  await insertDoc('users', { name, email: email.toLowerCase(), role: 'admin', passwordHash })
  console.log(`✔ Admin created. Log in at /admin with ${email.toLowerCase()}`)
}
process.exit(0)
