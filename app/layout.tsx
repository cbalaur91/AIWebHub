import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnimatedLines } from '@/components/AnimatedLines'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'
import { ogCardImages, ORG, SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Michigan Web Design & AI Integration | AIWebHub',
  description: 'Custom websites with AI built in — chatbots, e-commerce, automation and SEO. AIWebHub is a Michigan web design studio serving clients across the United States.',
  authors: [{ name: 'AIWebHub' }],
  creator: 'AIWebHub',
  publisher: 'AIWebHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AIWebHub - Web Design & AI Integration Solutions',
    description: 'Transform your business with innovative web design and AI-powered solutions. Your technology partner for the digital future.',
    url: SITE_URL,
    siteName: 'AIWebHub',
    images: ogCardImages('/'),
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIWebHub - Web Design & AI Integration Solutions',
    description: 'Innovative web design and AI integration for modern businesses. Custom development, AI features, e-commerce, and more.',
    images: ogCardImages('/'),
    creator: '@aiwebhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: '32x32' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicons/favicon.ico',
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/favicon.ico' },
      { rel: 'manifest', url: '/favicons/site.webmanifest' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Share images are declared in `metadata` above, never here. Raw og:image
          / twitter:image tags in this <head> precede the Metadata API's own tags
          rather than replacing them, so crawlers took these and ignored every
          per-route card on the site (issue #20).
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": ORG.name,
              "alternateName": "AIWebHub - Web Design & AI Integration Solutions",
              "url": ORG.url,
              "logo": ORG.logo,
              "image": ORG.ogImage,
              "description": "Web design and AI integration studio creating innovative digital solutions for modern businesses",
              "sameAs": ORG.sameAs,
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "founder": {
                "@type": "Person",
                "name": ORG.founder,
                "url": ORG.authorUrl
              },
              "foundingDate": "2024",
              "areaServed": "United States",
              "knowsAbout": [
                "Web Design",
                "AI Integration",
                "AI Consulting",
                "AI Agent Training",
                "Process Automation Audit",
                "Custom Website Development",
                "E-commerce Solutions",
                "POS System Integration",
                "Next.js Development",
                "Creative Content Services",
                "Search Engine Optimization"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-neutral-950 min-h-screen antialiased text-neutral-100 relative overflow-x-hidden`}>
        <AnimatedLines />
        <Navbar />
        <main className="min-h-screen relative">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}