import { blogPosts } from '@/lib/blog-posts'
import { GradientButton } from '@/components/ui/gradient-button'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | AIWebHub Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.aiwebhub.io/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      images: [{ url: `https://www.aiwebhub.io${post.image}` }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="relative z-10 sm:p-8 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        <h1 className="text-4xl font-light text-white">Post not found</h1>
        <Link href="/blog" className="text-zinc-400 hover:text-white mt-4 inline-block">
          Back to Blog
        </Link>
      </section>
    )
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://www.aiwebhub.io${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle,
      "url": "https://www.linkedin.com/in/cosminbalaur91"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://www.aiwebhub.io",
      "logo": "https://www.aiwebhub.io/logo/logo.png"
    },
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate,
    "url": `https://www.aiwebhub.io/blog/${post.slug}`,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aiwebhub.io" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.aiwebhub.io/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.aiwebhub.io/blog/${post.slug}` }
    ]
  }

  // Simple markdown-like rendering: split by ## headings
  const sections = post.content.split(/^## /m).filter(Boolean)
  const intro = sections[0]
  const headedSections = sections.slice(1).map((s) => {
    const newlineIndex = s.indexOf('\n')
    return {
      heading: s.slice(0, newlineIndex).trim(),
      body: s.slice(newlineIndex).trim(),
    }
  })

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
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mb-4">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-[36px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-8">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-8 mx-auto px-6 py-6 backdrop-blur">
        <article className="max-w-3xl mx-auto">
          {/* Intro */}
          {intro && (
            <div className="mb-10">
              {intro.split('\n\n').filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}

          {/* Headed Sections */}
          {headedSections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-light text-zinc-100 tracking-tight mb-4">
                {section.heading}
              </h2>
              {section.body.split('\n\n').filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          ))}
        </article>
      </section>

      {/* Author Box */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-8 mx-auto px-6 py-6 backdrop-blur">
        <div className="max-w-3xl mx-auto flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
            <img
              src="/CB.png"
              alt={post.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium">{post.author}</p>
            <p className="text-sm text-zinc-400">{post.authorTitle}</p>
            <p className="text-sm text-zinc-500 mt-2">
              Building innovative web solutions and AI integrations for modern businesses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-8 mx-auto px-6 py-6 backdrop-blur text-center">
        <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight">
          Ready to start your project?
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
