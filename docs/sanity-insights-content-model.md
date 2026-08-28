# Sanity Insights content model

This design was checked against all 14 entries in `lib/insight-articles.ts`, their full records in
`app/insights/[uid]/page.tsx`, and the ordering logic in
`components/insights/insights-listing.tsx`. It defines schema only; it does not connect Sanity to
the application.

## Decisions and fields

`insightArticle` contains:

- `title` and unique `slug`: required identity and route fields. Slugs are generated from the title
  but remain editable, so every current ID can be retained exactly.
- `excerpt`: the listing summary and article introduction.
- `category`: required free text. The schema documents the 12 current values, including both
  `Marketing Leadership` casings, without making that accidental taxonomy a closed list.
- `publishedAt`: a canonical datetime. Formatting it as `Month YYYY` is a frontend concern.
- `readTime`: the current editorial string is retained rather than calculated.
- `author`: a required reference to an `author` document with `name` and `role`. A later dataset
  setup should create `Ben Scoggins — Co-founder` and `Tim Burley — Co-founder`; this PR performs
  no dataset writes.
- `hero`: prefers a Sanity image and has optional alt text. `externalUrl` is a migration fallback
  that accepts both the current root-relative public paths and the existing HTTPS blob URL, so no
  image download is required to represent today's records.
- optional `seoTitle` and `seoDescription`.
- optional `featured`, defaulting to `false`, to replace array position as editorial intent.
- `body`: required Portable Text, limited to the structures used by the live articles.

The checked slugs are:

`your-ai-tools-are-not-your-team`, `the-problem-might-be-your-fabric`,
`youre-not-mckinsey`, `the-plane-in-flight-problem`, `i-cant-code`,
`weve-seen-enough`, `indispensable-and-yet-unheard`,
`the-problem-no-agency-can-solve`, `from-systems-thinking-to-systems-doing`,
`shadow-ai-not-it-problem`, `when-more-ai-means-less-progress`,
`the-great-agency-reset-is-a-sideshow`, `small-data-wins-the-race`, and
`marketings-moneyball-moment`.

## Live body mapping

| Live shape | Portable Text shape |
| --- | --- |
| `paragraph {text}` | Standard block with `normal` style |
| `heading2 {text}` | Standard block with `h2` style |
| `paragraph-with-link` | Standard block with a link annotation on the linked span |
| `code {text}` | `code` object containing `text` |
| `image {src, alt, caption?}` | `inlineImage` object with a Sanity image or external URL, required alt, and optional caption |

The paragraph currently scanned for “Get in touch to schedule a Drag Diagnostic” maps to an
ordinary annotated link. It is not a content type.

## Deliberately left out

- Studio configuration, routes, Sanity clients, `next-sanity`, GROQ, environment variables, and
  application integration.
- Dataset creation, author seeds, article migration, and image copying.
- New body structures, category normalization, computed read time, and any frontend, SEO, CTA,
  redirect, robots, sitemap, or JSON-LD changes.

The schema imports Sanity's schema helpers directly and is exported through
`sanity/schemaTypes/index.ts`. No `sanity.config.ts` is needed to typecheck these modules, so none
is included; a later Studio/integration PR can load `schemaTypes`.

## Known follow-up mismatches

- `Marketing Leadership` and `Marketing leadership` differ only by casing.
- The live listing treats `articles[0]` as featured and then renders at most 12 following cards;
  it does not read `featured`.
- Live dates are month-year strings. Migration will need an agreed canonical day/time for
  `publishedAt`.
- Open Graph and Twitter images are always `/og-image.jpg`, regardless of the article hero.
- JSON-LD and Open Graph publication dates currently use `new Date()` rather than article data.

The next stage is explicitly Studio/configuration, fetch/render integration, and migration. Those
changes should decide publication-date conversion and category cleanup before writing the 14
documents.
