"use client"

import Link from 'next/link'
import { GradientButton } from '@/components/ui/gradient-button'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProjectCount } from '@/lib/portfolio-data'

/**
 * Metro Detroit clients only. Every field here must be checkable against
 * lib/portfolio-data.ts or the live site it links to — no ratings, no
 * outcome percentages, no quotes we were not given.
 */
const clients = [
  {
    name: 'Romanian Banquet Hall',
    location: 'Warren, MI',
    county: 'Macomb County',
    work: 'Mobile-first venue site with an event gallery and a booking inquiry form built into the page flow.',
    slug: 'romanian-banquet-hall',
    url: 'https://www.romanianbanquethall.com/'
  },
  {
    name: 'Salinair Salt Room & Wellness Spa',
    location: 'Rochester Hills, MI',
    county: 'Oakland County',
    work: 'Six-service wellness site with Arketa booking integration and local business structured data.',
    slug: 'salinair',
    url: 'https://salinair.com'
  },
  {
    name: 'Divine Retreat Salon',
    location: 'Utica, MI',
    county: 'Macomb County',
    work: 'Multi-page salon and spa site with a full service menu and local SEO built in from the start.',
    slug: 'divine-retreat-salon',
    url: 'https://www.divineretreatsalon.com/'
  },
  {
    name: 'Romanian Food Festival',
    location: 'Rochester Hills, MI',
    county: 'Oakland County',
    work: 'Event landing page with menu, schedule and map, structured so organizers can update it without a developer.',
    slug: 'romanian-food-festival',
    url: 'https://www.romanianfoodfestival.org/'
  }
]

const stats = [
  { value: `${getProjectCount()}+`, label: 'Projects delivered' },
  { value: '3+', label: 'Years experience' },
  { value: `${clients.length}`, label: 'Metro Detroit clients' }
]

export const ClientWorkSection = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Header */}
      <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">Client work</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">who we build for</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="relative sm:mt-8 overflow-hidden sm:rounded-3xl border-0 rounded-none mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left: Copy, stats, CTAs */}
          <div className="lg:col-span-5 animate-fadeInLeft animation-delay-200">
            <h3 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Built for Metro Detroit
            </h3>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Four of the businesses we build for are within half an hour of Detroit. Every site
              listed here is live — open it and judge the work yourself.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 stagger-animation">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="sm:p-6 hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-5"
                >
                  <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 mt-6 animate-fadeIn animation-delay-400" />

            {/* CTAs */}
            <div className="flex gap-4 animate-fadeInUp animation-delay-500 mt-5 items-center flex-wrap">
              <GradientButton href="/contact" variant="primary">
                Get Started
              </GradientButton>
              <GradientButton href="/portfolio" variant="secondary">
                <span className="flex items-center gap-2">
                  View Portfolio
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GradientButton>
            </div>
          </div>

          {/* Right: The record */}
          <div className="lg:col-span-7 animate-fadeInRight animation-delay-300 flex flex-col gap-4">
            {clients.map((client) => (
              <article
                key={client.slug}
                className="sm:p-7 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 border-zinc-800/60 border rounded-3xl p-6 hover-lift"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {client.location} <span className="text-zinc-700">/</span> {client.county}
                </div>
                <h4 className="mt-2 text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight">
                  {client.name}
                </h4>
                <p className="mt-2 text-sm text-zinc-400 max-w-[60ch]">{client.work}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={`/portfolio/${client.slug}`}
                    className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors duration-200"
                  >
                    Read the case study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    Visit the site
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
