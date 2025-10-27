"use client"

import { GradientButton } from '@/components/ui/gradient-button'
import { TrendingUp, Globe, Smartphone, Palette } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const testimonials = [
  {
    name: "Jessica Miller",
    position: "Owner, Miller & Co. Bakery",
    content: "We hired AIWebHub to redesign our website, and they nailed it. It's clean, easy to use, and our customers love it. The whole process was smooth and communication was great.",
    rating: 5,
    metric: "+180% engagement",
    service: "Website Development",
    icon: Globe,
    color: "emerald"
  },
  {
    name: "Tom Andrews",
    position: "Freelance Photographer",
    content: "I'm not super tech-savvy, so I really appreciated how patient and helpful the team was. They explained things clearly and built a site that looks professional.",
    rating: 5,
    metric: "+250% traffic",
    service: "SEO & Marketing",
    icon: TrendingUp,
    color: "blue"
  },
  {
    name: "Maria Lopez",
    position: "Manager, Willow Tree Wellness",
    content: "AIWebHub helped us move from an outdated site to something fresh and modern. Since launching, we've seen more appointment bookings and better feedback.",
    rating: 5,
    metric: "+120% bookings",
    service: "Web Design",
    icon: Palette,
    color: "purple"
  },
  {
    name: "David Chen",
    position: "CEO, TechStart Solutions",
    content: "The team delivered exceptional results on time and under budget. Their expertise in digital marketing has transformed our online presence completely.",
    rating: 5,
    metric: "+300% leads",
    service: "Full-Stack",
    icon: Smartphone,
    color: "orange"
  }
]

const stats = [
  { value: '10+', label: 'Projects delivered' },
  { value: '3+', label: 'Years experience' },
  { value: '100%', label: 'Client satisfaction' }
]

export const TestimonialsSection = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Header */}
      <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-zinc-100">Testimonials</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px bg-white/10 h-10" />
        <span className="text-sm text-zinc-400">client success stories</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="relative sm:mt-8 overflow-hidden sm:rounded-3xl border-0 rounded-none mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left: Copy, stats, CTAs */}
          <div className="lg:col-span-6 animate-fadeInLeft animation-delay-200">
            <h3 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Clients love AIWebHub
            </h3>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Trusted by small businesses, delivering exceptional digital marketing and PR solutions that drive real results.
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
              <GradientButton href="/services" variant="secondary">
                <span className="flex items-center gap-2">
                  View Services
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GradientButton>
            </div>
          </div>

          {/* Right: Testimonial cards with scrolling animation */}
          <div className="lg:col-span-6 animate-fadeInRight animation-delay-300 relative overflow-hidden h-[600px] rounded-3xl">
            <style jsx>{`
              @keyframes scroll-testimonials {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .testimonial-scroll-container {
                animation: scroll-testimonials 30s linear infinite;
                will-change: transform;
              }
              .testimonial-scroll-container:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="testimonial-scroll-container flex flex-col gap-6">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <article
                  key={index}
                  className="sm:p-8 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-800/20 border-zinc-800/60 border rounded-3xl p-6 flex-shrink-0 hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold text-zinc-100 tracking-tight">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">{testimonial.position}</div>
                        </div>
                      </div>
                      <div className="h-px bg-white/10 my-4" />
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <span className="text-zinc-200">5.0</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm sm:text-base text-zinc-300">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs text-${testimonial.color}-400 bg-${testimonial.color}-400/10 px-2 py-1 rounded-full`}>
                          <testimonial.icon className="w-3.5 h-3.5" />
                          {testimonial.metric}
                        </span>
                        <span className="text-xs text-zinc-500">{testimonial.service}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Enhanced gradient overlays for fade effect */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}