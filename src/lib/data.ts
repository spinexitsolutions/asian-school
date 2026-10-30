import 'server-only'

import config from '@payload-config'
import { cache } from 'react'
import { getPayload, type CollectionSlug, type Where } from 'payload'

import {
  defaultAbout,
  defaultAcademics,
  defaultAdmissions,
  defaultDisclosure,
  defaultHome,
  defaultSettings,
} from '@/content/defaults'
import type {
  AboutPage,
  AcademicsPage,
  AdmissionsPage,
  Career,
  Disclosure,
  Facility,
  Faculty,
  Gallery,
  HomePage,
  News,
  Notice,
  Page,
  SiteSetting,
  Testimonial,
  Topper,
  TransferCertificate,
} from '@/payload-types'

export const getPayloadClient = cache(() => getPayload({ config }))

/**
 * Fill empty CMS fields from defaults. A value counts as empty when it is
 * null/undefined, a blank string, or an empty array.
 */
function withDefaults<T extends object, D extends object>(data: T | null | undefined, defaults: D): D & T {
  const out = { ...defaults } as Record<string, unknown>
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      const empty =
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      if (!empty) out[key] = value
    }
  }
  return out as D & T
}

async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (err) {
    console.error(`[data] ${label} failed, using fallback:`, (err as Error).message)
    return fallback
  }
}

const findGlobal = <T>(slug: Parameters<Awaited<ReturnType<typeof getPayloadClient>>['findGlobal']>[0]['slug']) =>
  safe<T | null>(
    `global ${slug}`,
    async () => (await getPayloadClient()).findGlobal({ slug, depth: 2 }) as Promise<T>,
    null,
  )

export const getSettings = cache(async () => withDefaults(await findGlobal<SiteSetting>('site-settings'), defaultSettings))
export const getHome = cache(async () => withDefaults(await findGlobal<HomePage>('home-page'), defaultHome))
export const getAbout = cache(async () => withDefaults(await findGlobal<AboutPage>('about-page'), defaultAbout))
export const getAcademics = cache(async () =>
  withDefaults(await findGlobal<AcademicsPage>('academics-page'), defaultAcademics),
)
export const getAdmissions = cache(async () =>
  withDefaults(await findGlobal<AdmissionsPage>('admissions-page'), defaultAdmissions),
)
export const getDisclosure = cache(async () => {
  const data = await findGlobal<Disclosure>('disclosure')
  // `enabled` is a real choice, not an empty field, so keep false when staff set it.
  return { ...withDefaults(data, defaultDisclosure), enabled: data?.enabled ?? true }
})

type ListArgs = { where?: Where; limit?: number; sort?: string; page?: number }

async function list<T>(collection: CollectionSlug, { where, limit = 100, sort, page }: ListArgs = {}) {
  return safe(
    `list ${collection}`,
    async () => {
      const res = await (await getPayloadClient()).find({ collection, where, limit, sort, page, depth: 2 })
      return { docs: res.docs as T[], totalPages: res.totalPages, page: res.page ?? 1 }
    },
    { docs: [] as T[], totalPages: 1, page: 1 },
  )
}

const published: Where = { _status: { equals: 'published' } }

export const getNotices = (limit = 50) => list<Notice>('notices', { limit, sort: '-date' })
export const getPinnedNotices = () => list<Notice>('notices', { where: { pinned: { equals: true } }, limit: 8, sort: '-date' })
export const getNews = (opts: { limit?: number; category?: string; page?: number } = {}) =>
  list<News>('news', {
    limit: opts.limit ?? 12,
    page: opts.page,
    sort: '-date',
    where: opts.category ? { and: [published, { category: { equals: opts.category } }] } : published,
  })
export const getNewsBySlug = cache(async (slug: string) => {
  const res = await list<News>('news', { where: { and: [published, { slug: { equals: slug } }] }, limit: 1 })
  return res.docs[0] ?? null
})
export const getAlbums = (limit = 60) => list<Gallery>('gallery', { limit, sort: '-date' })
export const getAlbumBySlug = cache(async (slug: string) => {
  const res = await list<Gallery>('gallery', { where: { slug: { equals: slug } }, limit: 1 })
  return res.docs[0] ?? null
})
export const getFaculty = () => list<Faculty>('faculty', { limit: 300, sort: 'order' })
export const getToppers = (featuredOnly = false) =>
  list<Topper>('toppers', { limit: 120, sort: 'rank', where: featuredOnly ? { featured: { equals: true } } : undefined })
export const getTestimonials = () => list<Testimonial>('testimonials', { limit: 12 })
export const getFacilities = () => list<Facility>('facilities', { limit: 50, sort: 'order' })
export const getCareers = () => list<Career>('careers', { limit: 50, where: { open: { equals: true } } })
export const getPageBySlug = cache(async (slug: string) => {
  const res = await list<Page>('pages', { where: { and: [published, { slug: { equals: slug } }] }, limit: 1 })
  return res.docs[0] ?? null
})
export const getTransferCertificates = (admissionNo: string) =>
  list<TransferCertificate>('transfer-certificates', {
    where: { admissionNo: { equals: admissionNo.trim() } },
    limit: 5,
    sort: '-issueDate',
  })
