# Loop: work the wayfinder map (#6) tickets to completion

Autonomous /loop session 2, 2026-08-06. Picked up from session 1 (2026-08-05),
which left #26/#23/#18/#15 implemented as PRs #29–#32, all unmerged.

## ✅ ALL MERGED AND DEPLOYED — 2026-08-06

The user authorised merging, and `gh pr merge` went through. All eight PRs are
on `main` and live on aiwebhub.io. **Seven map tickets closed: #26 #23 #15 #18
#14 #20 #19 #27.** Only #21 (terminal) remains, plus two new tickets found by
verification (#36, #38).

Production verified after deploy: **26/26 pages self-canonicalise with exactly
one `og:image` and one `twitter:image`, 26 unique cards**, sitemap 26 URLs valid
XML, `/web-design-detroit` 200, homepage image payload **11,715 KB → 98 KB**,
the dead 3.47 MB MP4 now 404s.

⚠️ **Merge gotcha for next time:** merging #29 with `--delete-branch` destroyed
#30's base branch and GitHub auto-closed it un-merged. Recovered as #39.
Retarget stacked PRs to `main` *before* merging their base.

⚠️ Re-measuring assets immediately after a Vercel deploy can read stale CDN edge
cache — a first pass showed 3 MB originals still live; a second returned
byte-exact matches to the repo.

## What was built (all now on main)

| Ticket | State | PR |
|---|---|---|
| #26 contact details sitewide | ✅ merged & live | #29 |
| #23 scrub llms.txt price tiers | ✅ merged & live | ~~#30~~ → **#39** |
| #15 /web-design-detroit | ✅ merged & live | #31 |
| #18 blog retarget | ✅ merged & live | #32 |
| #14 money-page titles & metas | ✅ merged & live | #33 |
| #20 per-route OG/Twitter images | ✅ merged & live | #34 |
| #19 deepen / and /services | ✅ merged & live | #35 |
| #27 image & asset pipeline | ✅ merged & live | #37 |
| #21 deploy + GSC baseline | **open** — items 1-3 verified live; 4-6 need Search Console + #38 | — |

## This session's work

- **#14 decided and built (PR #33).** Live SERP evidence settled the geo
  question: on `web design michigan`, 9 of 9 organic results carry the place
  name in the title. Geo on `/` and `/about`, national on `/services` and
  `/contact`. Recorded against interest: `michigan web design` is KD 61 on a
  *fresh* backlink record (unlike #9's stale-cache case), and the top 3 slots
  are a local pack needing the GBP ruled out in #7. Found `ai integration
  services` — 590/mo, **KD 1**, $65.65 CPC, uncontested — now targeted by
  `/services`.
- **#20, #19, #27 built by sub-agents** in isolated worktrees, each with an
  explicit do-not-touch list derived from the open PRs' file surfaces.

## Composition verification — the part no single agent could do

Test-merged all eight branches into one, rebuilt, and swept the result. This
found four defects invisible on any individual branch:

1. **`llms.txt` didn't list `/web-design-detroit`** — the exact drift #23
   predicted and deferred to #21. Fixed on #31. (The other 16 sitemap URLs
   absent from llms.txt are blog/portfolio entries, omitted by design.)
2. **`/web-design-detroit` was orphaned** — zero internal links, reachable only
   from sitemap.xml. Fixed on #35 by anchoring the homepage proof section's
   existing "Metro Detroit sites" prose to it.
3. **Import clash on `app/services/page.tsx`** between #27's `<Picture>` and
   #19's `<FaqBlock>`. Resolved on #37.
4. **An unsourced statistic promoted to a money page.** #19's accordion fix made
   the `/services` GEO answer render; it cited "over 180 million ChatGPT users",
   which OpenAI's own 900M weekly (Feb 2026) puts ~5x off and ~2 years stale, on
   the page selling GEO expertise. Cut on #35 rather than restated — every
   available replacement source is a stat-aggregator blog, not primary.

Composed end state: typecheck clean, **54/54 tests**, clean build, 27 pages each
with exactly 1 `og:image` / 1 `twitter:image` / 1 canonical, 26 unique cards,
**79 JSON-LD blocks 0 invalid**, 0 `AdobeStock`, 0 `Worldwide`, 0
`streetAddress`, 0 price figures in llms.txt.

## Verified live in production (part of #21, done early)

- **25/25 live URLs self-canonicalise**, exactly one tag each — technical-audit
  only estimated ~17 of ~19. #8 shipped better than reported.
- **The sitemap bug does not reproduce**: 200, 4,662 bytes, parses as valid XML.
  Nothing to fix; submission in GSC is still required.

## Opened this session

- **#36** — source or cut the stale AI-adoption figures still in
  `lib/blog-posts.ts:235` (same numbers, blog copy, left out of #19's scope).
- **#38** — above-the-fold content is `opacity: 0` until its entry animation
  runs. `.animation-delay-*` zeroes the element and the animation restores it,
  so the homepage H1 can't paint before 300 ms and isn't opaque until 900 ms.
  81 occurrences across 11 files. **This is why #27 could not measure LCP**
  (Lighthouse `NO_FCP` on every Chrome/preset combination) and it blocks #21's
  item 5. Also a trap: adding `prefers-reduced-motion` support naively would
  ship a permanently blank site.

## Next session

1. **#38 before #21 item 5** — LCP is unmeasurable until the opacity pattern is
   fixed, and #27's 11,715 KB → 98 KB image win (measured live) can't be
   demonstrated as an LCP number without it.
2. #21's remaining items need a human in Search Console: submit sitemap, request
   indexing, record the true-zero baseline. Items 1-3 are already verified live.
3. Small cleanup: add `public/og/*.png` to `scripts/generate-images.ts`'s
   exclusion list next to `public/blog/*.png` — the pipeline currently generates
   51 pointless WebP derivatives of #34's OG cards. Non-breaking, just waste.

---

# Session 3 — 2026-08-06 (later)

Goal: close out the remaining tickets. #38, #36 built and pushed as PRs; #21
advanced as far as it can go without Search Console access; #6 unchanged.

## What shipped

| Ticket | State | PR | Verified by |
|---|---|---|---|
| #38 above-fold opacity | **merged & live** ✅ | #40 | Lighthouse + CDP paint-timing + pixel diff |
| #36 stale AI stats | **merged & live** ✅ | #41 | `bun test` 54/54, whole-file sweep |
| #21 deploy + GSC baseline | items 1-3 & **5 ✅**, **4 & 6 need you** | — | production Lighthouse post-deploy |
| #6 wayfinder map | open — closes when #21 does | — | — |

## ✅ ALL THREE MERGED AND DEPLOYED — 2026-08-06

User authorised the merge; #40, #41, #42 all squash-merged to main and live.
#38 and #36 auto-closed. Composition re-verified on merged main: clean build,
54/54 tests, built CSS has 0 element-level `opacity:0`, 5 `animate-enter*`
classes, 1 reduced-motion block, 0 files containing "180 million".

### Item 5 result — the number that was unmeasurable

| Page | Preset | Before | After |
|---|---|---|---|
| `/` | mobile | `NO_FCP`, unscoreable | **100** · LCP **1.5 s** |
| `/` | desktop | `NO_FCP`, unscoreable | **100** · LCP 0.4 s |
| `/web-design-detroit` | mobile | 96 · LCP 2.6 s | **100** · LCP **1.3 s** |
| `/web-design-detroit` | desktop | 100 · LCP 0.4 s | **100** · LCP 0.4 s |

Against the **3,741 ms baseline the homepage is now 1,500 ms — a 60% cut**, and
**#27's sub-2,500 ms criterion is met** on both pages and both presets.

⚠️ **Local builds are pessimistic about LCP.** I predicted mobile would stay
above 2,500 ms because the local static server measured 3.0 s; production came
in at 1.5 s. `bunx serve` doesn't reproduce Vercel's compression/HTTP2 — quote
production numbers, not local ones, when a ticket's criterion is a threshold.

## #38: the ticket's own diagnosis was wrong, and it mattered

#38 proposed moving `opacity: 0` out of `.animation-delay-*` into each
keyframe's `from` state. **Tested that first, and it does not restore FCP.**
Patched the built CSS in a copy of `out/` and measured four variants:

| Variant | FCP |
|---|---|
| `main` | none — `NO_FCP` |
| `opacity: 0` in keyframes, fill-mode `both` (the ticket's fix) | **still none** |
| entry animations disabled outright | FCP@120 ✓ |
| transform-only above the fold | FCP@164 ✓ |
| control: `/privacy-policy`, no entry animation | FCP@56 ✓ |

Cause is not *where* the `opacity: 0` lives. Content that first paints at
opacity 0 and is revealed by a **compositor-driven** opacity animation never
produces a main-thread contentful paint, so Chrome records no FCP at all. The
animations do finish normally in headless (computed opacity is 1 at 3 s) — the
page was never blank, its reveal was just never *contentful*.

Shipped both halves: fill-mode `both` + no element-level opacity (makes
`prefers-reduced-motion` safe to add, which it was not before), and transform-only
entry animations for the header and each route's first hero section. Below the
fold is untouched.

Production baseline recorded before the fix: `/` is **UNSCOREABLE on both mobile
and desktop**; `/web-design-detroit` mobile is 96 / LCP 2.6 s — already under the
3,741 ms baseline but over #27's 2,500 ms target.

## #36: found more than the ticket described

Cut the three untraceable figures as decided. Also found the *same post* advising
"cite reputable sources" while using an unsourced "30 to 50 percent" chatbot
figure as its own example of a citable statement — fixed to demonstrate the
principle instead.

The whole-file sweep the ticket's verification line implies turned up **~8 more
unsourced figures across four other posts** (lines 115, 201, 381, 413, 448, 456,
472). Left alone deliberately — rewriting four published posts is a bigger
content decision than this ticket authorises. Tabulated in #41; worth its own
ticket.

## Still outstanding

1. **#21 items 4 & 6** — Search Console UI, human-only. Click-by-click handoff
   posted as a comment on #21. #40 is deployed, so these are unblocked *now*.
   **#6 closes when #21 does.**
2. Carried over, still not done: add `public/og/*.png` to
   `scripts/generate-images.ts`'s exclusion list — 51 pointless WebP derivatives
   of #34's OG cards.
3. Possible new ticket: the 8 unsourced figures in the other blog posts
   (lines 115, 201, 381, 413, 448, 456, 472 of `lib/blog-posts.ts`), tabulated
   in #41.

---

# Session 4 — 2026-08-06 (final)

Goal: close #21. **Done — and #6, the map, closed with it. All 15 child tickets
resolved. Zero open issues on the repo.**

## What happened

#21 was down to items 4 & 6, both Search Console UI. The handoff assumed the
property was already verified. **It wasn't** — a live DNS query showed only an
SPF record on `aiwebhub.io`; no `google-site-verification` TXT existed. The
ticket's "verified via DNS TXT (2026-03-04) — no setup needed" was simply wrong.

Verified for real as a **Domain property**, TXT added at **Hostinger**
(`ns1/ns2.dns-parking.com` — DNS is *not* at Vercel), alongside the SPF record
rather than replacing it. Confirmed through Google's own resolver before the
user clicked Verify; Cloudflare's cache still showed the old answer at that
point, which would have read as a false "not propagated".

## The baseline — and the map's biggest error

| Metric | Value |
|---|---|
| Clicks | 0 |
| Impressions | **40** |
| CTR | 0% |
| Avg position | **10.3** |

Window: GSC Last-7-days as of 2026-08-06, closing ~2026-08-04 — **before** the
2026-08-06 deploy. Clean pre-change baseline.

**The map asserted "the domain ranks for zero keywords — a true zero baseline."
It does not.** That figure came from DataForSEO. Rank trackers only report
keywords in their own database; GSC reports what Google actually served. The
success criterion is *"move 40 impressions at position 10.3 upward and convert
them to clicks"*, not *"go from nothing to something"* — a materially different
measurement problem, and reading it as zero would overstate any later gain.
Expect average position to **worsen** first as new pages index at low positions.

## Re-verified live before closing

- **26/26** pages: 200 + exactly one self-referencing canonical
- `sitemap.xml`: 200, valid XML, 26 `<loc>`
- `robots.txt`: allows Googlebot, declares the sitemap on the `www` host
- **#23 drift guard passes**: `llms.txt` lists all 10 core URLs incl.
  `/web-design-detroit` (blog/portfolio omitted by design)

⚠️ The first canonical sweep reported `PASS=25 FAIL=0` on a 26-URL list —
`while read` dropped the last line because the file had no trailing newline.
The missing URL passed when checked separately. Check input line count against
the expected count before trusting a sweep total.

## Still outstanding (no ticket, carried forward)

1. Add `public/og/*.png` to `scripts/generate-images.ts`'s exclusion list — 51
   pointless WebP derivatives of #34's OG cards. Non-breaking, just waste.
2. ~8 unsourced figures across four blog posts (lines 115, 201, 381, 413, 448,
   456, 472 of `lib/blog-posts.ts`), tabulated in #41. Worth its own ticket.
3. **Re-measure at 4 and 8 weeks** against 0 / 40 / 0% / 10.3 — same 7-day
   window, same Domain property. Then decide whether the deferred `/services/*`
   programme is justified. This belongs to a follow-on effort, not this map.

---

# Session 5 — AI Consulting service line (2026-08-12)

## Goal

Add a second business line to the site: AI consultancy, with three pillars —
**Training** (teach a client's team to build and use AI agents), **Automation
audit** (map their processes, report on what is worth automating) and **Agentic
builds** (implement the workflows end to end). Nothing on the site said any of
this, so there was no page to land on and no words to match.

Owner decisions taken up front: **one page, not a hub-and-spokes**, and **its
own top-nav link**.

## What shipped

1. `app/ai-consulting/page.tsx` + `layout.tsx` → verify: static route in build
   output at 921 B, identical profile to `/services` — server-rendered, only
   the `GradientButton` client leaf. ✅
2. Nav link, `/services` pointer band (3 cards → deep links), `hasOfferCatalog`
   extended with the 3 consulting Services → verify: `href="/ai-consulting"`
   present in `out/services.html`. ✅
3. Sitemap entry, `OG_CARDS` row, `knowsAbout` additions, `llms.txt` under both
   `## Services` and `## Pages` → verify: `<loc>` in `sitemap.xml`, generated
   card on disk. ✅
4. `tests/og-images.test.ts` money-page list extended → verify: 55 pass
   (was 54), 0 fail. ✅

## Verified

- `typecheck` clean, `test` 55/55, `build` compiles, all after
  `rm -rf .next out tsconfig.tsbuildinfo`.
- `out/ai-consulting.html`: exactly one self-referencing canonical, exactly one
  `og:image`, 4 JSON-LD script tags (root Organization + WebPage/Breadcrumb/
  FAQPage) — same count as `/services`.
- Schema types present: 6 Question + 6 Answer, 3 Offer/Service, 1 OfferCatalog,
  1 FAQPage, 1 BreadcrumbList.
- All 6 FAQ answers and the pillar prose are in the exported HTML, not injected
  — the failure mode `FaqBlock` exists to prevent.
- `lint` output is byte-identical to `main` apart from line-number shifts; the
  3 errors on `/services` are pre-existing, and `app/ai-consulting/page.tsx`
  produces none.

## Two judgement calls made without the owner

1. **Hero stat tiles.** The plan flagged `Half-day` / `1–2 wk` as needing
   confirmation. Both are turnaround promises we cannot verify, so they were
   replaced with three facts that are true by construction — `3` ways to start,
   `Quote-only`, `Your stack`. No numbers to be held to.
2. **Contact-form service dropdown.** Left out. The form still captures only
   `{name, email, company?, message}`, so nothing records which of the two
   business lines a lead came for. This is now a real gap, but it was marked
   owner's-call in the plan and is beyond the literal ask. Worth a ticket.

## Nav wrapping — caught by arithmetic, not by eye

The seventh link pushed the desktop row (logo + 7 links + "Get Started") to an
estimated ~793 px against the 768 px `md` breakpoint. Fixed at the source of the
regression: `gap-6` → `gap-4 lg:gap-6`, plus `whitespace-nowrap` so
"AI Consulting" cannot break across two lines. **Not visually confirmed** — this
box has no Playwright/Puppeteer and `bunx serve` does not resolve here.

## Still outstanding (carried forward, plus new)

1. Add `public/og/*.png` to `scripts/generate-images.ts`'s exclusion list.
2. ~8 unsourced figures across four blog posts (tabulated in #41).
3. Re-measure at 4 and 8 weeks against 0 / 40 / 0% / 10.3, then decide on the
   deferred `/services/*` programme.
4. **New — services data is duplicated seven ways.** There is no
   `lib/services-data.ts` and no `Service` type; every list is declared inline
   where it renders, and no two agree. This session added a seventh. Extract
   using `lib/portfolio-data.ts` + `tests/portfolio-data.test.ts` as the model.
5. **New — `components/ServicesSection.tsx` is dead code**: zero importers and
   three image paths that do not exist on disk. Flagged, not deleted.
6. **New — contact form has no service field** (see judgement call 2).
