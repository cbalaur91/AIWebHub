"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { Logo } from '@/components/Logo'

const NavLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="relative z-10 sm:px-6 md:px-10 animate-slideDown bg-zinc-950 w-full max-w-7xl border-white/10 border rounded-3xl mt-6 mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <Logo />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors hover:scale-105 duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <GradientButton href="/contact" variant="primary">
            Get Started
          </GradientButton>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="md:hidden flex flex-col bg-zinc-900/95 backdrop-blur-md px-4 py-6 mt-4 rounded-2xl border border-white/10 relative z-50">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-neutral-300 hover:text-white py-3 transition-colors border-b border-white/5 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <GradientButton href="/contact" variant="primary" className="w-full">
                Get Started
              </GradientButton>
            </div>
          </div>
        </>
      )}
    </header>
  )
}