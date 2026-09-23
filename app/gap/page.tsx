import type { Metadata } from "next"
import { GapForm } from "@/components/gap/gap-form"
import { absoluteUrl, brandedTitle, canonicalAlternates } from "@/lib/seo"

const title = "The gap between your marketing and the one AI makes possible."
const description =
  "Four questions, two minutes. Within two working days we’ll send you a short personal video: our initial read on the opportunity, what may be getting in the way, and where we’d begin."

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
