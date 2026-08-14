// Read side of the generated route → last-modified table.
//
// `scripts/generate-route-dates.mjs` writes `route-dates.json` from git history
// at build time; this module is the only thing that should import it, so the
// missing-key policy lives in one place rather than at every call site.

import ROUTE_DATES from "./route-dates.json"

/** The shared key for every `/portfolio/{slug}` case study. */
export const CASE_STUDY_ROUTE = "/portfolio/[slug]"

/**
 * A route's last-modified date, or `undefined` when it is genuinely unknown —
 * a route added before the table was refreshed.
 *
 * Returning `undefined` makes the sitemap omit `lastmod` for that URL rather
 * than invent one. An absent `lastmod` is valid per the sitemap protocol and
 * leaves Google to its own crawl scheduling; a wrong one actively misleads it,
 * which is the failure this module exists to fix.
 */
export function routeDate(route: string): Date | undefined {
  const iso = (ROUTE_DATES as Record<string, string>)[route]
  return iso ? new Date(iso) : undefined
}
