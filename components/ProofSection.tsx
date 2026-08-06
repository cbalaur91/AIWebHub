import Link from 'next/link'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { getProjectCount } from '@/lib/portfolio-data'

/**
 * The homepage's trust block, for a studio with zero reviews.
 *
 * Every line here is checkable against something already in the repo or on a
 * client's live site — `lib/portfolio-data.ts` for the record, `package.json`
 * and `next.config.js` for the stack, `app/about/page.tsx` for the founding
 * year. Nothing is a rating, a testimonial or a borrowed statistic, and the
 * "not published" column exists so it stays that way.
 *
 * Server component: no hooks, no client JS.
 */

const published = [
  {
    title: 'Every client URL',
    body: 'The four Metro Detroit sites above are live. Open one, use it on your phone, and form a view before you call us.',
  },
  {
    title: 'A written case study per project',
    body: 'What the client needed, what we proposed, what actually shipped — one per project, on the portfolio.',
  },
  {
    title: 'The stack, by name',
    body: 'Next.js, React and TypeScript, deployed as static files to a global CDN. No mystery platform, no lock-in.',
  },
  {
    title: 'Who does the work',
    body: 'AIWebHub is founder-led. Cosmin Balaur founded the studio in 2024 and writes the code.',
  },
]

const notPublished = [
  {
    title: 'A star rating or review count',
    body: 'We have never collected them, so any number here would be one we made up.',
  },
  {
    title: 'Revenue-lift percentages',
    body: 'We cannot show you the math behind a figure like that, so we do not quote one.',
  },
  {
    title: 'A price list',
    body: 'Every project is scoped and quoted on its own. What that involves is the next section.',
  },
]

const record = [
  { value: '2024', label: 'Studio founded' },
  // Exact, not "N+": this is literally how many entries lib/portfolio-data.ts
  // holds, and each one is linked and openable. Rounding up would undo the
  // point the rest of this section is making.
  { value: `${getProjectCount()}`, label: 'Projects in the portfolio' },
  { value: '4', label: 'Metro Detroit clients' },
  { value: '0', label: 'Star ratings published' },
]

export const ProofSection = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Soft radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute right-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-bl from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">Proof</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">what we can actually show you</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="relative mt-8 sm:mt-10">
        <h2 className="text-[36px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[18ch] animate-fadeInUp animation-delay-200">
          We publish addresses, not star ratings
        </h2>
        <p className="mt-6 max-w-[70ch] text-sm sm:text-base leading-relaxed text-zinc-400 animate-fadeInUp animation-delay-300">
          Most agency homepages open with a review count. Ours cannot: AIWebHub started taking
          client work in 2024 and has never collected star ratings, so putting a number here would
          mean inventing one. What we can put here is the address of every site we have shipped,
          each one linked from the portfolio and openable in a new tab right now. That is a slower
          kind of proof than a badge, and it is the only kind we can stand behind.
        </p>

        {/* The two columns are the point: what gets published, and what deliberately does not. */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">What we publish</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {published.map((item) => (
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
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              What we don&apos;t
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {notPublished.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-transparent p-5"
                >
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-zinc-300 tracking-tight">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The record, stated plainly. The zero is not a typo. */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-animation">
          {record.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6 hover-lift"
            >
              <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {item.value}
              </div>
              <div className="mt-1 text-xs text-zinc-400">{item.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-zinc-400">
          The Metro Detroit sites are the quickest way to check all of that at once, but they are
          not the whole record. The portfolio also holds a driver-recruitment site for a Chicago car
          hauler, a hotel-search platform that runs in more than thirty languages, and a stone
          fabricator whose work had never been online before. Each entry links to its live site and
          its case study, so nothing on this page needs to be taken on trust.
        </p>
        <Link
          href="/portfolio"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors duration-200"
        >
          See the full record
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
