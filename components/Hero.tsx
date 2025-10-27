"use client"

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/AdobeStock_869902521.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark overlay - reduced opacity */}
      <div className="absolute inset-0 -z-5 bg-black/30" />

      {/* Animated gradient shapes - adjusted z-index and opacity */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <motion.div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 text-center md:px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-4xl"
        >
          <motion.h1
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent pb-2 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Complete PR Solutions for Small Businesses
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-gray-300 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            From stunning websites to comprehensive digital marketing, we provide everything your small business needs to thrive online. One partner for your complete digital presence.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button
                className="h-14 rounded-md px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                className="h-14 rounded-md px-8 border border-gray-700 bg-transparent text-white hover:bg-gray-800"
              >
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}