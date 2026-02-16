"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GradientButton } from '@/components/ui/gradient-button'
import { Target, Filter, TrendingUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { projects, categories } from '@/lib/portfolio-data'

const stats = [
  { value: String(projects.length), label: 'Projects Delivered', icon: Target },
  { value: String(categories.length - 1), label: 'Categories', icon: Filter },
  { value: '100%', label: 'Success Rate', icon: TrendingUp }
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio - AIWebHub",
    "description": "Explore our latest projects and see how we've helped businesses achieve their digital goals with exceptional web design and AI-powered solutions.",
    "url": "https://www.aiwebhub.io/portfolio",
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-16",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((project, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.title,
        "description": project.description,
        "url": project.url,
        "keywords": project.tags.join(", ")
      }))
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aiwebhub.io" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.aiwebhub.io/portfolio" }
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
              Transforming ideas into exceptional <span className="text-white/90">digital experiences</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Explore our portfolio of successful projects. From landing pages to complete business solutions, each project showcases our commitment to quality and innovation.
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
          {categories.map((category) => (
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-3 backdrop-blur">
                    {categories.find(c => c.value === project.category)?.label || project.category}
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
    </>
  )
}
