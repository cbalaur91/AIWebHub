import { Hero } from '@/components/Hero'
import { PortfolioSection } from '@/components/PortfolioSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'

const testimonials = [
  {
    name: "Ravi Mehta",
    position: "Owner, Miller & Co. Bakery",
    content: "We hired AIWebHub to redesign our website, and they nailed it. It's clean, easy to use, and our customers love it. The whole process was smooth and communication was great."
  },
  {
    name: "Isla MacGregor",
    position: "Freelance Photographer",
    content: "I'm not super tech-savvy, so I really appreciated how patient and helpful the team was. They explained things clearly and built a site that looks professional."
  },
  {
    name: "Zara Osei",
    position: "Manager, Willow Tree Wellness",
    content: "AIWebHub helped us move from an outdated site to something fresh and modern. Since launching, we've seen more appointment bookings and better feedback."
  },
  {
    name: "Finn O'Brien",
    position: "CEO, TechStart Solutions",
    content: "The team delivered exceptional results on time and under budget. Their expertise in digital marketing has transformed our online presence completely."
  }
]

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

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.aiwebhub.io/#organization",
    "name": "AIWebHub",
    "url": "https://www.aiwebhub.io",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": testimonials.length.toString()
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": t.content
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Hero />
      <PortfolioSection />
      <TestimonialsSection />
    </>
  )
}