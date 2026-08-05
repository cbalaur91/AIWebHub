# Wayfinder #13 — Design the website cost calculator

Map: [Make aiwebhub.io visible: foundation + Michigan local beachhead](https://github.com/cbalaur91/AIWebHub/issues/6)
Ticket: [Design the website cost calculator](https://github.com/cbalaur91/AIWebHub/issues/13) (`wayfinder:prototype`, claimed)

Session shape agreed with owner: **cited third-party sources** for the numbers,
**one design iterated live** (not three variants as in #12).

## Plan

1. [ ] Research citable 2025–26 web-design cost sources → verify: every range in the
       prototype traces to a real, openable URL I have fetched; no invented figures
2. [ ] Record sources + derived ranges in `SEO/research/website-cost-ranges.md`
       → verify: file lists source, date, methodology, and the range it supports
3. [ ] Build the prototype on `prototype/website-cost-calculator` at
       `/prototype/cost-calculator` → verify: `bun run typecheck` clean, renders,
       no email gate, no AIWebHub prices in output
4. [ ] Owner reacts; iterate live until the six ticket decisions are settled
       → verify: input set, output shape, sourcing, wrapping content, share
       mechanism and CTA each have a stated answer
5. [ ] Resolve #13 — resolution comment, close, append to map Decisions-so-far
       → verify: `gh issue view 13` closed with comment; #17 unblocked
6. [ ] Rebuild the map body (#6 is empty — no Destination/Notes/Decisions)
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

_(filled in on resolution)_
