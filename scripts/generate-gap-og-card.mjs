import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const outputPath = path.join(process.cwd(), "public/gap-og-card.png")

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#181716"/>
  <rect x="0" y="0" width="16" height="630" fill="#ffeb3e"/>

  <g transform="translate(64,48) scale(0.38)" fill="#ffeb3e">
    <path d="M200.6,125v145.58c-40.2,0-72.79-32.59-72.79-72.79s32.59-72.79,72.79-72.79ZM252.19,270.58v-64.4l-45.23,64.4h45.23ZM206.96,125l45.23,64.4v-64.4h-45.23Z"/>
  </g>
  <text x="160" y="112" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="26" font-weight="600" fill="#e3dcdc">Committed Citizens</text>

  <text x="80" y="292" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">The</text>
  <rect x="192" y="238" width="136" height="76" fill="#ffeb3e"/>
  <text x="209" y="292" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="56" font-weight="800" fill="#181716">gap</text>
  <text x="342" y="292" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">between your marketing</text>
  <text x="80" y="364" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">and the one AI makes possible.</text>

  <text x="80" y="492" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="26" font-weight="500" fill="#e3dcdc">Four questions, two minutes.</text>
  <text x="80" y="536" font-family="Inter, Liberation Sans, Arial, sans-serif" font-size="26" font-weight="500" fill="#e3dcdc">A short personal video within two working days.</text>
</svg>`

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outputPath)

console.log(`Wrote ${outputPath}`)
