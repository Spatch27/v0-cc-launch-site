import type { Metadata } from "next"
import { InsightsListing } from "@/components/insights/insights-listing"
import { getInsightListing } from "@/lib/sanity/insights"
import { canonicalAlternates } from "@/lib/seo"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Marketing Operations Insights | Thinking that Drives Action",
  description:
    "Short pieces on how marketing work gets done, where AI makes it better, and what the marketing function of the future looks like. Written by practitioners, not theorists.",
  alternates: canonicalAlternates("/insights"),
  openGraph: {
    title: "Insights | Committed Citizens",
    description: "Thinking that drives action. Insights on marketing work, AI, and the function of the future — from practitioners, not theorists.",
    url: "https://www.committedcitizens.co.uk/insights",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens - Insights",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Committed Citizens",
    description: "Thinking that drives action. Insights on marketing work, AI, and the function of the future — from practitioners, not theorists.",
    images: ["/og-image.jpg"],
  },
}

export default async function InsightsPage() {
  const { featured, remaining } = await getInsightListing()

  return <InsightsListing featured={featured} remainingArticles={remaining} />
}
