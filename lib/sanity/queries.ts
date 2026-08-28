import {groq} from "next-sanity"

export const insightListingQuery = groq`
  *[_type == "insightArticle" && defined(slug.current)] | order(publishedAt desc, _createdAt asc) {
    "id": slug.current,
    title,
    excerpt,
    category,
    publishedAt,
    readTime,
    "featured": featured == true,
    "image": coalesce(hero.image.asset->url, hero.externalUrl, "")
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
