import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Committed Citizens | Freedom from drag',
    template: '%s | Committed Citizens',
  },
  description:
    'We redesign how marketing work flows. An embedded consultancy that helps CMOs remove operational drag from their marketing teams.',
  applicationName: 'Committed Citizens',
  metadataBase: new URL('https://committedcitizens.co.uk'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Committed Citizens',
    title: 'Committed Citizens | Freedom from drag',
    description: 'We redesign how marketing work flows. An embedded consultancy that helps CMOs remove operational drag from their marketing teams.',
    url: 'https://committedcitizens.co.uk',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Committed Citizens - Freedom from drag',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Committed Citizens | Freedom from drag',
    description: 'We redesign how marketing work flows. An embedded consultancy that helps CMOs remove operational drag from their marketing teams.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        {/* Cookiebot CMP - lazyOnload to improve LCP while maintaining GDPR compliance */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="bc3d8b4b-cf51-4f81-a255-e89443188c10"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="lazyOnload"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-76PXVCGPES"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-76PXVCGPES');
          `}
        </Script>
        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
