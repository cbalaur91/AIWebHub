import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Design Portfolio | Projects & Case Studies | AIWebHub',
  description: 'See how AIWebHub builds custom websites, AI-powered apps, and landing pages for real businesses. Browse 8+ client projects with detailed case studies and results.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Web Design Portfolio | Projects & Case Studies | AIWebHub',
    description: 'See how AIWebHub builds custom websites, AI-powered apps, and landing pages for real businesses. Browse 8+ client projects with detailed case studies and results.',
    url: 'https://www.aiwebhub.io/portfolio',
    images: [
      {
        url: 'https://www.aiwebhub.io/thumbnails/logo-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'AIWebHub web design portfolio showcasing client projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Portfolio | Projects & Case Studies | AIWebHub',
    description: 'Browse 8+ real client projects with detailed case studies. Custom websites, AI apps, and landing pages built by AIWebHub.',
    images: ['https://www.aiwebhub.io/thumbnails/logo-thumbnail.png'],
    creator: '@aiwebhub',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
