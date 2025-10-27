"use client"

import { CheckCircle, Code, Globe, Monitor, TrendingUp, Zap, Target } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceMonthly: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$99",
    priceMonthly: 99,
    description: "Perfect for small businesses getting started with their online presence.",
    features: [
      "Basic listings management across major directories",
      "Website hosting & maintenance",
      "Review monitoring dashboard",
      "Monthly performance report",
      "Email support",
    ],
  },
  {
    id: "essentials",
    name: "Essentials",
    price: "$399",
    priceMonthly: 399,
    description: "Comprehensive marketing solution for growing businesses ready to scale.",
    features: [
      "Everything in Starter",
      "SEO optimization & local SEO",
      "Social media management (2 platforms)",
      "Online review management with responses",
      "Quarterly website updates",
      "Priority email & phone support",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$899",
    priceMonthly: 899,
    description: "Full-service digital marketing for businesses serious about growth.",
    features: [
      "Everything in Essentials",
      "Google Ads campaign management",
      "Advanced SEO with link building",
      "Social media management (all platforms)",
      "Weekly content creation",
      "Bi-weekly performance reports",
      "Dedicated account manager",
    ],
  },
]

const stats = [
  { value: '3', label: 'Flexible Plans', icon: Target },
  { value: '$99', label: 'Starting From', icon: Zap },
  { value: '100%', label: 'Satisfaction', icon: TrendingUp }
]

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing Plans - AIWebHub",
    "description": "Choose from our flexible pricing plans for complete digital marketing and PR solutions. Starter, Essentials, and Professional plans to fit your business needs.",
    "url": "https://www.aiwebhub.io/services",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://www.aiwebhub.io",
      "description": "Full-service digital marketing agency specializing in PR solutions for small businesses",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pricing Plans",
        "itemListElement": pricingPlans.map((plan) => ({
          "@type": "Offer",
          "name": plan.name,
          "description": plan.description,
          "price": plan.priceMonthly.toString(),
          "priceCurrency": "USD"
        }))
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Pricing</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">flexible plans for every business</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Simple pricing, powerful results
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Choose the perfect plan for your business. All plans include our complete suite of digital marketing and PR solutions designed to help small businesses thrive online.
            </p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="#pricing" variant="primary">
                View Plans
              </GradientButton>
              <GradientButton href="/contact" variant="secondary">
                Contact Sales
              </GradientButton>
            </div>
          </div>

          {/* Right stats */}
          <div className="lg:col-span-5 animate-fadeInRight animation-delay-400">
            <div className="grid grid-cols-1 gap-4 stagger-animation">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="sm:p-6 hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-white/5">
                    <stat.icon className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Plans</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">choose what fits your needs</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 stagger-animation">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl border bg-zinc-900/60 backdrop-blur hover-lift transition-all duration-300 ${
                plan.popular
                  ? 'border-white/20 scale-[1.02] shadow-xl shadow-white/5'
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-medium text-white border border-white/10">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div>
                  <h2 className="text-2xl font-light text-white tracking-tight">
                    {plan.name}
                  </h2>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-light text-white tracking-tighter">{plan.price}</span>
                    <span className="text-sm text-zinc-400">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-3 items-start">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" strokeWidth={1.5} />
                      <p className="text-sm text-zinc-300 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <GradientButton href="/contact" variant={plan.popular ? "primary" : "secondary"} className="w-full">
                    Get Started
                  </GradientButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Website Types Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Services</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">website types we build</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="mt-8">
          <h2 className="text-[44px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInUp animation-delay-200 max-w-3xl">
            Custom websites for various business needs
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl animate-fadeInUp animation-delay-300">
            As part of our website development service, we create tailored solutions that convert visitors into customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 stagger-animation">
          {[
            {
              title: "Landing Pages",
              description: "Conversion-focused pages designed to turn visitors into leads with compelling CTAs and optimized user journeys.",
              icon: Monitor,
              gradient: "from-blue-500/20 to-cyan-500/20",
              iconColor: "text-blue-400"
            },
            {
              title: "E-commerce Stores",
              description: "Complete online stores with secure payment processing, inventory management, and seamless customer experience.",
              icon: Code,
              gradient: "from-purple-500/20 to-pink-500/20",
              iconColor: "text-purple-400"
            },
            {
              title: "Multi-Page Business Sites",
              description: "Comprehensive websites with multiple pages to showcase all aspects of your business and services.",
              icon: Globe,
              gradient: "from-emerald-500/20 to-green-500/20",
              iconColor: "text-emerald-400"
            },
          ].map((service, index) => (
            <article
              key={index}
              className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-neutral-900 border-white/10 border rounded-2xl hover-lift"
            >
              <div className={`aspect-[16/10] relative overflow-hidden bg-gradient-to-br ${service.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2.5 backdrop-blur">
                    <service.icon className={`w-3.5 h-3.5 ${service.iconColor}`} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-white tracking-tight">{service.title}</h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  )
}
