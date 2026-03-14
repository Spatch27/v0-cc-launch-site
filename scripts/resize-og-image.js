import sharp from 'sharp';
import https from 'https';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const imageUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BS%20CC%20Creds%20040326-nVwSg2jTej3TNMJNUocYkP2ZF7DEuH.jpg';
const outputPath = 'public/og-image.jpg';

console.log('[v0] Starting image resize process...');

// Download image from URL
https.get(imageUrl, async (response) => {
  try {
    // Resize to OG standard dimensions (1200x630) with yellow background
    await sharp(response)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
        background: { r: 255, g: 204, b: 0 } // Yellow background to match
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    console.log('[v0] Image resized successfully to 1200x630px');
    console.log('[v0] Saved to:', outputPath);
  } catch (error) {
    console.error('[v0] Error resizing image:', error);
    process.exit(1);
  }
});
