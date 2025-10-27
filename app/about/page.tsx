import { Scroll, Lightbulb, Award, Users, Eye, Zap, Target } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

export default function AboutPage() {
  return (
    <div className="bg-[#111111] pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            About AIWebHub
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            We're your complete PR and digital marketing partner, dedicated to helping small businesses thrive online with comprehensive solutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                At AIWebHub, our mission is to provide small businesses with complete PR and digital marketing solutions that drive real results. We believe that every business deserves access to professional marketing services without the complexity of managing multiple vendors.
              </p>
              <p className="text-gray-300">
                From building your website to managing your online reputation, running your Google Ads campaigns, and creating engaging social media content - we handle it all. One partner, one solution, complete peace of mind.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="bg-black h-full w-full rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/Website_Mission_Video_Creation.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-xl bg-[#1a1a1a] flex items-center justify-center shadow-xl">
                <Scroll className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "Innovation",
                description: "We push boundaries and explore new technologies to create cutting-edge solutions.",
                icon: <Lightbulb className="h-6 w-6" />,
              },
              {
                title: "Quality",
                description: "We never compromise on quality, ensuring every pixel and line of code meets our high standards.",
                icon: <Award className="h-6 w-6" />,
              },
              {
                title: "Collaboration",
                description: "We work closely with our clients, treating their projects as if they were our own.",
                icon: <Users className="h-6 w-6" />,
              },
              {
                title: "Transparency",
                description: "We believe in open communication and keeping our clients informed at every stage.",
                icon: <Eye className="h-6 w-6" />,
              },
              {
                title: "Adaptability",
                description: "We stay agile and responsive to changing trends and client needs.",
                icon: <Zap className="h-6 w-6" />,
              },
              {
                title: "Results",
                description: "We focus on creating websites that achieve tangible, measurable results for our clients.",
                icon: <Target className="h-6 w-6" />,
              },
            ].map((value, index) => (
              <div key={index} className="relative min-h-[280px]">
                <div className="relative h-full rounded-xl border-[0.75px] border-gray-700 p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-lg border-[0.75px] border-gray-700 bg-[#1a1a1a] p-6 shadow-xl">
                    <div className="relative flex flex-1 flex-col justify-between gap-4">
                      <div className="w-fit rounded-lg border-[0.75px] border-gray-600 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3">
                        <div className="text-white">
                          {value.icon}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {value.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}