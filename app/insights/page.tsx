import type { Metadata } from "next"
import { InsightsListing } from "@/components/insights/insights-listing"
import { createClient } from "@/lib/prismicio"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership from Committed Citizens. Original thinking on marketing operations, transformation, and operational drag.",
}

export default async function InsightsPage() {
  const client = createClient()
  const articles = await client.getAllByType("insight_article", {
    orderings: [{ field: "my.insight_article.publication_date", direction: "desc" }],
  })

  return <InsightsListing articles={articles} />
}
