import {defineArrayMember, defineField, defineType} from "sanity"

const currentCategories = [
  "Agentic reality check",
  "Fabric layer",
  "AI Agents",
  "Marketing Leadership",
  "TECHNOLOGY & TOOLS",
  "Getting started",
  "Marketing Operations",
  "Operational drag",
  "The orchestration gap",
  "Marketing orchestration",
  "Data",
  "Marketing leadership",
].join(", ")

function hasImageSource(value: unknown) {
  const source = value as {image?: unknown; externalUrl?: string} | undefined

  return Boolean(source?.image || source?.externalUrl?.trim())
    ? true
    : "Add a Sanity image or an external/public image URL."
}

function isWebUrl(value: string | undefined, allowRelative = false) {
  if (!value) {
    return true
  }

  if (allowRelative && value.startsWith("/")) {
    return true
  }

  try {
    const url = new URL(value)

    return ["http:", "https:"].includes(url.protocol) || "Enter a valid HTTP or HTTPS URL."
  } catch {
    return allowRelative
      ? "Enter a root-relative path or a valid HTTP or HTTPS URL."
      : "Enter a valid HTTP or HTTPS URL."
  }
}

export const insightArticle = defineType({
  name: "insightArticle",
  title: "Insight article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "The URL identifier. Sanity's default slug validation keeps this unique within insight articles.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: `Free text for now. Values currently in use: ${currentCategories}.`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Canonical publication date; month-year display formatting belongs to the frontend.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      description: 'Editorial value retained from the live articles, for example "3 min read".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{type: "author"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      description:
        "Use a Sanity image for new work. The fallback accepts existing root-relative public paths and HTTPS assets.",
      fields: [
        defineField({
          name: "image",
          title: "Sanity image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "externalUrl",
          title: "External or public image URL",
          type: "string",
          description:
            "Migration fallback only, for example /images/insights/article.jpg or an HTTPS blob URL.",
          validation: (Rule) => Rule.custom((value) => isWebUrl(value, true)),
        }),
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required().custom(hasImageSource),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Explicit replacement for relying on the first item in the current article array.",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {title: "Normal", value: "normal"},
            {title: "Heading 2", value: "h2"},
          ],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "string",
                    validation: (Rule) =>
                      Rule.required().custom((value) => isWebUrl(value, true)),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          name: "code",
          title: "Code",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Code",
              type: "text",
              rows: 8,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              subtitle: "text",
            },
            prepare({subtitle}) {
              return {
                title: "Code",
                subtitle,
              }
            },
          },
        }),
        defineArrayMember({
          name: "inlineImage",
          title: "Inline image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Sanity image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "externalUrl",
              title: "External image URL",
              type: "string",
              description: "Migration fallback for an existing HTTPS asset.",
              validation: (Rule) => Rule.custom((value) => isWebUrl(value)),
            }),
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          validation: (Rule) => Rule.custom(hasImageSource),
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      publishedAt: "publishedAt",
      media: "hero.image",
    },
    prepare({title, author: authorName, publishedAt, media}) {
      const details = [authorName, publishedAt ? publishedAt.slice(0, 10) : undefined].filter(
        Boolean,
      )

      return {
        title,
        subtitle: details.join(" · "),
        media,
      }
    },
  },
})
