import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-posts'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-zinc-900/60 border-white/10 border rounded-2xl hover-lift">
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-medium text-white tracking-tight hover:text-white/90 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-4 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Read more &rarr;
        </Link>
      </div>
    </article>
  )
}
