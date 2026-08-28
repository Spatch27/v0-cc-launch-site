const SITE_URL = "https://www.committedcitizens.co.uk"

/** Absolute URL for JSON-LD. Keep relative public paths; leave https heroes as-is. */
export function absoluteInsightUrl(pathOrUrl: string): string {
  if (!pathOrUrl) {
    return `${SITE_URL}/og-image.jpg`
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }

  if (pathOrUrl.startsWith("/")) {
    return `${SITE_URL}${pathOrUrl}`
  }

  return pathOrUrl
}

export function insightPageUrl(slug: string): string {
  return `${SITE_URL}/insights/${slug}`
}
