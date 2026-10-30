import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource-variable/plus-jakarta-sans'
import './globals.css'

import type { Metadata, Viewport } from 'next'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RevealObserver } from '@/components/RevealObserver'
import { SmoothScroll } from '@/components/SmoothScroll'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { fallbackImages } from '@/content/defaults'
import { getSettings } from '@/lib/data'
import { img } from '@/lib/media'

export const revalidate = 300

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  const og = img(s.ogImage)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${s.schoolName}, Chomu – CBSE School in Chomu, Jaipur`, template: `%s | ${s.schoolName}, Chomu` },
    description: s.metaDescription,
    icons: { icon: img(s.logo)?.url ?? fallbackImages.logo },
    openGraph: {
      siteName: s.schoolName,
      type: 'website',
      locale: 'en_IN',
      images: [og?.url ?? fallbackImages.campus],
    },
  }
}

export const viewport: Viewport = { themeColor: '#0b2257' }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings()
  const logoUrl = img(s.logo)?.url ?? fallbackImages.logo

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: s.schoolName,
    url: siteUrl,
    logo: new URL(logoUrl, siteUrl).toString(),
    telephone: s.phone,
    email: s.email,
    foundingDate: s.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address,
      addressLocality: 'Chomu',
      addressRegion: 'Rajasthan',
      postalCode: '303704',
      addressCountry: 'IN',
    },
  }

  return (
    <html lang="en-IN">
      <body className="min-h-[100dvh]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header
          schoolName={s.schoolName}
          location={s.location}
          logoUrl={logoUrl}
          phone={s.phone}
          altPhone={s.altPhone}
          email={s.email}
          topbarText={s.topbarText}
          socials={{ facebook: s.facebook, instagram: s.instagram, youtube: s.youtube, x: s.x }}
        />
        <main>{children}</main>
        <Footer s={s} logoUrl={logoUrl} />
        <WhatsAppButton number={s.whatsapp} />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  )
}
