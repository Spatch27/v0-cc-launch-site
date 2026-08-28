import type {InsightListingArticle} from "@/lib/insight-articles"
import {formatInsightMonthYear} from "@/lib/insight-articles"
import {sanityClient, sanityFetchOptions} from "./client"
import {
  insightBySlugQuery,
  insightListingQuery,
  insightSitemapQuery,
  insightSlugsQuery,
} from "./queries"
import type {
  SanityInsightArticle,
  SanityInsightListingDoc,
  SanityInsightSitemapDoc,
} from "./types"

function toListingArticle(doc: SanityInsightListingDoc): InsightListingArticle {
  return {
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: formatInsightMonthYear(doc.publishedAt),
    readTime: doc.readTime,
    image: doc.image || "",
  }
}

export async function getInsightListing(): Promise<{
  featured: InsightListingArticle | null
  remaining: InsightListingArticle[]
}> {
  const docs = await sanityClient.fetch<SanityInsightListingDoc[]>(
    insightListingQuery,
    {},
    sanityFetchOptions,
  )

  const featuredDoc = docs.find((doc) => doc.featured) ?? null
  const remaining = docs
    .filter((doc) => !featuredDoc || doc.id !== featuredDoc.id)
    .map(toListingArticle)

  return {
    featured: featuredDoc ? toListingArticle(featuredDoc) : null,
    remaining,
  }
}

export async function getInsightBySlug(slug: string): Promise<SanityInsightArticle | null> {
  return sanityClient.fetch<SanityInsightArticle | null>(
    insightBySlugQuery,
    {slug},
    sanityFetchOptions,
  )
}

export async function getInsightSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<Array<string | null>>(
    insightSlugsQuery,
    {},
    sanityFetchOptions,
  )

  return slugs.filter((slug): slug is string => Boolean(slug))
}

export async function getInsightSitemapEntries(): Promise<SanityInsightSitemapDoc[]> {
  return sanityClient.fetch<SanityInsightSitemapDoc[]>(
    insightSitemapQuery,
    {},
    sanityFetchOptions,
  )
}
