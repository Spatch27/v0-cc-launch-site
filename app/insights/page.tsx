import type { Metadata } from "next"
import { InsightsListing } from "@/components/insights/insights-listing"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership from Committed Citizens. Original thinking on marketing operations, transformation, and operational drag.",
}

export default function InsightsPage() {
  return <InsightsListing />
}
