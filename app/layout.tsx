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
  title: 'AIWebHub - Complete PR & Digital Marketing Solutions for Small Business',
  description: 'Full-service digital marketing and PR solutions for small businesses. Website development, SEO, listings management, online reviews, Google Ads, and social media marketing - all in one place.',
  keywords: 'digital marketing, PR services, small business marketing, website development, SEO, listings management, online reviews, Google Ads, social media marketing, reputation management',
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
    title: 'AIWebHub - Complete PR & Digital Marketing Solutions',
    description: 'Transform your small business with comprehensive PR and digital marketing services. One partner for your complete digital presence.',
    url: 'https://www.aiwebhub.io',
    siteName: 'AIWebHub',
    images: [
      {
        url: 'https://www.aiwebhub.io/thumbnails/logo-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'AIWebHub - Complete PR & Digital Marketing Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIWebHub - Complete PR & Digital Marketing Solutions',
    description: 'Full-service digital marketing for small businesses. Website development, SEO, Google Ads, social media, and more.',
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
              "alternateName": "AIWebHub - Complete PR & Digital Marketing Solutions",
              "url": "https://www.aiwebhub.io",
              "logo": "https://www.aiwebhub.io/logo/logo.png",
              "image": "https://www.aiwebhub.io/thumbnails/logo-thumbnail.png",
              "description": "Full-service digital marketing agency providing comprehensive PR solutions for small businesses",
              "sameAs": [
                "https://twitter.com/aiwebhub"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "foundingDate": "2024",
              "areaServed": "Worldwide",
              "serviceType": [
                "Digital Marketing",
                "Public Relations",
                "Website Development",
                "Search Engine Optimization",
                "Listings Management",
                "Online Reviews Management",
                "Google Ads Management",
                "Social Media Marketing"
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