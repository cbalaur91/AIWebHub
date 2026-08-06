import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * A question-and-answer block, always open.
 *
 * Deliberately not an accordion. Radix unmounts a closed `AccordionContent`,
 * so answers behind one are absent from the exported HTML entirely — which is
 * how `/services` came to measure 342 words while carrying ~1,900 words of
 * answers. Rendering them flat puts the text in the document for readers,
 * crawlers and answer engines alike, and drops the accordion's client JS.
 *
 * Layout follows the location template: question left, answer right, hairline
 * between. Callers own their own FAQPage JSON-LD, matching how every other
 * page in this app emits structured data.
 *
 * Server component: no hooks, no client JS.
 */

export interface FaqItem {
  question: string
  answer: string
  link?: { href: string; label: string }
}

interface FaqBlockProps {
  /** The oversized word in the section header. */
  eyebrow: string
  /** The lowercase line beside it. */
  caption: string
  /** The section's `<h2>`. */
  heading: string
  items: FaqItem[]
  /** Entrance-animation delay class, so the section joins the page's cascade. */
  animationDelay?: string
}

export const FaqBlock = ({
  eyebrow,
  caption,
  heading,
  items,
  animationDelay = 'animation-delay-500',
}: FaqBlockProps) => {
  return (
    <section
      className={`relative z-10 sm:p-8 animate-scaleIn ${animationDelay} bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur`}
    >
      {/* Soft radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">{eyebrow}</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">{caption}</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="relative mt-8 sm:mt-10">
        <h2 className="text-[32px] sm:text-4xl md:text-5xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[24ch]">
          {heading}
        </h2>

        <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
          {items.map((item) => (
            <div key={item.question} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8">
              <h3 className="lg:col-span-4 text-base font-medium text-zinc-100 tracking-tight">
                {item.question}
              </h3>
              <div className="lg:col-span-8">
                <p className="text-sm sm:text-base leading-relaxed text-zinc-400">{item.answer}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-200 hover:text-white transition-colors duration-200"
                  >
                    {item.link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
