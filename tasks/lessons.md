# Lessons

- Before calling a UI state mismatch a bug, re-screenshot with
  `--virtual-time-budget=4000`: headless Chromium captures mid-CSS-transition and
  will show stale colours next to fresh text, which looks exactly like a state bug.
  But `--virtual-time-budget` does *not* reliably advance CSS **animation**
  clocks — a 4 s budget still caught the hero mid-fade and showed it as blank.
  For animated content, drive CDP (`Page.navigate`, real `sleep`,
  `Page.captureScreenshot`) instead of trusting virtual time.
- Snap-confined Chromium cannot write `--screenshot` to `/tmp` (it silently
  redirects to a private mount and reports success). Write to `$HOME` instead.
- When a source is paraphrased by search results, fetch the primary page before
  citing it — the widely-repeated Clutch "61% spent under $10,000" figure traces
  to no primary Clutch page that still exists.
- `WebFetch` 403s on bls.gov, goodfirms.co and forbes.com; the DataForSEO
  `on_page_content_parsing` MCP tool gets through some of them. Try it before
  giving up on a source.
- Wayfinder maps are only useful if the map body exists. Check
  `gh api repos/:owner/:repo/issues/<n> --jq .body` is non-null at session start;
  an empty map silently costs every later session ~6 fetches of re-derivation.
- When expanding copy to hit a word target, re-audit every added sentence for
  traceability before building — filler claims ("most projects launched in
  under two months") sneak in exactly when the goal is word count, not facts.
- Test-merge every open PR into one branch and rebuild before calling a batch of
  tickets done. Parallel agents each verify only their own branch, so defects
  that live in the *composition* are invisible to all of them — one session
  turned up llms.txt missing a new route, the new page orphaned with zero
  internal links, and an import clash on `/services`, none visible alone.
- When a change promotes text out of JSON-LD into rendered HTML, re-audit that
  text for sourcing first. Claims no reader could see become public statements —
  a stale "180 million ChatGPT users" figure rode a Radix accordion fix onto a
  money page that sells GEO expertise.
- Don't trust a green `bun run typecheck` after switching branches: stale
  `.next/types` for routes that don't exist on the new branch fail the build with
  phantom `TS2307`s. `rm -rf .next out tsconfig.tsbuildinfo` first — the same
  clear the build already needs to avoid silently emitting no CSS.
- Chrome records **no FCP at all** for content that first paints at `opacity: 0`
  and is revealed by a compositor-driven opacity animation — the reveal never
  produces a main-thread *contentful* paint. Moving the `opacity: 0` from the
  element into the keyframes' `from` state does not help; only making the
  content contentful on its first paint does. Animating `transform` alone keeps
  the motion without the cost.
- Verify a ticket's *proposed fix* against its own acceptance criterion before
  building it. #38 specified "move `opacity: 0` into the keyframes"; patching
  the built CSS and re-measuring took ~2 minutes and showed that fix still
  returns `NO_FCP`. Patch `out/_next/static/css/*.css` in a copy of the build
  directory to test a CSS hypothesis without a 2-minute rebuild.
- A screenshot diff needs a same-build control. Infinite animations (`.line-anim`
  drop sweep) make byte-identical captures impossible, so "differs" is
  meaningless alone — main-vs-main noise was 0.005-0.083% of pixels, *larger*
  than the 0.006-0.040% main-vs-branch signal.
- `aiwebhub.io` 308-redirects to `www.aiwebhub.io`. A fetcher that doesn't follow
  redirects gets the string `Redirecting...`, not XML — that is what made
  `/sitemap.xml` look unparseable in the technical audit. Use `curl -L` and the
  `www` host; it is the canonical one.
- Localhost hides `NO_FCP` inconsistently: with zero latency the CSS lands with
  the HTML so nothing contentful ever paints, while over a real network the
  brief unstyled render can fire FCP by itself. Measure animation-related paint
  metrics against production *and* a local build before concluding either way.
- Local static-serve LCP is pessimistic. `bunx serve out` measured the homepage
  at LCP 3.0 s mobile; the same commit on Vercel measured 1.5 s, because the
  local server reproduces neither the CDN's compression nor HTTP/2. When a
  ticket's criterion is a *threshold*, quote the production number.
- A ticket's stated access/setup facts are claims, not state. #21 said "Search
  Console is already verified via DNS TXT (2026-03-04) — no setup needed"; there
  was no `google-site-verification` TXT on the domain at all. Verify prerequisites
  before handing a human a click-list that assumes them.
- Third-party rank data is not a baseline. DataForSEO reported aiwebhub.io ranking
  for *zero* keywords, and the whole map was framed as a "true zero baseline";
  Search Console showed **40 impressions at average position 10.3**. Rank trackers
  only report keywords in their own database — GSC reports what Google served.
  Where they disagree, GSC is ground truth.
- No `dig` on this WSL box. Query DNS over HTTPS:
  `curl -s -H 'accept: application/dns-json' "https://dns.google/resolve?name=D&type=TXT"`.
  Use Google's resolver to predict what Search Console sees — Cloudflare's cache
  can lag a new record by 10+ minutes and produce a false "not propagated".
- DNS for aiwebhub.io is at **Hostinger** (`ns1/ns2.dns-parking.com`), not Vercel.
  Records are edited in hPanel → Domains → DNS Zone.
- `while read` over a file with no trailing newline silently drops the last line.
  A 26-URL sweep reported `PASS=25 FAIL=0` and looked clean. Check the input's
  line count against the expected count before trusting a sweep's total.
- Audit the *result* of a cleanup, not just the fix. Excluding `og/*.png` from the
  image pipeline removed 51 dead derivatives; diffing the derivatives on disk
  against every `/_opt/*.webp` referenced in built HTML then found 4 more from the
  same cause (`logo/logo.png`, `thumbnails/logo-thumbnail.png` — consumed as
  absolute URLs in JSON-LD/metadata, never through `<Picture>`). The invariant
  worth asserting is 1:1 generated-to-requested, not "the known offender is gone".
- Group build rules by how a file is *consumed*, not where it lives.
  `logo/logo.png` is metadata-only but `logo/AiWebHubLogo.jpg` renders through
  `<Picture>` — a `logo/` prefix exclusion would have silently broken /about.
