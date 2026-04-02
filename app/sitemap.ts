import type { MetadataRoute } from "next"

const BASE_URL = "https://committedcitizens.co.uk"

const insightSlugs = [
  "removing-operational-drag",
  "marketing-operations-competitive-advantage",
  "embedded-consultancy-model",
  "building-resilient-marketing-systems",
  "case-for-marketing-product-teams",
  "rethinking-marketing-velocity",
  "weve-seen-enough",
]

export default function sitemap(): MetadataRoute.Sitemap {
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

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: `${BASE_URL}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...insightRoutes]
}
