# Michigan keyword uncertainties — resolved against live data

Resolves the three blockers in issue #9 (parent map #6). All figures pulled live from the
DataForSEO API on **1 Aug 2026**. Source endpoint is named against every claim.
Where a number contradicts `SEO/keyword-research.md` or `SEO/site-explorer.md`, it is called out.

**Convention used throughout:** *Data* = returned by an endpoint. *Inference* = my reading of it.
The two are labelled separately and never blended.

---

## TL;DR

1. **Ann Arbor KD conflict — resolved. KD 6 is correct; 83 / 91.5 is a stale cache.**
   The 83 and the 91.5-referring-domains figure are attached to *variant* rows whose backlink
   snapshot is dated **2025-10-30 / 2025-12-30**. The core keyword's own row, refreshed
   **2026-07-11**, says KD 6 and 38.7. Live per-page measurement gives a **median of 1 referring
   domain** across the nine organic results. The 91.5 describes nothing that is currently on the SERP.
2. **The Michigan decline is NOT real.** It is a Google Ads Keyword Planner reporting artefact.
   National control terms fell *as hard or harder* than the Michigan terms over the same months
   (`web design` −55%, `web design company` −64% vs `web design michigan` −56%). Google Trends —
   an independent Google source — shows search interest for `web design` **roughly doubling** over
   the same window, both nationally and **within Michigan specifically**.
3. **Detroit confirmed, with one significant correction.** 590/mo and KD 5 both verify, and the
   directory softness is current and slightly *worse* than reported. But the 590 is a
   trailing-12-month mean inflated by a single 3,600 month. Detroit's real recent run-rate is
   **~175–250/mo**, so the true Detroit:Ann Arbor volume ratio is **~1.5–1.9×, not the 3.5× claimed**.

**Build order: Detroit first. Ann Arbor second, not dropped.** Evidence in §4.

---

## 1. The Ann Arbor difficulty conflict

### 1.1 Both figures reproduce — and the reason they differ is visible in the payload

`dataforseo_labs_bulk_keyword_difficulty` (US/en) returns **6** for *both* spellings:

| Keyword | KD |
|---|---|
| `ann arbor web design` | **6** |
| `web design ann arbor` | **6** |

`dataforseo_labs_google_keyword_suggestions` (seed `web design ann arbor`, US/en) returns three rows
in the same synonym cluster. The KD differs *by row*, and so does the freshness stamp:

| Row | KD | `avg_backlinks_info.referring_domains` | Backlink snapshot date |
|---|---|---|---|
| `ann arbor web design` (the declared `core_keyword`) | **6** | **38.7** | **2026-07-11** |
| `web design ann arbor` | 83 | 91.5 | 2025-12-30 |
| `web design ann arbor mi` | 83 | 91.3 | 2025-10-30 |

**Data:** all three rows carry an identical volume (170/mo), identical CPC ($11.39) and identical
month-by-month series. DataForSEO's own `keyword_properties.core_keyword` field names
`ann arbor web design` as the canonical member of the cluster. Its `avg_backlinks_info` block is
**7 months fresher** than the ones carrying the 83.

**Inference:** this was never a genuine disagreement between two methodologies. It is one keyword
with one SERP, and the two variant rows are serving a cached backlink profile from late 2025 that
has not been recomputed. The KD 6 / 38.7 record is the current one. The reports printed a stale
number alongside a fresh one and treated them as rival estimates.

### 1.2 Live per-page measurement — the actual answer

`serp_organic_live_advanced` for `ann arbor web design`, location **Ann Arbor, Michigan, United States**,
then `backlinks_bulk_referring_domains` against each ranking URL *and* its root domain:

| Organic # | Abs # | Ranking URL | **RDs to the page** | RDs to the domain |
|---|---|---|---|---|
| 1 | 4 | `fivensonstudios.com/` | **306** | 413 |
| 2 | 5 | `fatsquirrelseo.com/web-design` | **2** (both nofollow → 0 dofollow) | 64 |
| 3 | 6 | `hogtheweb.com/region/ann-arbor-web-design/` | **0** | 262 |
| 4 | 7 | `perfectafternoon.com/2024/ann-arbor-web-design-…` | **1** | 362 |
| 5 | 9 | `yelp.com/search?cflt=web_design&find_loc=Ann+Arbor` | **0** | 747,709 |
| 6 | 10 | `graphikitchen.com/` | **33** | 83 |
| 7 | 11 | `artbinaire.com/` | **44** | 155 |
| 8 | 12 | `digitaldesigns1.net/ann-arbor-web-design/` | **0** | 243 |
| 9 | 13 | `linkedin.com/services/web-designers/us/ann-arbor-mi` | **0** | 13,672,835 |

**Mean page-level RDs: 42.9. Median: 1.**

*Caveat (inference):* the endpoint returned no `referring_domains` key at all for four URLs. I read
that as "no backlink record for this exact URL", i.e. effectively zero. That is the standard reading
but it is an interpretation, not a returned zero.

**Data:** the 91.5 figure matches nothing measurable on this SERP. The fresh API average (38.7) is
close to my live mean (42.9), which cross-validates the KD 6 record.

**Inference — and this is the load-bearing point:** the *mean* is the wrong statistic here. It is
dragged almost entirely by one result. Six of nine ranking pages hold **0–2 referring domains**.
Five of nine rank on nothing but a geo slug or an aggregator template.

### 1.3 Is `/web-design-ann-arbor` winnable? — plainly

**Positions 2–9 organic: yes, clearly.** aiwebhub.io's 12 domains / 1 dofollow is *already
comparable or superior* to the page-level profile of six of the nine ranking pages. A new page
starts at 0 page-level RDs — which is exactly where `hogtheweb.com/region/ann-arbor-web-design/` and
`digitaldesigns1.net/ann-arbor-web-design/` sit today while ranking. Links are not what is holding
those positions; a geo-matched slug and a title tag are.

**Position 1 organic: no, not this year.** `fivensonstudios.com` holds 306 page-level / 413
domain-level RDs *and* the #1 local pack slot on 131 reviews. That is not a content gap.

**Above the organic block: no.** Positions 1–3 absolute are a local pack (Fivenson 131 reviews /
Graphikitchen 47 / Jottful 119). Confirmed unchanged from the site-explorer report. Unreachable
without a verified GBP, and hard even with one.

**So: the page is winnable, but the prize is organic position ~2–5, which is absolute position
~5–9 on a SERP with a 3-pack and a PAA block above it.** On a keyword whose recent run-rate is
~118/mo (§3.2), that is a low-single-digit monthly click outcome. Winnable ≠ worth doing first.

**Note — the SERP has drifted since the reports.** `merithot.com` and `ellanyze.com` are gone.
`artbinaire.com` and `linkedin.com/services/…` are new. Yelp moved up. The report's "2 of 9 organic
are 2024 blog posts" is now **1 of 9** (only perfectafternoon remains).

---

## 2. Are the Michigan geo terms actually declining?

### 2.1 The YoY deltas reproduce — but they are not Michigan-specific

`dataforseo_labs_google_historical_keyword_data` (US/en), monthly series merged across snapshots
(newest restatement wins per month). Michigan terms **and** a national control set:

| Keyword | Jul 2024 | Jan 2025 | Jun 2025 | Dec 2025 | Jun 2026 | Jul-24 → Jun-26 |
|---|---|---|---|---|---|---|
| **Michigan cluster** | | | | | | |
| `web design michigan` | 590 | 590 | 880 | 480 | 260 | **−56%** |
| `michigan web design company` | 390 | 590 | 720 | 260 | 170 | **−56%** |
| `detroit michigan web design` | 390 | 880 | 390 | 320 | 140 | **−64%** |
| `ann arbor web design` | 1,600 | 170 | 210 | 170 | 90 | −94% |
| **National control** | | | | | | |
| `web design` | 74,000 | 90,500 | 60,500 | 40,500 | 33,100 | **−55%** |
| `website design` | 74,000 | 90,500 | 60,500 | 40,500 | 33,100 | **−55%** |
| `web design company` | 22,200 | 27,100 | 14,800 | 9,900 | 8,100 | **−64%** |
| `web design agency` | 6,600 | 12,100 | 9,900 | 5,400 | 8,100 | +23% |
| `how much does a website cost` | 2,900 | 2,900 | 1,900 | 1,900 | 1,900 | −34% |

**Data:** the national head terms declined by the *same magnitude* as the Michigan terms.
`web design` −55% and `web design company` −64% bracket `web design michigan` −56% and
`detroit michigan web design` −64% almost exactly.

Three further artefact signatures in the same payload:

- **Data:** `web design` and `website design` return **byte-identical monthly values across all 42
  common months** (Pearson r = **+1.00**). Two distinct queries with different real-world demand
  cannot produce identical series. This is synonym bucketing inside Keyword Planner.
- **Data:** a simultaneous, uncorrelated-in-the-real-world spike hits *every* term in Sept 2025 —
  `web design` 90,500, `web design agency` 22,200, `web design company` 40,500,
  `detroit michigan web design` 3,600, `ann arbor web design` 390, `web design michigan` 880.
  Geographically unrelated terms do not spike in lockstep for demand reasons.
- **Data:** `ann arbor web design` reads 1,600 → 1,000 → 1,900 in Jul–Sep 2024 and then collapses to
  140 in Oct 2024. A 10× step change in one month on a city-level term is not market behaviour.

### 2.2 The independent check — Google Trends says the opposite

`kw_data_google_trends_explore`, Google web search, weekly index, 2023-01-01 → 2026-07-31. This is a
*different Google dataset* from Keyword Planner, so it is a genuine control on the reporting question.

`web design`, **United States** (index, 0–100 scaled to window max):

| Window | Values | ≈ |
|---|---|---|
| Jan 2023 | 31, 33, 34, 33, 30 | ~32 |
| Jan 2024 | 31, 33, 32, 41, 35 | ~34 |
| Jan 2025 | 30, 32, 37, 39, 38 | ~35 |
| Jan 2026 | 41, 46, 47, 45, 52 | ~46 |
| Peak (Jun 2026) | 92, **100**, 90 | — |
| Latest full weeks (Jul 2026) | 51, 42 | — |

`web design`, **Michigan** — the direct test of the geo hypothesis:

| Window | Values | ≈ |
|---|---|---|
| Jan 2023 | 20, 26, 21, 19 | ~21 |
| Jan 2024 | 20, 23, 22, 22, 23 | ~22 |
| Jan 2025 | 26, 19, 40, 36, 36 | ~31 |
| Jan 2026 | 39, 31, 35, 44, 43 | ~38 |
| Peak (Jun 2026) | 97, **100**, 77 | — |
| Latest full weeks (Jul 2026) | 49, 44, 35 | — |

**Data:** over the exact window in which Keyword Planner reports Michigan web-design volume falling
~56%, Google Trends reports Michigan search interest for `web design` rising from a ~21 baseline to
a ~38–55 band, peaking at the window maximum in June 2026. The Michigan curve tracks the national
curve closely; Michigan does **not** diverge downward from the US.

*Caveat:* Trends is a normalised relative index, not absolute volume, and cannot be converted to
searches/month. It establishes *direction*, not magnitude. `web design michigan` itself returns
~0 in Trends — too low-volume for Trends to resolve — so the Michigan evidence here is the
state-level reading of the head term, not of the geo-modified term.

### 2.3 Verdict

**The Michigan decline is not real.** It is an artefact of Google Ads Keyword Planner volume
reporting (bucketing/restatement), and it applies to the entire web-design keyword space, not to
Michigan.

**The decision-relevant consequence, and it inverts the ticket's framing:** issue #9 says *"If it's
real, the whole local thesis weakens and the deferred national service pages should be
reconsidered."* That escape hatch does not exist. The national terms fell **just as hard** in the
same data — `web design` −55%, `web design company` −64%. Switching from local pages to national
service pages would not have dodged anything. There is **no evidence here for re-prioritising
national over local**, and the local thesis stands undamaged.

**What this does mean operationally (inference):** every absolute volume figure in
`SEO/keyword-research.md` and `SEO/site-explorer.md` inherits this distortion. Treat all of them as
rank-ordering signals, not as traffic forecasts. Do not build click projections on them.

---

## 3. Confirming the Detroit target

### 3.1 Volume and difficulty — both confirm at the headline

`kw_data_google_ads_search_volume` + `dataforseo_labs_google_keyword_overview` + `bulk_keyword_difficulty` (US/en):

| Keyword | Vol/mo | KD | CPC | Competition |
|---|---|---|---|---|
| `detroit michigan web design` | **590** | **5** | $7.16 | LOW (index 26) |
| `web design detroit` | 590 | 18 | $7.16 | LOW (index 26) |
| `how much does a website cost` | **1,900** | **19** | $11.41 | MEDIUM (index 54) |
| `how much does a custom website cost` | **110** | 18 | $13.51 | LOW (index 16) |

**Both ticket claims verify exactly.** `detroit michigan web design` = 590/mo at KD 5.
`how much does a website cost` = 1,900/mo at KD 19, and the retarget ratio is
**1,900 / 110 = 17.3×** — the blog-retarget ticket's "~17×" is confirmed.

`how much does a website cost` is also the **only genuinely stable series in the dataset**: 1,900–2,400
in every one of the last 12 months, no spike, no collapse. Given §2, that stability is itself a
quality signal. *Inference: it is the most trustworthy number in the entire keyword set.*

*Flag:* `detroit michigan web design` and `web design detroit` return identical volume, CPC and
monthly series but **different KD (5 vs 18)** — the same variant-row staleness seen in §1.1. Target
the KD 5 spelling; do not treat 5 and 18 as two facts.

### 3.2 Correction — the 590 is not a run-rate

Monthly series behind that 590:

| 2025-07 | 08 | 09 | 10 | 11 | 12 | 2026-01 | 02 | 03 | 04 | 05 | 06 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 320 | 260 | **3,600** | **1,300** | 590 | 320 | 170 | 90 | 260 | 170 | 210 | 140 |

**Data:** the API reports 590 (the raw mean of the twelve listed months is 619; Google buckets it).
Strip the two-month Sept–Oct 2025 spike — itself part of the system-wide artefact in §2.1 — and the
remaining 10-month mean is **253**. The trailing 6 months average **173**.

Same treatment for Ann Arbor (`ann arbor web design`): 12-month mean 170, trailing 6-month mean
**118**, ex-spike 10-month mean **137**.

**This contradicts `SEO/keyword-research.md` line 39**, which justifies Detroit as *"3.5× volume on
the same template"*. On current run-rate the ratio is **173 / 118 ≈ 1.5×**; ex-spike it is
**253 / 137 ≈ 1.9×**. Detroit is still the bigger term, but by around half the claimed multiple.

**Inference:** the volume argument for Detroit is much weaker than the reports claim. The case for
Detroit has to rest on SERP softness — which, as it turns out, it comfortably can.

### 3.3 The SERP softness is current — and slightly worse than reported

`serp_organic_live_advanced`, `detroit michigan web design`, location **Detroit, Michigan, United States**:

| Organic # | Abs # | Result | **RDs to page** | RDs to domain |
|---|---|---|---|---|
| 1 | 4 | `detroitwebsitedesign.com/` | **51** | 67 |
| 2 | 5 | **`clutch.co/web-designers/detroit`** *(directory)* | 6 | 47,821 |
| 3 | 6 | `crimsonagency.com/work-we-do/web-design-development/` | **0** | 206 |
| 4 | 7 | **`webdesignrankings.com/top-web-designers-detroit/`** *(directory)* | **0** | 982 |
| 5 | 8 | `allianceinteractive.com/web-design-detroit/` | **0** | 906 |
| 6 | 9 | **`linkedin.com/services/web-designers/us/detroit-mi`** *(directory)* | **0** | 13,672,835 |
| 7 | 10 | `designgandalf.com/` | **28** | 31 |
| 8 | 11 | `hogtheweb.com/region/detroit-web-design/` | **0** | 262 |
| 9 | 13 | `formcode.com/michigan-web-design-blog/` | **1** | 222 |

**Mean page-level RDs: 9.6. Median: 0.**

Every claim in `SEO/content-gap.md` re-verifies:
- **3 of 9 organic results are directories** — Clutch (abs #5), WebDesignRankings (abs #7),
  LinkedIn (abs **#9**, reported as #8 — one position of drift). ✅
- **`hogtheweb.com` at abs #11 on a bare `/region/` slug** — exact match, and that page holds
  **0 referring domains**. ✅

Two additional findings the reports did not have:

- **Data:** the #1 organic result, `detroitwebsitedesign.com`, holds only **67 domain-level** RDs
  (51 to the page) — the weakest #1 of any SERP examined here, and *one sixth* of Ann Arbor's
  incumbent.
- **Data:** the Detroit **local pack is weak** — Hexagon Creative (31 reviews), The Green Edge
  (20), Web Designs Detroit (11). Ann Arbor's pack is 131 / 47 / 119.

---

## 4. Recommendation: build order

### **Detroit first. Ann Arbor second. Neither is dropped.**

The head-to-head, all measured live today:

| | **Detroit** | **Ann Arbor** |
|---|---|---|
| KD (fresh record) | **5** | 6 |
| Volume, 12-mo mean | 590 | 170 |
| Volume, trailing 6-mo | **173** | 118 |
| Page-level RDs, **median** | **0** | 1 |
| Page-level RDs, mean | **9.6** | 42.9 |
| **RDs held by the #1 organic result** | **51** (domain: 67) | **306** (domain: 413) |
| Organic pages with ≤2 RDs | 6 of 9 | 6 of 9 |
| Directories in the organic block | **3 of 9** | 2 of 9 |
| Local pack review counts | **31 / 20 / 11** | 131 / 47 / 119 |

**The referring-domain evidence, stated plainly:** both SERPs are soft at the page level — six of
nine results on each hold two or fewer referring domains, and aiwebhub.io's 12 domains / 1 dofollow
is competitive against that. The two SERPs diverge at the top. Ann Arbor's #1 is defended by
**306 page-level referring domains plus a 131-review GBP**; Detroit's #1 is defended by **51**, on a
domain with only 67 total. Detroit's entire first page carries a **median of 0** referring domains
per ranking URL, and a third of it is directory listings that a genuine local service page
out-ranks on relevance rather than authority.

Detroit is therefore the *softer* SERP with the *larger* term and, on the honest run-rate, no
meaningful volume sacrifice versus the 3.5× the reports promised — because that 3.5× was never real.

**Why Ann Arbor should not be dropped** (contra one option in the ticket):
- It is winnable organically (§1.3) — the KD 83 that would have justified dropping it is a stale
  cache, and the 91.5 referring domains describe nothing on the live SERP.
- It is where the business actually is — the **(734)** area code is Washtenaw. For a service-area
  GBP, proximity is a ranking input, so Ann Arbor is the *legitimate* pack play even though its pack
  is the harder one. A Detroit GBP from a Washtenaw base is the weaker claim. **Inference,** not
  measured: I have not verified GBP proximity weighting against any API here.
- Its ceiling is genuinely lower (organic #2–5, below a 3-pack and a PAA block, on ~118/mo), which
  makes it the right *second* page, not the template pilot.

**The sequencing consequence:** `SEO/keyword-research.md` line 38 makes Ann Arbor the template
because it is "home turf". Home turf is a GBP argument, not a template argument. Build the template
against the SERP most likely to reward it early — Detroit — then replicate to Ann Arbor, where the
GBP work is the real unlock anyway.

**One caveat I cannot resolve here:** all of this ranks the two pages against each other. Neither
beats `how much does a website cost` (1,900/mo, KD 19, 17.3× its current target, and the only
stable series in the dataset) on expected traffic. That retarget is a title-and-H1 edit on an
existing post. Nothing in this research changes its standing as the cheapest win available — if
anything §3.1 strengthens it. Ordering the location pages against *each other* is what #9 asked;
whether either should precede the blog retarget is a separate call for the human.

---

## 5. Corrections to the existing reports

| Report | Claim | Status |
|---|---|---|
| `keyword-research.md:24` | Ann Arbor "KD 6 / 83" — both printed, unresolved | **Resolved: 6.** 83 is a 2025-10/12 cached variant row. |
| `site-explorer.md:59` | "avg 91.5 referring domains across ranking pages" | **Withdraw.** Live median is 1; live mean 42.9; fresh API mean 38.7. |
| `keyword-research.md:39` | Detroit is "3.5× volume" of Ann Arbor | **Wrong.** ~1.5× on run-rate. The 590 is spike-inflated. |
| `keyword-research.md:63` | Michigan −70%/−76% YoY, "real or artefact — cannot tell" | **Artefact.** National controls fell equally; Trends rose in Michigan. |
| `keyword-research.md:38` | Ann Arbor is the template, Detroit second | **Reverse.** See §4. |
| `content-gap.md` | Detroit: 3/9 directories, hogtheweb #11 | **Confirmed current.** LinkedIn at abs #9 not #8. |
| `site-explorer.md:57` | `how much does a website cost` 1,900 / KD 19 | **Confirmed exactly.** |
| `site-explorer.md:63` | Ann Arbor organic list | **Drifted.** merithot + ellanyze out; artbinaire + LinkedIn in. |

## 6. Method and limits

- All calls US/English unless stated. SERPs pulled at city level (`Ann Arbor,Michigan,United States`
  and `Detroit,Michigan,United States`); KD and volume are country-level, as those endpoints accept
  country only.
- `backlinks_bulk_referring_domains` counts **all live** referring domains including nofollow. Where
  it returned no `referring_domains` key for a URL, I read that as zero — an interpretation.
- Google Trends is a normalised index. It supports direction only, never magnitude.
- Historical series were merged newest-restatement-wins across overlapping snapshots; §2.1 figures
  are single-month readings, §3.2 means are arithmetic over the stated months.
- Not investigated: whether a Washtenaw-based service-area GBP can rank in the Detroit pack. Flagged
  in §4 as an inference and left open — it bears on the GBP ticket, not on page build order.
