import fs from 'fs';
import path from 'path';

// Read the attachment files and crop their viewBoxes
const attachmentDir = 'user_read_only_context/text_attachments';

function cropSVGContent(filePath, cropPercentage = 15) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract current viewBox
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    if (!viewBoxMatch) {
      console.log(`[v0] No viewBox found in ${filePath}`);
      return content;
    }

    const [x, y, width, height] = viewBoxMatch[1].split(' ').map(Number);
    console.log(`[v0] Original viewBox for ${path.basename(filePath)}: ${viewBoxMatch[1]}`);

    // Crop by moving inward and reducing dimensions
    const cropAmount = Math.min(width, height) * (cropPercentage / 100);
    const newX = x + cropAmount;
    const newY = y + cropAmount;
    const newWidth = width - (cropAmount * 2);
    const newHeight = height - (cropAmount * 2);
    
    const newViewBox = `${newX} ${newY} ${newWidth} ${newHeight}`;
    console.log(`[v0] New viewBox: ${newViewBox}`);
    
    // Replace viewBox
    const newContent = content.replace(/viewBox="[^"]*"/, `viewBox="${newViewBox}"`);
    
    return newContent;
  } catch (err) {
    console.log(`[v0] Error reading ${filePath}: ${err.message}`);
    return null;
  }
}

// Process both SVGs
const svgs = [
  { input: path.join(attachmentDir, '20-pink-v4uYv.svg'), output: 'public/images/how-we-work.svg', name: 'how-we-work' },
  { input: path.join(attachmentDir, '4-pink-CjcAW.svg'), output: 'public/images/systems-agents.svg', name: 'systems-agents' }
];

svgs.forEach(svg => {
  console.log(`[v0] Processing ${svg.name}...`);
  const croppedContent = cropSVGContent(svg.input, 15);
  
  if (croppedContent) {
    // Ensure output directory exists
    const dir = path.dirname(svg.output);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(svg.output, croppedContent);
    console.log(`[v0] ✓ Cropped and saved to ${svg.output}\n`);
  }
});
