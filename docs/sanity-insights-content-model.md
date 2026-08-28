# Sanity Insights content model

This design was checked against all 14 entries in `lib/insight-articles.ts`, their full records in
`app/insights/[uid]/page.tsx`, and the ordering logic in
`components/insights/insights-listing.tsx`. The schema lives in `sanity/schemaTypes`. Studio is
mounted at `/studio`. Public Insights pages and the sitemap read published Sanity documents.

## Decisions and fields

`insightArticle` contains:

- `title` and unique `slug`: required identity and route fields. Slugs are generated from the title
  but remain editable, so every current ID can be retained exactly.
- `excerpt`: the listing summary and article introduction.
- `category`: required free text. The schema documents the 12 current values, including both
  `Marketing Leadership` casings, without making that accidental taxonomy a closed list.
- `publishedAt`: a canonical datetime. Formatting it as `Month YYYY` is a frontend concern.
- `readTime`: the current editorial string is retained rather than calculated.
- `author`: a required reference to an `author` document with `name` and `role`. The two authors
  (`Ben Scoggins — Co-founder` and `Tim Burley — Co-founder`) and the 14 live articles were
  imported by `scripts/import-insights-to-sanity.ts` (see the addendum). Public pages read
  published documents from Sanity.
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
The public project ID and dataset name are not secrets. For Presentation/draft preview, set
`SANITY_API_READ_TOKEN` (Viewer, preferred) or fall back to `SANITY_API_WRITE_TOKEN` (Editor).
Those tokens are server-only: never paste them into client code, `.env.example` values, or logs.

### Run Studio locally

1. Copy `.env.example` to `.env.local` (or export the two `NEXT_PUBLIC_` variables).
2. For Presentation, also set `SANITY_API_READ_TOKEN` or `SANITY_API_WRITE_TOKEN` in `.env.local`.
3. `pnpm install` and `pnpm dev`.
4. Open [http://localhost:3000/studio](http://localhost:3000/studio) and sign in with a Sanity
   account that has access to the project.

Public Insights routes fetch published documents with the client in `lib/sanity`. Editing a
published document in Studio appears on the site after the 60s ISR window. Draft/Presentation
preview is wired for Insights: Studio Presentation maps articles to `/insights/{slug}` and the
listing to `/insights`. Unsigned visitors cannot enable draft mode.

### CORS origins (Tim, in manage.sanity.io)

Studio runs in the browser against the Sanity API, so these origins must be allowed with
credentials:

- `http://localhost:3000`
- `https://committedcitizens.co.uk`
- `https://www.committedcitizens.co.uk`

Add them under the project's API → CORS origins settings.

### Vercel

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` on the Production, Preview, and
Development environments. Set `SANITY_API_READ_TOKEN` (preferred) or `SANITY_API_WRITE_TOKEN` for
draft preview. `/studio` is `noindex` and is not in the sitemap; `robots.txt` disallows `/studio`.
Insights pages also send `noindex` while Next.js draft mode is on.

If Studio or Presentation fails on a Vercel preview hostname, add that preview origin in
manage.sanity.io → API → CORS origins with credentials (production and localhost are already listed).

## Still out of scope

- Copying hero or inline images into the Sanity asset pipeline.
- Extra document types beyond `insightArticle` and `author`.
- Live overlays / stega click-to-edit (Presentation still loads the live layout with drafts).
- New body structures, category normalization, computed read time, and public-page SEO, CTA,
  redirect, or visual-design changes.

The schema imports Sanity's schema helpers directly and is exported through
`sanity/schemaTypes/index.ts`. `sanity.config.ts` loads that export for Studio.

## Known follow-up mismatches

- `Marketing Leadership` and `Marketing leadership` differ only by casing.
- The listing now uses the `featured` boolean (currently only `your-ai-tools-are-not-your-team`).
  Remaining cards are ordered by `publishedAt` desc, then `_createdAt` asc, and capped at 12.
  That moves `weve-seen-enough` (March) out of the middle of the April cluster compared with the
  old hardcoded array.
- Display dates are `Month YYYY` from `publishedAt` in UTC (imported as the first of that month).
- Open Graph and Twitter images are still `/og-image.jpg`, regardless of the article hero.
- JSON-LD and Open Graph publication dates use `publishedAt`, not `new Date()`.

## Fetch addendum (28 August 2026)

Tokenless GROQ lives in `lib/sanity/queries.ts`. `lib/sanity/client.ts` uses
`NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` with the same fallbacks as Studio,
`useCdn: true`, perspective `published`, and `revalidate: 60`. No token is attached to that client.
When Next.js draft mode is on, listing and article fetches switch to perspective `drafts` with a
server-only token (`SANITY_API_READ_TOKEN`, else `SANITY_API_WRITE_TOKEN`) and `cache: "no-store"`.
Sitemap and `generateStaticParams` stay published-only.

- Listing: featured via `featured == true`; remaining cards from the rest of the result set.
- Article: by `slug.current`; author via `author->name` / `author->role`; hero/inline images via
  `coalesce(image.asset->url, externalUrl)`.
- Sitemap: slug + `publishedAt` as `lastModified`.

Hardcoded records remain in `lib/insight-articles.ts` (listing snapshot) and
`scripts/hardcoded-insight-page-articles.ts` (full bodies) for the importer only. They are not the
runtime source.

## Import addendum (28 August 2026)

`scripts/import-insights-to-sanity.ts` writes the live Insights content into project `78xqw9ra`,
dataset `production`, without changing public routes. Run it with `SANITY_API_WRITE_TOKEN` in the
environment only (`pnpm import-insights-to-sanity`). It upserts by author `name` and article
`slug.current`, so re-running updates rather than duplicating.

Imported:

- 2 `author` documents: Ben Scoggins (Co-founder) on 13 posts; Tim Burley (Co-founder) on
  `i-cant-code` only.
- 14 `insightArticle` documents whose slugs match the live ids in `lib/insight-articles.ts`.
- Listing metadata (title, excerpt, category, date, readTime, hero URL) from
  `lib/insight-articles.ts`. Body, author, and SEO fields from
  `scripts/hardcoded-insight-page-articles.ts` (moved off the public article page).
- `featured: true` only on `your-ai-tools-are-not-your-team` (the first listing item).
- Hero images as `hero.externalUrl` (existing `/images/...` paths and the one HTTPS blob URL).
  Inline images as `inlineImage.externalUrl`. Assets were not uploaded to Sanity.

Date mapping: month-year strings such as `August 2026` become `publishedAt`
`2026-08-01T00:00:00.000Z` (first of that month, UTC), using the same conversion as
`insightLastModified` in `lib/insight-articles.ts`.

Public `/insights`, `/insights/[uid]`, and the sitemap now read these documents from Sanity
(tokenless GROQ, ISR 60s). Studio Presentation can preview unpublished drafts and edits using a
server-only token and Next.js draft mode; anonymous `/insights` URLs stay published-only.
