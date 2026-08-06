# Loop: work the wayfinder map (#6) tickets to completion

Autonomous /loop session, 2026-08-05. Order chosen: #26 → #23 (share `llms.txt`;
#23 rebases on #26), then the independent builds (#18, #15, #19, #20, #27) with
sub-agents where the build is heavy, then decision ticket #14, terminal #21 last.

## #26 — Publish contact details and service area sitewide

DONE except merge — **PR #29 open; `gh pr merge` is permission-blocked for the
agent, user must merge.** All ticket verifications passed on a clean build
(0 address strings, 0 "Worldwide", areaServed + tel link on 26/26 pages).

## #23 — Scrub retired price tiers from llms.txt

DONE except merge — **PR #30 open, stacked on #29.** Zero price figures;
inventory updated (calculator added); decision: file stays hand-maintained,
drift guard = checklist comment posted on #21 (reconcile vs sitemap.ts).

## Queue after that

- [x] #18 blog retarget — **PR #32** (sub-agent). Title/H1 retargeted to
      "How Much Does a Website Cost in 2026?", slug kept, industry-only price
      table matching calculator data, 2 calculator links, secondary retitle
      skipped on live-SERP evidence. Typecheck + 19/19 tests + clean build.
- [x] #15 /web-design-detroit — **PR #31** (sub-agent). Variant A "Receipts",
      1,704 words, 4 real portfolio clients, LocalBusiness schema exactly per
      spec (0 address/geo keys in out/), sitemap 0.9. Typecheck + clean build.
- [ ] #19 deepen homepage + /services (sub-agent after #14 decision)
- [ ] #20 per-route OG/Twitter images (sub-agent)
- [ ] #27 image/asset pipeline (sub-agent)
- [ ] #14 titles/meta decision (grilling ticket — decide + document, flag for user)
- [ ] #21 deploy + Search Console baseline (terminal; needs user for GSC)

## Review (session end, 2026-08-05 — user asked to stop after the two agents)

4 tickets implemented, 4 PRs open, none merged (`gh pr merge` is
permission-blocked for the agent — add an allow rule to change this):

- **PR #29** ← merge first (base for #30) — closes #26
- **PR #30** ← stacked on #29 — closes #23
- **PR #31** — closes #15 (/web-design-detroit)
- **PR #32** — closes #18 (blog retarget)

#31/#32 are based on main; a trivial llms.txt/footer overlap with #29/#30 is
not expected (agents were barred from llms.txt), but merge #29+#30 first anyway.

Still open on the map: #27 image pipeline, #20 OG images, #19 deepen
homepage//services, #14 titles/metas (grilling), #21 terminal baseline
(needs GSC access + the llms.txt reconciliation checklist comment posted there).
