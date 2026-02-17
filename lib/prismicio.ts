import * as prismic from "@prismicio/client"

/**
 * The Prismic repository name.
 */
export const repositoryName = "cc-launch-site"

/**
 * Route resolver defines how document UIDs map to Next.js routes.
 */
const routes: prismic.ClientConfig["routes"] = [
  { type: "insight_article", path: "/insights/:uid" },
]

/**
 * Creates a Prismic client configured for the cc-launch-site repository.
 */
export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  })

  return client
}
