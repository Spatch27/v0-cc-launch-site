import {defineEnableDraftMode} from "next-sanity/draft-mode"
import {sanityClient} from "@/lib/sanity/client"
import {getSanityPreviewToken} from "@/lib/sanity/preview-token"

const token = getSanityPreviewToken()

const enableDraftMode = token
  ? defineEnableDraftMode({
      client: sanityClient.withConfig({
        token,
        useCdn: false,
      }),
    })
  : null

export async function GET(request: Request) {
  if (!enableDraftMode) {
    return new Response("Draft preview is not configured", {status: 500})
  }

  return enableDraftMode.GET(request)
}
