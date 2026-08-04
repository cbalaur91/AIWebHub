"use client"

// PROTOTYPE — issue #12. Variant A: "The Receipts."
//
// Thesis: our only honest advantage over hogtheweb.com is four real Metro
// Detroit clients with live URLs. So proof is not a section two-thirds down the
// page — it IS the page. Shortest of the three (~1,400 words). The bet is that
// a verifiable page beats a padded one, and that 3,686 words is hogtheweb's
// habit rather than the SERP's requirement.

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import type { LocationPageData } from '@/lib/prototype-location-data'

const services = [
  'Custom business websites',
  'Landing pages and campaign sites',
  'Online booking and scheduling integration',
  'E-commerce and payments',
  'Website redesigns and rebuilds',
  'AI chat and automation add-ons',
]

const steps = [
  { title: 'A call', body: 'Thirty minutes on what the business does and what the site has to accomplish.' },
  { title: 'A quote', body: 'A written scope and a fixed project price. No tier list, no hourly surprise.' },
  { title: 'A build', body: 'Design and build in the open, with a live preview link from the first week.' },
  { title: 'A handover', body: 'You own the site, the domain and the analytics. Ongoing support is optional.' },
]

export const VariantA = ({ data }: { data: LocationPageData }) => {
  const countyLine = data.counties.map((c) => c.name).join(' · ')

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pb-24">
      {/* Hero — deliberately compact. It hands off to the proof fast. */}
      <section className="relative z-10 mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 px-6 py-10 sm:p-12 backdrop-blur animate-scaleIn">
        <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {data.city}, {data.state} <span className="text-zinc-700">/</span> {countyLine}
        </div>
        <h1 className="mt-4 max-w-[20ch] text-[44px] sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tighter text-zinc-100">
          {data.h1}
        </h1>
        <p className="mt-6 max-w-[62ch] text-sm sm:text-base leading-relaxed text-zinc-400">
          {data.intro}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <GradientButton href="/contact" variant="primary">
            Start a project
          </GradientButton>
          <GradientButton href="#work" variant="secondary">
            <span className="flex items-center gap-2">
              See the work
              <ArrowRight className="h-4 w-4" />
            </span>
          </GradientButton>
        </div>
      </section>

      {/* THE PAGE'S CENTRE OF GRAVITY */}
      <section id="work" className="mt-16 sm:mt-24 scroll-mt-24">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
            Sites we built near {data.city}
          </h2>
          <span aria-hidden="true" className="hidden sm:block h-10 w-px bg-white/10" />
          <span className="hidden sm:block text-sm text-zinc-400">all live, all openable</span>
        </div>
        <div className="mt-4 h-px bg-white/10" />

        {data.clients.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.clients.map((client) => (
              <article
                key={client.slug}
                className="rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 p-6 sm:p-8 hover-lift"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {client.city}, MI <span className="text-zinc-700">/</span> {client.county}
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                  {client.name}
                </h3>
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

        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-zinc-500">
          We do not publish a star rating or a review count. What we publish is the address of every
          site we have shipped, so you can check the load speed, the mobile layout and the booking
          flow yourself before you spend anything.
        </p>
      </section>

      {/* What we build */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          What we build
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <li
              key={service}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
              <span className="text-sm text-zinc-300">{service}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-zinc-400">
          Everything is built on Next.js, React and TypeScript and deployed as static files to a
          global CDN. That is not a stack preference for its own sake — it is why the sites above
          load the way they do on a phone on a bad connection in a parking lot, which is where most
          people will first meet your business.
        </p>
      </section>

      {/* How it works */}
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

      {/* Service area — one line, not a map embed */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10">
        <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Service area</div>
        <p className="mt-3 max-w-[80ch] text-sm sm:text-base leading-relaxed text-zinc-300">
          {data.counties.map((c) => `${c.name} — ${c.places.join(', ')}`).join('. ')}. Meetings
          happen at your place or on a call; there is no storefront to visit.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          Questions we get asked
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <div className="mt-8 divide-y divide-white/10">
          {data.faqs.slice(0, 5).map((faq) => (
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
          Open one of those sites first
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-sm sm:text-base text-zinc-400">
          Then, if the work holds up, tell us what you need. We will come back with a scope and a
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
