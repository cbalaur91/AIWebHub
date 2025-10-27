import { CheckCircle, Code, Globe, MapPin, Search, Star, Megaphone, Share2, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - AIWebHub | Complete Digital Marketing & PR Solutions',
  description: 'Full-service digital marketing and PR solutions for small businesses. Website development, SEO, listings management, online reviews, Google Ads, and social media marketing.',
  keywords: 'digital marketing, PR services, website development, SEO, listings management, online reviews, Google Ads, social media marketing, small business marketing',
  openGraph: {
    title: 'Complete Digital Marketing & PR Solutions - AIWebHub',
    description: 'Transform your small business with our comprehensive PR and digital marketing services. From websites to social media, we have you covered.',
    url: 'https://aiwebhub.io/services',
    siteName: 'AIWebHub',
    images: [
      {
        url: 'https://aiwebhub.io/AiWebHubLogo.jpg',
        width: 1200,
        height: 630,
        alt: 'AIWebHub Services - Complete PR Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Digital Marketing & PR Solutions - AIWebHub',
    description: 'Full-service digital marketing for small businesses. Website development, SEO, Google Ads, social media, and more.',
    images: ['https://aiwebhub.io/AiWebHubLogo.jpg'],
  },
  alternates: {
    canonical: '/services',
  },
}

interface ServiceFeature {
  title: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: ServiceFeature[];
  price: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: "website-development",
    title: "Website Development",
    description: "Professional, conversion-focused websites that establish credibility and turn visitors into customers.",
    icon: Globe,
    features: [
      { title: "Custom Design", description: "Tailored to your brand identity and business goals" },
      { title: "Mobile Responsive", description: "Perfect experience on all devices" },
      { title: "SEO Foundation", description: "Built with search engine optimization in mind" },
      { title: "Fast Loading", description: "Optimized for speed and performance" },
      { title: "Easy Updates", description: "Simple content management system" },
    ],
    price: "From $1,500",
    popular: true,
  },
  {
    id: "listings-management",
    title: "Listings Management",
    description: "Ensure your business information is accurate and consistent across all online directories and platforms.",
    icon: MapPin,
    features: [
      { title: "Directory Sync", description: "Consistent information across 50+ directories" },
      { title: "Real-Time Updates", description: "Changes reflected across all platforms instantly" },
      { title: "Duplicate Removal", description: "Clean up conflicting business listings" },
      { title: "Performance Reports", description: "Track your local visibility and engagement" },
      { title: "Citation Building", description: "Improve local SEO with quality citations" },
    ],
    price: "From $99/month",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "Get found by more customers with comprehensive SEO strategies that improve your visibility in search results.",
    icon: Search,
    features: [
      { title: "Keyword Research", description: "Target the right terms for your business" },
      { title: "On-Page Optimization", description: "Technical SEO and content optimization" },
      { title: "Local SEO", description: "Dominate local search results in your area" },
      { title: "Link Building", description: "Quality backlinks to boost authority" },
      { title: "Monthly Reports", description: "Track rankings and traffic growth" },
    ],
    price: "From $499/month",
    popular: true,
  },
  {
    id: "online-reviews",
    title: "Online Reviews",
    description: "Build trust and credibility with strategic review management that showcases your reputation.",
    icon: Star,
    features: [
      { title: "Review Monitoring", description: "Track reviews across all platforms" },
      { title: "Review Generation", description: "Automated requests to satisfied customers" },
      { title: "Response Management", description: "Professional responses to all reviews" },
      { title: "Reputation Dashboard", description: "Monitor your online reputation in real-time" },
      { title: "Feedback Insights", description: "Learn from customer feedback" },
    ],
    price: "From $149/month",
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Drive targeted traffic and generate leads with expertly managed Google Ads campaigns.",
    icon: Megaphone,
    features: [
      { title: "Campaign Strategy", description: "Custom campaigns for your business goals" },
      { title: "Keyword Targeting", description: "Reach customers searching for your services" },
      { title: "Ad Copywriting", description: "Compelling ads that drive clicks" },
      { title: "Budget Management", description: "Maximize ROI with smart spending" },
      { title: "Performance Tracking", description: "Detailed reports on campaign success" },
    ],
    price: "From $299/month + ad spend",
    popular: true,
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Engage your audience and grow your brand with strategic social media campaigns across all platforms.",
    icon: Share2,
    features: [
      { title: "Content Strategy", description: "Planned content that resonates with your audience" },
      { title: "Post Creation", description: "Professional graphics and engaging copy" },
      { title: "Community Management", description: "Respond to comments and messages" },
      { title: "Paid Social Ads", description: "Targeted advertising on social platforms" },
      { title: "Analytics Reports", description: "Track engagement and growth metrics" },
    ],
    price: "From $399/month",
  },
]

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Services - AIWebHub",
    "description": "Complete digital marketing and PR solutions for small businesses including website development, SEO, listings management, online reviews, Google Ads, and social media marketing.",
    "url": "https://aiwebhub.io/services",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://aiwebhub.io",
      "description": "Full-service digital marketing agency specializing in PR solutions for small businesses",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Website Development",
            "description": "Professional, conversion-focused websites that establish credibility and turn visitors into customers",
            "price": "1500",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "name": "Listings Management",
            "description": "Ensure your business information is accurate and consistent across all online directories",
            "price": "99",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "name": "Search Engine Optimization",
            "description": "Comprehensive SEO strategies that improve your visibility in search results",
            "price": "499",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "name": "Online Reviews Management",
            "description": "Build trust and credibility with strategic review management",
            "price": "149",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "name": "Google Ads Management",
            "description": "Drive targeted traffic and generate leads with expertly managed Google Ads campaigns",
            "price": "299",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "name": "Social Media Marketing",
            "description": "Engage your audience and grow your brand with strategic social media campaigns",
            "price": "399",
            "priceCurrency": "USD"
          }
        ]
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
            Complete PR & Digital Marketing Solutions
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Everything your small business needs to succeed online - one partner, one solution, complete results.
          </p>
        </div>
      </div>

      {/* Featured Services Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`overflow-hidden border-0 bg-[#1a1a1a] transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/10 ${
                  service.popular ? 'relative border-t-2 border-t-pink-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 px-3 py-1 text-xs font-medium text-white">
                    Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <div>
                          <p className="font-medium text-white">{feature.title}</p>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 space-y-4">
                    <p className="text-xl font-bold text-white">{service.price}</p>
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