import { Hero } from '@/components/Hero'
import { PortfolioSection } from '@/components/PortfolioSection'
import { ClientWorkSection } from '@/components/ClientWorkSection'
import { ProofSection } from '@/components/ProofSection'
import { HowWeWork } from '@/components/HowWeWork'
import { FaqBlock, type FaqItem } from '@/components/FaqBlock'
import { QuoteCta } from '@/components/QuoteCta'
import { ORG, SITE_URL } from '@/lib/site'

// Homepage questions are deliberately disjoint from the `/services` set: these
// are the ones a reader asks before they care what we build — where we work,
// why there are no reviews, who does the work, what happens after launch.
// Every answer traces to something already in the repo (lib/portfolio-data.ts,
// app/about/page.tsx, the existing /services copy). Nothing here is invented.
const homeFaqs: FaqItem[] = [
  {
    question: 'Do you only work with Michigan businesses?',
    answer:
      'No. The studio is based in Michigan and four of the businesses we build for are within half an hour of Detroit — Warren, Utica and Rochester Hills — but the portfolio also holds a driver-recruitment site for a Chicago car hauler and a hotel-search platform that runs in more than thirty languages. Discovery calls, preview links and reviews all happen remotely either way, so distance rarely decides anything. Being local mostly means we can meet at your place of business if that is easier.',
  },
  {
    question: 'You do not show reviews. Why should I trust the work?',
    answer:
      'Because you can check it without us. Every project in the portfolio links to the live site, so you can open it, use it on your phone and form your own view in about two minutes — which is more than a star rating tells you anyway. Each project also has a written case study covering what the client needed, what we proposed and what shipped. AIWebHub has never collected star ratings, so rather than publish a number we cannot back, we publish the addresses.',
    link: { href: '/portfolio', label: 'Open the portfolio' },
  },
  {
    question: 'How do you quote a project with no price list?',
    answer:
      'We scope it first. One call establishes what the site has to do, and the quote that follows is a written scope with a project price attached, usually within a day. It stays fixed unless the scope changes. A published tier would have to be priced for an average business, which is how agencies end up charging the same for a one-page site and a booking-driven salon. If you want a range before that conversation, our cost calculator reports what independent 2026 surveys say a build like yours costs.',
    link: { href: '/tools/website-cost-calculator', label: 'Open the cost calculator' },
  },
  {
    question: 'Who actually does the work?',
    answer:
      'Cosmin Balaur, who founded AIWebHub in 2024 and is its lead developer, works directly on every build — the person you talk to on the first call is the person writing the code. The stack is Next.js, React and TypeScript, deployed as static files to a global CDN, and it is the same stack this site runs on. You can judge it from the page you are reading.',
  },
  {
    question: 'Can you work with the site I already have?',
    answer:
      'Yes, and it is a common starting point. Some of the sites in our portfolio replaced something older that was slow on a phone, invisible in local search, or no longer looked like the business it represented. A rebuild begins the same way a new build does: a call about what is not working, then a written scope covering what carries across — content, URLs and the search rankings you have already earned.',
  },
  {
    question: 'What happens after the site launches?',
    answer:
      'It is yours. The site, the domain and the analytics transfer to you at launch, and nothing about the handover depends on you staying. Ongoing support is a separate, optional monthly plan covering hosting, security and software updates, daily backups, uptime monitoring, performance checks and content changes, and it can be cancelled with 30 days notice.',
  },
]

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <PortfolioSection />
      <ClientWorkSection />
      <ProofSection />
      <HowWeWork />
      <FaqBlock
        eyebrow="FAQ"
        caption="what people ask before the first call"
        heading="Questions we get before anyone signs anything"
        items={homeFaqs}
      />
      <QuoteCta
        heading="Tell us what the site has to do"
        body="Send over what the business needs and we will come back with a written scope and a project price, usually within a day. If you would rather look at the work first, that is the better order anyway."
        secondary={{ href: '/portfolio', label: 'See the work' }}
      />
    </>
  )
}
