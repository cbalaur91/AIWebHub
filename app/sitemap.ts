import { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/portfolio-data'
import { getAllPosts } from '@/lib/blog-posts'
import { CASE_STUDY_ROUTE, routeDate } from '@/lib/route-dates'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

// `lastModified` comes from git via `lib/route-dates.json`, never from a literal.
// These dates were hard-coded to 2026-02-16 through August 2026, which told
// Google nothing had changed on twenty of twenty-seven URLs while those pages
// were being rewritten — and `lastmod` is what schedules a recrawl. Blog posts
// are the exception: they carry a real `modifiedDate` of their own.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // One row per static route. Tabulated rather than spelled out so that a route
  // cannot quietly keep a stale date the way eleven of them did.
  const STATIC_ROUTES: [path: string, changeFrequency: ChangeFrequency, priority: number][] = [
    ['/', 'weekly', 1],
    ['/services', 'monthly', 0.9],
    ['/ai-consulting', 'monthly', 0.9],
    ['/about', 'monthly', 0.8],
    ['/web-design-detroit', 'monthly', 0.9],
    ['/portfolio', 'weekly', 0.8],
    ['/blog', 'weekly', 0.8],
    ['/tools/website-cost-calculator', 'monthly', 0.8],
    ['/contact', 'monthly', 0.7],
    ['/privacy-policy', 'yearly', 0.3],
    ['/terms-of-service', 'yearly', 0.3],
  ]

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ([path, changeFrequency, priority]) => ({
      url: path === '/' ? baseUrl : `${baseUrl}${path}`,
      lastModified: routeDate(path),
      changeFrequency,
      priority,
    }),
  )

  const caseStudyPages: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: routeDate(CASE_STUDY_ROUTE),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...caseStudyPages, ...blogPages]
}
