// Canonical site identity — the single source of truth for the base URL,
// absolute-URL building, the social/OG share image, and organisation facts.
// Reused across the root layout, sitemap, robots, page metadata, and JSON-LD
// so these values stop being retyped. Also consumed by the structured-data
// builders (issue #005).

import type { Metadata } from "next"

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

type PageMetadataInput = {
  /** The `<title>`, and the default for the social-card titles. */
  title: string
  /** The meta description, and the default for the social-card descriptions. */
  description: string
  /** Site-relative path this route lives at. Becomes its self-canonical. */
  path: string
  /** Social-card title, when the share card should read differently from `<title>`. */
  socialTitle?: string
  /** Social-card description, when the share card should read differently. */
  socialDescription?: string
  /** Share images for this route. Omit to fall back to the site-wide tags. */
  images?: NonNullable<Metadata["openGraph"]>["images"]
  /** Extra OpenGraph fields — `type`, article dates, authors. */
  openGraph?: Metadata["openGraph"]
  /** Extra Twitter-card fields, when the card should differ from OpenGraph. */
  twitter?: Metadata["twitter"]
}

/**
 * Build a route's `Metadata` from the handful of values that actually differ
 * per page.
 *
 * Two Next.js metadata-inheritance traps make this worth centralising:
 *
 * 1. `alternates.canonical` is inherited, so a route that omits it silently
 *    canonicalises to its parent's URL and drops out of the index. Every route
 *    must state its own, which is why `path` is required rather than optional.
 * 2. `openGraph` and `twitter` are replaced wholesale by the nearest level that
 *    defines either one — they are not merged field by field. A route that sets
 *    `openGraph` alone therefore loses `siteName`/`locale` and keeps the root
 *    layout's `twitter` title, which is how every page came to share one
 *    hard-coded `twitter:title`.
 *
 * Both are invisible in source and only show up in the built HTML, so verify
 * changes here against `out/`, not against the JSX.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
  images,
  openGraph,
  twitter,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: abs(path),
      siteName: ORG.name,
      locale: "en_US",
      type: "website",
      ...(images ? { images } : {}),
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      creator: "@aiwebhub",
      ...(images ? { images } : {}),
      ...twitter,
    },
  }
}

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
