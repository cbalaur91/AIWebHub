"use client"

import { ContactForm } from '@/components/ContactForm'
import { GradientButton } from '@/components/ui/gradient-button'
import { Mail, Phone, MessageSquare } from 'lucide-react'

const faqs = [
  {
    question: "What's included in each pricing plan?",
    answer: "Our Starter plan (starting from $499 + $30/mo) includes custom website design, mobile-responsive development, and basic SEO. Essentials (starting from $999 + $50/mo) adds e-commerce functionality, AI chatbot integration, and content creation. Professional (starting from $1,999 + $100/mo) includes everything plus advanced AI integrations, POS system integration, and a dedicated account manager. One-time fees cover initial development, while monthly fees include ongoing support, maintenance, and adjustments."
  },
  {
    question: "How does the pricing model work?",
    answer: "Our pricing has two components: a one-time project fee for initial development and a monthly fee for ongoing support, maintenance, and adjustments. The 'starting from' pricing allows us to customize solutions - additional features or complexity may require a custom quote. Monthly support can be cancelled with 30 days notice."
  },
  {
    question: "How long does it take to build a website?",
    answer: "Timeline varies by project complexity. A landing page typically takes 1-2 weeks, a multi-page business site 2-4 weeks, and e-commerce stores with AI integrations 4-8 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What information do you need to get started?",
    answer: "To get started, we'll need information about your business goals, brand guidelines (if any), content/images you'd like to use, and any existing systems (POS, inventory) you want integrated. We'll guide you through the onboarding process."
  },
  {
    question: "What AI features can you integrate into my website?",
    answer: "We can integrate various AI-powered features including chatbots for customer service, intelligent search, personalized recommendations, automated content generation, analytics dashboards, and custom machine learning solutions tailored to your business needs."
  },
  {
    question: "Can I customize a plan to fit my specific needs?",
    answer: "Absolutely! While our three standard plans work great for most businesses, we understand every business is unique. Contact us to discuss your specific needs, and we can create a custom package that fits your requirements and budget."
  }
]

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - AIWebHub",
    "description": "Get in touch with AIWebHub for innovative web design and AI integration solutions for your business",
    "url": "https://www.aiwebhub.io/contact",
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-16"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aiwebhub.io" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.aiwebhub.io/contact" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <span className="text-4xl font-medium text-white">Contact</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">let's start a conversation</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              Let's discuss your <span className="text-white/90">business goals</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Ready to transform your digital presence? We're here to help your business succeed with innovative web design and AI-powered solutions.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: February 2026</p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="#contact-form" variant="primary">
                Send Message
              </GradientButton>
              <GradientButton href="/services" variant="secondary">
                View Services
              </GradientButton>
            </div>
          </div>

          {/* Right contact methods */}
          <div className="lg:col-span-5 animate-fadeInRight animation-delay-400">
            <div className="grid grid-cols-1 gap-4 stagger-animation">
              <article className="hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white tracking-tight">Email Us</h3>
                  <a
                    href="mailto:info@aiwebhub.io"
                    className="mt-1 text-sm text-zinc-400 hover:text-blue-400 transition-colors block"
                  >
                    info@aiwebhub.io
                  </a>
                </div>
              </article>

              <article className="hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white tracking-tight">Call Us</h3>
                  <a
                    href="tel:+17343416746"
                    className="mt-1 text-sm text-zinc-400 hover:text-purple-400 transition-colors block"
                  >
                    +1 (734) 341-6746
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Get in Touch</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">send us a message</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left - Contact Form */}
          <div className="lg:col-span-7 animate-fadeInLeft animation-delay-300">
            <ContactForm />
          </div>

          {/* Right - Info */}
          <div className="lg:col-span-5 space-y-6 animate-fadeInRight animation-delay-400">
            <div>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Start Your Journey
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                Whether you're starting a new project, looking to enhance your current digital presence, or have questions about our services, we're here to help.
              </p>
            </div>

            <div className="bg-zinc-900/60 border-white/10 border rounded-2xl p-6 hover-lift">
              <div className="flex items-start gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">What to Expect</h3>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Free consultation to discuss your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Personalized strategy tailored to your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
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
          <span className="text-sm text-neutral-300">common questions</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="mt-8">
          <h2 className="text-[44px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInUp animation-delay-200 max-w-3xl">
            Everything you need to know
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 stagger-animation">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="bg-zinc-900/60 border-white/10 border rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-lg font-medium text-white mb-3 tracking-tight">
                {faq.question}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

    </>
  )
}
