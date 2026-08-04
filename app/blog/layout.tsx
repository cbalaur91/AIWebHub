import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Blog - Web Design & AI Integration Insights | AIWebHub',
  description: 'Expert insights on web design, AI integration, custom development, and digital strategy for modern businesses. Practical guides and industry analysis from AIWebHub.',
  path: '/blog',
  socialDescription: 'Expert insights on web design, AI integration, and digital strategy for modern businesses.',
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
