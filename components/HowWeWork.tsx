import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * The four stages of an AIWebHub project, on the homepage.
 *
 * Same four-stage vocabulary the location template settled — a call, a written
 * quote, a build you can watch, a handover you own — so the site reads as one
 * system. The copy is written fresh rather than copied, so `/` and the location
 * page are not competing with identical paragraphs.
 *
 * The step numbers are load-bearing rather than decorative: this is a real
 * sequence, and step two is where the price question gets answered without a
 * price list.
 *
 * Server component: no hooks, no client JS.
 */

const steps = [
  {
    title: 'A conversation',
    body: 'We start with what the business needs to happen, not with a page list. What you sell, who has to find it, and what the site has to do that the current one does not. One call usually covers it.',
  },
  {
    title: 'A written scope',
    body: 'You get the scope and the project price in writing, usually within a day. It is a document, not a tier you get sorted into, and the number does not move unless the scope does.',
  },
  {
    title: 'A build you can watch',
    body: 'A preview link goes live in the first week. You review real pages on a real URL while changes are still cheap, instead of approving a flat mockup and meeting the site at launch.',
  },
  {
    title: 'A handover you own',
    body: 'The site, the domain and the analytics are yours the day it ships. Support afterwards — hosting, updates, backups, monitoring — is a separate monthly plan you can cancel with 30 days notice.',
  },
]

export const HowWeWork = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Header */}
      <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">Process</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">how a project runs</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="mt-8 sm:mt-10">
        <h2 className="text-[36px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[16ch] animate-fadeInUp animation-delay-200">
          Four stages, start to handover
        </h2>
        <p className="mt-6 max-w-[70ch] text-sm sm:text-base leading-relaxed text-zinc-400 animate-fadeInUp animation-delay-300">
          Nothing here is unusual, which is rather the point: you should be able to see the whole
          shape of a project before you spend anything on one.
        </p>

        <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-animation">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover-lift"
            >
              <span className="block text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Step {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-100 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7">
            <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
              Why there is no price list on this site
            </h3>
            <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-zinc-400">
              A published tier has to be priced for an average business, and the businesses we build
              for are not average. A salon that needs online booking and a banquet hall that needs a
              photo-heavy event gallery are different projects at the same page count, and a tier
              list charges them the same. So we scope first and quote second, in writing, before any
              work starts.
            </p>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
              If you want a number first
            </h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-zinc-400">
              Fair — most people do. We built a calculator that reports what two independent 2026
              surveys, GoodFirms and WebFX, say a build like yours costs, and shows you where the two
              disagree and why. Those are the surveys&apos; figures, not ours, and using it does not
              put you in a funnel.
            </p>
            <Link
              href="/tools/website-cost-calculator"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors duration-200"
            >
              Open the cost calculator
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
