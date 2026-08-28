/**
 * Server-only token for draft/Presentation reads and preview-secret validation.
 * Prefer a Viewer read token; fall back to the existing Editor write token.
 * Never import this module from client components or attach it to the public client.
 *
 * Keys are read dynamically so Next.js cannot inline empty values at build time.
 */
function readServerEnv(name: string): string | undefined {
  const value = process.env[name]
  return value ? value : undefined
}

export function getSanityPreviewToken(): string | undefined {
  return readServerEnv("SANITY_API_READ_TOKEN") || readServerEnv("SANITY_API_WRITE_TOKEN")
}

export function requireSanityPreviewToken(): string {
  const token = getSanityPreviewToken()

  if (!token) {
    throw new Error(
      "Draft preview requires SANITY_API_READ_TOKEN or SANITY_API_WRITE_TOKEN.",
    )
  }

  return token
}
