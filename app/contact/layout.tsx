import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Contact | AIWebHub',
  description: 'Get in touch with AIWebHub for innovative web design and AI integration solutions for your business.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
