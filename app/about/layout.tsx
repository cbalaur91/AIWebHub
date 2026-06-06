import { Metadata } from 'next'
import { abs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About | AIWebHub',
  description: 'Learn about AIWebHub - your web design and AI integration partner dedicated to helping businesses succeed with innovative technology solutions.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | AIWebHub',
    description: 'Learn about AIWebHub - your web design and AI integration partner dedicated to helping businesses succeed with innovative technology solutions.',
    url: abs('/about'),
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
