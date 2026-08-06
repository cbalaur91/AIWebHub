import { getAllPosts, getPostBySlug } from '@/lib/blog-posts'
import { abs, ORG, SITE_URL, pageMetadata } from '@/lib/site'
import { GradientButton } from '@/components/ui/gradient-button'
import { Picture } from '@/components/ui/picture'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

// --- Content rendering helpers ---------------------------------------------
// The blog renderer supports exactly three constructs: `## ` section headings,
// plain paragraphs separated by blank lines, and (below) inline markdown links
// plus pipe-delimited tables. Anything else renders as literal text.

/** Render `[label](href)` markdown links inside a paragraph; internal paths use <Link>. */
function renderInline(text: string): ReactNode[] {
  // split() with capture groups yields [before, label, href, before, label, href, ..., after]
  const parts = text.split(/\[([^\]]+)\]\(([^)\s]+)\)/g)
  const nodes: ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i])
    const label = parts[i + 1]
    const href = parts[i + 2]
    if (label !== undefined && href !== undefined) {
      const linkClass =
        'text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-300'
      nodes.push(
        href.startsWith('/') ? (
          <Link key={i} href={href} className={linkClass}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} className={linkClass}>
            {label}
          </a>
        )
      )
    }
  }
  return nodes
}

/** A block is a table when every line is a pipe-delimited row. */
function isTableBlock(block: string): boolean {
  const lines = block.split('\n')
  return lines.length > 1 && lines.every((line) => line.trim().startsWith('|'))
}

function parseTable(block: string): { header: string[]; rows: string[][] } {
  const allRows = block.split('\n').map((line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())
  )
  const header = allRows[0]
  const rows = allRows.slice(1).filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)))
  return { header, rows }
}

function ContentTable({ block }: { block: string }) {
  const { header, rows } = parseTable(block)
  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            {header.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r} className="border-b border-white/5 last:border-0">
              {cells.map((cell, c) => (
                <td
                  key={c}
                  className={
                    c === 0
                      ? 'px-4 py-3 text-zinc-200'
                      : 'whitespace-nowrap px-4 py-3 tabular-nums text-zinc-400'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Paragraphs and tables within an intro or a headed section. */
function ArticleBody({ text }: { text: string }) {
  return (
    <>
      {text
        .split('\n\n')
        .filter(Boolean)
        .map((block, i) => {
          const trimmed = block.trim()
          return isTableBlock(trimmed) ? (
            <ContentTable key={i} block={trimmed} />
          ) : (
            <p key={i} className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
              {renderInline(trimmed)}
            </p>
          )
        })}
    </>
  )
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return pageMetadata({
    title: `${post.title} | AIWebHub Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    socialTitle: post.title,
    images: [{ url: abs(post.image), alt: post.title }],
    openGraph: {
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
    },
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

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
    "image": abs(post.image),
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle,
      "url": "https://www.linkedin.com/in/cosminbalaur91"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": SITE_URL,
      "logo": ORG.logo
    },
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate,
    "url": abs(`/blog/${post.slug}`),
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": abs('/blog') },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": abs(`/blog/${post.slug}`) }
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
          <Picture
            src={post.image}
            alt={post.title}
            sizes="(min-width: 1280px) 1232px, 100vw"
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
              <ArticleBody text={intro} />
            </div>
          )}

          {/* Headed Sections */}
          {headedSections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-light text-zinc-100 tracking-tight mb-4">
                {section.heading}
              </h2>
              <ArticleBody text={section.body} />
            </div>
          ))}
        </article>
      </section>

      {/* Author Box */}
      <section className="relative z-10 sm:p-8 animate-scaleIn bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-8 mx-auto px-6 py-6 backdrop-blur">
        <div className="max-w-3xl mx-auto flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
            <Picture
              src="/CB.png"
              alt={post.author}
              sizes="64px"
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
