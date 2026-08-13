import { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'AI Consulting, Training & Automation Audits | AIWebHub',
  description:
    'AI consulting from AIWebHub — train your team to build AI agents, audit your processes for what to automate, and ship end-to-end agentic workflows. Quoted per engagement.',
  path: '/ai-consulting',
})

export default function AiConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
