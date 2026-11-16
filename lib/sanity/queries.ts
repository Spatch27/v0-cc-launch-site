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
    "image": coalesce(hero.image.asset->url, hero.externalUrl, ""),
    "heroFocus": hero.heroFocus
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
    "heroFocus": hero.heroFocus,
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

/**
 * Published insight text for the hidden Ask CC trial. Drafts are excluded.
 * Body text is plain paragraphs only, so the model is not given image assets.
 */
export const insightChatContextQuery = groq`
  *[_type == "insightArticle" && defined(slug.current) && defined(title) && !(_id in path("drafts.**"))]
    | order(publishedAt desc, _createdAt asc) {
      title,
      "slug": slug.current,
      excerpt,
      category,
      "authorName": author->name,
      body[]{
        _type,
        _type == "block" => {
          "text": array::join(children[].text, "")
        },
        _type == "code" => {
          "text": text
        }
      }
    }
`

/** Published insight rows for /llms.txt. Drafts are excluded even if the client perspective changes. */
export const insightLlmsQuery = groq`
  *[_type == "insightArticle" && defined(slug.current) && defined(title) && !(_id in path("drafts.**"))]
    | order(publishedAt desc, _createdAt asc) {
      "slug": slug.current,
      title,
      excerpt,
      "featured": featured == true
    }
`
