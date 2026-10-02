export type SanityLinkMark = {
  _key: string
  _type: "link"
  href?: string
}

export type SanitySpan = {
  _type?: string
  _key?: string
  text?: string
  marks?: string[]
}

export type SanityTextBlock = {
  _type: "block"
  _key?: string
  style?: "normal" | "h2" | string
  listItem?: "bullet" | "number" | string
  level?: number
  markDefs?: SanityLinkMark[]
  children?: SanitySpan[]
}

export type SanityCodeBlock = {
  _type: "code"
  _key?: string
  text?: string
}

export type SanityInlineImageBlock = {
  _type: "inlineImage"
  _key?: string
  src?: string
  externalUrl?: string
  alt?: string
  caption?: string
}

export type SanityBodyBlock = SanityTextBlock | SanityCodeBlock | SanityInlineImageBlock

/** Crop fractions stored by Sanity when an editor trims the image. */
export type SanityImageCrop = {
  top: number
  bottom: number
  left: number
  right: number
}

/** Focal point for the hero crop. `x` and `y` are 0–1 from the top-left. */
export type SanityHeroHotspot = {
  x: number
  y: number
  crop?: SanityImageCrop | null
}

export type SanityInsightListingDoc = {
  id: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  featured: boolean
  image: string
  heroHotspot: SanityHeroHotspot | null
}

export type SanityInsightArticle = {
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  seoTitle?: string | null
  seoDescription?: string | null
  author: string
  authorRole: string
  heroImage: string
  heroAlt: string
  heroHotspot: SanityHeroHotspot | null
  body: SanityBodyBlock[]
}

export type SanityInsightSitemapDoc = {
  id: string
  publishedAt: string
}
