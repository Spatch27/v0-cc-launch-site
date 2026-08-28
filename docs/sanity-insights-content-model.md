# Sanity Insights content model

This design was checked against all 14 entries in `lib/insight-articles.ts`, their full records in
`app/insights/[uid]/page.tsx`, and the ordering logic in
`components/insights/insights-listing.tsx`. The schema lives in `sanity/schemaTypes`. Studio is
mounted at `/studio`. The public Insights pages still render from hardcoded files, not from Sanity.

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

## Studio (embedded at `/studio`)

`sanity.config.ts` loads `schemaTypes` from `sanity/schemaTypes/index.ts` and points at project
`78xqw9ra` / dataset `production` via:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

The same names are listed in `.env.example`. Copy that file to `.env.local` for local development.
The public project ID and dataset name are not secrets; do not add API tokens or write keys.

### Run Studio locally

1. Copy `.env.example` to `.env.local` (or export the two `NEXT_PUBLIC_` variables).
2. `pnpm install` and `pnpm dev`.
3. Open [http://localhost:3000/studio](http://localhost:3000/studio) and sign in with a Sanity
   account that has access to the project.

The live Insights listing and article routes still read `lib/insight-articles.ts` and
`app/insights/[uid]/page.tsx`. Editing documents in Studio will not change the public site until a
later fetch/render PR.

### CORS origins (Tim, in manage.sanity.io)

Studio runs in the browser against the Sanity API, so these origins must be allowed with
credentials:

- `http://localhost:3000`
- `https://committedcitizens.co.uk`
- `https://www.committedcitizens.co.uk`

Add them under the project's API → CORS origins settings.

### Vercel

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` on the Production, Preview, and
Development environments. `/studio` is `noindex` and is not in the sitemap; `robots.txt` disallows
`/studio`.

## Still out of scope

- GROQ fetches, a Sanity query client, or replacing hardcoded Insights pages.
- Dataset writes, author seeds, article migration, and image copying.
- Extra document types beyond `insightArticle` and `author`.
- New body structures, category normalization, computed read time, and public-page SEO, CTA,
  redirect, or visual-design changes.

The schema imports Sanity's schema helpers directly and is exported through
`sanity/schemaTypes/index.ts`. `sanity.config.ts` loads that export for Studio.

## Known follow-up mismatches

- `Marketing Leadership` and `Marketing leadership` differ only by casing.
- The live listing treats `articles[0]` as featured and then renders at most 12 following cards;
  it does not read `featured`.
- Live dates are month-year strings. Migration will need an agreed canonical day/time for
  `publishedAt`.
- Open Graph and Twitter images are always `/og-image.jpg`, regardless of the article hero.
- JSON-LD and Open Graph publication dates currently use `new Date()` rather than article data.

The next stage is fetch/render integration and migration. Those changes should decide
publication-date conversion and category cleanup before writing the 14 documents.
