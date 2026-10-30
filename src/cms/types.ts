/** Shapes of documents stored by the admin panel (MongoDB). */

export type Media = {
  url: string
  thumb?: string
  alt?: string
  width?: number
  height?: number
  name?: string
  size?: number
  type?: string
}

export type FileRef = { url: string; name?: string; size?: number; type?: string }

type Doc = { id: string; createdAt?: string; updatedAt?: string }

export type Notice = Doc & { title: string; date: string; category?: string; details?: string; attachment?: FileRef | null; pinned?: boolean }
export type News = Doc & {
  title: string
  slug: string
  category: string
  date: string
  venue?: string
  status?: string
  cover?: Media | null
  excerpt?: string
  content?: string
  metaDescription?: string
}
export type Album = Doc & { title: string; slug: string; date?: string; category?: string; photos?: Media[]; videos?: { url: string }[] }
export type Topper = Doc & { name: string; className: string; score: string; year: string; photo?: Media | null; inHero?: boolean; featured?: boolean; rank?: number }
export type Faculty = Doc & { name: string; designation: string; department?: string; qualification?: string; experience?: string; order?: number; photo?: Media | null }
export type Facility = Doc & { title: string; summary: string; icon?: string; image?: Media | null; points?: { text: string }[]; order?: number }
export type Testimonial = Doc & { quote: string; name: string; relation?: string; photo?: Media | null }
export type Career = Doc & { title: string; department?: string; type?: string; requirements?: string; open?: boolean }
export type TransferCertificate = Doc & { studentName: string; admissionNo: string; tcNo?: string; issueDate?: string; file?: FileRef | null }
export type Page = Doc & {
  title: string
  slug: string
  status?: string
  intro?: string
  infoRows?: { label: string; value?: string; file?: FileRef | null }[]
  content?: string
}
export type User = Doc & { name: string; email: string; role: 'admin' | 'editor' }
