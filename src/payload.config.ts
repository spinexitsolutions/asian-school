import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  Careers,
  Documents,
  Enquiries,
  Facilities,
  Faculty,
  Gallery,
  Media,
  News,
  Notices,
  Pages,
  Testimonials,
  Toppers,
  TransferCertificates,
  Users,
} from './collections'
import { AboutPage, AcademicsPage, AdmissionsPage, Disclosure, HomePage, SiteSettings } from './globals'
import { cloudinaryAdapter } from './lib/cloudinaryAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Asian International School Admin',
      icons: [{ rel: 'icon', type: 'image/png', url: '/images/logo.png' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo',
        Icon: '@/components/admin/AdminIcon',
      },
      beforeDashboard: ['@/components/admin/Welcome'],
    },
  },
  collections: [
    Enquiries,
    Notices,
    News,
    Gallery,
    Faculty,
    Toppers,
    Testimonials,
    Facilities,
    Careers,
    TransferCertificates,
    Pages,
    Media,
    Documents,
    Users,
  ],
  globals: [HomePage, AboutPage, AcademicsPage, AdmissionsPage, Disclosure, SiteSettings],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    // Some MongoDB-compatible servers (and Atlas free tier on rare occasions) lack transactions.
    ...(process.env.DB_DISABLE_TRANSACTIONS ? { transactionOptions: false as const } : {}),
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM || process.env.SMTP_USER || '',
        defaultFromName: 'The Asian International School Website',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  plugins: [
    cloudStoragePlugin({
      enabled: useCloudinary,
      collections: {
        media: { adapter: cloudinaryAdapter({ folder: 'asian-school' }), disablePayloadAccessControl: true },
        documents: { adapter: cloudinaryAdapter({ folder: 'asian-school' }), disablePayloadAccessControl: true },
      },
    }),
    seoPlugin({
      collections: ['news', 'pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${(doc as { title?: string })?.title ?? ''} · The Asian International School, Chomu`,
      generateDescription: ({ doc }) => (doc as { excerpt?: string; intro?: string })?.excerpt ?? (doc as { intro?: string })?.intro ?? '',
    }),
  ],
})
