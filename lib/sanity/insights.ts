import {draftMode} from "next/headers"
import type {InsightListingArticle} from "@/lib/insight-articles"
import {formatInsightMonthYear} from "@/lib/insight-articles"
import {sanityClient, sanityFetchOptions} from "./client"
import {isHeroFocus, type HeroFocus} from "./heroFocus"
import {requireSanityPreviewToken} from "./preview-token"
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

const previewFetchOptions = {
  cache: "no-store" as const,
  next: {revalidate: 0},
}

async function fetchInsightContent<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!(await draftMode()).isEnabled) {
    return sanityClient.fetch<T>(query, params, sanityFetchOptions)
  }

  return sanityClient
    .withConfig({
      token: requireSanityPreviewToken(),
      useCdn: false,
      perspective: "drafts",
      stega: false,
    })
    .fetch<T>(query, params, previewFetchOptions)
}

function mapHeroFocus(focus: string | null | undefined): HeroFocus | null {
  return isHeroFocus(focus) ? focus : null
}

function toListingArticle(doc: SanityInsightListingDoc): InsightListingArticle {
  return {
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: formatInsightMonthYear(doc.publishedAt),
    readTime: doc.readTime,
    image: doc.image || "",
    heroFocus: mapHeroFocus(doc.heroFocus),
  }
}

export async function getInsightListing(): Promise<{
  featured: InsightListingArticle | null
  remaining: InsightListingArticle[]
}> {
  const docs = await fetchInsightContent<SanityInsightListingDoc[]>(insightListingQuery)

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
  const article = await fetchInsightContent<SanityInsightArticle | null>(insightBySlugQuery, {slug})

  if (!article) {
    return null
  }

  return {
    ...article,
    heroFocus: mapHeroFocus(article.heroFocus),
  }
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
