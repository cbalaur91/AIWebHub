# Lessons

- Before calling a UI state mismatch a bug, re-screenshot with
  `--virtual-time-budget=4000`: headless Chromium captures mid-CSS-transition and
  will show stale colours next to fresh text, which looks exactly like a state bug.
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
