import { Metadata } from 'next'
import { abs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services & Pricing | AIWebHub',
  description: 'Explore AIWebHub pricing plans - from Starter to AI Agents packages for web design, AI integration, e-commerce, and custom development solutions.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Pricing | AIWebHub',
    description: 'Explore AIWebHub pricing plans - from Starter to AI Agents packages for web design, AI integration, e-commerce, and custom development solutions.',
    url: abs('/services'),
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
