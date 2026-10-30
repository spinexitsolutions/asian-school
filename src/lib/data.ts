import 'server-only'

import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Filter, Document, Sort } from 'mongodb'

import { getCollection } from '@/cms/schema'
import type { Album, Application, Career, Download, Facility, Faculty, News, Notice, Page, Testimonial, Topper, TransferCertificate } from '@/cms/types'
import {
  defaultAbout,
  defaultAcademics,
  defaultAdmissions,
  defaultAlbums,
  defaultCareers,
  defaultDisclosure,
  defaultDownloads,
  defaultSchoolInfo,
  defaultTransport,
  defaultFacilities,
  defaultFaculty,
  defaultHome,
  defaultNews,
  defaultNotices,
  defaultSettings,
  defaultTestimonials,
  defaultToppers,
  defaultSitePages,
} from '@/content/defaults'
import { sitePages } from '@/cms/blocks'
import { count, findMany, findOne, getGlobalDoc } from './db'

/**
 * Fill empty CMS fields from defaults. A value counts as empty when it is
 * null/undefined, a blank string, or an empty array.
 */
function withDefaults<D extends object>(data: Record<string, unknown> | null | undefined, defaults: D): D & Record<string, unknown> {
  const out = { ...defaults } as Record<string, unknown>
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      const empty = value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)
      if (!empty) out[key] = value
    }
  }
  return out as D & Record<string, unknown>
}

async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (err) {
    console.error(`[data] ${label} failed, using fallback:`, (err as Error).message)
    return fallback
  }
}

const global = (slug: string) => safe(`global ${slug}`, () => getGlobalDoc<Record<string, unknown>>(slug), null)

export const getSettings = cache(async () => {
  const data = await global('site-settings')
  // Checkboxes are real choices: keep `false` when staff turned them off.
  const settings = withDefaults(data, defaultSettings)
  settings.popupEnabled = (data?.popupEnabled as boolean | undefined) ?? defaultSettings.popupEnabled
  return settings
})
export const getHome = cache(async () => withDefaults(await global('home-page'), defaultHome))
export const getAbout = cache(async () => withDefaults(await global('about-page'), defaultAbout))
export const getAcademics = cache(async () => withDefaults(await global('academics-page'), defaultAcademics))
export const getAdmissions = cache(async () => withDefaults(await global('admissions-page'), defaultAdmissions))
export const getDisclosure = cache(async () => withDefaults(await global('disclosure'), defaultDisclosure))

export const getSitePages = cache(async () => withDefaults(await global('site-pages'), defaultSitePages))

/** Banner heading and intro of a page. Shows "Page not found" when staff turned the page off. */
export async function getPage(key: string) {
  const p = await getSitePages()
  if (p[`${key}Enabled`] === false) notFound()
  return { title: String(p[`${key}Title`] ?? ''), intro: String(p[`${key}Intro`] ?? '') }
}

/** Paths of pages that staff turned off (used to hide menu links). */
export const getHiddenPaths = cache(async () => {
  const p = await getSitePages()
  return sitePages.filter((x) => p[`${x.key}Enabled`] === false).map((x) => x.path)
})

const isImage = (v: unknown) => Boolean(v && typeof v === 'object' && 'url' in v && (v as { url: unknown }).url)
const isBlank = (v: unknown) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
const sampleKey = (o: object) => {
  const r = o as Record<string, unknown>
  return String(r.slug ?? r.title ?? r.name ?? '')
}

/**
 * Records created from the samples (by the seed or an older version) may have
 * empty photo fields. Show the bundled sample photo there until staff upload one.
 */
function withSamplePhotos<T extends object>(docs: T[], samples: T[]): T[] {
  return docs.map((doc) => {
    const sample = samples.find((x) => sampleKey(x) && sampleKey(x) === sampleKey(doc)) as Record<string, unknown> | undefined
    if (!sample) return doc
    const out = { ...doc } as Record<string, unknown>
    for (const [key, value] of Object.entries(sample)) {
      const photoList = Array.isArray(value) && value.length > 0 && value.every(isImage)
      if ((isImage(value) || photoList) && isBlank(out[key])) out[key] = value
    }
    return out as T
  })
}

type ListOpts = { filter?: Filter<Document>; limit?: number; sort?: Sort; page?: number }

/**
 * Public list query. Applies the collection's public filter (e.g. hides
 * drafts). While a collection has never had anything added, sample records
 * are shown so the website never looks empty.
 */
async function list<T extends object>(slug: string, samples: T[], { filter = {}, limit = 100, sort, page = 1 }: ListOpts = {}) {
  const def = getCollection(slug)
  const where = { ...(def?.publicFilter ?? {}), ...filter }
  return safe(
    `list ${slug}`,
    async () => {
      const res = await findMany<T>(slug, { filter: where, sort: sort ?? def?.sort, limit, skip: (page - 1) * limit })
      if (res.total === 0 && (await count(slug)) === 0) return sampleResult(samples, limit, page)
      return { docs: withSamplePhotos(res.docs, samples), totalPages: Math.max(1, Math.ceil(res.total / limit)), page }
    },
    sampleResult(samples, limit, page),
  )
}

function sampleResult<T extends object>(samples: T[], limit: number, page: number) {
  return { docs: samples.slice((page - 1) * limit, page * limit), totalPages: Math.max(1, Math.ceil(samples.length / limit)), page }
}

export const getNotices = (limit = 50) => list<Notice>('notices', defaultNotices as Notice[], { limit })
export const getNews = (opts: { limit?: number; category?: string; page?: number } = {}) =>
  list<News>(
    'news',
    (defaultNews as News[]).filter((n) => !opts.category || n.category === opts.category),
    { limit: opts.limit ?? 12, page: opts.page, filter: opts.category ? { category: opts.category } : {} },
  )
export const getNewsBySlug = cache(async (slug: string) => {
  const doc = await safe('news by slug', () => findOne<News>('news', { slug, status: { $ne: 'draft' } }), null)
  if (doc) return withSamplePhotos([doc], defaultNews as News[])[0]
  return (await getNews({ limit: 100 })).docs.find((n) => n.slug === slug) ?? null
})
export const getAlbums = (limit = 60) => list<Album>('gallery', defaultAlbums as Album[], { limit })
export const getAlbumBySlug = cache(async (slug: string) => {
  const doc = await safe('album by slug', () => findOne<Album>('gallery', { slug }), null)
  if (doc) return withSamplePhotos([doc], defaultAlbums as Album[])[0]
  return (await getAlbums()).docs.find((a) => a.slug === slug) ?? null
})
export const getFaculty = () => list<Faculty>('faculty', defaultFaculty as Faculty[], { limit: 300 })
export const getToppers = () => list<Topper>('toppers', defaultToppers as Topper[], { limit: 200 })
export const getTestimonials = () => list<Testimonial>('testimonials', defaultTestimonials as Testimonial[], { limit: 12 })
export const getFacilities = () =>
  list<Facility>('facilities', defaultFacilities.map((f, i) => ({ ...f, id: `fa${i}`, points: f.points.map((text) => ({ text })) })) as Facility[], {
    limit: 50,
  })
export const getCareers = () => list<Career>('careers', defaultCareers as Career[], { limit: 50 })
export const getPageBySlug = cache(async (slug: string) => safe('page by slug', () => findOne<Page>('pages', { slug, status: { $ne: 'draft' } }), null))
export const getTransferCertificates = (admissionNo: string) =>
  safe(
    'tc search',
    async () =>
      (await findMany<TransferCertificate>('transfer-certificates', { filter: { admissionNo: admissionNo.trim() }, limit: 5, sort: { issueDate: -1 } })).docs,
    [] as TransferCertificate[],
  )
export const getTransport = cache(async () => withDefaults(await global('transport-page'), defaultTransport))
export const getSchoolInfo = cache(async () => withDefaults(await global('school-info'), defaultSchoolInfo))
export const getDownloads = () => list<Download>('downloads', defaultDownloads as Download[], { limit: 200 })
export const getApplication = (applicationNo: string, token: string) =>
  safe('application', () => findOne<Application>('applications', { applicationNo, token }), null)
