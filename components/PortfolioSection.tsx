"use client"

import { GradientButton } from '@/components/ui/gradient-button'
import { Globe, Search, Cpu, ShoppingCart, CreditCard, Palette } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { getProjectCount } from '@/lib/portfolio-data'

const skills = [
  { icon: Globe, label: 'Web Design' },
  { icon: Cpu, label: 'AI Integration' },
  { icon: ShoppingCart, label: 'E-commerce' },
  { icon: CreditCard, label: 'POS Integration' },
  { icon: Palette, label: 'Creative Content' },
  { icon: Search, label: 'SEO' }
]

const stats = [
  { value: `${getProjectCount()}+`, label: 'Projects' },
  { value: '3+', label: 'Years' },
  { value: '100%', label: 'Satisfaction' }
]

export const PortfolioSection = () => {
  return (
    <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
      {/* Header */}
      <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-4xl font-medium text-white">Services</span>
        </span>
        <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
        <span className="text-sm text-neutral-300">what we offer</span>
      </div>
      <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start relative z-10 mt-6 sm:mt-8">
        {/* Left copy */}
        <div className="flex flex-col min-h-full justify-between lg:col-span-5 animate-fadeInLeft animation-delay-200">
          <div>
            <h2 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Innovative web solutions powered by technology
            </h2>

            {/* Divider */}
            <div className="h-px bg-white/10 mt-6 animate-fadeIn animation-delay-300" />

            {/* Skills */}
            <div className="mt-6 animate-fadeInUp animation-delay-400">
              <p className="text-sm font-medium text-white tracking-tight">Services & Expertise</p>
              <div className="mt-3 flex flex-wrap gap-2 stagger-animation">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 text-xs text-neutral-200 bg-white/5 border-white/10 border rounded-full py-1.5 px-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    <skill.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 stagger-animation">
              {stats.map((stat, index) => (
                <div key={index} className="hover-lift">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-10 animate-fadeInUp animation-delay-500">
            <p className="text-sm font-medium text-white tracking-tight">Ready to grow your business?</p>
            <p className="text-sm text-neutral-300 max-w-sm mt-1">
              Get everything you need in one place - from custom websites to AI-powered solutions.
            </p>
            <div className="flex gap-4 mt-5 items-center flex-wrap">
              <GradientButton href="/portfolio" variant="primary">
                View Portfolio
              </GradientButton>
              <GradientButton href="/contact" variant="secondary">
                <span className="flex items-center gap-2">
                  Start Project
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GradientButton>
            </div>
          </div>
        </div>

        {/* Right: Service Showcase Grid */}
        <div className="lg:col-span-7 animate-fadeInRight animation-delay-300">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 stagger-animation">
            {/* Large featured */}
            <div className="md:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 group hover:border-white/20 transition-all duration-300 hover-lift">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="/services/web.jpg"
                  alt="Website Development"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2 backdrop-blur">
                    <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Web Design
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium text-white tracking-tight">Website Development</h3>
                <p className="text-sm text-neutral-400 mt-1">Professional websites that convert</p>
              </div>
            </div>

            {/* Small cards */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 group hover:border-white/20 transition-all duration-300 hover-lift">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/services/seonew.jpg"
                  alt="SEO"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2 backdrop-blur">
                    <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white tracking-tight">SEO</h3>
                <p className="text-xs text-neutral-400 mt-1">Search optimization</p>
              </div>
            </div>

            <div className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-neutral-900 border-white/10 border rounded-2xl hover-lift">
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-purple-400/60" strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2 backdrop-blur">
                    <Cpu className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white tracking-tight">AI Integration</h3>
                <p className="text-xs text-neutral-400 mt-1">Smart automation</p>
              </div>
            </div>

            <div className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-neutral-900 border-white/10 border rounded-2xl hover-lift">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/services/social.jpg"
                  alt="Creative Content"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2 backdrop-blur">
                    <Palette className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white tracking-tight">Creative Content</h3>
                <p className="text-xs text-neutral-400 mt-1">Engaging media</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 group hover:border-white/20 transition-all duration-300 hover-lift">
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-cyan-900/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-emerald-400/60" strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2 backdrop-blur">
                    <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white tracking-tight">E-commerce</h3>
                <p className="text-xs text-neutral-400 mt-1">Online stores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
