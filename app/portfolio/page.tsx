"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GradientButton } from '@/components/ui/gradient-button'
import { Picture } from '@/components/ui/picture'
import { Target, Filter, TrendingUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getAllProjects, getAllCategories, getProjectsByCategory, getProjectCount } from '@/lib/portfolio-data'
import { abs, SITE_URL } from '@/lib/site'

const stats = [
  { value: String(getProjectCount()), label: 'Projects Delivered', icon: Target },
  { value: String(getAllCategories().length - 1), label: 'Categories', icon: Filter },
  { value: '100%', label: 'Success Rate', icon: TrendingUp }
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = activeCategory === "all"
    ? getAllProjects()
    : getProjectsByCategory(activeCategory)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Web Design Portfolio - AIWebHub",
    "description": "Browse AIWebHub's portfolio of custom websites, AI-powered applications, and landing pages built for real businesses with measurable results.",
    "url": abs('/portfolio'),
    "datePublished": "2024-06-01",
    "dateModified": "2026-03-06",
    "author": {
      "@type": "Person",
      "name": "Cosmin Balaur",
      "url": "https://www.linkedin.com/in/cosminbalaur91"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "AIWebHub",
      "url": SITE_URL
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": getAllProjects().map((project, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.title,
        "description": project.description,
        "url": project.url,
        "image": abs(project.image),
        "keywords": project.tags.join(", ")
      }))
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": abs('/portfolio') }
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

      {/* Hero Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Portfolio</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">our latest work</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Our web design portfolio: <span className="text-white/90">real projects, real results</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[56ch]">
              Every project in our portfolio represents a real business challenge solved through thoughtful design and modern web technology. From conversion-focused landing pages to AI-powered web applications, we partner with small businesses to create digital experiences that drive measurable results. Browse our case studies to see the challenges, solutions, and outcomes behind each build.
            </p>
            <p className="mt-3 text-sm text-zinc-400 max-w-[56ch]">
              We specialize in <Link href="/services" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">Next.js development, AI integration, and e-commerce solutions</Link> — built with performance and SEO baked in from day one. Each project is crafted by <Link href="/about" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">Cosmin Balaur</Link>, founder of AIWebHub, with a focus on clean code and business impact.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: February 2026</p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="#projects" variant="primary">
                View Projects
              </GradientButton>
              <GradientButton href="/contact" variant="secondary">
                Start Project
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

      {/* Filter Section */}
      <section id="projects" className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Filter</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">browse by category</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-fadeInUp animation-delay-200">
          {getAllCategories().map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === category.value
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border bg-zinc-900/60 backdrop-blur hover-lift transition-all duration-300 border-white/10 hover:border-white/20 group"
            >
              {/* Image Container */}
              <div
                className="aspect-video w-full overflow-hidden cursor-pointer relative"
                onClick={() => window.open(project.url, '_blank')}
              >
                <Picture
                  src={project.image}
                  alt={project.imageAlt}
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-3 backdrop-blur">
                    {getAllCategories().find(c => c.value === project.category)?.label || project.category}
                  </span>
                </div>

                {/* External Link Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur border border-white/15">
                    <ExternalLink className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-medium text-white tracking-tight cursor-pointer hover:text-white/90 transition-colors"
                  onClick={() => window.open(project.url, '_blank')}
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Case Study Link */}
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-block mt-4 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Read Case Study &rarr;
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-fadeInUp">
            <p className="text-zinc-400 text-sm">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-16 mx-auto px-6 py-6 backdrop-blur">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-100 tracking-tight">
            Ready to build something great?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Every project starts with a conversation. Tell us about your business goals and we&apos;ll craft a solution tailored to your needs. Explore our <Link href="/services" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">full range of services</Link> or read our <Link href="/blog" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">latest insights on web design and AI</Link>.
          </p>
          <div className="flex gap-4 mt-6 items-center justify-center flex-wrap">
            <GradientButton href="/contact" variant="primary">
              Start Your Project
            </GradientButton>
            <GradientButton href="/services" variant="secondary">
              View Services
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  )
}
