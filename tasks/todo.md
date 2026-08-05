# Wayfinder #13 — Design the website cost calculator

Map: [Make aiwebhub.io visible: foundation + Michigan local beachhead](https://github.com/cbalaur91/AIWebHub/issues/6)
Ticket: [Design the website cost calculator](https://github.com/cbalaur91/AIWebHub/issues/13) (`wayfinder:prototype`, claimed)

Session shape agreed with owner: **cited third-party sources** for the numbers,
**one design iterated live** (not three variants as in #12).

## Plan

1. [x] Research citable 2025–26 web-design cost sources → verify: every range in the
       prototype traces to a real, openable URL I have fetched; no invented figures
2. [x] Record sources + derived ranges in `SEO/research/website-cost-ranges.md`
       → verify: file lists source, date, methodology, and the range it supports
3. [x] Build the prototype on `prototype/website-cost-calculator` at
       `/prototype/cost-calculator` → verify: `bun run typecheck` clean, renders,
       no email gate, no AIWebHub prices in output
4. [x] Owner reacts; iterate live until the six ticket decisions are settled
       → verify: input set, output shape, sourcing, wrapping content, share
       mechanism and CTA each have a stated answer
5. [x] Resolve #13 — resolution comment, close, append to map Decisions-so-far
       → verify: `gh issue view 13` closed with comment; #17 unblocked
6. [x] Rebuild the map body (#6 is empty — no Destination/Notes/Decisions)
       → verify: `gh api repos/:owner/:repo/issues/6 --jq .body` non-null and
       indexes all 7 closed tickets

## Constraints carried in

- `output: 'export'` — fully client-side, no server route, no API
- No AIWebHub prices anywhere, incl. structured data (locked June 2026 pricing-to-quote spec)
- No email gate — the sole differentiator over hogtheweb's estimator
- Page must be a **server component**; interactive parts in leaf client components
  (learned on #12: `useSearchParams` at page level renders zero server HTML under export)
- Absolute search volumes in the SEO reports are distorted — rank-order signals only (#9)
- `/frontend-design` mandatory for UI per CLAUDE.md

## Review

**#13 resolved and closed; #17 unblocked.** Design approved by the owner: two
labelled survey bands that disagree, never one averaged number.

What shipped to the branch (all of it carries into #17 except the route wrapper):

- `SEO/research/website-cost-ranges.md` — GoodFirms 2026 and WebFX 2026 with
  methodology and caveats, plus an explicit rejected-sources list (Clutch's
  widely-quoted "61% under $10,000" could not be traced to a primary page)
- `lib/cost-calculator-data.ts` — typed bands, each carrying the survey row it
  came from so the mapping is auditable on the page itself
- `components/CostCalculator.tsx` — client leaf; server page wraps it
- `app/prototype/cost-calculator/page.tsx` — throwaway, noindex, not in sitemap

Verified: `bun run typecheck` clean · `bun run build` succeeds, route emits
`○ (Static)` at 5.8 kB · **static HTML carries 758 words with every number and
citation present without JS** · no email gate · no AIWebHub prices.

Two weak spots recorded on the ticket rather than buried: the ongoing-cost chart
is not apples-to-apples, and BLS wage data could not be verified (403) so it was
deliberately not cited. Both handed to #17.

**Also fixed:** the map body (#6) was empty — created with no Destination, Notes
or Decisions, so every session had been re-deriving context from closed tickets.
Reconstructed from the closed resolutions and marked as reconstructed.
