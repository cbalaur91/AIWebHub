"use client"

import { Lightbulb, Award, Users, Eye, Zap, Target, Linkedin } from 'lucide-react'
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
    "description": "Learn about AIWebHub's mission to provide innovative web design and AI integration solutions for modern businesses",
    "url": "https://www.aiwebhub.io/about",
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-16",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "description": "Web design and AI integration studio creating innovative digital solutions for modern businesses"
    }
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Cosmin Balaur",
    "jobTitle": "Founder & Lead Developer",
    "url": "https://www.linkedin.com/in/cosminbalaur91",
    "image": "https://www.aiwebhub.io/CB.png",
    "sameAs": [
      "https://www.linkedin.com/in/cosminbalaur91"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://www.aiwebhub.io"
    },
    "knowsAbout": [
      "Web Development",
      "AI Integration",
      "E-commerce Solutions",
      "UX/UI Design",
      "SEO Optimization",
      "POS Integration"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aiwebhub.io" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.aiwebhub.io/about" }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
              Your web design and <span className="text-white/90">AI integration partner</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              We're dedicated to helping businesses succeed with innovative web solutions and AI-powered technology.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: February 2026</p>
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
              Innovative solutions, <span className="text-white/90">one partner</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
              At AIWebHub, our mission is to provide businesses with innovative web design and AI integration solutions that drive real results. We believe that every business deserves access to cutting-edge technology without the complexity of managing multiple vendors.
            </p>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              From building your custom website to integrating AI-powered features, developing e-commerce solutions, and connecting your POS systems - we handle it all. One partner, one solution, complete peace of mind.
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

      {/* Team Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-bl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Team</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">the people behind AIWebHub</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="mt-8 max-w-2xl">
          <article className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-zinc-900/60 border-white/10 border rounded-2xl hover-lift">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  src="/CB.png"
                  alt="Cosmin Balaur - Founder & Lead Developer at AIWebHub"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white tracking-tight">Cosmin Balaur</h3>
                <p className="text-sm text-zinc-400 mt-1">Founder & Lead Developer</p>
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                  Cosmin Balaur is the founder and lead developer of AIWebHub, bringing hands-on expertise in full-stack web development, AI integration, and digital strategy. With a background in building custom websites, e-commerce platforms, and AI-powered business tools, Cosmin works directly with each client to deliver solutions that drive measurable growth. His technical skill set spans Next.js, React, TypeScript, and modern AI APIs, while his business acumen ensures every project aligns with client goals. Cosmin founded AIWebHub in 2024 to make advanced web technology accessible and affordable for businesses of all sizes.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Web Development", "AI Integration", "E-commerce Solutions", "UX/UI Design", "SEO Optimization", "POS Integration"].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/cosminbalaur91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

    </>
  )
}
