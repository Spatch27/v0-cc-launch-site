import {defineEnableDraftMode} from "next-sanity/draft-mode"
import {sanityClient} from "@/lib/sanity/client"
import {getSanityPreviewToken} from "@/lib/sanity/preview-token"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const token = getSanityPreviewToken()

  if (!token) {
    return new Response("Draft preview is not configured", {status: 500})
  }

  const {GET: enableDraftMode} = defineEnableDraftMode({
    client: sanityClient.withConfig({
      token,
      useCdn: false,
    }),
  })

  return enableDraftMode(request)
}
