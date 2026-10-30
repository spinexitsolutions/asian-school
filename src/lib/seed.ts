/**
 * Fills an empty database with the school's starting content (settings pages
 * and sample records) so staff can edit real records in the admin panel.
 * Only touches settings pages and sections that are still empty.
 */
import {
  campusMedia,
  directorMedia,
  logoMedia,
  stockPhotos,
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
import { count, db, findMany, findOne, getGlobalDoc, insertDoc, setGlobalDoc, updateDoc } from './db'

export async function seedContent(log: (msg: string) => void = () => {}) {
  const strip = <T extends { id?: string }>({ id: _id, ...rest }: T) => rest

  for (const [slug, data] of Object.entries(globalDefaults)) {
    const saved = await getGlobalDoc<Record<string, unknown>>(slug)
    if (saved) {
      // Older installs were seeded without photos: add the bundled ones where a photo field is still empty.
      const filled = fillMissingImages(saved, data)
      if (filled) {
        await setGlobalDoc(slug, saved)
        log(`${slug}: ${filled} photo(s) added`)
      } else log(`${slug}: already set, skipped`)
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
      content: p.content,
    })),
  }

  for (const [collection, docs] of Object.entries(samples)) {
    // Built-in pages (CBSE info, Privacy Policy) are added one by one if missing,
    // so pages introduced in later versions also reach existing databases.
    if (collection === 'pages') {
      let added = 0
      for (const doc of docs) {
        if (await count('pages', { slug: doc.slug })) continue
        await insertDoc('pages', doc)
        added++
      }
      log(`pages: ${added} added`)
      continue
    }
    if ((await count(collection)) > 0) {
      const updated = await addPhotosToSamples(collection, docs)
      log(`${collection}: has content${updated ? `, ${updated} photo update(s)` : ', skipped'}`)
      continue
    }
    for (const doc of docs) await insertDoc(collection, doc)
    log(`${collection}: ${docs.length} added`)
  }

  // Bundled photos appear in the admin Media Library so they can be reused.
  const bundled = [campusMedia, directorMedia, logoMedia, ...Object.values(stockPhotos)]
  let libraryAdded = 0
  for (const m of bundled) {
    if (await count('media', { url: m.url })) continue
    await insertDoc('media', { ...m, name: m.url.split('/').pop(), type: m.url.endsWith('.png') ? 'image/png' : 'image/webp' })
    libraryAdded++
  }
  if (libraryAdded) log(`media library: ${libraryAdded} photo(s) added`)

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

const isImage = (v: unknown): v is { url: string } => Boolean(v && typeof v === 'object' && 'url' in v && (v as { url: unknown }).url)
const isEmpty = (v: unknown) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
const keyOf = (o: Record<string, unknown>) => String(o.slug ?? o.title ?? o.name ?? '')

/** Copies photos from `defaults` into empty photo fields of `target` (in place). Returns how many were set. */
function fillMissingImages(target: Record<string, unknown>, defaults: Record<string, unknown>): number {
  let n = 0
  for (const [key, def] of Object.entries(defaults)) {
    const cur = target[key]
    if (isImage(def) && isEmpty(cur)) {
      target[key] = def
      n++
    } else if (Array.isArray(def) && Array.isArray(cur)) {
      for (const item of cur) {
        if (!item || typeof item !== 'object') continue
        const match = def.find((d) => d && typeof d === 'object' && keyOf(d) && keyOf(d) === keyOf(item))
        if (match) n += fillMissingImages(item as Record<string, unknown>, match as Record<string, unknown>)
      }
    }
  }
  return n
}

/** For sections that already have records, add bundled photos to the sample records seeded earlier. */
async function addPhotosToSamples(collection: string, samples: Record<string, unknown>[]) {
  let n = 0
  const field = collection === 'gallery' ? 'slug' : collection === 'news' ? 'slug' : collection === 'faculty' ? 'name' : 'title'
  for (const sample of samples) {
    const existing = await findOne<Record<string, unknown>>(collection, { [field]: sample[field] })
    if (!existing) {
      // New sample albums are only added while the gallery still holds nothing but samples.
      if (collection === 'gallery') {
        const { docs } = await findMany<{ photos?: { url: string }[] }>('gallery', { limit: 500 })
        const onlySamples = docs.every((d) => (d.photos ?? []).every((p) => p.url.startsWith('/images/')))
        if (onlySamples) {
          await insertDoc('gallery', sample)
          n++
        }
      }
      continue
    }
    const patch: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(sample)) {
      if (isImage(value) && isEmpty(existing[key])) patch[key] = value
      if (key === 'photos' && Array.isArray(value)) {
        const cur = (existing.photos as { url: string }[] | undefined) ?? []
        if (cur.length <= 1 && cur.every((p) => p.url.startsWith('/images/')) && value.length > cur.length) patch.photos = value
      }
    }
    if (collection === 'news' && isImage(sample.cover) && isImage(existing.cover) && existing.cover.url === campusMedia.url && sample.cover.url !== campusMedia.url) {
      patch.cover = sample.cover
    }
    if (Object.keys(patch).length) {
      await updateDoc(collection, String(existing.id), patch)
      n++
    }
  }
  return n
}
