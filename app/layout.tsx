import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
})

const title = 'Merve & Engin | Dijital Davetiye'
const description =
  'Merve & Engin düğün davetiyesi. 08 Ağustos 2026, Ankara Şeker Fabrikası Sosyal Tesisleri.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Merve & Engin Düğün Davetiyesi',
    images: [
      {
        url: '/floral-bouquet.png',
        width: 1200,
        height: 630,
        alt: 'Merve & Engin Düğün Davetiyesi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/floral-bouquet.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdfdf9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${greatVibes.variable}`}
    >
      <body className="font-serif antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
