"use client"

// PROTOTYPE — issue #12. Variant B: "The Answer Page."
//
// Thesis: hogtheweb ranks because it answers a buyer's whole question list on
// one page — and it gates the answer behind an email. We out-answer it AND
// ungate it. The estimator sits above the fold with no email field, and the
// body of the page is genuine long-form answers rather than section padding.
// Longest of the three (~2,800 words). The bet is that depth wins the SERP but
// only if the depth is answers.
//
// The estimator here is a ROUGH STUB of what issues #13/#17 will design
// properly. Ranges are general Michigan market ranges, never AIWebHub prices.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Lock, Unlock } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import type { LocationPageData } from '@/lib/prototype-location-data'

const projectTypes = [
  { key: 'new', label: 'New website', factor: 1 },
  { key: 'redesign', label: 'Redesign of an existing site', factor: 0.85 },
  { key: 'store', label: 'Online store', factor: 1.6 },
] as const

const sizes = [
  { key: 'one', label: 'One page', low: 1200, high: 3000 },
  { key: 'small', label: '2–5 pages', low: 2500, high: 7000 },
  { key: 'medium', label: '6–15 pages', low: 6000, high: 16000 },
  { key: 'large', label: '15+ pages', low: 14000, high: 40000 },
] as const

const money = (n: number) => `$${(Math.round(n / 100) * 100).toLocaleString('en-US')}`

/** Long-form answers. These ARE the page body, not a footer accordion. */
const answers = [
  {
    q: 'What does a website actually cost in Detroit?',
    a: [
      'The honest answer is that "website" describes things that differ in cost by a factor of thirty, so any single number you see quoted is marketing rather than information. A one-page site for a contractor who needs a phone number, a service list and a map is a different product from a fifteen-page site for a multi-location clinic with online booking and insurance forms.',
      'What we can tell you is the shape of the Michigan market. Small-business sites in the Detroit metro generally start in the low four figures for a single well-built page and run into the mid five figures for a large custom build with integrations. Agencies in the region cluster within that band; the spread inside it comes down to how much of the work is design, how much is content production, and how much is systems that have to talk to each other.',
      'AIWebHub quotes per project after a call rather than publishing tiers, because a tier list forces your business into whichever box is closest and then charges you for the gap. The estimator above is there so you can walk into that call already knowing roughly which end of the market you are shopping in.',
    ],
  },
  {
    q: 'Why will nobody give me a price on their website?',
    a: [
      'Two reasons, and only one of them is defensible. The defensible one is that scope genuinely drives cost, and a fixed public price forces an agency to pad it enough to survive the worst-case project — which means the straightforward projects subsidise the messy ones.',
      'The other reason is lead capture. An estimator that makes you answer five questions and then asks where to send the result has not estimated anything for you; it has collected you. If a tool needs your email before it will show you a number it already calculated, the number was never the point.',
      'The calculator on this page returns its range on screen, immediately, with no email field anywhere in it.',
    ],
  },
  {
    q: 'How long does a build take?',
    a: [
      'A focused landing page is usually two to three weeks from kickoff. A multi-page business site with a service menu, gallery and booking integration is typically four to eight weeks. An online store depends almost entirely on how clean the product data is.',
      'The variable that moves the date most is not code, it is content. Projects wait on copy, photography and the one person who has the logo file far more often than they wait on development. If you want a site live by a specific date, the useful question to ask an agency is what they need from you and when — not how fast they type.',
    ],
  },
  {
    q: 'What is actually included?',
    a: [
      'Design and build, responsive down to phones, with the technical SEO groundwork in place from the start: unique titles and descriptions, canonical URLs, structured data, an XML sitemap, and Core Web Vitals that pass rather than nearly pass. Analytics, a contact or inquiry flow, and a handover so you own the domain, the hosting account and the data.',
      'Not included by default, and priced separately when you want them: copywriting, professional photography, ongoing content, paid ads, and monthly SEO retainers. Being specific about that boundary up front is cheaper for both sides than discovering it in week six.',
    ],
  },
  {
    q: 'Do I need to be in Detroit to work with you?',
    a: [
      'No, and neither do we need to be. AIWebHub works across Metro Detroit — Wayne, Oakland and Macomb counties — plus clients further afield in Chicago and elsewhere. There is no storefront; meetings happen at your place or on a call.',
      'It is worth knowing that several web design companies ranking for "Detroit web design" are not in Detroit either. Some are several hours away. That is not disqualifying, but if local familiarity matters to you, ask any agency to name a business near you they have built for, and then open that site.',
    ],
  },
  {
    q: 'What do you build sites with, and does it matter?',
    a: [
      'Next.js, React and TypeScript, deployed as static files to a global CDN. It matters for one reason a customer can feel: speed. A site that renders in a fraction of a second on a phone holds people who would have left a site that takes four.',
      'It also matters for what happens later. A statically built site has a much smaller surface for things to break on, no plugin stack to keep patched, and no monthly platform fee quietly compounding. The trade is that changes go through a developer rather than a page builder, which suits some businesses and not others. We will tell you honestly which one you are.',
    ],
  },
  {
    q: 'Will my site rank on Google?',
    a: [
      'Every site ships with the technical groundwork done properly, which is the floor rather than a guarantee. Ranking in Detroit for a competitive commercial term also depends on a verified Google Business Profile, consistent listings across directories, and content that answers what people actually search — work that continues after launch.',
      'Any agency that promises a position is either guessing or quoting you a term nobody searches for. Ask instead what they will do, what they will measure, and when they will show you.',
    ],
  },
]

export const VariantB = ({ data }: { data: LocationPageData }) => {
  const [type, setType] = useState<(typeof projectTypes)[number]>(projectTypes[0])
  const [size, setSize] = useState<(typeof sizes)[number]>(sizes[1])

  const low = size.low * type.factor
  const high = size.high * type.factor

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pb-24">
      {/* Hero + the ungated estimator, side by side */}
      <section className="relative z-10 mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 px-6 py-10 sm:p-12 backdrop-blur animate-scaleIn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {data.city}, {data.state}
            </div>
            <h1 className="mt-4 text-[44px] sm:text-6xl font-light leading-[1.05] tracking-tighter text-zinc-100">
              Web design in {data.city}, priced in the open
            </h1>
            <p className="mt-6 max-w-[56ch] text-sm sm:text-base leading-relaxed text-zinc-400">
              Most agency sites make you hand over an email before they will show you a number. This
              one does not. Set the two things that actually drive cost and read the market range on
              screen — then decide whether it is worth a call.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <GradientButton href="/contact" variant="primary">
                Get a fixed quote
              </GradientButton>
              <GradientButton href="#answers" variant="secondary">
                <span className="flex items-center gap-2">
                  Read the straight answers
                  <ArrowRight className="h-4 w-4" />
                </span>
              </GradientButton>
            </div>
          </div>

          {/* The estimator */}
          <div className="lg:col-span-6 w-full rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-emerald-400/80">
              <Unlock className="h-3.5 w-3.5" />
              No email required
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm text-zinc-300">What kind of project?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setType(t)}
                    aria-pressed={t.key === type.key}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      t.key === type.key
                        ? 'border-white/40 bg-white/10 text-white'
                        : 'border-white/10 bg-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm text-zinc-300">How many pages?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSize(s)}
                    aria-pressed={s.key === size.key}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      s.key === size.key
                        ? 'border-white/40 bg-white/10 text-white'
                        : 'border-white/10 bg-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Typical Michigan market range
              </div>
              <div className="mt-2 text-4xl sm:text-5xl font-light tracking-tighter text-white tabular-nums">
                {money(low)} – {money(high)}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                General market ranges for small-business web design in Michigan, not an AIWebHub
                price. What you pay depends on scope, content readiness and integrations. We quote
                each project after a short call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Q&A spine — this is the body of the page */}
      <section id="answers" className="mt-16 sm:mt-24 scroll-mt-24">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
            The straight answers
          </h2>
          <span aria-hidden="true" className="hidden sm:block h-10 w-px bg-white/10" />
          <span className="hidden sm:block text-sm text-zinc-400">no form in the way</span>
        </div>
        <div className="mt-4 h-px bg-white/10" />

        <div className="mt-10 flex flex-col gap-14">
          {answers.map((item) => (
            <article key={item.q} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10">
              <h3 className="lg:col-span-5 text-2xl sm:text-3xl font-light leading-tight tracking-tight text-zinc-100">
                {item.q}
              </h3>
              <div className="lg:col-span-7 flex flex-col gap-4">
                {item.a.map((para, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed text-zinc-400">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gated-competitor contrast — the differentiator, stated once */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <Lock className="h-3.5 w-3.5" />
              The usual estimator
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Five questions about your project, then a sixth asking where to send the estimate. The
              number exists the moment you answer question five. You get it once you are a lead.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-emerald-400/80">
              <Unlock className="h-3.5 w-3.5" />
              This one
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Two questions, answered on screen, no email field. If the range is wrong for you, you
              have lost thirty seconds instead of joining a follow-up sequence.
            </p>
          </div>
        </div>
      </section>

      {/* Proof — present but compact; the answers carry this variant */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          Work near {data.city}
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        {data.clients.length > 0 ? (
          <ul className="mt-8 divide-y divide-white/10">
            {data.clients.map((client) => (
              <li
                key={client.slug}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
              >
                <div className="sm:w-64 shrink-0">
                  <div className="text-base font-medium text-zinc-100">{client.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {client.city}, MI
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{client.work}</p>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Visit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-[70ch] text-sm sm:text-base leading-relaxed text-zinc-300">
            {data.proofFallback}
          </p>
        )}
        <Link
          href="/portfolio"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors"
        >
          Open the full portfolio
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* CTA */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tighter text-zinc-100">
          Now the specific number
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-sm sm:text-base text-zinc-400">
          The range above is the market. A call turns it into a written scope and a fixed price for
          your project.
        </p>
        <div className="flex justify-center">
          <GradientButton href="/contact" variant="primary">
            Get a fixed quote
          </GradientButton>
        </div>
      </section>
    </div>
  )
}
