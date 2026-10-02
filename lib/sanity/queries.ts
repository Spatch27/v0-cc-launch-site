import {groq} from "next-sanity"

/**
 * Focal point for a Sanity hero asset. Omitted for external/public URL heroes
 * so those images keep their existing crop.
 */
const heroHotspotProjection = `
    "heroHotspot": select(
      defined(hero.image.asset->url) => hero.image.hotspot {
        x,
        y,
        "crop": ^.crop {
          top,
          bottom,
          left,
          right
        }
      }
    )`

export const insightListingQuery = groq`
  *[_type == "insightArticle" && defined(slug.current)] | order(publishedAt desc, _createdAt asc) {
    "id": slug.current,
    title,
    excerpt,
    category,
    publishedAt,
    readTime,
    "featured": featured == true,
    "image": coalesce(hero.image.asset->url, hero.externalUrl, ""),
    ${heroHotspotProjection}
  }
`

export const insightBySlugQuery = groq`
  *[_type == "insightArticle" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    readTime,
    seoTitle,
    seoDescription,
    "author": author->name,
    "authorRole": author->role,
    "heroImage": coalesce(hero.image.asset->url, hero.externalUrl, ""),
    "heroAlt": coalesce(hero.alt, title),
    ${heroHotspotProjection},
    body[] {
      ...,
      _type == "inlineImage" => {
        ...,
        "src": coalesce(image.asset->url, externalUrl, "")
      }
    }
  }
`

export const insightSlugsQuery = groq`
  *[_type == "insightArticle" && defined(slug.current)].slug.current
`

export const insightSitemapQuery = groq`
  *[_type == "insightArticle" && defined(slug.current)] {
    "id": slug.current,
    publishedAt
  }
`
