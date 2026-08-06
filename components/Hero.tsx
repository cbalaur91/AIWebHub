"use client"

import { GradientButton } from '@/components/ui/gradient-button'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
  return (
    <section
      className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-neutral-900/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur"
      style={{ minHeight: '600px' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden -z-10 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950" />

        {/* Brand watermark positioned at left */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-4 left-6 animate-fadeIn animation-delay-600"
          style={{ letterSpacing: '-0.02em' }}
        >
          <span
            className="block leading-none"
            style={{
              fontWeight: 700,
              fontSize: 'min(12vw, 210px)',
              lineHeight: 0.8,
              color: 'rgba(125, 211, 252, 0.12)'
            }}
          >
            AIWEBHUB
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left: Headline */}
        <div className="lg:col-span-7">
          <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInLeft animation-delay-300">
            Web Design & AI Integration for Modern Businesses
          </h1>
        </div>

        {/* Right: Copy + CTAs */}
        <div className="lg:col-span-5">
          <p className="sm:text-base text-sm text-neutral-300 max-w-[42ch] animate-fadeInRight animation-delay-400">
            From stunning custom websites to AI-powered solutions, we provide innovative technology to help your business succeed online. Your tech partner for the digital future.
          </p>
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
      </div>

      {/* Definition passage for AI citability */}
      <div className="relative z-10 mt-8 sm:mt-10 px-1 sm:px-0 animate-fadeInUp animation-delay-600">
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-4xl">
          AIWebHub is a web design and AI integration agency that helps modern businesses establish and grow their digital presence. Based in Michigan and serving clients worldwide, AIWebHub specializes in custom website development, AI-powered chatbot integration, e-commerce store creation, POS system connectivity, and search engine optimization. Every project is built with Next.js, React, and TypeScript for fast performance, accessibility, and scalability. From single-page landing sites to full-featured online stores with intelligent automation, AIWebHub delivers end-to-end solutions under one roof. The studio was founded in 2024 with a mission to make cutting-edge web technology accessible to businesses of all sizes, with transparent, project-based quotes and dedicated ongoing support.
        </p>
      </div>
    </section>
  )
}