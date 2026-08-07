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
