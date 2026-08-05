import { CostCalculator, CostDrivers, QuoteCta } from '@/components/CostCalculator'
import { SOURCES } from '@/lib/cost-calculator-data'

/**
 * THROWAWAY PROTOTYPE for wayfinder #13. Not linked, not in the sitemap.
 *
 * Deliberately built as a server component wrapping a client leaf, which is the
 * shape the real /tools/website-cost-calculator has to take under
 * `output: 'export'` (see #12: a page-level `useSearchParams` renders zero
 * server HTML, which is fatal for an SEO page).
 */
export const metadata = {
  title: 'Prototype — Website cost calculator',
  robots: { index: false, follow: false },
}

export default function CostCalculatorPrototype() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">
        Website cost calculator · Michigan
      </p>
      <h1 className="mt-4 max-w-[18ch] text-[44px] font-light leading-[1.05] tracking-tighter text-zinc-100 sm:text-6xl">
        What a website actually costs
      </h1>
      <p className="mt-6 max-w-[62ch] text-neutral-300">
        Two 2026 surveys asked the same question and came back five times apart. Rather than average
        them into a number neither of them supports, this shows you both — who said it, how many
        people they asked, and where you sit between them.
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
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
          What moves your number
        </h2>
        <CostDrivers />
      </section>

      <QuoteCta />

      <p className="mt-10 text-xs text-neutral-600">
        Prototype for issue #13. Figures are published survey ranges, not AIWebHub prices. Sourced
        in <code className="text-neutral-500">SEO/research/website-cost-ranges.md</code>.
      </p>
    </main>
  )
}
