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

/** As stated in the footer copyright line and the privacy policy. */
export const LEGAL_NAME = "Committed Citizens Ltd"

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export const COMPANY_NUMBER = "17120998"

/** Official Companies House record for company number 17120998. */
export const COMPANIES_HOUSE_URL =
  "https://find-and-update.company-information.service.gov.uk/company/17120998"

/** Footer Connect links. */
export const SUBSTACK_PROFILE_URL = "https://substack.com/@committedcitizens"
export const LINKEDIN_COMPANY_URL = "https://www.linkedin.com/company/committedcitizens/"

/**
 * Founders named on the About page. jobTitle matches that page ("Co-founder").
 * sameAs is omitted: the site publishes no personal profile URLs for them.
 * The footer LinkedIn link is the company page, not a personal profile.
 */
export const FOUNDERS = [
  {
    name: "Tim Burley",
    jobTitle: "Co-founder",
    id: `${SITE_URL}/about#tim-burley`,
  },
  {
    name: "Ben Scoggins",
    jobTitle: "Co-founder",
    id: `${SITE_URL}/about#ben-scoggins`,
  },
] as const

function founderPerson(
  founder: (typeof FOUNDERS)[number],
  includeContext: boolean,
) {
  return {
    ...(includeContext ? { "@context": "https://schema.org" as const } : {}),
    "@type": "Person" as const,
    "@id": founder.id,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: `${SITE_URL}/about`,
    worksFor: { "@id": ORGANIZATION_ID },
  }
}

/** Standalone Person JSON-LD for the About page. */
export const founderPersonJsonLd = FOUNDERS.map((founder) => founderPerson(founder, true))

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Marketing operations consultancy helping CMOs build a stronger marketing function with AI. We redesign how work happens, and leave teams better equipped to own and improve it.",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: COMPANY_NUMBER,
    url: COMPANIES_HOUSE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Exeter",
    addressCountry: "GB",
  },
  location: {
    "@type": "Place",
    name: "Exeter, UK",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Exeter",
      addressCountry: "GB",
    },
  },
  founder: FOUNDERS.map((founder) => founderPerson(founder, false)),
  sameAs: [SUBSTACK_PROFILE_URL, COMPANIES_HOUSE_URL, LINKEDIN_COMPANY_URL],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${SITE_URL}/contact`,
  },
}

/** Serialize JSON-LD so a `</script>` in content cannot break out of the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
