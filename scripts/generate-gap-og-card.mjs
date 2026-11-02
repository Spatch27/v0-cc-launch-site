import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

// Static 1200×630 share card for /gap, served from public/gap-og-card.png.
// Pink field (#fc66a7, the /gap header band), charcoal type, dark CC wordmark.
// Headline outlines are Bricolage Grotesque Bold; body outlines are Inter Medium.
//
//   pip install fonttools brotli uharfbuzz
//   node scripts/generate-gap-og-card.mjs

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const script = path.join(root, "scripts/generate-gap-og-card.py")
const outputPath = path.join(root, "public/gap-og-card.png")

const svg = execFileSync("python3", [script, root], {
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
})

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(outputPath)

const meta = await sharp(outputPath).metadata()
if (meta.width !== 1200 || meta.height !== 630) {
  throw new Error(`Expected 1200×630, got ${meta.width}×${meta.height}`)
}

console.log(`Wrote ${outputPath} (${meta.width}×${meta.height})`)
