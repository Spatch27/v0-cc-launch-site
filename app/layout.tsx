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
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
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
      <head>
        {/* Google Consent Mode - must load before gtag.js */}
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
          data-cookieconsent="ignore"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("consent", "default", {
              ad_personalization: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              analytics_storage: "denied",
              functionality_storage: "denied",
              personalization_storage: "denied",
              security_storage: "granted",
              wait_for_update: 500,
            });
            gtag("set", "ads_data_redaction", true);
            gtag("set", "url_passthrough", false);
          `}
        </Script>
        {/* Apollo website visitor tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"69d6846b942e8400112c103f"})},
              document.head.appendChild(o)}initApollo();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* No-JavaScript fallback: show navigation and content notice */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `
            /* When JS is disabled, show all content that would normally be lazy-loaded or animated */
            .js-lazy-hidden { display: block !important; }
            .noscript-visible { min-height: auto !important; }
            
            /* Reset all Framer Motion initial states - make everything visible */
            /* Framer Motion sets inline styles for opacity and transform on initial render */
            [style*="opacity: 0"], 
            [style*="opacity:0"] { opacity: 1 !important; }
            [style*="transform"] { transform: none !important; }
            
            /* Ensure all motion.div, motion.section, etc. are visible */
            /* These may have hidden initial states */
            div[style], section[style], span[style], p[style], h1[style], h2[style], h3[style] {
              opacity: 1 !important;
              transform: none !important;
            }
            
            /* CSS animations should still work, so we keep those */
            .animate-fade-in-up { opacity: 1 !important; animation: none !important; }
            .animation-delay-200, .animation-delay-400 { opacity: 1 !important; animation: none !important; }
          `}} />
          <div className="noscript-banner">
            This site works best with JavaScript enabled. Some interactive features may be limited.
          </div>
          <nav className="noscript-nav" aria-label="Main navigation (no JavaScript)">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/approach">Approach</a></li>
              <li><a href="/outcomes">Outcomes</a></li>
              <li><a href="/insights">Insights</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </noscript>
        {/* Cookiebot CMP */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="bc3d8b4b-cf51-4f81-a255-e89443188c10"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="afterInteractive"
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
