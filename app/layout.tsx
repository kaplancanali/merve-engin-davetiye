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

const title = 'Merve & Engin'
const description = 'Sizin için bir mesaj var. Açmak için tıklayın.'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://merve-engin-davetiye.vercel.app',
  ),
  title,
  description,
  openGraph: {
    title: 'Merve & Engin',
    description: 'Sizin için bir mesaj var. Açmak için tıklayın.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Merve & Engin',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Merve & Engin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merve & Engin',
    description: 'Sizin için bir mesaj var. Açmak için tıklayın.',
    images: ['/og-preview.png'],
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
