import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About AIWebHub | Michigan Web Design Studio Since 2024',
  description: 'AIWebHub is a Michigan web design and AI integration studio founded in 2024. See how we work, what we build with Next.js and React, and who we build it for.',
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
