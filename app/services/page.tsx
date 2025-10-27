import { CheckCircle, Code, Globe, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans - AIWebHub | Flexible Digital Marketing Solutions',
  description: 'Choose from three flexible pricing plans: Starter ($99/mo), Essentials ($399/mo), or Professional ($899/mo). Complete digital marketing and PR solutions for small businesses.',
  keywords: 'digital marketing pricing, PR services pricing, marketing packages, small business marketing plans, SEO pricing, social media marketing packages',
  openGraph: {
    title: 'Flexible Pricing Plans - AIWebHub',
    description: 'Choose the perfect plan for your business. Starter, Essentials, or Professional - all with complete digital marketing and PR solutions.',
    url: 'https://aiwebhub.io/services',
    siteName: 'AIWebHub',
    images: [
      {
        url: 'https://aiwebhub.io/AiWebHubLogo.jpg',
        width: 1200,
        height: 630,
        alt: 'AIWebHub Pricing Plans - Choose Your Perfect Plan',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flexible Pricing Plans - AIWebHub',
    description: 'Starter ($99/mo), Essentials ($399/mo), or Professional ($899/mo). Complete digital marketing solutions for small businesses.',
    images: ['https://aiwebhub.io/AiWebHubLogo.jpg'],
  },
  alternates: {
    canonical: '/services',
  },
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceMonthly: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$99",
    priceMonthly: 99,
    description: "Perfect for small businesses getting started with their online presence.",
    features: [
      "Basic listings management across major directories",
      "Website hosting & maintenance",
      "Review monitoring dashboard",
      "Monthly performance report",
      "Email support",
    ],
  },
  {
    id: "essentials",
    name: "Essentials",
    price: "$399",
    priceMonthly: 399,
    description: "Comprehensive marketing solution for growing businesses ready to scale.",
    features: [
      "Everything in Starter",
      "SEO optimization & local SEO",
      "Social media management (2 platforms)",
      "Online review management with responses",
      "Quarterly website updates",
      "Priority email & phone support",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$899",
    priceMonthly: 899,
    description: "Full-service digital marketing for businesses serious about growth.",
    features: [
      "Everything in Essentials",
      "Google Ads campaign management",
      "Advanced SEO with link building",
      "Social media management (all platforms)",
      "Weekly content creation",
      "Bi-weekly performance reports",
      "Dedicated account manager",
    ],
  },
]

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing Plans - AIWebHub",
    "description": "Choose from our flexible pricing plans for complete digital marketing and PR solutions. Starter, Essentials, and Professional plans to fit your business needs.",
    "url": "https://aiwebhub.io/services",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://aiwebhub.io",
      "description": "Full-service digital marketing agency specializing in PR solutions for small businesses",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pricing Plans",
        "itemListElement": pricingPlans.map((plan) => ({
          "@type": "Offer",
          "name": plan.name,
          "description": plan.description,
          "price": plan.priceMonthly.toString(),
          "priceCurrency": "USD"
        }))
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-[#111111] pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Simple Pricing, Powerful Results
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Choose the perfect plan for your business. All plans include our complete suite of digital marketing and PR solutions.
          </p>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`overflow-hidden border-0 bg-[#1a1a1a] transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/10 ${
                  plan.popular ? 'relative border-2 border-pink-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <CardDescription className="mt-4 text-gray-400">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <p className="text-gray-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link href="/contact">
                      <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">Website Types We Build</h2>
            <p className="mt-4 text-gray-400">
              As part of our website development service, we create custom websites for various business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Landing Pages",
                description: "Conversion-focused pages designed to turn visitors into leads with compelling CTAs and optimized user journeys.",
                icon: <Monitor className="h-10 w-10 text-blue-500" />,
              },
              {
                title: "E-commerce Stores",
                description: "Complete online stores with secure payment processing, inventory management, and seamless customer experience.",
                icon: <Code className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Multi-Page Business Sites",
                description: "Comprehensive websites with multiple pages to showcase all aspects of your business and services.",
                icon: <Globe className="h-10 w-10 text-pink-500" />,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5">
            <div className="rounded-2xl bg-[#1a1a1a] px-6 py-12 sm:px-12 sm:py-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Ready to start your project?
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  Contact us today to discuss your requirements and get a personalized quote.
                </p>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 px-8 py-6"
                      size="lg"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}