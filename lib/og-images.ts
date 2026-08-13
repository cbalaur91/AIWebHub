// The route → share-card table.
//
// One entry per static route. The same table is read by two consumers, so they
// cannot drift apart:
//
//   1. `scripts/generate-blog-images.ts` renders each entry to a 1600×900 PNG
//      at build time (Satori → resvg), writing to `public/og/`.
//   2. `pageMetadata` in `lib/site.ts` resolves a route's `og:image` /
//      `twitter:image` from it.
//
// Adding a route to the social-card system is therefore one line here — no
// component, page or script change. Routes absent from the table still ship a
// valid card: `pageMetadata` falls back to the site-wide share image.
//
// Case studies are not listed: their cards are derived from
// `lib/portfolio-data.ts` by the generator, and the page passes its card
// explicitly. Blog posts keep their existing `/blog/{slug}.png` cards.
//
// This module deliberately imports nothing — `lib/site.ts` depends on it, and
// keeping it dependency-free is what stops that from becoming a cycle.

/** Every generated card is rendered at this size (16:9, the ratio X/LinkedIn crop to). */
export const OG_CARD_WIDTH = 1600
export const OG_CARD_HEIGHT = 900

/** Cards must stay under this to respect the asset budget set by issue #11. */
export const OG_CARD_MAX_BYTES = 500 * 1024

export type OgCard = {
  /** Site-relative route, matching the `path` passed to `pageMetadata`. */
  route: string
  /** Headline rendered on the card. Wraps at ~1200px, so keep it short. */
  title: string
  /** Pill labels under the headline. Two to four read best. */
  tags: string[]
  /** `og:image:alt` / `twitter:image:alt` text. */
  alt: string
}

export const OG_CARDS: OgCard[] = [
  {
    route: "/",
    title: "Web Design & AI Integration for Modern Businesses",
    tags: ["Web Design", "AI Integration", "Custom Development"],
    alt: "AIWebHub — web design and AI integration for modern businesses",
  },
  {
    route: "/about",
    title: "Your Web Design & AI Integration Partner",
    tags: ["About", "Our Approach"],
    alt: "About AIWebHub — your web design and AI integration partner",
  },
  {
    route: "/services",
    title: "Web Design, AI Integration & E-commerce",
    tags: ["Web Design", "AI Agents", "E-commerce", "SEO"],
    alt: "AIWebHub services — web design, AI integration, e-commerce and SEO",
  },
  {
    route: "/ai-consulting",
    title: "AI Consulting, Training & Automation Audits",
    tags: ["AI Training", "Automation Audit", "Agentic Builds"],
    alt: "AIWebHub AI consulting — training, automation audits and agentic workflow builds",
  },
  {
    route: "/portfolio",
    title: "Portfolio & Client Case Studies",
    tags: ["Case Studies", "Client Work"],
    alt: "AIWebHub portfolio — client projects and case studies",
  },
  {
    route: "/blog",
    title: "Web Design & AI Integration Insights",
    tags: ["Guides", "Analysis"],
    alt: "The AIWebHub blog — web design and AI integration insights",
  },
  {
    route: "/contact",
    title: "Let's Talk About Your Project",
    tags: ["Get a Quote", "Free Consultation"],
    alt: "Contact AIWebHub — request a quote for your project",
  },
  {
    route: "/tools/website-cost-calculator",
    title: "Website Cost Calculator 2026",
    tags: ["Free Tool", "No Email Gate"],
    alt: "AIWebHub website cost calculator — what a website actually costs in 2026",
  },
  {
    route: "/privacy-policy",
    title: "Privacy Policy",
    tags: ["Legal"],
    alt: "AIWebHub privacy policy",
  },
  {
    route: "/terms-of-service",
    title: "Terms of Service",
    tags: ["Legal"],
    alt: "AIWebHub terms of service",
  },
]

/**
 * Site-relative path of the generated card for a route.
 *
 * `/` → `/og/home.png`, `/about` → `/og/about.png`,
 * `/tools/website-cost-calculator` → `/og/tools-website-cost-calculator.png`.
 * Flattening the path keeps every card in one directory, which is what lets the
 * generator and the budget check treat `public/og/` as a single unit.
 */
export function ogCardPath(route: string): string {
  const slug = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-")
  return `/og/${slug || "home"}.png`
}

const CARDS_BY_ROUTE = new Map(OG_CARDS.map((card) => [card.route, card]))

/** The card a static route advertises, or `undefined` when it has none. */
export function ogCardFor(route: string): OgCard | undefined {
  return CARDS_BY_ROUTE.get(route)
}
