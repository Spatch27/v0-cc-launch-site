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

export const LOGO_URL = `${SITE_URL}/logo.png`

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Marketing operations consultancy helping CMOs build a stronger marketing function with AI. We redesign how work happens, and leave teams better equipped to own and improve it.",
  sameAs: ["https://www.linkedin.com/company/committedcitizens"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${SITE_URL}/contact`,
  },
} as const

/** Serialize JSON-LD so a `</script>` in content cannot break out of the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
