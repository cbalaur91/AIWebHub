// Derives each route's real last-modified date from git, at build time.
// Writes lib/route-dates.json, which lib/route-dates.ts reads.
//
// Why this exists: `app/sitemap.ts` used to hard-code `new Date('2026-02-16')`
// on every static page and every case study. Twenty of the site's twenty-seven
// URLs therefore claimed nothing had changed since February, while those same
// pages were being retitled, deepened and re-canonicalised in August. Google
// reads `lastmod` to schedule recrawls, so the sitemap was suppressing recrawls
// of exactly the pages that had changed most — the "Discovered - currently not
// indexed" cluster in Search Console.
//
// Why node and .mjs, when every other script here is TypeScript run by bun:
// bun is installed as a snap on the maintainer's machine and its sandbox cannot
// see /usr/bin/git, so `spawnSync("git", ...)` fails with ENOENT no matter how
// the path is written. Node has no such confinement. This script needs nothing
// from the TypeScript modules, so plain ESM costs nothing.
//
// Blog posts are absent by design: they already carry a real `modifiedDate` in
// lib/blog-posts.ts, which the sitemap keeps using.
//
// The generated JSON is committed. When git history is unavailable — Vercel
// shallow-clones by default — a lookup returns nothing and the committed value
// is preserved rather than overwritten, so a shallow build degrades to "the
// dates as of the last full-history run" instead of to garbage.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = join(REPO_ROOT, "lib", "route-dates.json");

/**
 * Route → the source paths that determine its content.
 *
 * Directories are fine; git matches everything beneath them. Keep each list
 * narrow enough to stay meaningful: adding `app/layout.tsx` here would move
 * every route's date in lockstep on any sitewide edit, which is the same loss
 * of signal as hard-coding one date.
 *
 * `/portfolio/[slug]` is the shared key for all eight case studies. They render
 * from one template and one data file, so they genuinely do share a date;
 * `app/sitemap.ts` looks them up under this key rather than per slug.
 */
const ROUTE_SOURCES = {
  "/": [
    "app/page.tsx",
    "components/Hero.tsx",
    "components/ProofSection.tsx",
    "components/HowWeWork.tsx",
  ],
  "/services": ["app/services", "components/ScopeSection.tsx"],
  "/ai-consulting": ["app/ai-consulting"],
  "/about": ["app/about"],
  "/web-design-detroit": ["app/web-design-detroit", "lib/location-data.ts"],
  "/portfolio": [
    "app/portfolio/page.tsx",
    "app/portfolio/layout.tsx",
    "lib/portfolio-data.ts",
  ],
  "/portfolio/[slug]": ["app/portfolio/[slug]", "lib/portfolio-data.ts"],
  "/blog": ["app/blog/page.tsx", "app/blog/layout.tsx"],
  "/tools/website-cost-calculator": [
    "app/tools/website-cost-calculator",
    "components/CostCalculator.tsx",
    "lib/cost-calculator-data.ts",
  ],
  "/contact": ["app/contact", "components/ContactForm.tsx"],
  "/privacy-policy": ["app/privacy-policy"],
  "/terms-of-service": ["app/terms-of-service"],
};

/** ISO date of the newest commit touching any of `paths`, or `""` if unknown. */
function lastCommitDate(paths) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

/** The previously generated table, or `{}` on the first ever run. */
function previousDates() {
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, "utf8"));
  } catch {
    return {};
  }
}

const previous = previousDates();
const dates = {};
let resolved = 0;

for (const [route, sources] of Object.entries(ROUTE_SOURCES)) {
  const date = lastCommitDate(sources);
  if (date) resolved += 1;

  // An unresolved route keeps its committed date; it is dropped only when there
  // has never been one, in which case the sitemap omits `lastmod` for that URL.
  const value = date || previous[route];
  if (value) dates[route] = value;
}

if (resolved === 0) {
  console.warn(
    "generate-route-dates: git returned no dates (shallow clone?) — keeping the committed table.",
  );
}

writeFileSync(OUTPUT_PATH, `${JSON.stringify(dates, null, 2)}\n`, "utf8");
console.log(
  `generate-route-dates: wrote ${Object.keys(dates).length} routes (${resolved} from git) to lib/route-dates.json`,
);
