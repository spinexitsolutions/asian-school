import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import './globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'

import { Announcement } from '@/components/Announcement'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { RevealObserver } from '@/components/RevealObserver'
import { SmoothScroll } from '@/components/SmoothScroll'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getSettings } from '@/lib/data'
import { img } from '@/lib/media'

export const revalidate = 300

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  const og = img(s.ogImage)
  const name = `${s.schoolName}, ${s.location ?? 'Chomu'}`
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${name} — ${s.tagline}`, template: `%s · ${name}` },
    description: s.metaDescription,
    icons: { icon: img(s.logo)?.url ?? '/crest.svg' },
    openGraph: { siteName: name, type: 'website', locale: 'en_IN', images: og ? [og.url] : undefined },
  }
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings()
  const showAnnouncement = Boolean(s.announcementEnabled && s.announcementText)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: s.schoolName,
    url: siteUrl,
    telephone: s.phone,
    email: s.email,
    address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: 'Chomu', addressRegion: 'Rajasthan', addressCountry: 'IN' },
    logo: img(s.logo)?.url,
  }

  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-[100dvh]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {showAnnouncement && <Announcement text={s.announcementText!} href={s.announcementLink} />}
        <Nav
          schoolName={s.schoolName}
          location={s.location}
          logoUrl={img(s.logo)?.url}
          phone={s.phone}
          hasAnnouncement={showAnnouncement}
        />
        <main>{children}</main>
        <Footer s={s} />
        <WhatsAppButton number={s.whatsapp} />
        <div className="grain" aria-hidden />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  )
}
