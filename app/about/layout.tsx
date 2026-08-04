import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About | AIWebHub',
  description: 'Learn about AIWebHub - your web design and AI integration partner dedicated to helping businesses succeed with innovative technology solutions.',
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
