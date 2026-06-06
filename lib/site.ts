// Canonical site identity — the single source of truth for the base URL,
// absolute-URL building, the social/OG share image, and organisation facts.
// Reused across the root layout, sitemap, robots, page metadata, and JSON-LD
// so these values stop being retyped. Also consumed by the structured-data
// builders (issue #005).

/** Canonical base URL for the production site. No trailing slash. */
export const SITE_URL = "https://www.aiwebhub.io"

/**
 * Build an absolute URL from a site-relative path. The leading slash is
 * optional, so `abs("/blog")` and `abs("blog")` are equivalent.
 */
export function abs(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/** Canonical social / OpenGraph / Twitter share image (absolute URL). */
export const OG_IMAGE = abs("/thumbnails/logo-thumbnail.png")

/** Organisation identity facts, reused across metadata and JSON-LD. */
export const ORG = {
  name: "AIWebHub",
  url: SITE_URL,
  logo: abs("/logo/logo.png"),
  ogImage: OG_IMAGE,
  founder: "Cosmin Balaur",
  authorUrl: "https://www.linkedin.com/in/cosminbalaur91",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61574644971669",
    "https://www.linkedin.com/in/cosminbalaur91",
  ],
}
