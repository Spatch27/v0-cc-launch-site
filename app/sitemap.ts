import type { MetadataRoute } from "next"
import { createClient } from "@/lib/prismicio"

const BASE_URL = "https://committedcitizens.co.uk"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()

  // Fetch all insight articles from Prismic
  const insightArticles = await client.getAllByType("insight_article")

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/approach`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/outcomes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/outputs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamically generate routes for all insight articles from Prismic
  const insightRoutes: MetadataRoute.Sitemap = insightArticles.map((article) => ({
    url: `${BASE_URL}/insights/${article.uid}`,
    lastModified: article.last_publication_date
      ? new Date(article.last_publication_date)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...insightRoutes]
}
