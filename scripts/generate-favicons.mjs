import sharp from "sharp";

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#2A2A2A"/>
  <g transform="translate(29 11) scale(1)">
    <path fill="#fff" d="M245.03,122.51v245.03c-67.66,0-122.51-54.85-122.51-122.52s54.85-122.51,122.51-122.51ZM331.87,367.55v-108.39l-76.13,108.39h76.13ZM255.74,122.51l76.13,108.39v-108.39h-76.13Z"/>
  </g>
</svg>`;

const svgBuffer = Buffer.from(svgContent);

// Generate 32x32 PNG (standard favicon)
await sharp(svgBuffer).resize(32, 32).png().toFile("public/icon-dark-32x32.png");
console.log("Generated icon-dark-32x32.png");

// Generate 180x180 PNG (Apple Touch Icon)
await sharp(svgBuffer).resize(180, 180).png().toFile("public/apple-icon.png");
console.log("Generated apple-icon.png");

// Generate 192x192 PNG (Android)
await sharp(svgBuffer).resize(192, 192).png().toFile("public/icon-192x192.png");
console.log("Generated icon-192x192.png");

console.log("All favicons generated successfully!");
