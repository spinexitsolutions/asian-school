import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource-variable/plus-jakarta-sans'
import './admin.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin Panel', template: '%s · Admin · The Asian International School' },
  robots: { index: false, follow: false },
  icons: { icon: '/images/logo.png' },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
