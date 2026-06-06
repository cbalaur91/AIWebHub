/**
 * Generates the AI Web Hub brand share assets from the "Nexus" identity:
 *   - public/thumbnails/logo-thumbnail.png  (1200x630 OG / Twitter card)
 *   - public/logo/logo.png                  (1200x630 brand lockup, used by JSON-LD `logo`)
 *
 * Single hand-built SVG per asset, rasterized with @resvg/resvg-js (already a dep).
 * Inter bold weights are fetched from Google Fonts (cached in scripts/fonts/).
 *
 * Run: bun run generate:brand-images
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";

const FONTS_DIR = join(import.meta.dir, "fonts");
const ROOT = join(import.meta.dir, "..");

const REGULAR = join(FONTS_DIR, "Inter-Regular.ttf"); // already cached by blog pipeline

// Fetch a specific Inter weight as TTF (Google Fonts serves TTF to legacy UAs). Cached.
async function ensureWeight(weight: number): Promise<string> {
  const file = join(FONTS_DIR, `Inter-${weight}.ttf`);
  try {
    await access(file);
    return file;
  } catch {
    /* not cached */
  }
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      // Old Android UA reliably makes Google Fonts serve TTF (not woff2/eot).
      { headers: { "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us)" } },
    ).then((r) => r.text());
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error("no TTF url in css2 response");
    const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
    await mkdir(FONTS_DIR, { recursive: true });
    await writeFile(file, buf);
    console.log(`  ↓ cached Inter ${weight}`);
    return file;
  } catch (e) {
    console.warn(`  ! Inter ${weight} fetch failed (${e}); falling back to Regular`);
    return REGULAR;
  }
}

// The "Nexus" mark (64x64 space) placed via transform.
function mark(transform: string): string {
  return `<g transform="${transform}">
    <g fill="#E2E8F0">
      <circle cx="32" cy="11" r="3.4"/><circle cx="50.2" cy="21.5" r="3.4"/><circle cx="50.2" cy="42.5" r="3.4"/>
      <circle cx="32" cy="53" r="3.4"/><circle cx="13.8" cy="42.5" r="3.4"/><circle cx="13.8" cy="21.5" r="3.4"/>
    </g>
    <circle cx="32" cy="32" r="9.5" fill="url(#core)"/>
    <circle cx="32" cy="32" r="9.5" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.3"/>
  </g>`;
}

function buildSvg(withTagline: boolean): string {
  const markY = withTagline ? 116 : 168;
  const markSize = 150;
  const markScale = markSize / 64;
  const wordY = markY + markSize + 96; // baseline of the wordmark
  const taglineY = wordY + 70;
  const domainY = 568;

  const tagline = withTagline
    ? `<text x="600" y="${taglineY}" text-anchor="middle" font-family="Inter" font-weight="400" font-size="30" fill="#9aa0ab">Web Design &amp; AI Integration Solutions</text>
       <text x="600" y="${domainY}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="25" fill="#ffffff" opacity="0.82" letter-spacing="1.5">aiwebhub.io</text>`
    : "";

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="core" x1="23" y1="23" x2="41" y2="41" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/><stop offset="1" stop-color="#A855F7"/>
    </linearGradient>
    <linearGradient id="word" x1="352" y1="0" x2="476" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/><stop offset="1" stop-color="#A855F7"/>
    </linearGradient>
    <radialGradient id="glow1" cx="250" cy="150" r="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6" stop-opacity="0.30"/><stop offset="1" stop-color="#3B82F6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="980" cy="520" r="440" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A855F7" stop-opacity="0.28"/><stop offset="1" stop-color="#A855F7" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>

  ${mark(`translate(${600 - markSize / 2}, ${markY}) scale(${markScale})`)}

  <text x="600" y="${wordY}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="96" letter-spacing="-2">
    <tspan fill="url(#word)">AI</tspan><tspan fill="#ffffff"> WEB HUB</tspan>
  </text>

  ${tagline}
</svg>`;
}

async function render(svg: string, fontFiles: string[]): Promise<Buffer> {
  const resvg = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Inter" },
  });
  return Buffer.from(resvg.render().asPng());
}

async function main() {
  console.log("Loading fonts…");
  const fontFiles = [REGULAR, await ensureWeight(700), await ensureWeight(900)];

  const og = await render(buildSvg(true), fontFiles);
  await writeFile(join(ROOT, "public", "thumbnails", "logo-thumbnail.png"), og);
  console.log("✓ public/thumbnails/logo-thumbnail.png (1200x630 OG card)");

  const logo = await render(buildSvg(false), fontFiles);
  await writeFile(join(ROOT, "public", "logo", "logo.png"), logo);
  console.log("✓ public/logo/logo.png (1200x630 brand lockup)");

  console.log("\nBrand share assets regenerated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
