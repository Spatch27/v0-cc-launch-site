/** Publication host previously configured on the newsletter embed. */
export const SUBSTACK_PUBLICATION_URL = "https://committedcitizens.substack.com"

export const SUBSTACK_SUBSCRIBE_URL = `${SUBSTACK_PUBLICATION_URL}/subscribe`

/** Substack prefills `input[name=email]` from this query parameter. */
export function substackSubscribeUrl(email: string) {
  const url = new URL(SUBSTACK_SUBSCRIBE_URL)
  url.searchParams.set("email", email)
  return url.toString()
}
