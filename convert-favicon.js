const fs = require('fs');
const path = require('path');

// Read the SVG file
const svgPath = path.join(__dirname, 'public/favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Use JSDOM and canvas to render SVG to PNG
const { JSDOM } = require('jsdom');
const { Canvas } = require('canvas');

async function convertSvgToPng(svgContent, size) {
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
    pretendToBeVisual: true,
    resources: 'usable',
  });
  
  const { window } = dom;
  const document = window.document;
  
  const container = document.createElement('div');
  container.innerHTML = svgContent;
  document.body.appendChild(container);
  
  const svg = container.querySelector('svg');
  if (!svg) throw new Error('No SVG found in content');
  
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  
  // Create canvas and render
  const canvas = new Canvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Render SVG to canvas using canvg
  const canvg = require('canvg');
  await canvg.render(ctx, svgContent, { width: size, height: size });
  
  return canvas.toBuffer('image/png');
}

(async () => {
  try {
    const png64 = await convertSvgToPng(svgContent, 64);
    const png32 = await convertSvgToPng(svgContent, 32);
    
    fs.writeFileSync(path.join(__dirname, 'public/favicon-64x64.png'), png64);
    fs.writeFileSync(path.join(__dirname, 'public/favicon-32x32.png'), png32);
    
    console.log('✓ favicon-64x64.png created');
    console.log('✓ favicon-32x32.png created');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
