/**
 * Server-only token for draft/Presentation reads and preview-secret validation.
 * Prefer a Viewer read token; fall back to the existing Editor write token.
 * Never import this module from client components or attach it to the public client.
 */
export function getSanityPreviewToken(): string | undefined {
  return process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
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
