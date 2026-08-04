# aiwebhub.io — Site Explorer findings (US/English, 31 Jul 2026)

Source: DataForSEO API only. Full HTML report delivered in session; this is the durable summary.

## Headline

**The domain ranks for zero keywords.** Four endpoints confirm it independently:

- Labs Ranked Keywords (US/en, subdomains, limit 100) → `items: []`
- Labs Domain Rank Overview (US/en) → `items: []`
- Labs Bulk Traffic Estimation → result object returned with **no `metrics` key** (4 competitor domains in the same call returned full metrics)
- Labs Historical Rank Overview → 6 month-buckets (Feb–Jul 2026), all empty

It is **not** an indexing problem. A live `site:aiwebhub.io` SERP call returned 10 URLs: `/`, `/blog`, `/contact`, `/portfolio`, `/services`, `/about`, `/portfolio/salinair`, `/privacy-policy`, `/terms-of-service`, `/portfolio/88-transpoort-llc`. Blog index lists 8 published posts.

## Link profile (Backlinks Summary)

| Metric | Value |
|---|---|
| Backlinks | 17 |
| Referring domains | 12 (11 nofollow → **1 dofollow**) |
| Referring IPs / subnets | 6 / 5 |
| Spam score | 37 |
| DataForSEO rank | 63 |
| First seen | 2025-08-21 |
| Placement | 4 footer, 1 main, 12 unclassified |

One dofollow referring domain is the binding constraint on everything else.

## On-page (OnPage Instant Pages, JS on)

Both `/` and `/services` score 96.34, HTTP 200, self-canonical, CLS 0. Issues: low content rate (593 and 342 words), title too long (70 ch) / too short (19 ch), duplicate `twitter:image`, and **one mismatched HTML closing tag at line 2 on both pages — sitewide template defect**. LCP returned as `0` = unmeasured, not perfect.

## The structural gap

Business is Michigan-based (homepage copy) with a **(734)** area code (Ann Arbor / Washtenaw). **No page title, H1 or URL anywhere on the site contains a place name.** No location pages exist.

Business Listings search on title "AIWebHub" → **0 rows**. No Google Business Profile found (caveat: title-match only).

## Market data

Google Ads volume (Michigan/en) × Labs Bulk KD (US/en):

| Keyword | Vol/mo (MI) | KD | CPC |
|---|---|---|---|
| website designer near me | 590 | 70 | 45.01 |
| web design michigan | 260 | 69 | 18.63 |
| website design michigan | 260 | 69 | 18.63 |
| michigan web design company | 210 | 71 | 10.01 |
| web design company near me | 210 | 94 | 10.56 |
| web design agency | 140 | n/a | 28.64 |
| web design detroit | 140 | 18 | 7.16 |
| ai automation agency | 90 | 19 | 20.66 |
| web design ann arbor | 70 | 6 | 12.34 |
| ann arbor web design | 70 | 6 | 12.34 |

Blog-topic volumes (US): `what are ai agents` 4,400 / KD 64 · `how much does a website cost` 1,900 / KD 19 · `landing page vs website` 390 / KD 7 · `how much does a custom website cost` 110 / KD 18 · `what is ai integration` 110 / KD 24.

**Unresolved:** Bulk KD says 6 for the Ann Arbor cluster; Keyword Suggestions says 83 for the `web design ann arbor` variant (avg 91.5 referring domains across ranking pages). Not resolved — both reported.

## Live Ann Arbor SERP (from Ann Arbor, MI)

Positions 1–3 are a **local pack**: Fivenson Studios (131 reviews, 5.0), Jottful (119, 4.9), Graphikitchen (47, 5.0). Organic 1–9: fivensonstudios.com, fatsquirrelseo.com/web-design, hogtheweb.com/region/ann-arbor-web-design/, perfectafternoon.com (2024 post), graphikitchen.com, merithot.com (Jan 2024 post), ellanyze.com, yelp.com, digitaldesigns1.net/ann-arbor-web-design/.

Two of nine organic results rank on nothing more than a geo slug. Beatable organically; the pack is not, without a GBP.

Competitor ETV (US): ellanyze.com 916 (584 kw) · hogtheweb.com 555 (207) · fivensonstudios.com 286 (38) · graphikitchen.com 8 (8) · **aiwebhub.io 0 (0)**. Graphikitchen holds pack position 3 on 8 keywords — the GBP, not content, is doing the work in this market.

## The 3 things to do first (ranked by expected traffic gain)

1. **`/blog/how-much-does-a-custom-website-cost-in-2026`** → retarget to `how much does a website cost` (1,900/mo vs 110/mo, KD 19). Retitle + H1 to "How Much Does a Website Cost in 2026? Real Prices by Project Type", keep URL, add a price table with a row per project type sold on /services. Est. ~15–20 clicks/mo (2% CTR assumption at pos 8–10, halved for authority).
2. **`/blog/landing-page-vs-multi-page-website-...`** → retitle to exact query "Landing Page vs Website: Which Does Your Business Need? (2026)" + add FAQ block answering the four PAA questions. 390/mo, KD 7. Est. ~12 clicks/mo. **Low confidence** — SERP is Wix/Unbounce/Zoho/Network Solutions/GeeksforGeeks with an AI Overview above position 1; KD 7 does not describe that page.
3. **New `/web-design-ann-arbor`** → title "Web Design Ann Arbor, MI | AIWebHub", use the Salinair (Rochester Hills, MI) case study as the proof block. Then claim the Google Business Profile. Est. ~4 clicks/mo but highest intent ($12.34 CPC), and the template replicates to Detroit (140/mo, KD 18) and statewide terms.

Plus: fix the sitewide mismatched closing tag (minutes of work, only genuinely sitewide defect found).

## Caveats

- All click estimates use assumed CTR curves — arithmetic, not API data.
- `site:` is indicative of indexation, not an exhaustive count.
- GBP finding is title-match only; verify manually.
- Michigan volumes at the 10–30/mo end carry large error bars.