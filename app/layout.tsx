import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnimatedLines } from '@/components/AnimatedLines'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIWebHub - Web Design & AI Integration Solutions for Modern Businesses',
  description: 'Innovative web design and AI integration solutions for modern businesses. Custom websites, AI-powered features, e-commerce development, POS integration, and creative content services.',
  keywords: 'web design, AI integration, custom websites, AI-powered solutions, e-commerce development, POS integration, Next.js development, modern web applications, creative content, SEO',
  authors: [{ name: 'AIWebHub' }],
  creator: 'AIWebHub',
  publisher: 'AIWebHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.aiwebhub.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AIWebHub - Web Design & AI Integration Solutions',
    description: 'Transform your business with innovative web design and AI-powered solutions. Your technology partner for the digital future.',
    url: 'https://www.aiwebhub.io',
    siteName: 'AIWebHub',
    images: [
      {
        url: 'https://www.aiwebhub.io/thumbnails/logo-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'AIWebHub - Web Design & AI Integration Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIWebHub - Web Design & AI Integration Solutions',
    description: 'Innovative web design and AI integration for modern businesses. Custom development, AI features, e-commerce, and more.',
    images: ['https://www.aiwebhub.io/thumbnails/logo-thumbnail.png'],
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
        <meta property="og:image" content="https://www.aiwebhub.io/thumbnails/logo-thumbnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AIWebHub - Innovative Web Solutions" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="https://www.aiwebhub.io/thumbnails/logo-thumbnail.png" />
        <meta name="twitter:image:alt" content="AIWebHub - Innovative Web Solutions" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AIWebHub",
              "alternateName": "AIWebHub - Web Design & AI Integration Solutions",
              "url": "https://www.aiwebhub.io",
              "logo": "https://www.aiwebhub.io/logo/logo.png",
              "image": "https://www.aiwebhub.io/thumbnails/logo-thumbnail.png",
              "description": "Web design and AI integration studio creating innovative digital solutions for modern businesses",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61574644971669",
                "https://www.linkedin.com/in/cosminbalaur91"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "founder": {
                "@type": "Person",
                "name": "Cosmin Balaur",
                "url": "https://www.linkedin.com/in/cosminbalaur91"
              },
              "foundingDate": "2024",
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Web Design",
                "AI Integration",
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