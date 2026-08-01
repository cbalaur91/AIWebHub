# Structured Data Audit — aiwebhub.io

**Ticket:** [#10 — Audit current structured data and decide the schema plan](https://github.com/cbalaur91/AIWebHub/issues/10)
**Parent map:** #6 — Make aiwebhub.io visible: foundation + Michigan local beachhead
**Date:** 1 Aug 2026
**Branch:** `research/structured-data-audit`
**Method:** static export built locally (`bun run build`, 29 routes, exit 0), JSON-LD extracted from `out/**/*.html`, cross-checked against the live production site, validated via `validator.schema.org`, rules confirmed against Google Search Central and schema.org primary sources.

---

## Executive summary

Six findings, in priority order.

| # | Finding | Severity |
|---|---|---|
| 1 | Homepage emits `AggregateRating` 5.0 + four 5-star `Review`s built from **unsourced placeholder testimonials**. Live in production. | **Critical — spam-policy risk** |
| 2 | `public/llms.txt` still publishes the four **retired price tiers** ($499/$999/$1,999/$2,499). Live at HTTP 200. | **High — locked-decision violation** |
| 3 | `/services` still emits `OfferCatalog`/`Offer`. Spec required replacing them with `Service`/`ItemList`. Price *values* were removed; the commercial wrappers were not. | **Medium — spec deviation** |
| 4 | **No `LocalBusiness` anywhere.** `Organization.areaServed` is the string `"Worldwide"`. Zero geographic signal. | **High — the actual local gap** |
| 5 | Two unlinked `Organization` nodes on the homepage (entity fragmentation); `contactPoint` carries no telephone though the number is public on `/contact`. | Medium |
| 6 | `technical-audit.md`'s blind-spot claim — *"no endpoint returns JSON-LD"* — is **false**. Every route emits JSON-LD and all of it is syntactically valid. | Corrects the record |

**The headline correction:** the starting assumption was that the site has *no* structured data. It has a lot, and it validates cleanly — **0 errors, 0 warnings across every route**. The problems are semantic and policy-level, not syntactic. The site is not failing validation; it is marking up the wrong things, and one of those things is a Google spam-policy violation that is live right now.

---

## Part 1 — Current-state inventory

### Method

`bun run build` → static export in `out/`. Extracted every `<script type="application/ld+json">` block from all 25 emitted HTML files and parsed each. **25/25 routes parsed; 0 JSON parse errors.**

Extraction and validation were done with throwaway scripts (not committed). They are reproducible from the method described in "Verification for #15" below.

### Per-route inventory

`Organization` is injected on **every** route by `app/layout.tsx:99-136`, so it appears everywhere and is omitted from the "page-specific" column below for readability.

| Route | Blocks | Page-specific types | Source |
|---|---|---|---|
| `/` | 3 | `WebSite`, **`Organization` (2nd, w/ `AggregateRating` + 4× `Review`)** | `app/page.tsx:30-72` |
| `/about` | 4 | `AboutPage`, `BreadcrumbList`, `Person` | `app/about/page.tsx:41-88` |
| `/contact` | 4 | `ContactPage`, `FAQPage` (6 Q), `BreadcrumbList` | `app/contact/page.tsx:36-66` |
| `/services` | 4 | `WebPage` → `mainEntity` `Organization` → **`hasOfferCatalog`/`OfferCatalog`/4× `Offer`/`Service`**, `BreadcrumbList`, `FAQPage` (7 Q) | `app/services/page.tsx:46-120` |
| `/portfolio` | 3 | `CollectionPage` → `mainEntity` `ItemList` → 8× `CreativeWork`, `BreadcrumbList` | `app/portfolio/page.tsx:24-63` |
| `/portfolio/[slug]` ×8 | 3 | `Article`, `BreadcrumbList` | `app/portfolio/[slug]/page.tsx:46-76` |
| `/blog/[slug]` ×8 | 3 | `BlogPosting`, `BreadcrumbList` | `app/blog/[slug]/page.tsx:50-83` |
| `/blog` (index) | 1 | **none** — inherited `Organization` only | — |
| `/privacy-policy` | 1 | none | — |
| `/terms-of-service` | 1 | none | — |
| `/404` | 1 | none | — |

**Types present sitewide:** `Organization`, `WebSite`, `WebPage`, `AboutPage`, `ContactPage`, `CollectionPage`, `Article`, `BlogPosting`, `BreadcrumbList`, `FAQPage`, `ItemList`, `CreativeWork`, `Person`, `OfferCatalog`, `Offer`, `Service`, `AggregateRating`, `Review`, `Rating`, `ImageObject`, `ContactPoint`.

**Types absent:** `LocalBusiness`, `ProfessionalService`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `City`, `State` — i.e. the entire local-search vocabulary.

---

### Finding 1 (Critical) — Fabricated reviews are live

`app/page.tsx:46-72` builds an `Organization` node carrying:

```
aggregateRating: { ratingValue: "5", bestRating: "5", worstRating: "1", ratingCount: "4" }
review: [ 4 × Review, each reviewRating.ratingValue "5" ]
```

The four reviews are generated from a hardcoded `testimonials` array at `app/page.tsx:6-27` (duplicated verbatim in `components/TestimonialsSection.tsx:10-40`):

- Ravi Mehta — *Owner, Miller & Co. Bakery*
- Isla MacGregor — *Freelance Photographer*
- Zara Osei — *Manager, Willow Tree Wellness*
- Finn O'Brien — *CEO, TechStart Solutions*

**None of these businesses appear anywhere else in the repository.** The eight real portfolio clients are 88 Transpoort, Church Fundraising, Divine Retreat Salon, HotelScout AI, Quality Work Granite, Romanian Banquet Hall, Romanian Food Festival, and SalinAir. There is no overlap, no source, no `datePublished`, and no review `publisher`. Ticket #10 states the business currently has **zero** reviews. These are placeholder copy that was wired into structured data.

Confirmed live:
```
$ curl -s https://www.aiwebhub.io/ | grep -o 'aggregateRating'
aggregateRating
aggregateRating
```

Two independent problems:

1. **Self-serving reviews.** Google's review-snippet documentation states verbatim: *"If the entity that's being reviewed controls the reviews about itself, their pages that use `LocalBusiness` or any other type of `Organization` structured data are ineligible for star review feature."* ([Google Search Central — Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)). This markup is `Organization`-scoped self-review — ineligible by construction. It can never produce stars.
2. **The ratings are not real.** The same page requires that *"Ratings must be sourced directly from users."* Marking up invented testimonials as `Review` is a structured-data spam-policy issue, not merely an ineligible feature. It carries manual-action risk and it is attached to the exact `Organization` entity the site is trying to build local trust for.

**Recommendation: remove `aggregateRating` and `review` from `app/page.tsx` immediately.** This is the single highest-priority item in this audit and it should not wait for the schema-plan build. The visible testimonial UI is a separate question (marketing copy); the *structured data* claim is the violation.

> Note the asymmetry with Fivenson: they publish `ratingCount: "128"` with `review.publisher: {"@type":"Organization","name":"Google Reviews"}` and real `datePublished` values. Theirs is sourced. Ours is not. Copying the shape without the substance is precisely what the policy prohibits.

---

### Finding 2 (High) — `llms.txt` still publishes retired prices

The pricing-to-quote decision is locked and, per #6, covers *"copy or structured data."* `public/llms.txt:14-19` still reads:

```
## Pricing Plans
- Starter: from $499 one-time + $30/month ...
- Essentials: from $999 one-time + $50/month ...
- Professional: from $1,999 one-time + $100/month ...
- AI Agents: from $2,499 one-time + $150/month ...
```

Confirmed live — `https://www.aiwebhub.io/llms.txt` returns **HTTP 200** with all four tiers intact.

`git log -- public/llms.txt` shows the file was last touched by `021c559` ("feat: update pricing plans and add FAQ accordion") — **before** the spec. The pricing-to-quote commit `7ef4a0a` never touched it. It was simply missed.

This is worse than an ordinary stale page: `llms.txt` exists specifically so LLM crawlers ingest it as an authoritative business summary, and `app/robots.ts` explicitly allows `GPTBot`. The retired price list is the version being fed to AI search.

Two further staleness bugs in the same file: line 24 labels the page *"Services & Pricing"* (renamed to "Services" by the spec), and line 3 claims *"serves clients worldwide"*, which contradicts the Michigan local strategy.

**Recommendation:** delete the `## Pricing Plans` section, relabel line 24 to "Services", and rewrite line 3 to lead with the Michigan service area. Out of scope for this research ticket (no application code modified) — file as a follow-up.

---

### Finding 3 (Medium) — `/services` spec deviation, verified

The June 2026 spec (`docs/superpowers/specs/2026-06-13-pricing-to-quote-design.md`, commit `1b7b41f`) §2 required:

> - Remove `OfferCatalog` / `Offer` / `UnitPriceSpecification` price markup (~lines 148–185).
> - Replace with a **price-free** `Service` / `ItemList` describing the offerings (provider = Organization) — keep the offerings listed so SEO value is retained, just with **no price fields**. (Don't drop to Organization-only.)
> - Keep `BreadcrumbList` (~lines 187–194).

**What actually shipped in `7ef4a0a`:** `git show 7ef4a0a -- app/services/page.tsx` confirms `priceSpecification`, `UnitPriceSpecification`, `price`, and `priceCurrency` were all deleted. But `hasOfferCatalog` → `OfferCatalog` → `Offer` → `itemOffered: Service` was **kept and rebuilt**, not replaced. `app/services/page.tsx:72-109` still carries it today, and it is live:

```
$ curl -s https://www.aiwebhub.io/services | grep -o 'OfferCatalog\|UnitPriceSpecification\|"price"' | sort | uniq -c
      2 OfferCatalog
```

**Verdict — the two halves of the requirement land differently:**

- **The hard constraint is satisfied.** A recursive scan of all emitted JSON-LD across all 25 routes for price keys (`price`, `priceCurrency`, `priceSpecification`, `lowPrice`, `highPrice`, `priceRange`, `offers`, `priceValidUntil`, …) and for money-shaped strings (`$\d`, `USD`, `/mo`, "per month") returns **zero hits**. The only matches are the five price-*shaped* `@type` values below. **No price field survives anywhere in structured data.**

  ```
  price-shaped @type  /services.html  block[1].mainEntity.hasOfferCatalog.@type              → OfferCatalog
  price-shaped @type  /services.html  block[1].…hasOfferCatalog.itemListElement[0..3].@type  → Offer ×4
  total hits: 5   (zero price keys, zero money strings)
  ```

- **The structural requirement was not met.** `OfferCatalog`/`Offer` remain where `Service`/`ItemList` were mandated.

**Why this still matters, stated fairly.** schema.org defines `Offer` as *"An offer to transfer some rights to an item or to provide a service"* and mandates no properties, so a price-free `Offer` is technically legal ([schema.org/Offer](https://schema.org/Offer)). This is not a validation error and it is not currently leaking a price. The objection is that `Offer` is the vocabulary's commercial-transaction node — it is the natural attachment point for `price`, and leaving the scaffolding in place is exactly how a price value gets re-added by a future edit without anyone noticing the decision was reversed. The spec's instruction to move to `Service`/`ItemList` removes that attachment point entirely. Notably, this is also what Fivenson does on their homepage (`ItemList` → `ListItem` → `Service`, `provider` → `@id` reference), so the recommended shape is the one the market leader uses.

---

### Finding 4 (High) — no local signal at all

`app/layout.tsx:123` sets:

```json
"areaServed": "Worldwide"
```

There is no `LocalBusiness`, no `PostalAddress`, no `addressRegion`, no `geo`, no city entity anywhere in the site's structured data. For a map whose destination is *"competing for Michigan web-design traffic,"* the structured data currently asserts the opposite of a local business.

The phone number `+1 (734) 341-6746` is rendered on `/contact` (`app/contact/page.tsx:145-148`) and listed in `llms.txt:43`, but appears in **no** JSON-LD — `Organization.contactPoint` (`app/layout.tsx:112-116`) carries only `contactType` and `availableLanguage`. That is a free, zero-risk win.

---

### Finding 5 (Medium) — entity fragmentation

On `/`, two `Organization` nodes are emitted:

- `app/layout.tsx` — no `@id`, has `logo`/`sameAs`/`founder`/`knowsAbout`
- `app/page.tsx:49` — `@id: "https://www.aiwebhub.io/#organization"`, has the ratings

Because the layout node has no `@id`, the two cannot be reconciled into one entity. Google must guess whether these are one organisation or two. Every competitor examined uses `@id`-keyed nodes in a single `@graph` precisely to avoid this. Additionally `WebSite` (`app/page.tsx:32`) re-declares its `publisher` inline rather than referencing the `Organization` by `@id`.

Minor data-quality issues in the same class:

- All 8 portfolio case studies hardcode `datePublished: "2024-06-01"` / `dateModified: "2026-02-16"` (`app/portfolio/[slug]/page.tsx:63-64`) — identical across every project, so the dates carry no information.
- `/blog` index emits no `Blog`/`CollectionPage`/`ItemList`, while `/portfolio` does. Inconsistent.
- `CollectionPage.mainEntity.ItemList.itemListElement` uses bare `CreativeWork` with `position` (`app/portfolio/page.tsx:44-52`). Legal — `CreativeWork` does have `position` — but `ListItem` wrappers are the conventional and better-supported form.
- `Organization.logo` is a plain URL string. Legal per schema.org; both competitors use a keyed `ImageObject`.

---

## Part 2 — Validation results

### schema.org validator

Every route was submitted to `validator.schema.org/validate` against the **live production URL**, and the response tree was walked recursively (including nested `nodeProperties`) to sum errors and warnings.

| Route | Top-level types | Nodes | Errors | Warnings |
|---|---|---|---|---|
| `/` | Organization, WebSite | 20 | **0** | **0** |
| `/about` | Organization, BreadcrumbList, AboutPage, Person | 12 | **0** | **0** |
| `/contact` | Organization, BreadcrumbList, ContactPage, FAQPage | 22 | **0** | **0** |
| `/services` | WebPage, Organization, BreadcrumbList, FAQPage | 34 | **0** | **0** |
| `/portfolio` | CollectionPage, Organization, BreadcrumbList | 20 | **0** | **0** |
| `/blog` | Organization | 3 | **0** | **0** |
| `/portfolio/salinair` | Organization, BreadcrumbList, Article | 13 | **0** | **0** |
| `/blog/how-much-does-a-custom-website-cost-in-2026` | Organization, BreadcrumbList, BlogPosting | 13 | **0** | **0** |

**Total: 0 errors, 0 warnings sitewide.** The validator also reports `isRendered: true`, so the JSON-LD is present in the served HTML and does not depend on client-side hydration — as expected under `output: 'export'`.

### Google rich-result eligibility

Google's Rich Results Test has no public API, so eligibility is assessed against Google's own documentation rather than guessed at.

| Emitted type | Google feature | Eligible? | Source |
|---|---|---|---|
| `BreadcrumbList` | Breadcrumb | **Yes** — the site's only working rich result | Breadcrumb docs |
| `BlogPosting` | Article | **Yes** | [Article](https://developers.google.com/search/docs/appearance/structured-data/article) |
| `Article` (portfolio) | Article | **Yes**, though case studies are arguably not articles | Article |
| `FAQPage` ×2 | FAQ rich result | **No** — *"the feature is only shown for well-known, authoritative government and health websites"* (Aug 2023 change) | [FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage) |
| `AggregateRating`/`Review` | Review snippet | **No** — self-serving `Organization` review, explicitly ineligible; and unsourced | [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) |
| `Organization` | Knowledge-panel / entity signals | Not a rich result; feeds entity understanding | Organization docs |
| `OfferCatalog`/`Offer` | none | No feature. Price-free `Offer` produces nothing | — |
| `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage` | none | Descriptive only | — |

**Read-through:** of nine distinct schema families the site emits, exactly **two** (`BreadcrumbList`, `Article`/`BlogPosting`) can produce a rich result today. Both `FAQPage` blocks — 13 questions, the single largest volume of markup on the site — produce nothing in Google SERPs. They retain value for AI/LLM answer extraction, which is a legitimate reason to keep them, but they should not be counted as SEO wins. The review markup is the only *actively harmful* item.

### Article-specific check

Google's Article documentation states *"There are no required properties"* and does not list `publisher` among recommended properties. The site's `BlogPosting` supplies `headline`, `image`, `datePublished`, `dateModified`, `author` (with `name` + `url`), `wordCount`, and `keywords` — comfortably above the recommended set. `publisher.logo` is a plain URL string rather than an `ImageObject`; since `publisher` is not required for Article at all, this is cosmetic. **No action needed on blog Article markup.**

---

## Part 3 — Competitor structured data

Both pages fetched directly (HTTP 200) and their JSON-LD parsed in full.

### fivensonstudios.com — homepage (#1 on four Michigan statewide terms)

**3 blocks, 33 distinct types.** The maximal implementation.

Block 3 is a single `@graph` of `@id`-keyed, cross-referencing nodes. The load-bearing node:

```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://fivensonstudios.com/#localbusiness",
  "name": "Fivenson Studios",
  "description": "Michigan's highest-rated web design and marketing agency with 128+ five-star reviews… Founded in 2012 in Ann Arbor.",
  "telephone": "+1-734-822-7649",
  "email": "info@fivensonstudios.com",
  "address": { "@type": "PostalAddress", "streetAddress": "1100 N Main St",
               "addressLocality": "Ann Arbor", "addressRegion": "MI",
               "postalCode": "48104", "addressCountry": "US" },
  "geo": { "@type": "GeoCoordinates", "latitude": 42.2942, "longitude": -83.7483 },
  "priceRange": "$$-$$$$",
  "openingHoursSpecification": [ { "dayOfWeek": ["Monday"…"Friday"], "opens": "09:00", "closes": "18:00" } ],
  "areaServed": [ 25 nodes — 24 × {"@type":"City"}, 1 × {"@type":"State","name":"Michigan"} ],
  "aggregateRating": { "ratingValue": "5.0", "ratingCount": "128", "reviewCount": "128" },
  "review": [ 3 × Review, each with datePublished and publisher "Google Reviews" ]
}
```

`areaServed` enumerates Ann Arbor, Detroit, Grand Rapids, Lansing, Kalamazoo, Flint, Traverse City, Saginaw, Muskegon, Battle Creek, Royal Oak, Troy, Novi, Canton, Livonia, Dearborn, Farmington Hills, Southfield, Sterling Heights, Warren, Rochester Hills, Plymouth, Ypsilanti, Saline, Chelsea — **plus** `{"@type":"State","name":"Michigan"}`. That state-level node is the statewide-terms play, made explicit.

Also present: a standalone `ItemList` of 8 `Service` nodes (block 1) where each `Service.provider` is an `@id` reference back to `#localbusiness`; a `Person` founder node with `hasCredential`; `sameAs` including **Google Maps, Google Knowledge Graph (`g.co/kgs/…`), Clutch, and UpCity** — the citation set; `FAQPage`, `HowTo`, `WebSite`+`SearchAction`, `BreadcrumbList`, `SpeakableSpecification`, and `SiteNavigationElement`.

### hogtheweb.com/region/ann-arbor-web-design/ (#3 in Ann Arbor)

**1 block, 10 types — standard Yoast SEO boilerplate.** `WebPage`, `ImageObject`, `BreadcrumbList`, `WebSite`+`SearchAction`, `Organization`.

The `Organization` node in full:

```json
{ "@type": "Organization", "@id": "https://hogtheweb.com/#organization",
  "name": "Hog the Web", "alternateName": "Hog the Web LLC",
  "url": "…", "logo": {ImageObject}, "image": {…},
  "sameAs": ["facebook","x","linkedin","youtube"] }
```

**No `LocalBusiness`. No `address`. No `areaServed`. No `Service`. No `FAQPage`. No reviews or ratings. Nothing local whatsoever** — and yet it ranks #3 in Ann Arbor.

### What this comparison actually proves

This is the most useful result in Part 3, and it cuts against the obvious conclusion.

**Structured data is not what is carrying Hog the Web.** Their local ranking is carried by a *dedicated, well-titled, well-URL'd location page* — `/region/ann-arbor-web-design/`, title "Best Ann Arbor Web Design | Care and Craft Over Flare and Flash", live since 2023 and updated Nov 2025 — on a domain with authority. Their schema is whatever Yoast emitted by default.

**Fivenson's edge is 128 real Google reviews**, which #6 already recognises ("fivensonstudios wins that SERP on 128+ reviews, not content"). Their elaborate schema is a *consequence* of having real assets — a verified GBP, a street address, a review corpus — not the cause of the ranking.

The honest conclusion: **schema is necessary but not sufficient, and it is not the binding constraint.** The location pages (#15) and the GBP (#7) are. What schema does is make the site *legible* as a Michigan business so that the location pages and GBP can compound — and it removes the active liability in Finding 1. It should be treated as table stakes to get right, not as the lever that moves rankings. The Hog the Web data point means ticket #15 should not delay shipping location pages in order to perfect markup.

---

## Part 4 — Target schema plan

Design rules, applied throughout:

1. **No price fields. Ever.** No `price`, `priceCurrency`, `priceSpecification`, `UnitPriceSpecification`, `lowPrice`/`highPrice`, `offers`, or `AggregateOffer`. Also **no `priceRange`** — Fivenson uses `"$$-$$$$"`, and although it is a qualitative band rather than a number, it is a price field and is out of bounds under the locked decision. Retire `OfferCatalog`/`Offer` so the attachment point does not exist.
2. **No `AggregateRating` or `Review` until real, verifiable, third-party reviews exist.** Never fabricated.
3. **One entity graph.** A single `@id`-keyed `@graph` per page; every node references the org by `@id` rather than re-declaring it.
4. **Build-time only.** `output: 'export'` — everything is a plain object serialised into a `<script>` tag. No runtime fetching.
5. **Use `LocalBusiness`, not `ProfessionalService`.** schema.org states: *"The general ProfessionalService type for local businesses was deprecated due to confusion with Service"* ([schema.org/ProfessionalService](https://schema.org/ProfessionalService)). Fivenson's use of it is legacy. Use plain `LocalBusiness`.

### Canonical `@id` scheme

| `@id` | Node |
|---|---|
| `{SITE_URL}/#organization` | `Organization` — the publisher/brand entity |
| `{SITE_URL}/#localbusiness` | `LocalBusiness` — the local entity, `parentOrganization` → `#organization` |
| `{SITE_URL}/#website` | `WebSite` |
| `{SITE_URL}/#logo` | `ImageObject` |
| `{SITE_URL}/#founder` | `Person` (Cosmin Balaur) |
| `{abs(path)}#webpage` | per-page `WebPage` |
| `{abs(path)}#breadcrumb` | per-page `BreadcrumbList` |
| `{abs(path)}#service` | per-service `Service` |

### The `LocalBusiness` node — shape now, values later

Google requires exactly two properties for `LocalBusiness`: **`name`** and **`address`** (PostalAddress). Everything else is recommended ([Google — Local Business](https://developers.google.com/search/docs/appearance/structured-data/local-business)).

**This ticket specifies the shape; ticket #7 (GBP) supplies the values.** Placeholders below are marked `⟨…⟩` and MUST be replaced with the verified GBP NAP string, character-for-character, before this ships. Do not invent an address to make the markup validate.

```jsonc
{
  "@type": "LocalBusiness",
  "@id": "https://www.aiwebhub.io/#localbusiness",
  "name": "AIWebHub",                          // must match GBP business name exactly
  "parentOrganization": { "@id": "https://www.aiwebhub.io/#organization" },
  "url": "https://www.aiwebhub.io",
  "logo": { "@id": "https://www.aiwebhub.io/#logo" },
  "image": "https://www.aiwebhub.io/thumbnails/logo-thumbnail.png",
  "description": "⟨Michigan-led positioning sentence⟩",
  "telephone": "+1-734-341-6746",              // KNOWN — already public on /contact and llms.txt
  "email": "info@aiwebhub.io",                 // KNOWN
  "address": {                                  // ⟨FROM GBP — ticket #7⟩
    "@type": "PostalAddress",
    "streetAddress": "⟨street⟩",               // GBP is a service-area business: address is
    "addressLocality": "⟨city⟩",               // verified but hidden publicly. Emitting a hidden
    "addressRegion": "MI",                      // street address in JSON-LD contradicts the GBP
    "postalCode": "⟨zip⟩",                     // setting — see decision note below.
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City",  "name": "Detroit, Michigan" },
    { "@type": "City",  "name": "Ann Arbor, Michigan" },
    { "@type": "State", "name": "Michigan" }
  ],
  "knowsAbout": [ /* reuse ORG.knowsAbout */ ],
  "sameAs": [ /* ORG.sameAs + GBP Maps URL + any verified directory profiles */ ]
  // NO priceRange. NO aggregateRating. NO review.
}
```

**Decision — the service-area address problem.** #6 locks the GBP as a *service-area business*: verified address, hidden publicly, declared radius. Google's `LocalBusiness` docs require `address` and are silent on service-area businesses (confirmed — the documentation does not address them). Recommended resolution, in preference order:

1. **Preferred:** emit `address` with `addressLocality`, `addressRegion: "MI"`, `postalCode`, `addressCountry: "US"` and **omit `streetAddress`**. This satisfies "include as many properties as possible", keeps the hidden street address off the public page, and stays consistent with the GBP. Pair it with `areaServed`.
2. If the GBP ends up displaying a full address publicly, emit `streetAddress` too and match the GBP string exactly.
3. Do **not** emit `geo` coordinates for a hidden address.

**`areaServed` scope.** Start with exactly the three nodes above — the two cities this map actually builds pages for, plus the statewide node that Fivenson uses to reach statewide terms. Do **not** copy Fivenson's 25-city list. Cities the site has no page and no presence for are an unsupported claim, and #6 explicitly cuts Lansing/Flint/Grand Rapids from scope. Grow `areaServed` as location pages ship — it should track reality.

### Per-route target plan

Legend: **ADD** new · **KEEP** unchanged · **CHANGE** modify · **REMOVE** delete

| Route | Target types | Action |
|---|---|---|
| **All routes** (`app/layout.tsx`) | `Organization` `@id #organization`, `WebSite` `@id #website`, `ImageObject` `@id #logo` in one `@graph` | **CHANGE** — add `@id`s; add `telephone` + `email` to `contactPoint`; **`areaServed: "Worldwide"` → drop it here** (it belongs on `LocalBusiness`); move `WebSite` out of `page.tsx` into layout and reference publisher by `@id` |
| **`/`** | `LocalBusiness` (full node above), `WebPage`, `BreadcrumbList` | **REMOVE** `aggregateRating` + `review` (Finding 1 — do this first, independently). **ADD** `LocalBusiness`. **CHANGE** duplicate `Organization` → merge into the `@id` graph |
| **`/services`** | `Service` × N (`@id`, `provider` → `#localbusiness`, `areaServed`), wrapped in `ItemList` of `ListItem`; `WebPage`; `BreadcrumbList`; `FAQPage` | **REMOVE** `hasOfferCatalog`/`OfferCatalog`/`Offer` (completes the spec). **ADD** `ItemList`→`ListItem`→`Service`. **KEEP** `BreadcrumbList`, `FAQPage` |
| **`/web-design-detroit`** (#15, new) | `WebPage`, `BreadcrumbList`, `Service` (`areaServed` → `{"@type":"City","name":"Detroit, Michigan"}`, `provider` → `#localbusiness`), `FAQPage` if the page has real FAQ copy | **ADD** — one shared builder, city passed as a parameter |
| **`/web-design-ann-arbor`** (#15, new) | identical, `areaServed` → Ann Arbor | **ADD** |
| **`/tools/website-cost-calculator`** (#6) | `WebPage` + `BreadcrumbList` **only** | **ADD** — explicitly **no** `Offer`, **no** `priceRange`, **no** `AggregateOffer`, even though the page renders industry ranges. Rendering a general industry range in copy is permitted (precedent `b2955f2`); asserting it as AIWebHub's price in structured data is not |
| **`/about`** | `AboutPage`, `Person` `@id #founder`, `BreadcrumbList` | **KEEP**; **CHANGE** — `Person.worksFor` → `@id` reference |
| **`/contact`** | `ContactPage`, `FAQPage`, `BreadcrumbList` | **KEEP**; **CHANGE** — `ContactPage.mainEntity` → `{"@id":"…#localbusiness"}` |
| **`/blog/[slug]`** ×8 | `BlogPosting`, `BreadcrumbList` | **KEEP** — already above Google's recommended set; **CHANGE** (optional) `publisher` → `@id` reference |
| **`/blog`** | `Blog` or `CollectionPage` + `ItemList`→`ListItem`→`BlogPosting`, `BreadcrumbList` | **ADD** — currently the only content index with no markup |
| **`/portfolio`** | `CollectionPage` + `ItemList`→`ListItem`→`CreativeWork`, `BreadcrumbList` | **KEEP**; **CHANGE** — wrap items in `ListItem` |
| **`/portfolio/[slug]`** ×8 | `Article` (or `CreativeWork`), `BreadcrumbList` | **KEEP**; **CHANGE** — replace the 8 identical hardcoded dates with per-project real dates |
| **`/privacy-policy`, `/terms-of-service`, `/404`** | inherited `Organization` only | **KEEP** — nothing more needed |

### `Service` node template (for #15)

```jsonc
{
  "@type": "Service",
  "@id": "https://www.aiwebhub.io/web-design-detroit#service",
  "name": "Web Design in Detroit, Michigan",
  "serviceType": "Web Design",
  "description": "⟨one sentence, no prices⟩",
  "provider": { "@id": "https://www.aiwebhub.io/#localbusiness" },
  "areaServed": { "@type": "City", "name": "Detroit, Michigan" },
  "url": "https://www.aiwebhub.io/web-design-detroit"
  // NO offers. NO priceRange.
}
```

### Sequencing

| Order | Work | Blocked by |
|---|---|---|
| 0 | **Remove `aggregateRating` + `review` from `app/page.tsx`** | nothing — ship now |
| 0 | **Strip prices from `public/llms.txt`** | nothing — ship now |
| 1 | Central `@graph` builder in `lib/` + `@id` scheme; add `telephone`/`email` | nothing |
| 2 | `/services`: `OfferCatalog`/`Offer` → `ItemList`/`Service` | step 1 |
| 3 | `LocalBusiness` node with real NAP | **#7 (GBP)** — shape is fully specified here |
| 4 | Location pages emit `Service` + `WebPage` + `BreadcrumbList` | #15; `provider` `@id` resolves once step 3 lands |
| 5 | `AggregateRating`/`Review` from real GBP reviews | #7 **and** a real review corpus. Not before |

Steps 1, 2 and 4 do **not** depend on the NAP. Ticket #15 can build the location-page schema against the `@id` `#localbusiness` before that node has final values — the reference resolves as soon as step 3 lands.

### Implementation note

All eight page files build their JSON-LD inline as object literals. `lib/site.ts` already exists as "the single source of truth… also consumed by the structured-data builders (issue #005)" — the builders it anticipates were never written. A single `lib/structured-data.ts` exporting `organizationNode()`, `localBusinessNode()`, `serviceNode(city)`, `breadcrumb(trail)`, `faqPage(faqs)` would let #15 add a location page's schema in one line and makes the "no price fields" rule enforceable in one place rather than eight. Recommended, not required.

### Verification for #15

1. `bun run build`, then grep `out/` for `"price"`, `priceCurrency`, `priceRange`, `OfferCatalog`, `Offer`, `aggregateRating`, `"review"` → **all must return zero**.
2. Re-run the schema.org validator across all routes → must stay at 0 errors / 0 warnings.
3. Confirm every `@id` referenced (`#localbusiness`, `#organization`, `#logo`) is defined somewhere on the same page.
4. Google Rich Results Test on `/`, `/web-design-detroit`, one blog post → expect Breadcrumb + Article; expect **no** review snippet.
5. Diff the emitted `LocalBusiness` NAP against the GBP string character-for-character.

---

## Corrections to prior reports

- **`SEO/technical-audit.md:57`** — *"Structured data never verified — no endpoint returns JSON-LD."* **False.** All 25 routes emit JSON-LD; the live site returns 6 `application/ld+json` matches on `/` alone, and `validator.schema.org` reports `isRendered: true`. The likely cause is a crawler that did not evaluate inline `<script>` tags. The blind spot was real; the conclusion drawn from it was wrong. **The gap is not "no structured data" — it is "no *local* structured data, plus fabricated reviews."**
- **#6 "Decisions so far"** should record that the pricing-to-quote cleanup was **incomplete**: `llms.txt` was never scrubbed and the `/services` `OfferCatalog` replacement was not carried out as specified.

## Sources

Primary sources, all fetched 1 Aug 2026:

- [Google Search Central — Review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) — self-serving review policy; required properties
- [Google Search Central — Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) — `name` + `address` required; recommended set
- [Google Search Central — FAQPage structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) — Aug 2023 eligibility restriction
- [Google Search Central — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) — no required properties
- [schema.org/Offer](https://schema.org/Offer) — definition; no mandatory properties
- [schema.org/ProfessionalService](https://schema.org/ProfessionalService) — deprecation notice; `areaServed` value types
- [validator.schema.org](https://validator.schema.org/) — validation runs against all live routes
- Repo: `app/**`, `lib/site.ts`, `public/llms.txt`; commits `1b7b41f` (spec), `7ef4a0a` (implementation), `021c559` (last `llms.txt` edit)
- Live: `https://www.aiwebhub.io/`, `/services`, `/llms.txt`
- Competitors: `https://fivensonstudios.com/`, `https://hogtheweb.com/region/ann-arbor-web-design/`
