import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { detroit } from '@/lib/location-data'
import { pageMetadata, abs, SITE_URL } from '@/lib/site'

// Server component — under `output: 'export'` a page-level `useSearchParams`
// (or any page-level client hook) renders zero server HTML, which is fatal for
// an SEO page (learned on #12). Every word below is server-rendered; the only
// client code on this page is the GradientButton leaf.

export const metadata = pageMetadata({
  title: 'Web Design Detroit — Four Live Metro Detroit Client Sites',
  description:
    'Web design for Metro Detroit businesses. Four live client sites in Warren, Utica and Rochester Hills — open them and judge the work before you call us.',
  path: '/web-design-detroit',
})

const services = [
  'Custom business websites',
  'Landing pages and campaign sites',
  'Online booking and scheduling integration',
  'E-commerce and payments',
  'Website redesigns and rebuilds',
  'AI chat and automation add-ons',
]

const steps = [
  {
    title: 'A call',
    body: 'Thirty minutes on what the business does, who it serves and what the site has to accomplish. No slide deck.',
  },
  {
    title: 'A quote',
    body: 'A written scope and a fixed project price for your project — not a tier list. You know exactly what is included before anything starts.',
  },
  {
    title: 'A build',
    body: 'Design and build in the open, with a live preview link from the first week, so you watch the site take shape and correct course early.',
  },
  {
    title: 'A handover',
    body: 'You own the site, the domain and the analytics. Ongoing support is optional, month to month, and cancellable with 30 days notice.',
  },
]

// LocalBusiness ships exactly the fields decided on the structured-data ticket
// (#10): name, telephone, email, url, areaServed — and nothing else. No
// address, no geo: none is published anywhere, and adding one here would be a
// regression against the map's standing constraints.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AIWebHub',
  telephone: '+1-734-341-6746',
  email: 'info@aiwebhub.io',
  url: SITE_URL,
  areaServed: ['Wayne County, MI', 'Oakland County, MI', 'Macomb County, MI'],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Web Design Detroit — Four Live Metro Detroit Client Sites',
  description:
    'Web design for Metro Detroit businesses, with four live client sites in Warren, Utica and Rochester Hills linked for inspection.',
  url: abs('/web-design-detroit'),
  datePublished: '2026-08-05',
  dateModified: '2026-08-05',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Web Design Detroit', item: abs('/web-design-detroit') },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: detroit.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function WebDesignDetroitPage() {
  const countyLine = detroit.counties.map((c) => c.name).join(' · ')

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero — deliberately compact. It hands off to the proof fast. */}
      <section className="relative z-10 mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 px-6 py-10 sm:p-12 backdrop-blur animate-enterScale">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {detroit.city}, {detroit.state} <span className="text-zinc-700">/</span> {countyLine}
        </p>
        <h1 className="mt-4 max-w-[20ch] text-[44px] sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tighter text-zinc-100">
          {detroit.h1}
        </h1>
        <p className="mt-6 max-w-[62ch] text-sm sm:text-base leading-relaxed text-zinc-400">
          {detroit.intro}
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

      {/* THE PAGE'S CENTRE OF GRAVITY — four real Metro Detroit clients. */}
      <section id="work" className="mt-16 sm:mt-24 scroll-mt-24">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
            Web design work near Detroit
          </h2>
          <span aria-hidden="true" className="hidden sm:block h-10 w-px bg-white/10" />
          <span className="hidden sm:block text-sm text-zinc-400">all live, all openable</span>
        </div>
        <div className="mt-4 h-px bg-white/10" />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {detroit.clients.map((client) => (
            <article
              key={client.slug}
              className="rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 p-6 sm:p-8 hover-lift"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {client.city}, MI <span className="text-zinc-700">/</span> {client.county}
              </p>
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

        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-zinc-500">
          We do not publish a star rating or a review count. What we publish is the address of every
          site we have shipped, so you can check the load speed, the mobile layout and the booking
          flow yourself before you spend anything. Each card above links two ways: to the full case
          study on our portfolio, which walks through the challenge, the approach and the build, and
          to the client&apos;s live site, which is the part no agency can fake.
        </p>
      </section>

      {/* What we build */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          What we build for Metro Detroit businesses
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
        <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-zinc-400">
          Every build also ships with the search groundwork already done: clean titles and
          descriptions, canonical URLs, structured data and a sitemap, so Google and the AI answer
          engines can read the site the day it launches. Where a project calls for it, we add AI on
          top — a chat assistant trained on your services, quote-request automation — as an add-on
          to a fast site, never a substitute for one. The full service list lives on our services
          page, and the complete portfolio, including work beyond Michigan, is at aiwebhub.io/portfolio.
        </p>
      </section>

      {/* How a project runs */}
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
        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-zinc-400">
          The quote is the part worth pausing on. We do not publish a price list, because a tier
          list is priced for an average business and yours is not average — a salon that needs
          online booking and a granite fabricator that needs a photo-heavy portfolio are different
          projects even at the same page count. So the number you get is scoped to what you
          actually need, in writing, before any work begins, and it does not move unless the scope
          does. Ongoing support after launch works the same way: optional, scoped, and cancellable,
          never a contract you are stuck inside.
        </p>
      </section>

      {/* Service area — prose, not a map embed. */}
      <section className="mt-16 sm:mt-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Service area</p>
        <p className="mt-3 max-w-[80ch] text-sm sm:text-base leading-relaxed text-zinc-300">
          {detroit.counties
            .map((county) => `${county.name} — ${county.places.join(', ')}`)
            .join('. ')}
          . Meetings happen at your place of business or on a call; there is no storefront to
          visit. If your suburb is not named here — Ferndale, Madison Heights, Roseville, St. Clair
          Shores — the county is what matters: we work anywhere in the tri-county area without a
          travel surcharge or a different process.
        </p>
        {/* Definition passage for AI citability — the geo-scoped counterpart of
            the homepage passage in components/Hero.tsx. */}
        <p className="mt-6 max-w-[80ch] text-sm leading-relaxed text-zinc-400">
          AIWebHub is a Michigan web design and AI integration studio serving small businesses
          across Metro Detroit — Wayne, Oakland and Macomb counties. The studio builds custom
          websites, landing pages, e-commerce stores and booking-driven business sites with
          Next.js, React and TypeScript, deployed as static files to a global CDN for speed.
          Founded in 2024, AIWebHub has shipped live sites for an event venue in Warren, a salon
          in Utica, and a wellness spa and a cultural festival in Rochester Hills, alongside work
          in Chicago and beyond. Every project is scoped individually and quoted with a clear
          breakdown, and every site ships with SEO fundamentals — clean metadata, structured data,
          a sitemap and fast Core Web Vitals — built in from the start.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-100">
          Detroit web design questions, answered
        </h2>
        <div className="mt-4 h-px bg-white/10" />
        <div className="mt-8 divide-y divide-white/10">
          {detroit.faqs.map((faq) => (
            <div key={faq.q} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8">
              <h3 className="lg:col-span-4 text-base font-medium text-zinc-100">{faq.q}</h3>
              <div className="lg:col-span-8">
                <p className="text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                {faq.link && (
                  <Link
                    href={faq.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors"
                  >
                    {faq.link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
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
          Then, if the work holds up, tell us what you need. We will come back with a written scope
          and a fixed project price.
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
