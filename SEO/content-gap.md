# aiwebhub.io — Content gap vs ellanyze / hogtheweb / fivensonstudios (US/English, 1 Aug 2026)

Source: DataForSEO API only. Full HTML report delivered in session. Third in the series with `claude/aiwebhub-io-site-explorer-2026-07-31.md` and `claude/aiwebhub-io-keyword-research-2026-08-01.md`.

## The strict brief returns almost nothing

"≥2 of 3 competitors in top 20, we rank nowhere" → **4 keywords**. Three are the same Ann Arbor query in different word orders.

| Keyword | Vol | KD | Comps | Best position |
|---|---|---|---|---|
| website design ann arbor | 170 | 15 | 3 | fivenson #3, hogtheweb /region/ann-arbor #10, ellanyze #18 |
| ann arbor web design | 170 | 6 | 2 | fivenson #1, hogtheweb #3 |
| ann arbor website design | 170 | 4 | 2 | fivenson #1, hogtheweb #4 |
| web design flint mi | 70 | n/a | 2 | hogtheweb /region/flint-mi #4, fivenson #18 |

The three competitors hold **366 unique keywords** in top 20 between them and overlap on only 4 — they aren't competing with each other on content at all. Everything past this point relaxes the rule to "any one competitor ranks top 20" (trivially = everything, since aiwebhub.io ranks for nothing). **That relaxation is stated in the report, not hidden.**

## Filter: 366 → 98

- 366 unique keywords (371 rows: fivenson 28, ellanyze 257, hogtheweb 86)
- 98 commercially relevant → 89 after collapsing variants → 86 after removing competitor brand terms
- 104 top-20 commercial placements across **22 competitor URLs**

## ellanyze.com is a mirage

Highest measured traffic of the three (916 ETV, 584 kw) but it's built on **"good conversation starters" (14,800/mo), "mac hacks" (14,800/mo), "fun facts about thanksgiving dinner" (4,400/mo), "delete my facebook account" (2,400/mo), "working from a coffee shop" (1,300/mo)** — four blog posts. Of its 257 top-20 placements, **6** are commercially relevant, and its best web-design position is **#13** on "web design history". Entire cluster cut.

## The pattern worth copying

**hogtheweb.com runs one location template across 7 cities** — Grand Rapids, Madison WI, Lansing, Flint, Ann Arbor, Kalamazoo, Detroit — all on `/region/<city>-web-design/`. Those 7 pages hold **38 of the 98** commercial keywords. Its footer address on every one of them is **Traverse City, MI**. It ranks #3 in Ann Arbor and #3 for "website design detroit" with no presence in either city.

**On these SERPs the organic slots don't require a local address — they require a page that exists.**

It also runs **four separate cost-calculator URLs** (11 keywords), none ranked better than #16.

## Top competitor pages by keywords held

| URL | Format | Kws | Best | Verdict |
|---|---|---|---|---|
| fivensonstudios.com/ | Homepage as service page | 14 | 1 | Hard — reviews moat |
| hogtheweb /best-wordpress-hosting-for-seo/ | Comparison | 14 | 2 | Cut — platform mismatch |
| hogtheweb /region/grand-rapids-web-design/ | Location page | 12 | 10 | Cut — West Michigan |
| hogtheweb /how-to-quickly-check-a-websites-last-update/ | Utility guide | 12 | 15 | Take it |
| hogtheweb /region/madison-wi-web-design/ | Location page | 8 | 8 | Cut — Wisconsin |
| hogtheweb /website-cost-calculator-.../ | Tool + guide | 5 | 16 | Take it |
| hogtheweb /region/lansing-web-design/ | Location page | 5 | 5 | Take it |
| hogtheweb /region/flint-mi-web-design/ | Location page | 5 | 1 | Later |
| hogtheweb /website-design-cost-calculator/ | Tool | 3 | 17 | Take it |
| hogtheweb /region/ann-arbor-web-design/ | Location page | 3 | 3 | Take it |
| hogtheweb /region/detroit-web-design/ | Location page | 2 | 3 | Take it |

## Page-level teardown (fetched 1 Aug 2026)

**hogtheweb /region/ann-arbor-web-design/** (#3): 3,686 words · embedded multi-step estimator ("Get a Website Estimate in 3 Minutes" → new/redesign, page-count tier, mock-ups y/n, content readiness, timeline → gated behind "where to send your estimate") · 20 named case studies with outcome numbers · 7-question FAQ · TTI 3,579 ms · 1.26 MB · OnPage 85.63 · footer address Traverse City MI.

**fivensonstudios.com/** (#1 on 4 statewide terms): 3,483 words · "128+ verified 5-star reviews" in meta description, OG title and Twitter card · 5-step process · FAQ · named testimonials · "58–77% more revenue" claim · TTI 2,172 ms · 3 HTML parse errors · OnPage 91.12.

**hogtheweb cost calculator** (#16): 1,768 words · title 89 chars · FAQ · author byline · sections on domain/hosting/design/maintenance/SEO.

**aiwebhub.io homepage**: 593 words (**6.2× less** than the page at #3) — but **120 ms TTI**, **103 KB**, **OnPage 96.34**. Technical execution is better than both competitors; content and trust signals are not.

## Priority clusters

1. **Metro Detroit + Ann Arbor location pages** (5 kw, lead 590) — build first
2. **Website cost calculator tools** (11 kw, lead 390) — build first, pure format gap
3. **Website utility guides** (12 kw, lead 590) — hogtheweb's best is #15
4. **Lansing location page** (5 kw, lead 210)
5. **Michigan statewide** (14 kw, lead 480, CPC $18.63) — not yet, reviews decide it
6. **WordPress hosting & SEO** (14 kw) — cut, AIWebHub builds Next.js on Vercel
7. **West Michigan + Wisconsin** (23 kw, lead 1,300, CPC $16.57) — cut on credibility. **Low confidence cut** — largest volume in the set.

## The 3 things to do first

1. **/web-design-detroit** — 590/mo × 2 keywords. hogtheweb's Detroit page is its *weakest* region page (2 kw vs 12 for Grand Rapids) and names no Detroit-area client. Lead with **Salinair, Rochester Hills** (Oakland County = Metro Detroit).
2. **/tools/website-cost-calculator** — one page, five inputs, price range rendered **on screen with no email gate**. hogtheweb gates its estimator behind an email capture; that's the differentiator. Site is already Next.js on Vercel so build cost is hours.
3. **/michigan-web-design — draft it, hold it.** Fivenson ranks #1 with worse technical execution on every measurable field. The gap is review count, not content. Ship only after the GBP is verified and has reviews.

## Uncertainties

- Ranked Keywords was capped at top-20 by design; overlap at positions 21–100 was never retrieved and may be larger.
- Only 3 of 22 competitor pages were fetched; the other 19 formats were inferred from URL, title and keywords held.
- Grand Rapids cut removes the largest volume in the commercial set (5 variants at 1,300/mo, CPC $16.57) — credibility judgement, not data.
- Brief 4 (last-updated checker) is low confidence: informational intent, no live SERP check on the head term.
- Competitor word counts and load times are single measurements; both sites are on Cloudflare with caching.