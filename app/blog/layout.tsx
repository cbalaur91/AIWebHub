import type { Metadata } from 'next'
import { abs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog - Web Design & AI Integration Insights | AIWebHub',
  description: 'Expert insights on web design, AI integration, custom development, and digital strategy for modern businesses. Practical guides and industry analysis from AIWebHub.',
  openGraph: {
    title: 'Blog - Web Design & AI Integration Insights | AIWebHub',
    description: 'Expert insights on web design, AI integration, and digital strategy for modern businesses.',
    url: abs('/blog'),
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
