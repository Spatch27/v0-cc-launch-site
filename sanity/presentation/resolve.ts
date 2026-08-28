import {defineDocuments, defineLocations, type PresentationPluginOptions} from "sanity/presentation"

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/insights/:slug",
      filter: `_type == "insightArticle" && slug.current == $slug`,
    },
  ]),
  locations: {
    insightArticle: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug
            ? [
                {
                  title: doc.title || "Untitled",
                  href: `/insights/${doc.slug}`,
                },
              ]
            : []),
          {
            title: "Insights",
            href: "/insights",
          },
        ],
      }),
    }),
  },
}
