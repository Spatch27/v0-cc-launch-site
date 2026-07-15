import type { Metadata } from "next"
import { InsightsListing } from "@/components/insights/insights-listing"

export const metadata: Metadata = {
  title: "Marketing Operations Insights & Thought Leadership",
  description:
    "Articles on marketing transformation, operations consulting, and removing workflow inefficiencies. Expert insights on building efficient marketing teams and sustainable operational change.",
  openGraph: {
    title: "Insights | Committed Citizens",
    description: "Thought leadership from Committed Citizens. Original thinking on marketing operations, transformation, and operational drag.",
    url: "https://committedcitizens.co.uk/insights",
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
    description: "Thought leadership from Committed Citizens. Original thinking on marketing operations, transformation, and operational drag.",
    images: ["/og-image.jpg"],
  },
}

export default function InsightsPage() {
  return <InsightsListing />
}
