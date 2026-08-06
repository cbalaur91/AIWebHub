# Website cost ranges — sourced figures for `/tools/website-cost-calculator`

Gathered 4 Aug 2026 for [Design the website cost calculator](https://github.com/cbalaur91/AIWebHub/issues/13).

**Rule this file exists to enforce:** every number rendered by the calculator traces
to a row below. If a figure is not here, it does not appear on the page. No
AIWebHub prices, ever — the June 2026 pricing-to-quote spec is locked.

---

## Source A — GoodFirms, *Website Development Cost in 2026*

- **URL:** https://www.goodfirms.co/resources/website-construction-cost-survey
- **Methodology (verbatim):** "a Goodfirms survey of 300+ web development
  companies, agencies, and independent professionals conducted in April–May 2026.
  Respondents represent a cross-section of company sizes (freelancers through
  200+ employee enterprises) and geographies (31 countries)."
- **Side of the market:** sell-side. These are the prices agencies say they quote.
- **⚠️ Geography caveat — this is the single most important limitation.** The
  survey is **global**, and its published research-partner list is heavily
  weighted to South and Southeast Asia. Its own hourly-rate table puts India,
  Pakistan, Bangladesh, Vietnam at **$10–$15/hr** against the US at **$50–$100/hr**.
  So GoodFirms' modal project bands **understate what a US buyer pays**. They are
  usable as a *floor*, never as a US central estimate.

### Fixed-price bands by project scope

| Project scope | Most common range | % of firms | Typical timeline |
|---|---|---|---|
| Basic website / MVP | $1,000–$3,000 | 59.9% | 2–4 weeks (71%) |
| Mid-sized website | $5,000–$20,000 | 53.9% | 4–8 weeks (50%) |
| CMS-based website | $5,000–$20,000 | 45.4% | 4–8 weeks (36.2%) |
| Enterprise website | $20,000–$50,000 | 36.2% | 8–28 weeks (32.2%) |
| Custom web application | $20,000–$50,000 | 35.5% | 8–16 weeks (35.5%) |
| Web portal | $20,000–$50,000 | 33.6% | 8–16 weeks (31%) |

### By industry vertical

| Vertical | Most common range | % of firms |
|---|---|---|
| Personal / blog | $5,000–$25,000 | 77% |
| eCommerce | $5,000–$50,000 | 74% |
| Real estate | $5,000–$50,000 | 73% |
| Healthcare | $5,000–$50,000 | 48% |
| News / media | $5,000–$50,000 | 68% |
| Education / eLearning | $25,000–$80,000 | 68% |
| SaaS | $25,000–$80,000 | 61% |
| Fintech / neobank | $25,000–$80,000 | 54% |

### Other figures

- **US hourly rate:** $50–$100. (India / Pakistan / Bangladesh / Vietnam: $10–$15.)
- **Monthly retainers:** "$500–$3,000 for nearly 58% of the market."
- **Market concentration:** 33% of agencies quote fixed-price $1,000–$5,000;
  another 30% at $5,000–$15,000 — "nearly two-thirds" combined. 63% quote
  $1,000–$15,000.
- **Budget split by phase:** discovery 5–10% (53%), design 10–20% (47%),
  front-end 20–30% (53%), back-end 30–40% (36%), QA 10–20% (48%), PM 5–10% (44%).
- **CMS platform bands:** WordPress $3,000–$40,000 (81%), Shopify $3,000–$40,000
  (68%), Webflow $3,000–$40,000 (55%), Wix $3,000–$10,000 (30%).
- **AI builders:** 33.5% of firms put them at $500–$1,500; 23.7% below $500.
- **Total-cost-of-ownership claim (verbatim):** "the real cost of a professionally
  built website is 100-200% higher when you factor in hosting, maintenance,
  integrations, and post-launch updates."
- **AI's effect (verbatim):** "Simple websites that cost $5,000 three years ago
  are now being built for under $1,500… enterprise builds are not cheaper."

---

## Source B — WebFX, *How Much Should a Website Cost in 2026?*

- **URL:** https://www.webfx.com/web-design/pricing/
- **Methodology (as stated on page):** "Data sourced from 250 U.S.-based marketing
  professionals; represents 2026 pricing."
- **Side of the market:** buy-side, **US only**. This is what US buyers report
  actually paying — the correction GoodFirms needs.
- **⚠️ Caveat:** WebFX is a large US agency publishing pricing research that
  frames its own $8,000/mo entry point. Treat as directional, and always cite
  alongside Source A rather than alone.

| Cut | Figures |
|---|---|
| Headline | "$1,000 – $30,000+ in 2026 on average"; larger businesses $100,000+ |
| Basic (small business) | $6,500 – $15,000 |
| Intermediate (mid-sized) | $15,000 – $50,000 |
| Advanced (enterprise) | $50,000 – $100,000 |
| 1–75 pages | $1,000 – $3,000 |
| 75–150 pages | $3,000 – $6,000 |
| 150–250 pages | $6,000 – $10,000 |
| Copywriting | $60 – $300 per page |
| Design / style | $2,000 – $15,000 (basic $2–5k, intermediate $5–10k, advanced $10–15k) |
| SEO | $2,000 – $10,000 |
| Responsive design | $3,000 – $25,000 |
| eCommerce functionality | $5,000 – $25,000 |
| Database integration | $2,000 – $25,000 |
| Ongoing, yearly | Most businesses $501–$5,000/yr; agency $501–$1,000/yr (22%), freelancer $1,001–$5,000/yr (37%) |

---

## The divergence — and why it is the page's best asset

The two sources **disagree hard** on the most-searched scenario:

| Small brochure site | Source |
|---|---|
| **$1,000 – $3,000** | GoodFirms (global agencies, sell-side) |
| **$6,500 – $15,000** | WebFX (US buyers, buy-side) |

That is a **5× gap on the same question.** It is not an error in either survey —
it is the geography and side-of-market difference doing exactly what it should.

**Design consequence.** Do not average them into a fake midpoint; averaging
manufactures a precision neither source supports. Render **both bands, labelled
by who said it**, and let the gap be the answer. The searcher behind "how much
does a website cost" is confused *because* they have seen numbers this far apart —
explaining the spread is more useful, more honest, and more citable than
inventing a single number that no source backs.

---

## Rejected / could not verify

- **BLS OEWS Detroit-Warren-Dearborn and Michigan state wage tables** — would have
  given a genuinely authoritative Michigan-specific anchor (and a government
  citation no competitor has). `bls.gov` returned **HTTP 403** to both WebFetch
  and the DataForSEO parser; only search-snippet figures were obtainable
  (national: web developers $47.49/hr mean, web/digital interface designers
  $56.49/hr mean, May 2025). **Not used** — unverified at source. Worth one more
  attempt when building #17, since a `.gov` citation is the strongest E-E-A-T
  signal available on this page.
  - *#17 retry, 5 Aug 2026:* still 403 — WebFetch and `curl` with a full browser
    user agent both blocked at the edge. BLS remains uncited; the live page says
    so in "The numbers we refused to use" rather than citing a search snippet.
- **Clutch** *State of Small Business Websites 2025* — the resource URL 404s and
  the press release carries no cost figures. Widely-quoted secondary claims
  ("61% spent under $10,000") could **not** be traced to a primary Clutch page.
  **Do not cite.**
- **Agency blog aggregators** (levitate.ai, webyking, jim.com, digitalapplied,
  gruffygoat, pixeto, bridgewaydigital, leadpages, onelittleweb) — all surfaced
  in search, all uncited or citing each other in a circle. **Do not cite.**
