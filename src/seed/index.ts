/**
 * Fills the database with the school's starting content.
 *
 *   npm run seed
 *
 * Safe to run again: only empty settings pages and sections are filled.
 * (Creating the first admin on the /admin page does this automatically.)
 * Set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD to also create the first admin user.
 */
import bcrypt from 'bcryptjs'

import { count, insertDoc } from '../lib/db'
import { seedContent } from '../lib/seed'

const log = (msg: string) => console.log(`[seed] ${msg}`)

await seedContent(log)

const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD
if (email && password && (await count('users', { passwordHash: { $exists: true } })) === 0) {
  await insertDoc('users', { name: 'Administrator', email, role: 'admin', passwordHash: await bcrypt.hash(password, 12) })
  log(`admin user ${email} created`)
}

log('done')
process.exit(0)
