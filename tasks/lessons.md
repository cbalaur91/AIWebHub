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
