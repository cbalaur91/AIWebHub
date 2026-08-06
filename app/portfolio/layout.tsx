import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Web Design Portfolio | Projects & Case Studies | AIWebHub',
  description: 'See how AIWebHub builds custom websites, AI-powered apps, and landing pages for real businesses. Browse 8+ client projects with detailed case studies and results.',
  path: '/portfolio',
  twitter: {
    description: 'Browse 8+ real client projects with detailed case studies. Custom websites, AI apps, and landing pages built by AIWebHub.',
  },
})

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
