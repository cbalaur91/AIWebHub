import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | AIWebHub',
  description: 'Explore our portfolio of successful web projects - landing pages, e-commerce sites, and custom web applications built for small businesses.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | AIWebHub',
    description: 'Explore our portfolio of successful web projects - landing pages, e-commerce sites, and custom web applications built for small businesses.',
    url: 'https://www.aiwebhub.io/portfolio',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
