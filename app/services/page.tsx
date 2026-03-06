"use client"

import { CheckCircle, Code, Globe, Monitor, TrendingUp, Zap, Target, Bot, Brain } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

interface PricingPlan {
  id: string;
  name: string;
  oneTimePrice: string;
  monthlyPrice: string;
  oneTimePriceValue: number;
  monthlyPriceValue: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    oneTimePrice: "$499",
    monthlyPrice: "$30",
    oneTimePriceValue: 499,
    monthlyPriceValue: 30,
    description: "Perfect for businesses starting their online presence with a professional website.",
    features: [
      "Single-page website design",
      "Mobile-responsive development",
      "Basic SEO setup",
      "Website hosting & maintenance",
      "Email support",
    ],
  },
  {
    id: "essentials",
    name: "Essentials",
    oneTimePrice: "$999",
    monthlyPrice: "$50",
    oneTimePriceValue: 999,
    monthlyPriceValue: 50,
    description: "Comprehensive web solution for businesses ready to leverage modern technology.",
    features: [
      "Everything in Starter",
      "Custom multi-page website",
      "Basic AI chatbot integration",
      "Content management system",
      "GEO — AI search optimization",
      "Priority email & phone support",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    oneTimePrice: "$1,999",
    monthlyPrice: "$100",
    oneTimePriceValue: 1999,
    monthlyPriceValue: 100,
    description: "Full-service technology solutions for businesses serious about digital innovation.",
    features: [
      "Everything in Essentials",
      "E-commerce functionality",
      "Social media content creation",
      "Advanced AI integrations",
      "Advanced GEO & AI citation monitoring",
      "POS system integration",
      "Custom web applications",
      "Advanced analytics dashboard",
      "Bi-weekly performance reports",
      "Dedicated account manager",
    ],
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    oneTimePrice: "$2,499",
    monthlyPrice: "$150",
    oneTimePriceValue: 2499,
    monthlyPriceValue: 150,
    description: "Custom AI agents built for your business — automate tasks, answer questions, and streamline operations.",
    features: [
      "Custom AI agent development",
      "Business data & knowledge base training",
      "API & third-party integrations",
      "Multi-platform deployment",
      "Conversation flow design",
      "Performance monitoring & analytics",
      "Monthly agent tuning & updates",
      "Dedicated AI specialist support",
    ],
  },
]

const stats = [
  { value: '4', label: 'Flexible Plans', icon: Target },
  { value: '$499', label: 'Starting From', icon: Zap },
  { value: '100%', label: 'Satisfaction', icon: TrendingUp }
]

export default function ServicesPage() {
  const serviceFaqs = [
    {
      question: "What is AI integration and how can it benefit my business?",
      answer: "AI integration refers to the process of embedding artificial intelligence capabilities directly into your website or business application. This can include AI-powered chatbots that handle customer inquiries around the clock, intelligent search features that help visitors find products or information faster, personalized content recommendations based on user behavior, and automated workflows that reduce manual tasks. For businesses, AI integration means improved customer experience, reduced operational costs, and the ability to scale support without proportionally increasing staff. At AIWebHub, we implement AI solutions using modern APIs and frameworks, ensuring they integrate seamlessly with your existing website and business tools. Whether you run an e-commerce store, a service-based business, or a content platform, AI integration can help you serve customers better and operate more efficiently."
    },
    {
      question: "How much does a custom website cost in 2026?",
      answer: "The cost of a custom website in 2026 depends on the scope, features, and complexity of your project. At AIWebHub, our Starter plan begins at $499 as a one-time fee plus $30 per month for ongoing support, which includes single-page website design, mobile-responsive development, basic SEO, and hosting. Our Essentials plan starts at $999 plus $50 per month and adds a custom multi-page website, AI chatbot integration, a content management system, and GEO optimization. For businesses needing e-commerce functionality, social media content creation, advanced AI features, POS integration, and custom web applications, our Professional plan starts at $1,999 plus $100 per month. For businesses looking to deploy custom AI agents, our AI Agents plan starts at $2,499 plus $150 per month and includes agent development, knowledge base training, and multi-platform deployment. These prices reflect the starting cost; additional complexity or custom features may require a tailored quote. Compared to industry averages, our pricing is competitive because we handle design, development, AI integration, and ongoing maintenance under one roof, eliminating the need for multiple vendors."
    },
    {
      question: "What's included in website maintenance and support?",
      answer: "Website maintenance and support at AIWebHub covers everything needed to keep your site running smoothly after launch. This includes web hosting on fast, reliable infrastructure, regular software and security updates, performance monitoring to ensure fast page load times, content updates and minor design adjustments, SSL certificate management, daily backups, and uptime monitoring. Our monthly support plans also include bug fixes, browser compatibility checks, and analytics reporting so you can track how your site is performing. If you need design changes, new pages, or feature additions beyond routine maintenance, we handle those as part of your support plan or through a scoped project quote. Support can be cancelled with 30 days notice, and all plans include email support with priority response for Essentials and Professional tiers."
    },
    {
      question: "How long does it take to build a custom website?",
      answer: "The timeline for building a custom website depends on the type and complexity of the project. A single-page landing site with a modern design typically takes one to two weeks from kickoff to launch. A multi-page business website with custom layouts, content management, and contact forms usually takes two to four weeks. E-commerce stores with product catalogs, payment processing, and AI-powered features require four to eight weeks to build and thoroughly test. At AIWebHub, we begin every project with a discovery phase where we define your goals, gather brand assets, and map out the sitemap and design direction. We then move through design, development, review, and launch phases with regular check-ins so you can provide feedback at every stage. Rush timelines are available for projects that need to launch sooner."
    },
    {
      question: "What is GEO and how does it help my business get found by AI?",
      answer: "GEO stands for Generative Engine Optimization. It is the practice of optimizing your website so that AI-powered search tools like ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot can find, understand, and cite your business when answering user queries. Unlike traditional SEO which focuses on ranking in a list of links, GEO focuses on making your content clear, authoritative, and structured so that AI models select it as a trusted source. Our GEO service includes schema markup implementation, content structuring with answer-first formatting, entity consistency audits across your online presence, and E-E-A-T optimization. The Professional plan adds ongoing AI citation monitoring so you can track when and where AI search engines reference your business. With over 180 million people using ChatGPT monthly and Google AI Overviews appearing in roughly 30 percent of informational searches, GEO is becoming essential for businesses that want to stay visible as search behavior shifts toward AI-powered tools."
    },
    {
      question: "Can you integrate my existing POS system with my website?",
      answer: "Yes, POS system integration is one of our core services at AIWebHub. We connect popular point-of-sale systems like Square, Clover, Toast, and Shopify POS with your website so that inventory, pricing, and order data stay synchronized across your physical and online storefronts. This means when a product sells in your brick-and-mortar store, your website inventory updates automatically, and vice versa. POS integration also enables features like online ordering with in-store pickup, unified customer databases, consolidated sales reporting, and real-time stock level displays on your website. Our Professional plan includes POS integration as a standard feature, and we can customize the connection to fit your specific workflow. If you use a less common POS system, we can evaluate compatibility and build a custom integration using available APIs."
    },
    {
      question: "What are AI agents and how can they help my business?",
      answer: "AI agents are autonomous software programs powered by large language models that can perform tasks, answer questions, and make decisions on behalf of your business. Unlike basic chatbots that follow scripted responses, AI agents understand context, learn from your business data, and handle complex multi-step interactions. At AIWebHub, we build custom AI agents trained on your specific knowledge base — product catalogs, policies, procedures, and FAQs — so they can provide accurate, brand-consistent responses to customers around the clock. Common use cases include customer support agents that resolve inquiries without human intervention, sales assistants that qualify leads and recommend products, scheduling agents that book appointments and manage calendars, and internal operations agents that automate repetitive workflows like data entry or report generation. Our AI Agents plan starts at $2,499 with $150 per month for ongoing maintenance, which includes custom agent development, API integrations with your existing tools, multi-platform deployment across your website, Slack, or email, and monthly tuning to improve accuracy and performance. Businesses using AI agents typically see faster response times, lower support costs, and the ability to scale customer interactions without proportionally increasing headcount."
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": serviceFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing Plans - AIWebHub",
    "description": "Choose from our flexible pricing plans for web design, AI integration, AI agents, and custom development solutions. Starter, Essentials, Professional, and AI Agents plans to fit your business needs.",
    "url": "https://www.aiwebhub.io/services",
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-27",
    "mainEntity": {
      "@type": "Organization",
      "name": "AIWebHub",
      "url": "https://www.aiwebhub.io",
      "description": "Web design and AI integration studio creating innovative digital solutions for modern businesses",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pricing Plans",
        "itemListElement": pricingPlans.map((plan) => ({
          "@type": "Offer",
          "name": plan.name,
          "description": plan.description,
          "priceSpecification": [
            {
              "@type": "UnitPriceSpecification",
              "price": plan.oneTimePriceValue.toString(),
              "priceCurrency": "USD",
              "unitText": "one-time"
            },
            {
              "@type": "UnitPriceSpecification",
              "price": plan.monthlyPriceValue.toString(),
              "priceCurrency": "USD",
              "unitText": "monthly"
            }
          ]
        }))
      }
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aiwebhub.io" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.aiwebhub.io/services" }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Pricing</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">flexible plans for every business</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Simple pricing, powerful results
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Choose the perfect plan for your business. All plans include our complete suite of web design and AI integration solutions designed to help businesses succeed with modern technology.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: February 2026</p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="#pricing" variant="primary">
                View Plans
              </GradientButton>
              <GradientButton href="/contact" variant="secondary">
                Contact Sales
              </GradientButton>
            </div>
          </div>

          {/* Right stats */}
          <div className="lg:col-span-5 animate-fadeInRight animation-delay-400">
            <div className="grid grid-cols-1 gap-4 stagger-animation">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="sm:p-6 hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-white/5">
                    <stat.icon className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Plans</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">choose what fits your needs</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 stagger-animation">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl border bg-zinc-900/60 backdrop-blur hover-lift transition-all duration-300 ${
                plan.popular
                  ? 'border-white/20 scale-[1.02] shadow-xl shadow-white/5'
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-medium text-white border border-white/10">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div>
                  <h2 className="text-2xl font-light text-white tracking-tight">
                    {plan.name}
                  </h2>
                  <div className="mt-4">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Starting from</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-5xl font-light text-white tracking-tighter">{plan.oneTimePrice}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl font-light text-zinc-300">+ {plan.monthlyPrice}</span>
                      <span className="text-sm text-zinc-500">/month for support</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-3 items-start">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" strokeWidth={1.5} />
                      <p className="text-sm text-zinc-300 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <GradientButton href="/contact" variant={plan.popular ? "primary" : "secondary"} className="w-full">
                    Get Started
                  </GradientButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Website Types Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Services</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">what we build</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="mt-8">
          <h2 className="text-[44px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInUp animation-delay-200 max-w-3xl">
            Custom websites & AI solutions for every business
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl animate-fadeInUp animation-delay-300">
            From high-converting websites to intelligent AI agents, we create tailored solutions that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 stagger-animation">
          {[
            {
              title: "Landing Pages",
              description: "Conversion-focused pages designed to turn visitors into leads with compelling CTAs and optimized user journeys.",
              icon: Monitor,
              image: "/services/landing.jpg",
              iconColor: "text-blue-400"
            },
            {
              title: "E-commerce Stores",
              description: "Complete online stores with secure payment processing, inventory management, and seamless customer experience.",
              icon: Code,
              image: "/services/ecomm.jpg",
              iconColor: "text-purple-400"
            },
            {
              title: "Multi-Page Business Sites",
              description: "Comprehensive websites with multiple pages to showcase all aspects of your business and services.",
              icon: Globe,
              image: "/services/business.jpg",
              iconColor: "text-emerald-400"
            },
            {
              title: "AI Agents",
              description: "Intelligent AI agents trained on your business data to automate customer support, streamline workflows, and handle tasks 24/7.",
              icon: Bot,
              image: "/services/AiAgents.png",
              iconColor: "text-cyan-400"
            },
          ].map((service, index) => (
            <article
              key={index}
              className="relative overflow-hidden group hover:border-white/20 transition-all duration-300 bg-neutral-900 border-white/10 border rounded-2xl hover-lift"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 border-white/15 border rounded-full py-1.5 px-2.5 backdrop-blur">
                    <service.icon className={`w-3.5 h-3.5 ${service.iconColor}`} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-white tracking-tight">{service.title}</h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">FAQ</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">common questions about our services</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <Accordion type="single" collapsible className="mt-8 max-w-3xl">
          {serviceFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>
                <h2 className="text-lg sm:text-xl font-light text-inherit tracking-tight pr-4">
                  {faq.question}
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </>
  )
}
