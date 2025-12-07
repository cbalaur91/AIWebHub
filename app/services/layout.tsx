import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Pricing | AIWebHub',
  description: 'Explore AIWebHub pricing plans - from Starter to Professional packages for website development, SEO, social media, and complete digital marketing.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Pricing | AIWebHub',
    description: 'Explore AIWebHub pricing plans - from Starter to Professional packages for website development, SEO, social media, and complete digital marketing.',
    url: 'https://www.aiwebhub.io/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
