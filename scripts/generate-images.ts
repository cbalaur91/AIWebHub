/**
 * Build-time image pipeline (issue #27, decided in #11).
 *
 * Three jobs, run before `next build`:
 *
 *  1. Emit WebP derivatives of every raster under `public/` into `public/_opt/`,
 *     mirroring the source path, at widths 640/1024/1600 (never upscaling).
 *  2. Write `public/_opt/manifest.json` — the srcSet widths plus intrinsic
 *     dimensions that `<Picture>` (components/ui/picture.tsx) reads.
 *  3. Fail the build if any file under `public/` blows the per-file size budget.
 *
 * Originals are never moved, renamed, resized or deleted here: their paths are
 * referenced as absolute URLs inside JSON-LD that Google fetches, and rewriting
 * tracked binaries on every build would churn git and compound encode loss.
 */

import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "fs/promises";
import { dirname, extname, join, posix, relative } from "path";

const PUBLIC_DIR = join(import.meta.dir, "..", "public");
const OPT_DIR = join(PUBLIC_DIR, "_opt");
const MANIFEST_PATH = join(OPT_DIR, "manifest.json");

/** Derivative widths. A source narrower than a width never produces it. */
const WIDTHS = [640, 1024, 1600];
const WEBP_QUALITY = 80;

const RASTER_EXT = /\.(png|jpe?g|webp|avif|tiff?)$/i;

/** Per-file size budget for anything served out of `public/`. */
const MAX_BYTES = 500 * 1024;

/**
 * Files allowed past the budget. Each entry needs a reason — the point of the
 * gate is that oversized assets become a decision, not an accident.
 */
const BUDGET_ALLOWLIST = new Map<string, string>([
  ["video/Website_Mission_Video_Creation.mp4", "real <video> element on /about"],
]);

interface ManifestEntry {
  /** Intrinsic width of the original, so <Picture> can reserve layout space. */
  width: number;
  /** Intrinsic height of the original. */
  height: number;
  /** Derivative URL stem — <Picture> appends `-<width>.<format>`. */
  base: string;
  /** Widths emitted per format, largest format-support first. */
  formats: Record<string, number[]>;
}

/**
 * Rasters that only ever leave the site as an absolute URL inside metadata or
 * JSON-LD, never through `<Picture>`. Crawlers fetch the exact URL and do not
 * read a srcSet, so derivatives of these are generated but never requested.
 *
 * If one of these ever gets rendered on a page, drop it from this set.
 */
const METADATA_ASSETS = new Set<string>([
  "thumbnails/logo-thumbnail.png", // lib/site.ts OG_IMAGE — default social card
  "logo/logo.png", // lib/site.ts — JSON-LD Organization `logo`
]);

/**
 * Sources the pipeline deliberately skips:
 *  - `_opt/` itself (its own output)
 *  - `blog/*.png` — Satori OG cards, already emitted at their display size
 *  - `og/*.png` — per-route Satori cards (#20), same reason: social crawlers
 *    fetch the exact `og:image` URL and never read a srcSet, so derivatives of
 *    these are never requested by anything
 *  - `favicons/` — fixed-size icons referenced by exact path in <head>
 *  - `METADATA_ASSETS` — same reason again, for individual files rather than a
 *    whole directory
 *  - anything that is not a raster (SVG, video, text, .ico)
 */
function isPipelineSource(relPath: string): boolean {
  if (relPath.startsWith("_opt/")) return false;
  if (relPath.startsWith("blog/") && relPath.endsWith(".png")) return false;
  if (relPath.startsWith("og/") && relPath.endsWith(".png")) return false;
  if (relPath.startsWith("favicons/")) return false;
  if (METADATA_ASSETS.has(relPath)) return false;
  return RASTER_EXT.test(relPath);
}

/** Every file under `public/`, as paths relative to `public/`, POSIX-separated. */
async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(abs)));
    } else {
      files.push(relative(PUBLIC_DIR, abs).split(/[\\/]/).join(posix.sep));
    }
  }
  return files.sort();
}

async function mtimeMs(path: string): Promise<number | null> {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

async function generate(relPath: string, sourceMtime: number): Promise<[string, ManifestEntry] | null> {
  const sourcePath = join(PUBLIC_DIR, relPath);
  const image = sharp(sourcePath);
  const { width, height } = await image.metadata();
  if (!width || !height) {
    console.warn(`  ! skipping ${relPath} — no intrinsic dimensions`);
    return null;
  }

  const stem = relPath.slice(0, relPath.length - extname(relPath).length);
  const widths = WIDTHS.filter((w) => w <= width);

  for (const w of widths) {
    const outPath = join(OPT_DIR, `${stem}-${w}.webp`);
    const outMtime = await mtimeMs(outPath);
    if (outMtime !== null && outMtime >= sourceMtime) continue;

    await mkdir(dirname(outPath), { recursive: true });
    await sharp(sourcePath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    console.log(`  + ${relative(PUBLIC_DIR, outPath)}`);
  }

  return [
    `/${relPath}`,
    { width, height, base: `/_opt/${stem}`, formats: { webp: widths } },
  ];
}

/**
 * Fails the build on any oversized asset. Runs after generation so derivatives
 * are covered too.
 */
async function enforceBudget(files: string[]): Promise<void> {
  const offenders: string[] = [];
  for (const relPath of files) {
    if (BUDGET_ALLOWLIST.has(relPath)) continue;
    const { size } = await stat(join(PUBLIC_DIR, relPath));
    if (size > MAX_BYTES) {
      offenders.push(`  public/${relPath} — ${(size / 1024).toFixed(0)} KB`);
    }
  }
  if (offenders.length === 0) return;

  throw new Error(
    `Asset budget exceeded — ${offenders.length} file(s) over ${MAX_BYTES / 1024} KB:\n` +
      `${offenders.join("\n")}\n\n` +
      `Shrink the original (max 2000px on the longest edge, quality 85) and render it\n` +
      `through <Picture> (components/ui/picture.tsx), which serves the WebP derivatives\n` +
      `this script generates. If the file genuinely has to ship at this size, add it to\n` +
      `BUDGET_ALLOWLIST in scripts/generate-images.ts with a reason.`
  );
}

async function main() {
  console.log("Generating image derivatives...\n");

  await mkdir(OPT_DIR, { recursive: true });

  const files = await walk(PUBLIC_DIR);
  const manifest: Record<string, ManifestEntry> = {};

  for (const relPath of files) {
    if (!isPipelineSource(relPath)) continue;
    const sourceMtime = (await stat(join(PUBLIC_DIR, relPath))).mtimeMs;
    const entry = await generate(relPath, sourceMtime);
    if (entry) manifest[entry[0]] = entry[1];
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nManifest: ${Object.keys(manifest).length} sources -> public/_opt/manifest.json`);

  await enforceBudget(await walk(PUBLIC_DIR));
  console.log("Asset budget: OK");
}

main().catch((err) => {
  console.error(`\n${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
