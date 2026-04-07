import type { MetadataRoute } from "next"

const BASE_URL = "https://committedcitizens.co.uk"

// Import articles from the insights listing component
const articles = [
  {
    id: "weve-seen-enough",
    date: "March 2026",
  },
  {
    id: "indispensable-and-yet-unheard",
    date: "April 2026",
  },
  {
    id: "the-problem-no-agency-can-solve",
    date: "April 2026",
  },
  {
    id: "from-systems-thinking-to-systems-doing",
    date: "April 2026",
  },
  {
    id: "shadow-ai-not-it-problem",
    date: "April 2026",
  },
  {
    id: "when-more-ai-means-less-progress",
    date: "April 2026",
  },
  {
    id: "removing-operational-drag",
    date: "March 2026",
  },
  {
    id: "marketing-operations-competitive-advantage",
    date: "March 2026",
  },
  {
    id: "embedded-consultancy-model",
    date: "March 2026",
  },
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

  // Dynamically generate routes for all hardcoded insight articles
  const insightRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/insights/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...insightRoutes]
}
