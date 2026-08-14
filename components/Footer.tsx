import Link from 'next/link'
import { Facebook as FacebookIcon, Instagram, Linkedin } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'

// Custom X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

/**
 * Every indexable page that is not already reachable from the navbar or the
 * bottom bar. Before this existed the footer linked only /contact, /privacy-policy
 * and /terms-of-service, which left /web-design-detroit on a single inbound link
 * sitewide and the cost calculator on none outside body prose — both of them
 * sitting in Search Console as "Discovered - currently not indexed".
 *
 * Ordered the way someone actually moves through the site: what we do, then the
 * tool, then the proof.
 */
const FOOTER_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/ai-consulting', label: 'AI Consulting' },
  { href: '/web-design-detroit', label: 'Detroit Web Design' },
  { href: '/tools/website-cost-calculator', label: 'Cost Calculator' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 sm:p-8 animate-scaleIn animation-delay-600 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur mb-6">
      {/* Soft radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
      </div>

      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-4 text-neutral-400 text-sm animate-fadeInUp animation-delay-100">
        <span className="h-px w-12 bg-white/10" />
        <span className="italic">Reach out anytime</span>
        <span className="h-px w-12 bg-white/10" />
      </div>

      {/* Heading */}
      <h2 className="mt-4 text-4xl sm:text-6xl text-white text-center font-light tracking-tighter animate-fadeInUp animation-delay-200">
        Let's Stay <span className="text-white/90 font-light tracking-tighter">Connected</span>
      </h2>

      {/* Copy */}
      <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto text-center animate-fadeInUp animation-delay-300">
        Got questions or want to collaborate? Feel free to reach out—we're open to new projects or just a casual chat!
      </p>

      {/* CTA */}
      <div className="mt-6 flex justify-center animate-fadeInUp animation-delay-400">
        <GradientButton href="/contact" variant="primary">
          Contact Us
        </GradientButton>
      </div>

      {/* Socials */}
      <div className="mt-8 flex items-center justify-center gap-6 text-neutral-400 animate-fadeInUp animation-delay-500">
        {/* X (Twitter) - Coming Soon */}
        <div
          className="relative group p-2 rounded hover:bg-white/5 hover:text-white transition hover:scale-110 duration-200"
          aria-label="X - Coming Soon"
        >
          <XIcon className="w-5 h-5" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Coming Soon
          </div>
        </div>
        <span className="h-6 w-px bg-white/10" />
        {/* Instagram - Coming Soon */}
        <div
          className="relative group p-2 rounded hover:bg-white/5 hover:text-white transition hover:scale-110 duration-200"
          aria-label="Instagram - Coming Soon"
        >
          <Instagram className="w-5 h-5" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Coming Soon
          </div>
        </div>
        <span className="h-6 w-px bg-white/10" />
        {/* Facebook - Active Link */}
        <a
          href="https://www.facebook.com/profile.php?id=61574644971669"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-2 rounded hover:bg-white/5 hover:text-white transition hover:scale-110 duration-200"
        >
          <FacebookIcon className="w-5 h-5" />
        </a>
        <span className="h-6 w-px bg-white/10" />
        {/* LinkedIn - Active Link */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2 rounded hover:bg-white/5 hover:text-white transition hover:scale-110 duration-200"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      {/* Email */}
      <p className="mt-6 text-center animate-fadeInUp animation-delay-600">
        <a
          href="mailto:info@aiwebhub.io"
          className="text-sm text-neutral-300 underline underline-offset-4 hover:text-white hover:scale-105 inline-block transition-all duration-200"
        >
          info@aiwebhub.io
        </a>
      </p>

      {/* Name & phone */}
      <p className="mt-2 flex items-center justify-center gap-3 text-sm text-neutral-400 animate-fadeInUp animation-delay-600">
        <span>AIWebHub</span>
        <span className="h-3 w-px bg-white/10" />
        <a
          href="tel:+17343416746"
          className="hover:text-white transition-colors"
        >
          (734) 341-6746
        </a>
      </p>

      {/* Wayfinding — puts every page one click from anywhere on the site */}
      <nav
        aria-label="Site"
        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-neutral-400 animate-fadeInUp animation-delay-600"
      >
        {FOOTER_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="hover:text-white transition-colors">
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="mt-10 h-px bg-white/5 animate-fadeIn animation-delay-600" />
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 animate-fadeInUp animation-delay-600 gap-4">
        <p>© {currentYear} AIWebHub. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}