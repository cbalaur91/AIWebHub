import { ContactForm } from '@/components/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="bg-[#111111] pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Have a project in mind or questions about our services? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-400 mb-8">
                  Whether you're starting a new project, looking to redesign your current website, or just have questions about our services, we're here to help. Reach out to us using your preferred contact method.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-0 bg-[#1a1a1a]">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="font-medium text-white">Email Us</p>
                    <Link
                      href="mailto:aiwebcraftinfo@gmail.com"
                      className="mt-2 text-sm text-blue-500 hover:underline"
                    >
                      aiwebcraftinfo@gmail.com
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-[#1a1a1a]">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                      <Phone className="h-6 w-6 text-purple-500" />
                    </div>
                    <p className="font-medium text-white">Call Us</p>
                    <Link
                      href="tel:+17343416746"
                      className="mt-2 text-sm text-purple-500 hover:underline"
                    >
                      +1 (734) 341-6746
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "What's included in each pricing plan?",
                  answer: "Our Starter plan ($99/mo) includes listings management, website hosting, and review monitoring. Essentials ($399/mo) adds SEO, social media management, and review responses. Professional ($899/mo) includes everything plus Google Ads management, advanced SEO, and a dedicated account manager. All plans include monthly reporting and support."
                },
                {
                  question: "Can I switch between plans or cancel anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. While we don't require long-term contracts, we recommend staying with a plan for at least 3 months to see meaningful results from SEO and digital marketing efforts. You can cancel with 30 days notice."
                },
                {
                  question: "How long does it take to see results from PR and digital marketing?",
                  answer: "Results vary by service. You'll see immediate improvements in listings management and review monitoring. SEO typically shows results in 3-6 months. Social media engagement builds over 2-3 months. Google Ads can drive traffic immediately. We provide regular reports so you can track progress across all services."
                },
                {
                  question: "What information do you need to get started?",
                  answer: "To get started, we'll need access to your current online profiles (website, Google Business, social media), information about your business goals, target audience, and any current marketing materials. We'll guide you through the onboarding process and make it as simple as possible."
                },
                {
                  question: "Do I need to have a website to use your services?",
                  answer: "Not at all! If you don't have a website, we can build one for you as part of your plan. All our monthly plans include website hosting and maintenance. We can create a professional website that integrates seamlessly with your other digital marketing efforts."
                },
                {
                  question: "Can I customize a plan to fit my specific needs?",
                  answer: "Absolutely! While our three standard plans work great for most small businesses, we understand every business is unique. Contact us to discuss your specific needs, and we can create a custom package that includes exactly the services you need at a price that fits your budget."
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-[#1a1a1a] p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}