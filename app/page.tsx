import { Hero } from '@/components/Hero'
import { PortfolioSection } from '@/components/PortfolioSection'
import { ClientWorkSection } from '@/components/ClientWorkSection'
import { ORG, SITE_URL } from '@/lib/site'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIWebHub",
    "url": SITE_URL,
    "description": "Web design and AI integration solutions for modern businesses including custom websites, AI-powered features, e-commerce development, POS integration, and creative content services",
    "publisher": {
      "@type": "Organization",
      "name": "AIWebHub",
      "logo": {
        "@type": "ImageObject",
        "url": ORG.logo
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <PortfolioSection />
      <ClientWorkSection />
    </>
  )
}