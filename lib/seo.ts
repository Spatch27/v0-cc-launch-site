import type { Metadata } from "next"

export const SITE_URL = "https://www.committedcitizens.co.uk"
export const SITE_NAME = "Committed Citizens"

/** Strip a trailing "| Committed Citizens" so the root title template adds the brand once. */
export function withoutBrandSuffix(title: string): string {
  return title.replace(/\s*\|\s*Committed Citizens\s*$/i, "").trim()
}

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") {
    return SITE_URL
  }

  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function brandedTitle(title: string): string {
  const clean = withoutBrandSuffix(title)
  return `${clean} | ${SITE_NAME}`
}

export function canonicalAlternates(path: string): NonNullable<Metadata["alternates"]> {
  return { canonical: absoluteUrl(path) }
}
