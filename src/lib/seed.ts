/**
 * Fills an empty database with the school's starting content (settings pages
 * and sample records) so staff can edit real records in the admin panel.
 * Only touches settings pages and sections that are still empty.
 */
import {
  defaultAlbums,
  defaultCareers,
  defaultFacilities,
  defaultFaculty,
  defaultNews,
  defaultNotices,
  defaultPages,
  defaultTestimonials,
  defaultToppers,
  globalDefaults,
} from '../content/defaults'
import { count, db, getGlobalDoc, insertDoc, setGlobalDoc } from './db'

export async function seedContent(log: (msg: string) => void = () => {}) {
  const strip = <T extends { id?: string }>({ id: _id, ...rest }: T) => rest

  for (const [slug, data] of Object.entries(globalDefaults)) {
    if (await getGlobalDoc(slug)) {
      log(`${slug}: already set, skipped`)
      continue
    }
    await setGlobalDoc(slug, data)
    log(`${slug}: filled`)
  }

  const samples: Record<string, Record<string, unknown>[]> = {
    notices: defaultNotices.map(strip),
    news: defaultNews.map((n) => ({ ...strip(n), status: 'published' })),
    gallery: defaultAlbums.map(strip),
    faculty: defaultFaculty.map(strip),
    toppers: defaultToppers.map(strip),
    careers: defaultCareers.map(strip),
    testimonials: defaultTestimonials,
    facilities: defaultFacilities.map((f, i) => ({ ...f, order: (i + 1) * 10, points: f.points.map((text) => ({ text })) })),
    pages: defaultPages.map((p) => ({
      title: p.title,
      slug: p.slug,
      intro: p.intro,
      status: 'published',
      infoRows: p.rows.map(([label, value]) => ({ label, value })),
    })),
  }

  for (const [collection, docs] of Object.entries(samples)) {
    if ((await count(collection)) > 0) {
      log(`${collection}: has content, skipped`)
      continue
    }
    for (const doc of docs) await insertDoc(collection, doc)
    log(`${collection}: ${docs.length} added`)
  }

  // Helpful lookup indexes. A database used by an older version of the site may
  // already have an index with the same name but different options (e.g. a
  // unique slug index); that one works just as well, so conflicts are skipped.
  const database = await db()
  const indexes: [string, Record<string, 1>][] = [
    ['news', { slug: 1 }],
    ['gallery', { slug: 1 }],
    ['pages', { slug: 1 }],
    ['users', { email: 1 }],
    ['transfer-certificates', { admissionNo: 1 }],
  ]
  for (const [collection, key] of indexes) {
    try {
      await database.collection(collection).createIndex(key)
    } catch (err) {
      log(`${collection}: index ${Object.keys(key)[0]} already exists, kept (${(err as { codeName?: string }).codeName ?? 'skipped'})`)
    }
  }
}
