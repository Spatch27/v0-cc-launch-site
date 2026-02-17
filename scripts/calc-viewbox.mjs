// Parse the SVG paths to find the bounding box of the artwork
// We'll extract all coordinate values from the path data

import { readFileSync } from 'fs';

const svg = readFileSync('user_read_only_context/text_attachments/CC-_Logo-DK-GREY.svg-R1R6o.xml', 'utf8');

// Extract all path d attributes and rect attributes
const pathDs = [...svg.matchAll(/\bd="([^"]+)"/g)].map(m => m[1]);
const rects = [...svg.matchAll(/<rect[^>]+x="([^"]+)"[^>]+y="([^"]+)"[^>]+width="([^"]+)"[^>]+height="([^"]+)"/g)];

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

// Process rects
for (const r of rects) {
  const x = parseFloat(r[1]), y = parseFloat(r[2]), w = parseFloat(r[3]), h = parseFloat(r[4]);
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  maxX = Math.max(maxX, x + w);
  maxY = Math.max(maxY, y + h);
}

// Simple path parser - extract absolute coordinates
for (const d of pathDs) {
  let curX = 0, curY = 0;
  // Split into commands
  const tokens = d.match(/[a-zA-Z][^a-zA-Z]*/g);
  if (!tokens) continue;
  
  for (const token of tokens) {
    const cmd = token[0];
    const nums = token.slice(1).trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    
    let i = 0;
    switch(cmd) {
      case 'M':
      case 'L':
        while (i < nums.length) {
          curX = nums[i++]; curY = nums[i++];
          minX = Math.min(minX, curX); minY = Math.min(minY, curY);
          maxX = Math.max(maxX, curX); maxY = Math.max(maxY, curY);
        }
        break;
      case 'm':
      case 'l':
        while (i < nums.length) {
          curX += nums[i++]; curY += nums[i++];
          minX = Math.min(minX, curX); minY = Math.min(minY, curY);
          maxX = Math.max(maxX, curX); maxY = Math.max(maxY, curY);
        }
        break;
      case 'H':
        while (i < nums.length) {
          curX = nums[i++];
          minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
        }
        break;
      case 'h':
        while (i < nums.length) {
          curX += nums[i++];
          minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
        }
        break;
      case 'V':
        while (i < nums.length) {
          curY = nums[i++];
          minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
        }
        break;
      case 'v':
        while (i < nums.length) {
          curY += nums[i++];
          minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
        }
        break;
      case 'C':
        while (i < nums.length) {
          for (let j = 0; j < 3; j++) {
            const x = nums[i++], y = nums[i++];
            minX = Math.min(minX, x); minY = Math.min(minY, y);
            maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
          }
          curX = nums[i-2]; curY = nums[i-1];
        }
        break;
      case 'c':
        while (i < nums.length) {
          for (let j = 0; j < 3; j++) {
            const x = curX + nums[i++], y = curY + nums[i++];
            minX = Math.min(minX, x); minY = Math.min(minY, y);
            maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
          }
          curX += nums[i-6+4]; curY += nums[i-6+5];
        }
        break;
      case 'S':
      case 'Q':
        while (i < nums.length) {
          for (let j = 0; j < 2; j++) {
            const x = nums[i++], y = nums[i++];
            minX = Math.min(minX, x); minY = Math.min(minY, y);
            maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
          }
          curX = nums[i-2]; curY = nums[i-1];
        }
        break;
      case 's':
      case 'q':
        while (i < nums.length) {
          for (let j = 0; j < 2; j++) {
            const x = curX + nums[i++], y = curY + nums[i++];
            minX = Math.min(minX, x); minY = Math.min(minY, y);
            maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
          }
          curX += nums[i-4+2]; curY += nums[i-4+3];
        }
        break;
      case 'Z':
      case 'z':
        break;
    }
  }
}

console.log(`Bounding box: x=${minX} y=${minY} w=${maxX - minX} h=${maxY - minY}`);
console.log(`Suggested viewBox: "${minX} ${minY} ${maxX - minX} ${maxY - minY}"`);
