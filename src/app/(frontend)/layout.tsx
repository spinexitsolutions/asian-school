import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource-variable/plus-jakarta-sans'
import './globals.css'

import type { Metadata, Viewport } from 'next'

import { AdmissionPopup } from '@/components/AdmissionPopup'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Intro } from '@/components/Intro'
import { RevealObserver } from '@/components/RevealObserver'
import { SmoothScroll } from '@/components/SmoothScroll'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { fallbackImages } from '@/content/defaults'
import { getHiddenPaths, getSettings } from '@/lib/data'
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
  const [s, hidden] = await Promise.all([getSettings(), getHiddenPaths()])
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
    <html lang="en-IN" suppressHydrationWarning>
      <body className="min-h-[100dvh]">
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('ais-intro-seen'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <Intro schoolName={s.schoolName} logoUrl={logoUrl} />
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
          hidden={hidden}
        />
        <main>{children}</main>
        <Footer s={s} logoUrl={logoUrl} hidden={hidden} />
        <WhatsAppButton number={s.whatsapp} />
        {s.popupEnabled && (
          <AdmissionPopup
            badge={s.popupBadge}
            title={s.popupTitle}
            text={s.popupText}
            phone={s.phone}
            imageUrl={img(s.popupImage)?.url ?? fallbackImages.campus}
          />
        )}
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  )
}
