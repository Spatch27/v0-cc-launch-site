/**
 * One-off importer: copy hardcoded Insights into Sanity (project 78xqw9ra / production).
 *
 * Reads live data from lib/insight-articles.ts (listing metadata) and
 * app/insights/[uid]/page.tsx (full records / body). Does not change public pages.
 *
 * Auth: SANITY_API_WRITE_TOKEN only. Never logs the token.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... pnpm import-insights-to-sanity
 */
import {createClient, type SanityClient} from "@sanity/client"
import {readFileSync} from "node:fs"
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"
import ts from "typescript"
import {insightArticles, insightLastModified} from "../lib/insight-articles"

const PROJECT_ID = "78xqw9ra"
const DATASET = "production"
const API_VERSION = "2024-08-01"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const PAGE_PATH = join(ROOT, "app/insights/[uid]/page.tsx")

const DRAG_DIAGNOSTIC_TEXT = "Get in touch to schedule a Drag Diagnostic"
const DRAG_DIAGNOSTIC_HREF = "/contact#book"

const EXPECTED_AUTHORS = [
  {name: "Ben Scoggins", role: "Co-founder", idHint: "author-ben-scoggins"},
  {name: "Tim Burley", role: "Co-founder", idHint: "author-tim-burley"},
] as const

type PageBodyBlock =
  | {type: "heading2" | "paragraph" | "code"; text: string}
  | {type: "image"; src: string; alt: string; caption?: string}
  | {
      type: "paragraph-with-link"
      text: string
      linkText: string
      linkHref: string
      textAfter?: string
    }

type PageArticle = {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  authorRole: string
  heroImage: string
  body: PageBodyBlock[]
  seoTitle?: string
  seoDescription?: string
}

type PortableNode = Record<string, unknown>

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

function requiredToken(): string {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token?.trim()) {
    fail(
      "SANITY_API_WRITE_TOKEN is not set. Export it from the environment (Vercel project env) and rerun. The script does not read other env names or .env files.",
    )
  }
  return token.trim()
}

function propertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text
  }
  return undefined
}

function literalToValue(node: ts.Expression): unknown {
  if (ts.isParenthesizedExpression(node)) {
    return literalToValue(node.expression)
  }
  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
    return literalToValue(node.expression)
  }
  if (ts.isSatisfiesExpression(node)) {
    return literalToValue(node.expression)
  }
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return null
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false
  }
  if (ts.isStringLiteralLike(node)) {
    return node.text
  }
  if (ts.isNumericLiteral(node)) {
    return Number(node.text)
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => {
      if (ts.isSpreadElement(element) || ts.isOmittedExpression(element)) {
        fail("Unsupported array element while parsing insight page data.")
      }
      return literalToValue(element)
    })
  }
  if (ts.isObjectLiteralExpression(node)) {
    const record: Record<string, unknown> = {}
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) {
        fail("Unsupported object property while parsing insight page data.")
      }
      const key = propertyName(prop.name)
      if (!key) {
        fail("Unsupported object key while parsing insight page data.")
      }
      record[key] = literalToValue(prop.initializer)
    }
    return record
  }
  fail(`Unsupported syntax (${ts.SyntaxKind[node.kind]}) while parsing insight page data.`)
}

function loadPageArticles(): Record<string, PageArticle> {
  const sourceText = readFileSync(PAGE_PATH, "utf8")
  const source = ts.createSourceFile(PAGE_PATH, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  let articlesNode: ts.Expression | undefined

  const visit = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "articles" && node.initializer) {
      articlesNode = node.initializer
    }
    ts.forEachChild(node, visit)
  }
  visit(source)

  if (!articlesNode) {
    fail(`Could not find the articles record in ${PAGE_PATH}`)
  }

  const value = literalToValue(articlesNode)
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("Parsed articles value is not an object.")
  }
  return value as Record<string, PageArticle>
}

function key(...parts: Array<string | number>): string {
  const raw = parts.map(String).join("-").replace(/[^A-Za-z0-9._-]+/g, "-")
  return raw.slice(0, 64)
}

function textSpan(spanKey: string, text: string, marks: string[] = []): PortableNode {
  return {
    _type: "span",
    _key: spanKey,
    text,
    marks,
  }
}

function normalBlock(blockKey: string, children: PortableNode[], markDefs: PortableNode[] = []): PortableNode {
  return {
    _type: "block",
    _key: blockKey,
    style: "normal",
    markDefs,
    children,
  }
}

function heading2Block(blockKey: string, text: string): PortableNode {
  return {
    _type: "block",
    _key: blockKey,
    style: "h2",
    markDefs: [],
    children: [textSpan(`${blockKey}-s0`, text)],
  }
}

function annotatedParagraph(blockKey: string, text: string, linkText: string, href: string, textAfter = ""): PortableNode {
  const markKey = `${blockKey}-link`
  const children = [textSpan(`${blockKey}-s0`, text)]
  if (linkText) {
    children.push(textSpan(`${blockKey}-s1`, linkText, [markKey]))
  }
  if (textAfter) {
    children.push(textSpan(`${blockKey}-s2`, textAfter))
  }
  return normalBlock(blockKey, children, [
    {
      _type: "link",
      _key: markKey,
      href,
    },
  ])
}

function bodyToPortableText(slug: string, blocks: PageBodyBlock[]): PortableNode[] {
  return blocks.map((block, index) => {
    const blockKey = key(slug, index, block.type)

    if (block.type === "heading2") {
      return heading2Block(blockKey, block.text)
    }

    if (block.type === "code") {
      return {
        _type: "code",
        _key: blockKey,
        text: block.text,
      }
    }

    if (block.type === "image") {
      const image: PortableNode = {
        _type: "inlineImage",
        _key: blockKey,
        externalUrl: block.src,
        alt: block.alt,
      }
      if (block.caption) {
        image.caption = block.caption
      }
      return image
    }

    if (block.type === "paragraph-with-link") {
      return annotatedParagraph(blockKey, block.text, block.linkText, block.linkHref, block.textAfter ?? "")
    }

    if (block.type === "paragraph") {
      if (block.text.includes(DRAG_DIAGNOSTIC_TEXT)) {
        const [before, after] = block.text.split(DRAG_DIAGNOSTIC_TEXT)
        return annotatedParagraph(blockKey, before ?? "", DRAG_DIAGNOSTIC_TEXT, DRAG_DIAGNOSTIC_HREF, after ?? "")
      }
      return normalBlock(blockKey, [textSpan(`${blockKey}-s0`, block.text)])
    }

    fail(`Unknown body block type in ${slug}: ${JSON.stringify(block)}`)
  })
}

function publishedAtFromListingDate(date: string): string {
  return insightLastModified(date).toISOString()
}

function authorDocId(name: string): string {
  const match = EXPECTED_AUTHORS.find((author) => author.name === name)
  if (!match) {
    fail(`Unexpected author "${name}". Import only supports Ben Scoggins and Tim Burley.`)
  }
  return match.idHint
}

async function existingByQuery(
  client: SanityClient,
  query: string,
  params: Record<string, string>,
): Promise<string | undefined> {
  const id = await client.fetch<string | null>(query, params)
  return id ?? undefined
}

async function importDocuments() {
  const pageArticles = loadPageArticles()
  const listingIds = insightArticles.map((article) => article.id)

  if (listingIds.length !== 14) {
    fail(`Expected 14 listing articles, found ${listingIds.length}.`)
  }

  const missingOnPage = listingIds.filter((id) => !pageArticles[id])
  if (missingOnPage.length) {
    fail(`Listing ids missing from page.tsx: ${missingOnPage.join(", ")}`)
  }

  const mismatches: string[] = []
  for (const listing of insightArticles) {
    const page = pageArticles[listing.id]
    const fields: Array<keyof Pick<typeof listing, "title" | "excerpt" | "category" | "date" | "readTime">> = [
      "title",
      "excerpt",
      "category",
      "date",
      "readTime",
    ]
    for (const field of fields) {
      if (listing[field] !== page[field]) {
        mismatches.push(`${listing.id}.${field}: listing !== page (using listing)`)
      }
    }
    if (listing.image !== page.heroImage) {
      mismatches.push(`${listing.id}.image: listing !== page.heroImage (using listing)`)
    }
  }
  if (mismatches.length) {
    console.log("Listing vs page differences (listing metadata wins):")
    for (const line of mismatches) {
      console.log(`  - ${line}`)
    }
  }

  const featuredId = insightArticles[0]?.id
  if (featuredId !== "your-ai-tools-are-not-your-team") {
    fail(`Expected first listing item to be your-ai-tools-are-not-your-team, found ${featuredId}`)
  }

  const authorUsage = new Map<string, number>()
  for (const listing of insightArticles) {
    const page = pageArticles[listing.id]
    authorUsage.set(page.author, (authorUsage.get(page.author) ?? 0) + 1)
    if (listing.id === "i-cant-code" && page.author !== "Tim Burley") {
      fail("i-cant-code must be authored by Tim Burley.")
    }
    if (listing.id !== "i-cant-code" && page.author !== "Ben Scoggins") {
      fail(`${listing.id} must be authored by Ben Scoggins.`)
    }
  }

  console.log("Parsed 14 articles from hardcoded sources.")
  console.log(
    `Authors in source: ${[...authorUsage.entries()].map(([name, count]) => `${name} (${count})`).join(", ")}`,
  )

  const token = requiredToken()
  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token,
    useCdn: false,
  })

  const authorIds = new Map<string, string>()
  for (const author of EXPECTED_AUTHORS) {
    const existingId = await existingByQuery(
      client,
      `*[_type == "author" && name == $name][0]._id`,
      {name: author.name},
    )
    const id = existingId ?? author.idHint
    await client.createOrReplace({
      _id: id,
      _type: "author",
      name: author.name,
      role: author.role,
    })
    authorIds.set(author.name, id)
    console.log(`${existingId ? "Updated" : "Created"} author ${author.name} (${id})`)
  }

  for (const listing of insightArticles) {
    const page = pageArticles[listing.id]
    const authorId = authorIds.get(page.author)
    if (!authorId) {
      fail(`No imported author id for ${page.author}`)
    }

    const existingId = await existingByQuery(
      client,
      `*[_type == "insightArticle" && slug.current == $slug][0]._id`,
      {slug: listing.id},
    )
    const id = existingId ?? `insightArticle-${listing.id}`
    const body = bodyToPortableText(listing.id, page.body)
    if (body.length < 1) {
      fail(`${listing.id} produced an empty body.`)
    }

    const doc: Record<string, unknown> = {
      _id: id,
      _type: "insightArticle",
      title: listing.title,
      slug: {_type: "slug", current: listing.id},
      excerpt: listing.excerpt,
      category: listing.category,
      publishedAt: publishedAtFromListingDate(listing.date),
      readTime: listing.readTime,
      author: {_type: "reference", _ref: authorId},
      hero: {
        externalUrl: listing.image,
        alt: listing.title,
      },
      featured: listing.id === featuredId,
      body,
    }
    if (page.seoTitle) {
      doc.seoTitle = page.seoTitle
    }
    if (page.seoDescription) {
      doc.seoDescription = page.seoDescription
    }

    await client.createOrReplace(doc)
    console.log(`${existingId ? "Updated" : "Created"} insightArticle ${listing.id} (${id})`)
  }

  const summary = await client.fetch<{
    authors: number
    articles: number
    authorNames: string[]
    slugs: string[]
    featured: string[]
  }>(`{
    "authors": count(*[_type == "author"]),
    "articles": count(*[_type == "insightArticle"]),
    "authorNames": *[_type == "author"] | order(name asc) .name,
    "slugs": *[_type == "insightArticle"] | order(publishedAt desc) .slug.current,
    "featured": *[_type == "insightArticle" && featured == true].slug.current
  }`)

  console.log("Sanity counts after import:")
  console.log(`  authors: ${summary.authors}`)
  console.log(`  insightArticle: ${summary.articles}`)
  console.log(`  author names: ${summary.authorNames.join(", ")}`)
  console.log(`  featured: ${summary.featured.join(", ") || "(none)"}`)

  const missingSlugs = listingIds.filter((id) => !summary.slugs.includes(id))
  if (summary.authors !== 2 || summary.articles !== 14 || missingSlugs.length) {
    fail(
      `Import verification failed. authors=${summary.authors} articles=${summary.articles} missingSlugs=${missingSlugs.join(", ") || "none"}`,
    )
  }

  if (summary.featured.length !== 1 || summary.featured[0] !== featuredId) {
    fail(`Expected featured slug ${featuredId}, found ${summary.featured.join(", ") || "(none)"}`)
  }

  console.log("Import complete: 2 authors, 14 insightArticle documents. Public Insights pages were not changed.")
}

importDocuments().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  fail(`Import failed: ${message}`)
})
