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
  metadataBase: new URL('https://committedcitizens.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Committed Citizens',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-76PXVCGPES"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-76PXVCGPES');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
