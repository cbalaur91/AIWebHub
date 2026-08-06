import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Web Design & AI Integration Services | AIWebHub',
  description: 'Web design, AI integration, e-commerce, and custom AI agents from AIWebHub — built around your business and quoted per project. Request a tailored quote.',
  path: '/services',
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
