import { CostCalculator, CostDrivers, QuoteCta } from '@/components/CostCalculator'
import { SOURCES } from '@/lib/cost-calculator-data'
import { pageMetadata, abs, SITE_URL } from '@/lib/site'

// Server component wrapping a client leaf — under `output: 'export'` a
// page-level `useSearchParams` renders zero server HTML (learned on #12), so
// every word, figure and citation below must live here, not in the calculator.

export const metadata = pageMetadata({
  title: 'Website Cost Calculator 2026 — What a Website Actually Costs',
  description:
    'Free website cost calculator with no email gate. Compare what agencies quote against what US buyers report paying, from two cited 2026 surveys — build cost and monthly upkeep.',
  path: '/tools/website-cost-calculator',
})

/**
 * Rendered verbatim in the FAQ section and mirrored into FAQPage JSON-LD.
 * Every figure traces to SEO/research/website-cost-ranges.md; none of them is
 * an AIWebHub price, and the schema carries no price fields — Question and
 * Answer text only.
 */
const faqs = [
  {
    question: 'How much does a website cost in 2026?',
    answer:
      'It depends on who you ask, and the two best available surveys disagree. GoodFirms, which surveyed 300+ web development firms across 31 countries in 2026, found most agencies quote $1,000–$3,000 for a basic website, $5,000–$20,000 for a mid-sized one, and $20,000–$50,000 for enterprise builds and custom web applications. WebFX, which surveyed 250 US-based marketing professionals, found US buyers report paying $6,500–$15,000 for a basic small-business site, $15,000–$50,000 for a mid-sized one, and $50,000–$100,000 at the enterprise level. The honest answer is a range keyed to what you are building — and to which side of the market you ask.',
  },
  {
    question: 'Why is every website cost estimate I find different?',
    answer:
      'Two reasons: geography and side of market. Global surveys mix regions where developers charge $10–$15 an hour with the US, where the same survey puts rates at $50–$100 an hour, so worldwide averages sit well below what a US buyer is quoted. And a quote is not a payment: sell-side surveys record what agencies say a project costs at the start, while buy-side surveys record what buyers actually spent by the end, including revisions, content and scope changes. Any single number you find online has quietly picked one side of both of those splits.',
  },
  {
    question: 'How much does website maintenance cost per month?',
    answer:
      'GoodFirms 2026 reports monthly retainers of $500–$3,000 for nearly 58% of the market. WebFX 2026 reports most businesses spending $501–$5,000 per year — but that figure covers all businesses, including those running a site themselves on a DIY builder, which is why it reads so much lower. For a professionally maintained business site, the retainer band is the more honest guide.',
  },
  {
    question: 'Are AI website builders really cheaper?',
    answer:
      'For simple sites, yes — and the effect is measured, not hypothetical. In the GoodFirms 2026 survey, 33.5% of firms price AI-builder websites at $500–$1,500 and another 23.7% below $500, and the survey notes that simple websites which cost $5,000 three years ago are now being built for under $1,500. The same survey is equally clear that enterprise builds are not getting cheaper: the savings live where the work is simple, and disappear where it is not.',
  },
  {
    question: "Does this calculator show AIWebHub's prices?",
    answer:
      'No. Every figure on this page is a published range from a named third-party survey, cited where it appears. AIWebHub does not publish prices, because we do not sell fixed packages — every project is scoped individually and quoted with a clear breakdown. If you want a number for your project rather than the market, request a quote and we will send one.',
  },
  {
    question: 'Do I need to enter my email to see my result?',
    answer:
      'No. There is no submit button and no gate — the reading updates the moment you change an answer, and you can copy a link to your exact result and send it to anyone. Most website cost calculators make you trade an email address for a number they invented. This one shows you what the surveys actually say, for free, because the useful conversation starts after the number, not before it.',
  },
]

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Website Cost Calculator 2026',
  description:
    'Interactive website cost calculator comparing published 2026 survey ranges — what agencies quote versus what US buyers report paying. No email gate, every figure cited.',
  url: abs('/tools/website-cost-calculator'),
  datePublished: '2026-08-05',
  dateModified: '2026-08-05',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Website Cost Calculator',
      item: abs('/tools/website-cost-calculator'),
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function WebsiteCostCalculatorPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
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

      <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">
        Website cost calculator · 2026 survey data
      </p>
      <h1 className="mt-4 max-w-[18ch] text-[44px] font-light leading-[1.05] tracking-tighter text-zinc-100 sm:text-6xl">
        What a website actually costs
      </h1>
      <p className="mt-6 max-w-[62ch] text-neutral-300">
        Two 2026 surveys asked the same question and came back five times apart. Rather than average
        them into a number neither of them supports, this shows you both — who said it, how many
        people they asked, and where you sit between them.
      </p>
      <p className="mt-4 max-w-[62ch] text-neutral-400">
        No email required, because there is nowhere to put one: the reading updates as you answer,
        and you can copy a link to your exact result. Three questions, because three is all the
        survey data can honestly answer.
      </p>

      <div className="mt-12">
        <CostCalculator />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          Why the two disagree
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {(['goodfirms', 'webfx'] as const).map((id) => {
            const s = SOURCES[id]
            return (
              <div
                key={id}
                className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur sm:p-8"
              >
                <h3 className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                  {s.side === 'sell' ? 'The sell side' : 'The buy side'}
                </h3>
                <p className="mt-3 text-lg font-light tracking-tight text-zinc-100">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/20 underline-offset-4 hover:text-sky-300"
                  >
                    {s.name}
                  </a>
                </p>
                <p className="mt-1 text-xs text-neutral-500">{s.sample}</p>
                <p className="mt-4 text-sm text-neutral-300">{s.bias}</p>
              </div>
            )
          })}
        </div>
        <p className="mt-6 max-w-[68ch] text-sm text-neutral-400">
          Neither survey is wrong. One is asking sellers across 31 countries what they quote; the
          other is asking US buyers what they paid. A quote is the beginning of a project and a
          payment is the end of one, and the distance between those two things is most of what this
          page is about.
        </p>
        <p className="mt-4 max-w-[68ch] text-sm text-neutral-400">
          Geography does the rest. GoodFirms&apos; own hourly-rate table puts developers in India,
          Pakistan and Vietnam at $10–$15 an hour against $50–$100 in the United States — a spread
          wide enough that a &ldquo;global average&rdquo; price tells a US buyer almost nothing.
          When an article quotes one confident number for what a website costs, it has quietly
          picked a side of both splits without telling you which.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          How agencies actually price the work
        </h2>
        <p className="mt-6 max-w-[68ch] text-neutral-300">
          A web design quote is not one number so much as six stacked on top of each other. Asked
          how a project budget breaks down, the GoodFirms panel converged on roughly the same
          shape: discovery and planning take 5–10% of the budget, design 10–20%, front-end
          development 20–30%, back-end development 30–40%, testing and QA 10–20%, and project
          management 5–10%. That split is worth keeping when you compare quotes — a bid that looks
          cheap is usually missing one of those lines, not performing it for free.
        </p>
        <p className="mt-4 max-w-[68ch] text-neutral-300">
          The same survey found the market heavily concentrated at the small end: 63% of agencies
          quote fixed prices between $1,000 and $15,000, which is why most of the numbers you meet
          first sit in that band. And it carries a warning about all of them — GoodFirms estimates
          the real cost of a professionally built website runs 100–200% higher than the build quote
          once hosting, maintenance, integrations and post-launch updates are counted. The build
          price is the down payment; the second chart above is the mortgage.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          What moves your number
        </h2>
        <p className="mt-6 max-w-[68ch] text-neutral-300">
          Within either band, where a real quote lands is mostly decided by a handful of levers —
          the same ones the surveys identify when they ask why projects run over budget.
        </p>
        <CostDrivers />
        <p className="mt-6 max-w-[68ch] text-sm text-neutral-400">
          One lever is new since these surveys began: AI. GoodFirms notes that simple websites
          which cost $5,000 three years ago are now being built for under $1,500, with a third of
          firms pricing AI-builder sites at $500–$1,500 and nearly a quarter below $500. The same
          survey is blunt about the limit — enterprise builds are not cheaper. AI compressed the
          price of simple; it has not touched the price of complicated.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          The numbers we refused to use
        </h2>
        <p className="mt-6 max-w-[68ch] text-neutral-300">
          A page like this is only as honest as its worst citation, so here is what got cut. The
          most-quoted statistic in this space — that 61% of small businesses spent under $10,000,
          usually attributed to a Clutch survey — could not be traced to any primary Clutch page:
          the resource URL is dead and the press release carries no cost figures. It does not
          appear here. The dozens of agency blog posts publishing &ldquo;average website cost&rdquo;
          tables all cite each other in a circle, with no methodology at the bottom of it. None of
          them appear here either.
        </p>
        <p className="mt-4 max-w-[68ch] text-neutral-300">
          We also tried to add US government wage data as an anchor and could not verify it at the
          source, so it stays out. What remains is two surveys with named methodologies — one
          sell-side and global, one buy-side and US-only — linked where they are used, with sample
          sizes shown. When they disagree, the page says so instead of splitting the difference.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          Website cost questions, answered from the data
        </h2>
        <div className="mt-8 space-y-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="max-w-[70ch]">
              <h3 className="text-lg font-light tracking-tight text-zinc-100">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <QuoteCta />
      </div>

      <p className="mt-10 max-w-[68ch] text-xs text-neutral-600">
        Figures on this page are published survey ranges from{' '}
        <a
          href={SOURCES.goodfirms.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/20 underline-offset-2 hover:text-neutral-400"
        >
          GoodFirms 2026
        </a>{' '}
        and{' '}
        <a
          href={SOURCES.webfx.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/20 underline-offset-2 hover:text-neutral-400"
        >
          WebFX 2026
        </a>
        , not AIWebHub prices. AIWebHub quotes every project individually.
      </p>
    </main>
  )
}
