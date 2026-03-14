import sharp from 'sharp';
import https from 'https';
import fs from 'fs';

const imageUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BS%20CC%20Creds%20040326-nVwSg2jTej3TNMJNUocYkP2ZF7DEuH.jpg';
const outputPath = 'public/og-image.jpg';

console.log('[v0] Starting image resize process...');

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  try {
    // Ensure public directory exists
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public', { recursive: true });
      console.log('[v0] Created public directory');
    }
    
    console.log('[v0] Downloading image from URL...');
    const buffer = await downloadImage(imageUrl);
    
    console.log('[v0] Image downloaded, resizing to 1200x630...');
    
    await sharp(buffer)
      .resize(1200, 630, {
        fit: 'contain',
        position: 'center',
        background: { r: 255, g: 204, b: 0 } // Yellow background
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    console.log('[v0] ✓ Image resized successfully to 1200x630px');
    console.log('[v0] Saved to:', outputPath);
  } catch (error) {
    console.error('[v0] Error resizing image:', error.message);
    process.exit(1);
  }
})();
