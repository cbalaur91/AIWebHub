import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | AIWebHub',
  description: 'Learn about AIWebHub - your complete PR and digital marketing partner dedicated to helping small businesses thrive online.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | AIWebHub',
    description: 'Learn about AIWebHub - your complete PR and digital marketing partner dedicated to helping small businesses thrive online.',
    url: 'https://www.aiwebhub.io/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
