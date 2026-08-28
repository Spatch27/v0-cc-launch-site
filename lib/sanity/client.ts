import {createClient} from "next-sanity"
import {sanityApiVersion, sanityDataset, sanityProjectId} from "./env"

/**
 * Tokenless published reads. The production dataset is public; do not attach
 * SANITY_API_WRITE_TOKEN (or any token) here.
 */
export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
})

export const sanityFetchOptions = {
  next: {revalidate: 60},
} as const
