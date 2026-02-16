"use client"

import { useState } from 'react'
import { blogPosts } from '@/lib/blog-posts'
import { BlogCard } from '@/components/BlogCard'
import { GradientButton } from '@/components/ui/gradient-button'
import { BookOpen, PenTool, TrendingUp } from 'lucide-react'

const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

const stats = [
  { value: String(blogPosts.length), label: 'Articles', icon: BookOpen },
  { value: String(allTags.length), label: 'Topics', icon: PenTool },
  { value: 'Weekly', label: 'New Content', icon: TrendingUp },
]

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("all")

  const filteredPosts = activeTag === "all"
    ? blogPosts
    : blogPosts.filter((post) => post.tags.includes(activeTag))

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Blog</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">insights & guides</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Web design & AI <span className="text-white/90">insights</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Practical guides, industry analysis, and expert advice on web development, AI integration, and digital strategy for modern businesses.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: February 2026</p>
          </div>

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
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-12 mx-auto px-6 py-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-center gap-3 animate-fadeInUp animation-delay-200">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeTag === "all"
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => setActiveTag("all")}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeTag === tag
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-animation">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 animate-fadeInUp">
            <p className="text-zinc-400 text-sm">No posts found for this topic.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur text-center">
        <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight">
          Have a project in mind?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
          Let's discuss how we can help your business succeed with web design and AI integration.
        </p>
        <div className="mt-6">
          <GradientButton href="/contact" variant="primary">
            Get Started
          </GradientButton>
        </div>
      </section>
    </>
  )
}
