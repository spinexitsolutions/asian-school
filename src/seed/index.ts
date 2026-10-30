/**
 * One-time setup: fills the CMS with the school's starting content so staff
 * edit real records instead of starting from blank forms.
 *
 *   npm run seed
 *
 * Safe to run again — it only creates things that don't exist yet.
 * Set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD to create the first admin user.
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  defaultAbout,
  defaultAcademics,
  defaultAdmissions,
  defaultDisclosure,
  defaultFacilities,
  defaultHome,
  defaultPages,
  defaultSettings,
  defaultTestimonials,
} from '../content/defaults'

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

// Globals: only fill when never saved before.
const globals = [
  ['site-settings', defaultSettings],
  ['home-page', defaultHome],
  ['about-page', defaultAbout],
  ['academics-page', defaultAcademics],
  ['admissions-page', defaultAdmissions],
  ['disclosure', defaultDisclosure],
] as const

for (const [slug, data] of globals) {
  const current = (await payload.findGlobal({ slug })) as { updatedAt?: string }
  if (current?.updatedAt) {
    log(`${slug}: already set, skipped`)
    continue
  }
  await payload.updateGlobal({ slug, data: data as never })
  log(`${slug}: filled`)
}

const isEmpty = async (collection: 'facilities' | 'testimonials' | 'pages' | 'users') =>
  (await payload.count({ collection })).totalDocs === 0

if (await isEmpty('facilities')) {
  for (const [i, f] of defaultFacilities.entries()) {
    await payload.create({
      collection: 'facilities',
      data: { title: f.title, summary: f.summary, icon: f.icon as never, order: (i + 1) * 10, points: f.points.map((text) => ({ text })) },
    })
  }
  log(`facilities: ${defaultFacilities.length} created`)
}

if (await isEmpty('testimonials')) {
  for (const t of defaultTestimonials) await payload.create({ collection: 'testimonials', data: t })
  log(`testimonials: ${defaultTestimonials.length} created`)
}

if (await isEmpty('pages')) {
  for (const p of defaultPages) {
    await payload.create({
      collection: 'pages',
      data: {
        title: p.title,
        slug: p.slug,
        intro: p.intro,
        infoRows: p.rows.map(([label, value]) => ({ label, value })),
        _status: 'published',
      },
    })
  }
  log(`pages: ${defaultPages.length} created`)
}

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD
if (email && password && (await isEmpty('users'))) {
  await payload.create({ collection: 'users', data: { name: 'Administrator', email, password, role: 'admin' } })
  log(`admin user ${email} created`)
}

log('done')
process.exit(0)
