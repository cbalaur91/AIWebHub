import Link from 'next/link'
import { ArrowRight, Check, SlidersHorizontal } from 'lucide-react'

/**
 * What refills the hole the four pricing cards left on `/services`.
 *
 * The cards answered two buyer questions — "what do I get?" and "what will it
 * cost?" — and the move to quote-only pricing removed both answers at once.
 * This section gives the first one back as a floor every build meets, and the
 * second one back as the variables that move a scope, with the numbers handed
 * off to `/tools/website-cost-calculator`. No prices, no tiers, no packages.
 *
 * Server component: no hooks, no client JS.
 */

const inclusions = [
  {
    title: 'A mobile-first build',
    body: 'Designed for the phone before the desktop, because that is where most people meet a small business for the first time.',
  },
  {
    title: 'Next.js, React and TypeScript',
    body: 'Deployed as static files to a global CDN. That is why the sites in our portfolio open the way they do on a bad connection.',
  },
  {
    title: 'Search groundwork, done at launch',
    body: 'Titles and descriptions, canonical URLs, structured data and an XML sitemap, so search engines and AI answer engines can read the site the day it ships.',
  },
  {
    title: 'Accessible components',
    body: 'Built on Radix primitives, so keyboard and screen-reader behavior is handled in the components rather than bolted on afterwards.',
  },
  {
    title: 'Inquiry forms in the page flow',
    body: 'Contact and quote forms sit where the reader already is, instead of waiting on a separate page they have to go find.',
  },
  {
    title: 'A handover you own',
    body: 'The site, the domain and the analytics are yours at launch. Hosting, updates, backups, monitoring and content changes are an optional monthly plan, cancellable with 30 days notice.',
  },
]

const drivers = [
  {
    title: 'How many pages',
    body: 'A single landing page and a multi-page business site are different projects before anything else is decided. Page count is the clearest lever there is.',
  },
  {
    title: 'Whether you sell online',
    body: 'A catalog, payments, inventory and POS synchronization each add build and test time on top of the pages themselves.',
  },
  {
    title: 'Whether the site books time',
    body: 'A scheduling integration is the difference between a form and a live calendar. Salinair takes real appointments through Arketa from its own site.',
  },
  {
    title: 'Whether AI is in scope',
    body: 'A chat assistant trained on your services, a custom agent that handles multi-step tasks, or automation between tools you already run.',
  },
  {
    title: 'Who writes the copy and takes the photos',
    body: 'Content that is ready before design starts is the cheapest thing you can bring to a project, and the most common reason one runs long.',
  },
  {
    title: 'Custom design or an adapted template',
    body: 'How much of the interface is drawn for you rather than adapted from something that already exists.',
  },
  {
    title: 'Whether it is a rebuild',
    body: 'Replacing a live site means URLs, redirects and existing content to carry across so the search rankings you have already earned survive the move.',
  },
]

export const ScopeSection = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Soft radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute left-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">Scope</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">what you get, and what moves it</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="relative mt-8 sm:mt-10">
        <h2 className="text-[36px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[20ch] animate-fadeInUp animation-delay-200">
          What you get, and what changes the scope
        </h2>
        <p className="mt-6 max-w-[72ch] text-sm sm:text-base leading-relaxed text-zinc-400 animate-fadeInUp animation-delay-300">
          Without a price list, two questions go unanswered: what is actually included, and what
          makes one project cost more than another. Here are both. The first list is a floor — every
          build clears it, whatever the project turns out to be. The second is what we are really
          asking about on the first call.
        </p>

        <h3 className="mt-12 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          In every build
        </h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inclusions.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 hover-lift"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-zinc-100 tracking-tight">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          What moves the scope
        </h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 p-5 hover-lift"
            >
              <SlidersHorizontal
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-sm font-medium text-zinc-100 tracking-tight">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[72ch] text-sm leading-relaxed text-zinc-400">
          None of those has a fixed figure attached to it, which is why this page does not carry
          one. Two businesses can want the same six pages and need entirely different projects
          underneath them. We scope the build, put the number in writing, and it stays put unless
          the scope changes.
        </p>
        <p className="mt-4 max-w-[72ch] text-sm leading-relaxed text-zinc-400">
          If you would rather see a range before you talk to anyone, our cost calculator reports
          what two independent 2026 surveys — GoodFirms and WebFX — say a build like yours costs,
          and shows where the two disagree. It quotes the surveys, not us.
        </p>
        <Link
          href="/tools/website-cost-calculator"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors duration-200"
        >
          Open the cost calculator
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-10 max-w-[72ch] text-sm leading-relaxed text-zinc-400">
          We work with clients across the country, and a good share of them are within driving
          distance — Warren, Rochester Hills, Utica. If that is where you are, the Metro Detroit
          page covers what working with us locally looks like.
        </p>
        <Link
          href="/web-design-detroit"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors duration-200"
        >
          Web design in Metro Detroit
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
