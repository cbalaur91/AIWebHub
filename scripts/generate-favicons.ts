/**
 * Generates the AI Web Hub favicon set from the "Nexus" mark.
 *
 * Renders an app-icon style mark (white nodes on the brand gradient tile) at every
 * required size with @resvg/resvg-js, and assembles a multi-resolution favicon.ico
 * with a tiny inline ICO encoder (no extra dependencies).
 *
 * Run: bun run generate:favicons
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFile } from "fs/promises";
import { join } from "path";

const OUT_DIR = join(import.meta.dir, "..", "public", "favicons");

// Favicon mark geometry (64x64). Bolder than the navbar mark so the six nodes
// survive at 16px. Mark group is scaled/centered inside the tile.
function buildSvg(rounded: boolean): string {
  const rx = rounded ? 14 : 0;
  return `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tile" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2563EB"/>
      <stop offset="1" stop-color="#9333EA"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="64" height="64" rx="${rx}" fill="url(#tile)"/>
  <g transform="translate(5.12,5.12) scale(0.84)" fill="#ffffff">
    <circle cx="32" cy="12" r="4.6"/>
    <circle cx="49.32" cy="22" r="4.6"/>
    <circle cx="49.32" cy="42" r="4.6"/>
    <circle cx="32" cy="52" r="4.6"/>
    <circle cx="14.68" cy="42" r="4.6"/>
    <circle cx="14.68" cy="22" r="4.6"/>
    <circle cx="32" cy="32" r="11"/>
  </g>
</svg>`;
}

function png(svg: string, size: number): Buffer {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  return Buffer.from(resvg.render().asPng());
}

// Minimal ICO encoder: packs PNG-encoded images into a .ico container.
function pngToIco(images: { size: number; data: Buffer }[]): Buffer {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  for (let i = 0; i < count; i++) {
    const { size, data } = images[i];
    const e = dir.subarray(i * 16, i * 16 + 16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // color palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8); // size of image data
    e.writeUInt32LE(offset, 12); // offset of image data
    offset += data.length;
  }

  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

async function main() {
  const rounded = buildSvg(true);
  const square = buildSvg(false); // opaque, full-bleed — for apple-touch & maskable android

  const targets: { file: string; svg: string; size: number }[] = [
    { file: "favicon-16x16.png", svg: rounded, size: 16 },
    { file: "favicon-32x32.png", svg: rounded, size: 32 },
    { file: "apple-touch-icon.png", svg: square, size: 180 },
    { file: "android-chrome-192x192.png", svg: square, size: 192 },
    { file: "android-chrome-512x512.png", svg: square, size: 512 },
  ];

  for (const t of targets) {
    await writeFile(join(OUT_DIR, t.file), png(t.svg, t.size));
    console.log(`✓ ${t.file} (${t.size}x${t.size})`);
  }

  const ico = pngToIco([
    { size: 16, data: png(rounded, 16) },
    { size: 32, data: png(rounded, 32) },
    { size: 48, data: png(rounded, 48) },
  ]);
  await writeFile(join(OUT_DIR, "favicon.ico"), ico);
  console.log("✓ favicon.ico (16/32/48)");

  console.log("\nFavicon set regenerated in public/favicons/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
