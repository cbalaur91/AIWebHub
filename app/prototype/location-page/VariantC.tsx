"use client"

// PROTOTYPE — issue #12. Variant C: "The Local Authority."
//
// Thesis: the page at #3 for Ann Arbor is run from Traverse City on one
// template stamped across seven cities. The thing it cannot fake is being from
// here. So this variant leads with place: a typographic service-area grid as
// the signature element (NOT a Google Map embed — that is the templated answer
// and it costs bytes we have spent three tickets protecting), clients grouped
// by county, and the industry mix that is actually Metro Detroit small
// business. ~2,000 words.

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import type { LocationClient, LocationPageData } from '@/lib/prototype-location-data'

const steps = [
  { title: 'A call', body: 'Thirty minutes on the business, the customers and what the site has to do.' },
  { title: 'A quote', body: 'A written scope and a fixed project price before any work starts.' },
  { title: 'A build', body: 'A live preview link from week one, so you watch it take shape.' },
  { title: 'A handover', body: 'Domain, hosting and analytics in your name. Support afterwards is optional.' },
]

export const VariantC = ({ data }: { data: LocationPageData }) => {
  const byCounty = data.counties
    .map((county) => ({
      county: county.name,
      clients: data.clients.filter((c: LocationClient) => c.county === county.name),
    }))
    .filter((group) => group.clients.length > 0)

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pb-24">
      {/* Hero */}
      <section className="relative z-10 mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 px-6 py-10 sm:p-12 backdrop-blur animate-scaleIn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {data.metro}
            </div>
            <h1 className="mt-4 text-[44px] sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tighter text-zinc-100">
              {data.h1}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-[48ch] text-sm sm:text-base leading-relaxed text-zinc-400">
              {data.intro}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <GradientButton href="/contact" variant="primary">
                Start a project
              </GradientButton>
              <GradientButton href="#area" variant="secondary">
                <span className="flex items-center gap-2">
                  Where we work
                  <ArrowRight className="h-4 w-4" />
                </span>
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE: the service area as type, not as a map tile */}
      <section id="area" className="mt-16 sm:mt-24 scroll-mt-24">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
            Where we work
          </h2>
          <span aria-hidden="true" className="hidden sm:block h-10 w-px bg-white/10" />
          <span className="hidden sm:block text-sm text-zinc-400">
            {data.counties.length} counties
          </span>
        </div>
        <div className="mt-4 h-px bg-white/10" />

        <div className="mt-10 flex flex-col gap-10">
          {data.counties.map((county) => (
            <div key={county.name} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10">
              <h3 className="lg:col-span-4 text-2xl sm:text-4xl font-light tracking-tighter text-zinc-100">
                {county.name}
              </h3>
              <ul className="lg:col-span-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                {county.places.map((place, i) => (
                  <li key={place} className="flex items-baseline gap-3">
                    <span className="text-lg sm:text-2xl font-light tracking-tight text-zinc-400">
                      {place}
                    </span>
                    {i < county.places.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-700">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-zinc-500">
          AIWebHub is a service-area studio, not a storefront. We come to you or we meet on a call.
          Worth knowing when you compare: some of the companies ranking for {data.city} web design
          list an address hours from here.
        </p>
      </section>

      {/* Clients, grouped by county — the local claim, evidenced */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          Who we have built for, by county
        </h2>
        <div className="mt-4 h-px bg-white/10" />

        {byCounty.length > 0 ? (
          <div className="mt-10 flex flex-col gap-12">
            {byCounty.map((group) => (
              <div key={group.county}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {group.county}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.clients.map((client) => (
                    <article
                      key={client.slug}
                      className="rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 p-6 sm:p-7 hover-lift"
                    >
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                        {client.name}
                      </h3>
                      <div className="mt-1 text-sm text-zinc-500">{client.city}, Michigan</div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{client.work}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                        <Link
                          href={`/portfolio/${client.slug}`}
                          className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors"
                        >
                          Read the case study
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          Visit the site
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-zinc-800/60 bg-zinc-900/50 p-8">
            <p className="max-w-[62ch] text-sm sm:text-base leading-relaxed text-zinc-300">
              {data.proofFallback}
            </p>
            <Link
              href="/portfolio"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors"
            >
              Open the portfolio
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Industries — the local SMB mix, each claim carrying its evidence */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          The kinds of business we know
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <p className="mt-6 max-w-[70ch] text-sm sm:text-base leading-relaxed text-zinc-400">
          Every line below names the project that earns it. If a category is missing from this list,
          it is because we have not built one yet — which is a thing you are entitled to know before
          you hire anybody.
        </p>
        <div className="mt-8 divide-y divide-white/10">
          {data.industries.map((industry) => (
            <div
              key={industry.label}
              className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-10"
            >
              <h3 className="lg:col-span-5 text-lg sm:text-xl font-medium tracking-tight text-zinc-100">
                {industry.label}
              </h3>
              <p className="lg:col-span-7 text-sm leading-relaxed text-zinc-400">
                {industry.evidence}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          How a project runs
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost — linked, not embedded, in this variant */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tighter text-zinc-100">
              What a website costs around here
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-zinc-400">
              Small-business sites in this market run from the low four figures for a single page to
              the mid five figures for a large custom build. Our cost calculator breaks that down by
              project type and page count, on screen, with no email required.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <GradientButton href="/tools/website-cost-calculator" variant="secondary">
              <span className="flex items-center gap-2">
                Open the calculator
                <ArrowRight className="h-4 w-4" />
              </span>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          Questions we get asked
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <div className="mt-8 divide-y divide-white/10">
          {data.faqs.map((faq) => (
            <div key={faq.q} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8">
              <h3 className="lg:col-span-4 text-base font-medium text-zinc-100">{faq.q}</h3>
              <p className="lg:col-span-8 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tighter text-zinc-100">
          Build it with someone from here
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-sm sm:text-base text-zinc-400">
          Tell us what the business does and who it serves. We will come back with a scope and a
          fixed price.
        </p>
        <div className="flex justify-center">
          <GradientButton href="/contact" variant="primary">
            Get a quote
          </GradientButton>
        </div>
      </section>
    </div>
  )
}
