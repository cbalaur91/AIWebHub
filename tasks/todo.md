# Wayfinder #17 — Build and ship /tools/website-cost-calculator

Map: [Make aiwebhub.io visible: foundation + Michigan local beachhead](https://github.com/cbalaur91/AIWebHub/issues/6)
Ticket: [Build and ship /tools/website-cost-calculator](https://github.com/cbalaur91/AIWebHub/issues/17) (`wayfinder:task`)

Implements the design settled in #13 (two labelled survey bands, no submit
button, no email gate). `lib/cost-calculator-data.ts`, `components/CostCalculator.tsx`
and `SEO/research/website-cost-ranges.md` carry over from the prototype branch.

## Plan

1. [x] Branch `feat/website-cost-calculator` off the prototype branch
       → verify: carried-over files present, tree clean
2. [x] One more BLS attempt (#13 carried it forward: a `.gov` citation is the
       strongest E-E-A-T signal available) → verify: figure traces to a fetched
       bls.gov page, or the failure is recorded and BLS stays uncited
3. [x] Build `app/tools/website-cost-calculator/page.tsx` as a server component:
       `pageMetadata()` self-canonical, article body deepened to ~1,400–1,800
       words, FAQ section, JSON-LD (`WebPage` + `FAQPage` + `BreadcrumbList`)
       → verify: every figure traces to `SEO/research/website-cost-ranges.md`;
       zero AIWebHub prices; no price fields in schema
4. [x] Remove the throwaway `app/prototype/` route → verify: no references remain
5. [x] Add the route to `app/sitemap.ts` → verify: URL present in built sitemap.xml
6. [x] Verify build: `bun run typecheck` clean; `bun run build` static; built
       `out/` HTML carries self-canonical, 1,400–1,800 words, all citations and
       schema without JS; no email input anywhere on the page
7. [ ] Commit, push, open PR to main, resolution comment on #17

## Review

Built `/tools/website-cost-calculator` from the #13 prototype. What changed
against the prototype: real route with `pageMetadata()` self-canonical; article
deepened from 758 to **1,778 rendered words** (target 1,400–1,800) with two new
sections — "How agencies actually price the work" (budget split by phase, 63%
market concentration, 100–200% TCO warning) and "The numbers we refused to use"
(Clutch untraceable, aggregator circle, BLS blocked) — plus a 6-question FAQ
rendered as always-visible prose so every answer ships in the static HTML.

Decisions made here:
- **Ongoing-cost chart stays** (#13 flagged it for revisit): it answers a real
  input, and the not-apples-to-apples caveat renders beside it.
- **BLS retried and still blocked** (403 to WebFetch and to curl with a full
  browser UA). Remains uncited; the page says so instead.
- **FAQ is prose, not an accordion** — Radix unmounts closed content, which
  would strip the answers from the prerendered HTML.

Verified in `out/`: typecheck clean · route `○ (Static)` 5.8 kB · self-canonical
correct · 1,778 words · WebPage + BreadcrumbList + FAQPage schema with **zero
price/offer keys** (checked recursively) · 6 citations to each survey without
JS · every "email" occurrence is the phrase "no email gate" — no input exists ·
sitemap entry present in built sitemap.xml.

## Constraints carried in

- `output: 'export'` — fully client-side, no server route
- No AIWebHub prices anywhere, incl. structured data (locked June 2026 spec)
- No email gate — structurally impossible (no submit step); keep it that way
- Page is a server component; interactivity stays in the client leaf
- If a number is not in `SEO/research/website-cost-ranges.md`, it does not render
- Do not cite Clutch or agency-blog aggregators (rejected in #13)
