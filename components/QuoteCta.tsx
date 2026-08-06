import { GradientButton } from '@/components/ui/gradient-button'

/**
 * The closing band on a money page. One heading, one paragraph, two ways out —
 * request a quote, or go check the work first.
 *
 * `GradientButton` is the only client code this renders; the section itself is
 * a server component.
 */

interface QuoteCtaProps {
  heading: string
  body: string
  /** The second, quieter route — usually the proof a reader still wants. */
  secondary: { href: string; label: string }
  /** Entrance-animation delay class, so the section joins the page's cascade. */
  animationDelay?: string
}

export const QuoteCta = ({
  heading,
  body,
  secondary,
  animationDelay = 'animation-delay-500',
}: QuoteCtaProps) => {
  return (
    <section
      className={`relative z-10 sm:p-12 animate-scaleIn ${animationDelay} bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-10 text-center backdrop-blur`}
    >
      <h2 className="text-[32px] sm:text-4xl md:text-5xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[22ch] mx-auto">
        {heading}
      </h2>
      <p className="mx-auto mt-5 max-w-[58ch] text-sm sm:text-base leading-relaxed text-zinc-400">
        {body}
      </p>
      <div className="flex gap-4 mt-2 items-center justify-center flex-wrap">
        <GradientButton href="/contact" variant="primary">
          Request a quote
        </GradientButton>
        <GradientButton href={secondary.href} variant="secondary">
          {secondary.label}
        </GradientButton>
      </div>
    </section>
  )
}
