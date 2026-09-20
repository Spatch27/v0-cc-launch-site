import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { DeferredHomeSections } from "@/components/home/deferred-sections"
import { canonicalAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    absolute: "Marketing Operations Consultancy | Committed Citizens",
  },
  description:
    "We help CMOs build a stronger marketing function with AI. We redesign how work happens, and leave your team better equipped to own and improve it.",
  alternates: canonicalAlternates("/"),
  openGraph: {
    title: "Bolder work in the world | Committed Citizens",
    description:
      "We help CMOs build a stronger marketing function with AI. We redesign how work happens, and leave your team better equipped to own and improve it.",
    url: "https://www.committedcitizens.co.uk",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens — Bolder work in the world. Less work to put it there.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolder work in the world | Committed Citizens",
    description:
      "We help CMOs build a stronger marketing function with AI. We redesign how work happens, and leave your team better equipped to own and improve it.",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Above the fold - render immediately for fast LCP */}
      <HeroSection />

      {/* Lower sections load shortly before scrolling into view. */}
      <DeferredHomeSections />
    </>
  )
}
