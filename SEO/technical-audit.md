# aiwebhub.io — Technical audit (1 Aug 2026)

Source: DataForSEO OnPage Instant Pages + Lighthouse. 11 of ~19 URLs crawled. Fourth in the series with the Site Explorer, Keyword Research and Content Gap docs.

## THE FINDING: canonical tags point away from the page

**Every blog post and case study tested canonicalises to its parent.** Confirmed on 6 URLs:

| URL | Canonical points to | Words |
|---|---|---|
| /blog | **/** | 416 |
| /blog/how-much-does-a-custom-website-cost-in-2026 | **/** | 843 |
| /blog/what-are-ai-agents-and-how-they-help-businesses-in-2026 | **/** | 1,725 |
| /blog/agentic-workflow-patterns-how-ai-agents-work-in-2026 | **/** | 2,244 |
| /portfolio/salinair | **/portfolio** | 598 |
| /portfolio/88-transpoort-llc | **/portfolio** | 483 |

Correct (self-canonical): `/`, `/about`, `/services`, `/contact`, `/portfolio`.

So it is **not** a global misconfiguration — the *detail-page route templates* inherit a static canonical from a parent layout. 8 blog posts + 8 case studies exist; realistic total affected is **~17 of ~19 pages**.

**The three deepest pages on the site are the three that canonicalise themselves away.** OnPage score is 96–98 across the board and misses all of it.

**Fix:** in `app/blog/[slug]/page.tsx` and `app/portfolio/[slug]/page.tsx`, set `alternates.canonical` inside `generateMetadata` to the page's own URL; remove the hard-coded canonical from the parent layout. 15–30 min. Then re-crawl all 19.

**Expected effect:** restores ~17 pages to independent index eligibility. That is a *precondition, not a result* — the domain still has 1 dofollow referring domain, no GBP, no location pages. But doing the content work from the earlier reports with canonicals still broken would waste all of it.

## Other real issues

**2. Homepage weighs 9.72 MB, LCP 3,741 ms** (Lighthouse: 9,719,642 bytes; FCP 277 ms; TTI 4,067 ms; perf score 0.77). HTML is only ~13 KB compressed. LCP fails Google's 2,500 ms "good" threshold. **Cause unverified** — this connector has no OnPage Resources endpoint. Check DevTools Network tab before commissioning work. 2–4 h.

**3. Placeholder titles on money pages:** `/services` "Services | AIWebHub" (19 ch), `/contact` (18 ch), `/about` (16 ch) — all flagged `title_too_short`. 20 min.

**4. `twitter:title` hard-coded sitewide.** All blog posts + `/blog` + `/about` read "AIWebHub - Web Design & AI Integration Solutions"; both case studies read "Web Design Portfolio…". `og:title` is correct everywhere. Costs shares, not rankings. 15 min.

**5. Same `og:image` (logo-thumbnail.png) on all 11 pages + duplicate `twitter:image` tag on all 11.** Use Next.js `ImageResponse` / `opengraph-image.tsx` per route. 1–2 h.

**6. Six of 11 pages flagged `low_content_rate`:** / 593, /contact 518, /blog 416, /portfolio 408, /about 362, /services 342. Benchmark: hogtheweb's Ann Arbor page 3,686; fivenson homepage 3,483. This is the content programme, not a technical fix.

**7. One malformed closing tag on every page** — same defect in a shared component. Renders and indexes fine. 10 min, low priority.

**8. Meta keywords on every page**, flagged `irrelevant_meta_keywords` on /services (0.526 consistency) and /portfolio (0.368). Google ignores it. 2 min.

## Dismissed — looks like an issue, isn't

- **Lighthouse `NO_FCP` (code 50301)** on the first run — JS was off. A no-JS Instant Pages crawl of `/` returned all 593 words, every H-tag, title, description and canonical. **The site is server-rendered.** Lighthouse artefact.
- **LCP = 0 on all 11 Instant Pages responses** — unmeasured, not instant. A tool reading it literally would report a perfect score on a failing metric.
- **`has_render_blocking_resources` sitewide** — 1 script + 1 stylesheet, FCP 277 ms, server response 12 ms. Normal.
- **Homepage title 70 ch flagged too long** — cosmetic vs the genuinely broken 16–19 ch titles.
- **`aiwebhub.io` 308 redirect** — single hop to the canonical www host. Working as designed.
- **"Node with >60 children"** — no impact; DOM sizes are 64–93 KB.
- **CLS = 0** from both Instant Pages and Lighthouse — two sources agree, genuine pass.

## Blind spots

- No site-wide crawl endpoint in this connector (Instant Pages / Content Parsing / Lighthouse only) — no Resources, Links, Duplicate Tags or Non-Indexable endpoints. 11 of ~19 URLs covered; internal-link and orphan issues invisible.
- **Structured data never verified** — no endpoint returns JSON-LD. For a local service business this is a meaningful gap; check Google's Rich Results Test manually.
- robots.txt not fetched.
- `/sitemap.xml` returns 200 at 4,482 bytes, `application/xml`, but contents can't be parsed by these endpoints. URL inventory came from the `site:` query + blog/portfolio index pages.
- Lighthouse ran desktop-simulated at 10 Mbps, no CPU throttle. Real mobile will be worse.
- Two Instant Pages calls returned empty on first attempt and succeeded on retry — likely transient, worth watching.

## Useful side-finding

`/portfolio` lists **8 client projects**, and the Michigan concentration is stronger than the earlier reports assumed: Romanian Banquet Hall (**Warren, MI**), Romanian Food Festival (**Rochester Hills, MI**), Divine Retreat Salon (**Utica, MI**), Salinair (**Rochester Hills, MI**), plus Quality Work Granite, Church Fundraising, 88 Transpoort (Chicago) and HotelScout AI. **Four named Metro Detroit clients** — that is more proof material for `/web-design-detroit` than the content gap report credited.