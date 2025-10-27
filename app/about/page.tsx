"use client"

import { Lightbulb, Award, Users, Eye, Zap, Target } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'

const values = [
  {
    title: "Innovation",
    description: "We push boundaries and explore new technologies to create cutting-edge solutions.",
    icon: Lightbulb,
  },
  {
    title: "Quality",
    description: "We never compromise on quality, ensuring every pixel and line of code meets our high standards.",
    icon: Award,
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients, treating their projects as if they were our own.",
    icon: Users,
  },
  {
    title: "Transparency",
    description: "We believe in open communication and keeping our clients informed at every stage.",
    icon: Eye,
  },
  {
    title: "Adaptability",
    description: "We stay agile and responsive to changing trends and client needs.",
    icon: Zap,
  },
  {
    title: "Results",
    description: "We focus on creating websites that achieve tangible, measurable results for our clients.",
    icon: Target,
  },
]

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About - AIWebHub",
    "description": "Learn about AIWebHub's mission to provide complete PR and digital marketing solutions for small businesses",
    "url": "https://www.aiwebhub.io/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "description": "Full-service digital marketing agency specializing in PR solutions for small businesses"
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
            <span className="text-4xl font-medium text-white">About</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">who we are</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Your complete PR and <span className="text-white/90">digital marketing partner</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              We're dedicated to helping small businesses thrive online with comprehensive solutions that drive real results.
            </p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="/contact" variant="primary">
                Get Started
              </GradientButton>
              <GradientButton href="/services" variant="secondary">
                View Services
              </GradientButton>
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-5 animate-fadeInRight animation-delay-400">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 relative group hover-lift">
              <img
                src="/logo/AiWebHubLogo.jpg"
                alt="AIWebHub Logo"
                className="absolute inset-0 w-full h-full object-contain p-8 opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Mission</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">what drives us</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-6 animate-fadeInLeft animation-delay-300">
            <h2 className="text-[44px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Complete solutions, <span className="text-white/90">one partner</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
              At AIWebHub, our mission is to provide small businesses with complete PR and digital marketing solutions that drive real results. We believe that every business deserves access to professional marketing services without the complexity of managing multiple vendors.
            </p>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              From building your website to managing your online reputation, running your Google Ads campaigns, and creating engaging social media content - we handle it all. One partner, one solution, complete peace of mind.
            </p>
          </div>

          {/* Right video */}
          <div className="lg:col-span-6 animate-fadeInRight animation-delay-400">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 relative group hover-lift">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/video/Website_Mission_Video_Creation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Values</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">what we stand for</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 stagger-animation">
          {values.map((value, index) => (
            <article
              key={index}
              className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-zinc-900/60 border-white/10 border rounded-2xl hover-lift"
            >
              <div className="p-6">
                <div className="p-3 rounded-xl bg-white/5 w-fit">
                  <value.icon className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white tracking-tight mt-4">
                  {value.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  )
}
