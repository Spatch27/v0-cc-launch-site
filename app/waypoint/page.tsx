import type { Metadata } from "next"
import { WaypointHero } from "@/components/waypoint/waypoint-hero"
import { WaypointInterview } from "@/components/waypoint/waypoint-interview"
import { absoluteUrl, brandedTitle, canonicalAlternates } from "@/lib/seo"

const title = "Talk through the gap in your marketing"
const description =
  "A spoken conversation about the marketing function you have, the one you’ll need next, and the project that can’t wait. Spell anything we get wrong. We’ll send a short personal video with our initial read and where we’d begin."

export const metadata: Metadata = {
  title,
  description,
  alternates: canonicalAlternates("/waypoint"),
  openGraph: {
    title: brandedTitle(title),
    description,
    url: absoluteUrl("/waypoint"),
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: brandedTitle(title),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandedTitle(title),
    description,
    images: ["/og-image.jpg"],
  },
}

export default function WaypointPage() {
  return (
    <>
      <WaypointHero />
      <WaypointInterview />
    </>
  )
}
