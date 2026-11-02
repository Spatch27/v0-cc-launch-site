import { buildLlmsTxt, type LlmsInsightArticle } from "@/lib/llms-txt"
import { sanityClient } from "@/lib/sanity/client"
import { insightLlmsQuery } from "@/lib/sanity/queries"

/** Refresh hourly. Published reads only; this route never checks draft mode. */
export const revalidate = 3600

export async function GET() {
  let articles: LlmsInsightArticle[] = []

  try {
    const result = await sanityClient.fetch<LlmsInsightArticle[] | null>(
      insightLlmsQuery,
      {},
      { next: { revalidate: 3600 } },
    )
    articles = result ?? []
  } catch (error) {
    console.error("llms.txt: published insight fetch failed; using the previous hand-written list", error)
  }

  return new Response(buildLlmsTxt(articles), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
