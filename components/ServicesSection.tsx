"use client"

import { motion } from 'framer-motion'
import { Globe, MapPin, Search, Star, Megaphone, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Vortex } from '@/components/ui/vortex'

const services = [
  {
    title: "Website Development",
    description: "Professional, conversion-focused websites that establish credibility and turn visitors into customers.",
    icon: Globe,
    image: "/services/webdev.png",
    delay: 0.1,
  },
  {
    title: "Listings Management",
    description: "Ensure your business information is accurate and consistent across all online directories and platforms.",
    icon: MapPin,
    delay: 0.15,
  },
  {
    title: "Search Engine Optimization",
    description: "Get found by more customers with comprehensive SEO strategies that improve your visibility in search results.",
    icon: Search,
    image: "/services/seo.png",
    delay: 0.2,
  },
  {
    title: "Online Reviews",
    description: "Build trust and credibility with strategic review management that showcases your reputation.",
    icon: Star,
    image: "/services/reviews.png",
    delay: 0.25,
  },
  {
    title: "Google Ads",
    description: "Drive targeted traffic and generate leads with expertly managed Google Ads campaigns.",
    icon: Megaphone,
    image: "/services/googleads.png",
    delay: 0.3,
  },
  {
    title: "Social Media Marketing",
    description: "Engage your audience and grow your brand with strategic social media campaigns across all platforms.",
    icon: Share2,
    image: "/services/socialmedia.png",
    delay: 0.35,
  },
]

export const ServicesSection = () => {
  return (
    <div className="w-full h-[1200px] sm:h-[1000px] md:h-[1000px] overflow-hidden">
      <Vortex
        backgroundColor="black"
        particleCount={300}
        baseHue={220}
        rangeY={600}
        baseSpeed={0.4}
        rangeSpeed={1.5}
        baseRadius={2}
        rangeRadius={3}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-8 md:py-4 w-full h-full"
      >
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Complete Digital Marketing Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Everything your small business needs to succeed online - from website development to digital marketing and reputation management.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8 md:pb-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.delay }}
                viewport={{ once: true }}
              >
                <Card className="group border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                  <CardHeader>
                    {service.image ? (
                      <div className="mb-4 h-48 w-full rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Vortex>
    </div>
  )
}