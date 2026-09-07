import type { Metadata } from "next"
import { GapForm } from "@/components/gap/gap-form"
import { absoluteUrl, brandedTitle, canonicalAlternates } from "@/lib/seo"

const title = "Where's the gap in your marketing?"
const description =
  "Four questions, two minutes. Within a couple of days we'll send you a short video: how big we think that gap is, three things we think are holding it there, and where we'd start."

export const metadata: Metadata = {
  title,
  description,
  alternates: canonicalAlternates("/gap"),
  openGraph: {
    title: brandedTitle(title),
    description,
    url: absoluteUrl("/gap"),
    type: "website",
    images: [
      {
        url: "/gap-og-card.png",
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
    images: ["/gap-og-card.png"],
  },
}

export default function GapPage() {
  return <GapForm />
}
