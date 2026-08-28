export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "78xqw9ra"

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

/** Match the importer so published reads hit the same API surface. */
export const sanityApiVersion = "2024-08-01"
