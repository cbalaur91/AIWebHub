import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Contact AIWebHub | Request a Web Design Quote',
  description: 'Talk to AIWebHub about a web design or AI integration project. Michigan-based, serving clients nationwide — tell us what you need and get a tailored quote.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
