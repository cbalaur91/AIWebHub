// Canonical site identity — the single source of truth for the base URL,
// absolute-URL building, the social/OG share image, and organisation facts.
// Reused across the root layout, sitemap, robots, page metadata, and JSON-LD
// so these values stop being retyped. Also consumed by the structured-data
// builders (issue #005).

import type { Metadata } from "next"
import {
  OG_CARD_HEIGHT,
  OG_CARD_WIDTH,
  ogCardFor,
  ogCardPath,
} from "./og-images"

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

/** Share image for routes with no card of their own. The last-resort fallback. */
const FALLBACK_IMAGES: NonNullable<Metadata["openGraph"]>["images"] = [
  { url: OG_IMAGE, width: 1200, height: 630, alt: "AIWebHub — web design and AI integration" },
]

/**
 * The `images` entry for a route's generated 1600×900 share card.
 *
 * `alt` defaults to the route's own alt text from `OG_CARDS`; dynamic routes
 * whose cards are derived rather than tabulated — case studies — pass theirs.
 */
export function ogCardImages(
  route: string,
  alt?: string,
): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: abs(ogCardPath(route)),
      width: OG_CARD_WIDTH,
      height: OG_CARD_HEIGHT,
      alt: alt ?? ogCardFor(route)?.alt ?? ORG.name,
    },
  ]
}

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
  /**
   * Share images for this route. Omit to use the route's generated card from
   * `OG_CARDS` — only dynamic routes, whose cards are not tabulated, pass this.
   */
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
 *
 * A third trap lives outside this function and is worth recording: a raw
 * `<meta property="og:image">` written into a layout's `<head>` does not replace
 * what the Metadata API emits, it *precedes* it. Crawlers take the first tag, so
 * seven such tags in the root layout silently overrode every per-route card on
 * the site (issue #20). Share images belong here, never in JSX.
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
  const resolvedImages =
    images ?? (ogCardFor(path) ? ogCardImages(path) : FALLBACK_IMAGES)

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
      images: resolvedImages,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      creator: "@aiwebhub",
      images: resolvedImages,
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
