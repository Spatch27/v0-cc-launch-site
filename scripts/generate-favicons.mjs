import { createRequire } from 'module'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const sharp = require(process.env.NODE_PATH + '/sharp')

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svgPath = join(root, 'app', 'icon.svg')
const publicDir = join(root, 'public')

const svg = readFileSync(svgPath)

async function run() {
  // favicon-32x32.png
  await sharp(svg).resize(32, 32).png().toFile(join(publicDir, 'favicon-32x32.png'))
  console.log('✓ favicon-32x32.png')

  // favicon-64x64.png
  await sharp(svg).resize(64, 64).png().toFile(join(publicDir, 'favicon-64x64.png'))
  console.log('✓ favicon-64x64.png')

  // apple-touch-icon.png — 180x180 is the standard Apple size
  await sharp(svg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('✓ apple-touch-icon.png')

  // favicon.png (high-res source)
  await sharp(svg).resize(256, 256).png().toFile(join(publicDir, 'favicon.png'))
  console.log('✓ favicon.png')

  // PWA icons required by manifest.json
  await sharp(svg).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png'))
  console.log('✓ icon-192.png')

  await sharp(svg).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'))
  console.log('✓ icon-512.png')

  // favicon.ico — wrap a 32x32 PNG in a valid ICO container
  const ico32 = await sharp(svg).resize(32, 32).png().toBuffer()
  const icoBuffer = buildIco([ico32])
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer)
  console.log('✓ favicon.ico')

  // favicon.svg stays as-is (already correct)
  console.log('✓ favicon.svg (unchanged — already correct)')
}

// Builds a minimal valid .ico containing one PNG image
function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * count
  const dataOffset = headerSize + dirSize

  // ICO header
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)     // reserved
  header.writeUInt16LE(1, 2)     // type: 1 = ICO
  header.writeUInt16LE(count, 4) // number of images

  const dirEntries = []
  let currentOffset = dataOffset

  for (const png of pngBuffers) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(32, 0)              // width (32px; 0 means 256)
    entry.writeUInt8(32, 1)              // height
    entry.writeUInt8(0, 2)              // color count (0 = no palette)
    entry.writeUInt8(0, 3)              // reserved
    entry.writeUInt16LE(1, 4)           // color planes
    entry.writeUInt16LE(32, 6)          // bits per pixel
    entry.writeUInt32LE(png.length, 8)  // size of image data
    entry.writeUInt32LE(currentOffset, 12) // offset of image data
    dirEntries.push(entry)
    currentOffset += png.length
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers])
}

run().catch(err => { console.error(err); process.exit(1) })
