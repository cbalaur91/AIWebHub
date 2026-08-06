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
