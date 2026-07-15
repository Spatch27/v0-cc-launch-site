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
  metadataBase: new URL('https://www.committedcitizens.co.uk'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Committed Citizens',
    title: 'Committed Citizens | Freedom from drag',
    description: 'We redesign how marketing work flows. An embedded consultancy that helps CMOs remove operational drag from their marketing teams.',
    url: 'https://www.committedcitizens.co.uk',
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
        {/* Critical CSS - Inline for LCP optimization (eliminates render-blocking stylesheet) */}
        <style dangerouslySetInnerHTML={{ __html: `:root {
  --brand-dark: #181716;
  --brand-pink: #fc66a7;
  --brand-orange: #ff8600;
  --brand-light: #e3dcdc;
  --brand-yellow-light: #ffeb3e;
  --brand-yellow-deep: #ffd100;
  --brand-white: #ffffff;
  --brand-grey: #9a9490;
  --background: #e3dcdc;
  --foreground: #181716;
  --card: #ffffff;
  --card-foreground: #181716;
  --border: #cbc4c4;
  --radius: 0rem;
}

html {
  position: relative;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: clip;
}

body {
  background: var(--background);
  color: var(--foreground);
  overflow-x: clip;
  margin: 0;
  padding: 0;
}

* {
  border-color: var(--border);
  outline-color: var(--brand-pink);
}

#CookiebotWidget {
  display: none !important;
}

nav {
  background: var(--brand-dark);
  color: var(--brand-white);
  padding: 0;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  padding: 0;
}

p {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.text-balance {
  text-wrap: balance;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-8 {
  gap: 2rem;
}

.gap-12 {
  gap: 3rem;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.w-full {
  width: 100%;
}

.max-w-4xl {
  max-width: 56rem;
}

.bg-brand-light {
  background-color: var(--brand-light);
}

.bg-brand-white {
  background-color: var(--brand-white);
}

.bg-brand-dark {
  background-color: var(--brand-dark);
}

.bg-brand-yellow-light {
  background-color: var(--brand-yellow-light);
}

.text-brand-dark {
  color: var(--brand-dark);
}

.text-brand-white {
  color: var(--brand-white);
}

.text-brand-grey {
  color: var(--brand-grey);
}

.text-sm {
  font-size: 0.875rem;
}

.text-base {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-6xl {
  font-size: 3.75rem;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.font-display {
  font-family: 'Bricolage Grotesque', sans-serif;
}

.leading-relaxed {
  line-height: 1.625;
}

.leading-snug {
  line-height: 1.375;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.hidden {
  display: none;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.relative {
  position: relative;
}

.group {
  position: relative;
}

.z-50 {
  z-index: 50;
}

.fixed {
  position: fixed;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.max-w-5xl {
  max-width: 64rem;
}

.max-w-[1400px] {
  max-width: 1400px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.h-10 {
  height: 2.5rem;
}

.h-12 {
  height: 3rem;
}

.w-auto {
  width: auto;
}

.h-auto {
  height: auto;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
}

.bg-brand-light\/20 {
  background-color: rgba(227, 220, 220, 0.2);
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media (min-width: 768px) {
  .md\\:text-2xl {
    font-size: 1.5rem;
  }
  
  .md\\:text-3xl {
    font-size: 1.875rem;
  }
  
  .md\\:text-4xl {
    font-size: 2.25rem;
  }
  
  .md\\:text-5xl {
    font-size: 3rem;
  }
  
  .md\\:text-6xl {
    font-size: 3.75rem;
  }
  
  .md\\:text-7xl {
    font-size: 4.5rem;
  }
  
  .md\\:px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  
  .md\\:py-16 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .md\\:gap-8 {
    gap: 2rem;
  }
  
  .md\\:flex-row {
    flex-direction: row;
  }
  
  .md\\:hidden {
    display: none;
  }
}

@media (min-width: 1024px) {
  .lg\\:px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  
  .lg\\:py-32 {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  
  .lg\\:text-6xl {
    font-size: 3.75rem;
  }
  
  .lg\\:text-7xl {
    font-size: 4.5rem;
  }
  
  .lg\\:text-8xl {
    font-size: 6rem;
  }
  
  .lg\\:text-9xl {
    font-size: 8rem;
  }
  
  .lg\\:gap-12 {
    gap: 3rem;
  }
  
  .lg\\:flex-row {
    flex-direction: row;
  }
  
  .lg\\:hidden {
    display: none;
  }
  
  .lg\\:block {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}` }} />
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Committed Citizens",
              url: "https://www.committedcitizens.co.uk",
              logo: "https://committedcitizens.co.uk/logo.png",
              description: "Marketing operations and transformation consultancy helping CMOs remove operational drag and build sustainable marketing workflows.",
              sameAs: [
                "https://www.linkedin.com/company/committed-citizens",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "GB",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                url: "https://www.committedcitizens.co.uk/contact",
              },
            }),
          }}
        />
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
          src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js"
          async
          defer
          data-app-id="69d6846b942e8400112c103f"
        ></script>
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
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://consent.cookiebot.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.supabase.co" />
        {/* Cookiebot CMP - deferred to improve LCP */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="bc3d8b4b-cf51-4f81-a255-e89443188c10"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="lazyOnload"
        />
        {/* Google tag (gtag.js) - deferred to reduce blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-76PXVCGPES"
          strategy="lazyOnload"
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
