# Pricing → Quote Conversion — Design Spec

- **Date:** 2026-06-13
- **Status:** Approved (design) — pending spec review
- **Branch:** `feat/pricing-to-quote`

## Background & Goal

AIWebHub currently shows 4 fixed pricing tiers on `/services` ($499–$2,499 one-time, $30–$150/mo). There have been zero inbound reach-outs to date.

Decision: remove fixed pricing and move to a value-based **"Request a Quote"** model. Rationale — for custom web/AI agency work, fixed tiers anchor buyers low and create no reason to make contact; a quote model sells on value and makes contacting us the only path to a price.

> Note: 0 reach-outs is primarily a **discovery/SEO** problem (is anyone landing on the site at all?), tracked as separate follow-up work. This change is the value/positioning piece, not a traffic fix.

**Goal:** a visitor on `/services` understands the offerings and is driven to a single clear "Request a Quote" action; no fixed prices appear anywhere on the site; no SEO/structured-data references prices.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Price handling | **Full removal** — no tiers, no numbers |
| Replacement | **Approach A** — reuse existing Services showcase + FAQ as the value pitch; add a Request-a-Quote CTA band where the cards were |
| Quote form | **Unchanged** — existing Web3Forms `ContactForm` (name / email / company / message) |
| Quote location | **Route to `/contact`** — service CTAs point to the existing contact page. No `?service=` pre-fill |

**Out of scope:** new form fields, a dedicated `/quote` page, Resend/email infra, Stripe, form pre-fill.

## Detailed changes

Line numbers below are approximate orientation points from codebase exploration — verify during implementation.

### 1. `app/services/page.tsx` (primary)
- Remove the `pricingPlans` array and `PricingPlan` interface (~lines 8–95).
- Remove the 4-card pricing grid section (`#pricing` plans block, ~lines 272–340).
- Hero (~lines 211–270):
  - Headline "Simple pricing, powerful results" → a value headline (final copy decided in the plan; e.g. "Websites and AI agents, built around your business").
  - Replace the price-y stat trio ("4 Flexible Plans", "$499 Starting From", "100% Satisfaction") — keep "100% Satisfaction", replace the two price-based ones with non-price value points.
  - Primary CTA "View Plans" (→ `#pricing`) → "Request a Quote" (→ `/contact`).
- Add a **"Request a Quote" CTA band** in place of the removed grid: short value line + button → `/contact`.
- **Keep** the Services showcase section (~lines 342–423) and FAQ section (~lines 425–458).
- FAQ content: rewrite "How much does a custom website cost?" to a quote-oriented answer with **no fixed numbers**; scrub any other price figures in FAQ copy. Keep the questions themselves (high-intent search queries).

### 2. Structured data in `app/services/page.tsx`
- Remove `OfferCatalog` / `Offer` / `UnitPriceSpecification` price markup (~lines 148–185).
- Replace with a **price-free** `Service` / `ItemList` describing the offerings (provider = Organization) — keep the offerings listed so SEO value is retained, just with **no price fields**. (Don't drop to Organization-only.)
- Keep `BreadcrumbList` (~lines 187–194).
- `FAQPage` schema (~lines 135–146): update the cost-question answer text to match the new visible answer; remove price numbers.

### 3. `app/services/layout.tsx`
- `<title>`: "Services & Pricing | AIWebHub" → "Services | AIWebHub".
- Meta description: remove price / "starting at $X" claims; keep services/quote framing.

### 4. `components/Hero.tsx`
- Homepage secondary CTA "View Pricing" (→ `/services`, ~line 62) → "View Services" (still → `/services`). Wording only.

### 5. `app/about/page.tsx`
- "Explore Pricing" (→ `/services`, ~line 136) → "Explore Services" (still → `/services`).

### 6. `app/contact/page.tsx`
- Pricing-specific FAQ content citing dollar figures (~lines 8–32): rewrite to quote-oriented, no numbers. If the contact page emits its own `FAQPage` schema mirroring these, update it to match.

### Unchanged
- `components/ContactForm.tsx` + Web3Forms submission — no changes.
- `components/Navbar.tsx` / `components/Footer.tsx` — no pricing links to change ("Services" → `/services` stays valid; Footer → `/contact`).
- Routes — `/services` stays; no new routes.

## Edge cases & risks
- **Stray price references** elsewhere (other pages, blog). Mitigation: repo-wide grep for `$499`, `$999`, `1,999`, `2,499`, `/mo`, "Starting From", "pricing" during verification; fix visible-content hits. Leave historical blog content unless it states *current* pricing.
- **Dangling `#pricing` anchor:** any link to `/services#pricing` breaks once the section is gone. Mitigation: grep `#pricing`, repoint to `/contact` or the services section.
- **Structured-data mismatch:** price markup must be removed in the *same* change as visible prices — false price markup can trigger Google rich-result issues.

## Verification
- `bun run typecheck` clean (removing the interface/array must not orphan imports).
- `bun run lint` clean on touched files.
- `bun run build` succeeds.
- Manual pass: `/services`, `/`, `/about`, `/contact` — no prices visible, all "Request a Quote" / "View Services" CTAs route correctly, no dangling `#pricing`.
- Grep confirms no stray price strings in visible content.
- Schema/Rich Results check on `/services`: no Offer/price markup; `FAQPage` + `BreadcrumbList` still valid.

## Follow-ups (separate work)
- Discovery is the bigger lever on reach-outs: run the `seo` skill audit, set up Google Search Console (+ a vetted GSC MCP), and install the GA MCP for conversion analysis once traffic exists.
