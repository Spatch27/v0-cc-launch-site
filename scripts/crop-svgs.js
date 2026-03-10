import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to parse SVG and crop viewBox
function cropSVG(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract current viewBox
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) {
    console.log(`[v0] No viewBox found in ${filePath}`);
    return;
  }

  const [x, y, width, height] = viewBoxMatch[1].split(' ').map(Number);
  console.log(`[v0] Current viewBox for ${path.basename(filePath)}: ${x} ${y} ${width} ${height}`);

  // Try to estimate content bounds by looking at actual elements
  // Get all path, rect, circle, ellipse, text elements
  const elementRegex = /<(path|rect|circle|ellipse|text|g)[\s\S]*?>/g;
  const elements = content.match(elementRegex) || [];
  
  console.log(`[v0] Found ${elements.length} elements`);
  
  // Parse bounding boxes from elements
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let foundBounds = false;

  elements.forEach(element => {
    // Look for x, y, r, cx, cy attributes
    const xMatch = element.match(/\sx="([^"]+)"/);
    const yMatch = element.match(/\sy="([^"]+)"/);
    const cxMatch = element.match(/\scx="([^"]+)"/);
    const cyMatch = element.match(/\scy="([^"]+)"/);
    const rMatch = element.match(/\sr="([^"]+)"/);

    if (xMatch || yMatch || cxMatch || cyMatch) {
      foundBounds = true;
      const ex = xMatch ? Number(xMatch[1]) : (cxMatch ? Number(cxMatch[1]) : 0);
      const ey = yMatch ? Number(yMatch[1]) : (cyMatch ? Number(cyMatch[1]) : 0);
      minX = Math.min(minX, ex);
      minY = Math.min(minY, ey);
      maxX = Math.max(maxX, ex + (rMatch ? Number(rMatch[1]) * 2 : 100));
      maxY = Math.max(maxY, ey + (rMatch ? Number(rMatch[1]) * 2 : 100));
    }
  });

  if (foundBounds && (minX > 0 || minY > 0 || maxX < width || maxY < height)) {
    // Add 5% padding
    const padding = Math.min(width, height) * 0.05;
    const newX = Math.max(0, minX - padding);
    const newY = Math.max(0, minY - padding);
    const newWidth = Math.min(width, maxX - newX + padding);
    const newHeight = Math.min(height, maxY - newY + padding);
    
    const newViewBox = `${newX} ${newY} ${newWidth} ${newHeight}`;
    console.log(`[v0] Suggested new viewBox: ${newViewBox}`);
    
    // For now, just reduce padding on all sides - reduce from original viewBox by moving it inward
    const cropAmount = Math.min(width, height) * 0.15; // Crop 15% from edges
    const croppedViewBox = `${x + cropAmount} ${y + cropAmount} ${width - cropAmount * 2} ${height - cropAmount * 2}`;
    
    const newContent = content.replace(/viewBox="[^"]*"/, `viewBox="${croppedViewBox}"`);
    fs.writeFileSync(filePath, newContent);
    console.log(`[v0] Updated viewBox to: ${croppedViewBox}\n`);
  }
}

// Process both SVG files
const svgFiles = [
  path.join(__dirname, '../public/images/how-we-work.svg'),
  path.join(__dirname, '../public/images/systems-agents.svg')
];

svgFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`[v0] Processing ${path.basename(file)}...`);
    cropSVG(file);
  } else {
    console.log(`[v0] File not found: ${file}`);
  }
});
