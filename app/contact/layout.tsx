import { Metadata } from 'next'
import { abs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact | AIWebHub',
  description: 'Get in touch with AIWebHub for innovative web design and AI integration solutions for your business.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | AIWebHub',
    description: 'Get in touch with AIWebHub for innovative web design and AI integration solutions for your business.',
    url: abs('/contact'),
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
