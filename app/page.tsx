import { Hero } from '@/components/Hero'
import { PortfolioSection } from '@/components/PortfolioSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIWebHub",
    "url": "https://www.aiwebhub.io",
    "description": "Full-service digital marketing and PR solutions for small businesses including website development, SEO, listings management, online reviews, Google Ads, and social media marketing",
    "publisher": {
      "@type": "Organization",
      "name": "AIWebHub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aiwebhub.io/logo/logo.png"
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
      <TestimonialsSection />
    </>
  )
}