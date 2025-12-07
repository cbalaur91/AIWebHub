"use client"

import { ContactForm } from '@/components/ContactForm'
import { GradientButton } from '@/components/ui/gradient-button'
import { Mail, Phone, MessageSquare } from 'lucide-react'

const faqs = [
  {
    question: "What's included in each pricing plan?",
    answer: "Our Starter plan ($99/mo) includes listings management, website hosting, and review monitoring. Essentials ($399/mo) adds SEO, social media management, and review responses. Professional ($899/mo) includes everything plus Google Ads management, advanced SEO, and a dedicated account manager."
  },
  {
    question: "Can I switch between plans or cancel anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. While we don't require long-term contracts, we recommend staying with a plan for at least 3 months to see meaningful results. You can cancel with 30 days notice."
  },
  {
    question: "How long does it take to see results?",
    answer: "Results vary by service. You'll see immediate improvements in listings management and review monitoring. SEO typically shows results in 3-6 months. Social media engagement builds over 2-3 months. Google Ads can drive traffic immediately."
  },
  {
    question: "What information do you need to get started?",
    answer: "To get started, we'll need access to your current online profiles (website, Google Business, social media), information about your business goals, target audience, and any current marketing materials. We'll guide you through the onboarding process."
  },
  {
    question: "Do I need to have a website to use your services?",
    answer: "Not at all! If you don't have a website, we can build one for you as part of your plan. All our monthly plans include website hosting and maintenance. We can create a professional website that integrates seamlessly with your other digital marketing efforts."
  },
  {
    question: "Can I customize a plan to fit my specific needs?",
    answer: "Absolutely! While our three standard plans work great for most small businesses, we understand every business is unique. Contact us to discuss your specific needs, and we can create a custom package at a price that fits your budget."
  }
]

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - AIWebHub",
    "description": "Get in touch with AIWebHub for complete PR and digital marketing solutions for your small business",
    "url": "https://www.aiwebhub.io/contact"
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
              Ready to transform your digital presence? We're here to help your small business thrive with complete PR and marketing solutions.
            </p>
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
                    href="mailto:aiwebcraftinfo@gmail.com"
                    className="mt-1 text-sm text-zinc-400 hover:text-blue-400 transition-colors block"
                  >
                    aiwebcraftinfo@gmail.com
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
