"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  tags: string[]
  url: string
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "Romanian Banquet Hall",
    category: "landing-page",
    image: "/Banquet_Hall.JPG",
    description: "Located in Warren, Mi, Romanian Banquet Hall offers an elegant and sophisticated venue for your special events. With over 20 years of experience, we've hosted countless weddings, corporate events, and celebrations.",
    tags: ["UI/UX", "React", "Animation"],
    url: "https://www.romanianbanquethall.com/"
  },
  {
    id: "project-2",
    title: "Quality Work Granite",
    category: "portfolio",
    image: "/kitchen.jpg",
    description: "Crafting exceptional stone surfaces for discerning homeowners.",
    tags: ["Portfolio", "Gatsby", "Animation"],
    url: "https://www.qwgranite.com/"
  },
  {
    id: "project-3",
    title: "Romanian Food Festival",
    category: "landing-page",
    image: "/RFF.png",
    description: "Experience authentic Romanian cuisine and culture in Rochester Hills, Michigan.",
    tags: ["Landing Page", "Next.js", "Dashboard"],
    url: "https://www.romanianfoodfestival.org/"
  },
  {
    id: "project-4",
    title: "Church Fundraising",
    category: "landing-page",
    image: "/schooldesign.jpg",
    description: "Support our mission to create new classrooms for religious education",
    tags: ["Landing Page", "Fundraising", "Animation"],
    url: "https://fundraising-pogorarea-sfantului-duh.vercel.app/"
  },
  {
    id: "project-5",
    title: "Nurture Track",
    category: "business",
    image: "/nurture-track.png",
    description: "Track development, plan vaccinations, and access expert guidance—all in one beautifully designed, easy-to-use platform.",
    tags: ["Business", "Security", "Dashboard"],
    url: "https://www.nurturetrack.app/"
  },
  {
    id: "project-6",
    title: "88 Transpoort LLC",
    category: "landing-page",
    image: "/88transpoort-logo.jpeg",
    description: " Join Chicago's premier car hauling company as an owner operator. Competitive rates, consistent loads, and unmatched support.",
    tags: ["Landing Page", "Car Hauling", "Transportation"],
    url: "https://www.88transpoortllc.com/" 
  },
]

const categories = [
  { label: "All", value: "all" },
  { label: "Landing Pages", value: "landing-page" },
  { label: "Portfolios", value: "portfolio" },
  { label: "Business Sites", value: "business" },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="bg-[#111111] pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Our Portfolio
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Explore our latest projects and see how we've helped businesses achieve their digital goals.
          </p>
        </div>
      </div>

      {/* Portfolio Filter */}
      <section className="relative py-12 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                className={
                  activeCategory === category.value
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                    : "border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
                }
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group overflow-hidden border-0 bg-[#1a1a1a] hover:shadow-xl transition-all duration-300">
                  <div 
                    className="aspect-video w-full overflow-hidden cursor-pointer"
                    onClick={() => window.open(project.url, '_blank')}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 
                          className="text-xl font-bold text-white cursor-pointer hover:text-blue-500 transition-colors"
                          onClick={() => window.open(project.url, '_blank')}
                        >
                          {project.title}
                        </h3>
                        <p className="mt-2 text-gray-400">{project.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-lg text-gray-300 mb-8">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 px-8 py-6"
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Start a Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}