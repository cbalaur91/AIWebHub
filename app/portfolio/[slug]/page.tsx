import { getAllProjects, getProjectBySlug } from '@/lib/portfolio-data'
import { abs, ORG, SITE_URL } from '@/lib/site'
import { GradientButton } from '@/components/ui/gradient-button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} - Case Study | AIWebHub`,
    description: project.caseStudy.overview.slice(0, 160),
    openGraph: {
      title: `${project.title} - Case Study | AIWebHub`,
      description: project.caseStudy.overview.slice(0, 160),
      url: abs(`/portfolio/${project.slug}`),
      images: [{ url: abs(project.image) }],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <section className="relative z-10 sm:p-8 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        <h1 className="text-4xl font-light text-white">Project not found</h1>
        <Link href="/portfolio" className="text-zinc-400 hover:text-white mt-4 inline-block">
          Back to Portfolio
        </Link>
      </section>
    )
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${project.title} - Case Study`,
    "description": project.caseStudy.overview,
    "image": abs(project.image),
    "author": {
      "@type": "Person",
      "name": "Cosmin Balaur",
      "url": "https://www.linkedin.com/in/cosminbalaur91"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": SITE_URL,
      "logo": ORG.logo
    },
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-16",
    "url": abs(`/portfolio/${project.slug}`)
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": abs('/portfolio') },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": abs(`/portfolio/${project.slug}`) }
    ]
  }

  const sections = [
    { title: "Project Overview", content: project.caseStudy.overview },
    { title: "The Challenge", content: project.caseStudy.challenge },
    { title: "Our Approach", content: project.caseStudy.approach },
    { title: "The Solution", content: project.caseStudy.solution },
    { title: "Results", content: project.caseStudy.results },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              {project.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href={project.url} variant="primary">
                <span className="flex items-center gap-2">
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </span>
              </GradientButton>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fadeInRight animation-delay-400">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60">
              <img
                src={project.image}
                alt={`${project.title} project screenshot`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`relative z-10 sm:p-8 animate-scaleIn ${index % 2 === 0 ? 'bg-zinc-950/60' : 'bg-zinc-950/10'} w-full max-w-7xl border-white/10 border rounded-3xl mt-12 mx-auto px-6 py-6 backdrop-blur`}
        >
          <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight">
            {section.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl">
            {section.content}
          </p>
        </section>
      ))}

      {/* Technologies Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-12 mx-auto px-6 py-6 backdrop-blur">
        <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-3 mt-6">
          {project.caseStudy.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-12 mx-auto px-6 py-6 backdrop-blur text-center">
        <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight">
          Ready to start your project?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
          Let's discuss how we can create a similar solution tailored to your business needs.
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
