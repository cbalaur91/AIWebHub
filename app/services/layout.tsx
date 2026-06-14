import { Metadata } from 'next'
import { abs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services | AIWebHub',
  description: 'Web design, AI integration, e-commerce, and custom AI agents from AIWebHub — built around your business and quoted per project. Request a tailored quote.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | AIWebHub',
    description: 'Web design, AI integration, e-commerce, and custom AI agents from AIWebHub — built around your business and quoted per project. Request a tailored quote.',
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
