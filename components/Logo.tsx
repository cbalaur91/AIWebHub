'use client'

import { useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const markSizes: Record<NonNullable<LogoProps['size']>, number> = {
  sm: 24,
  md: 30,
  lg: 38,
}

const textSizes: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
}

export function Logo({ size = 'md', className }: LogoProps) {
  // Unique gradient id so multiple Logo instances never collide.
  const gradientId = `aiwebhub-core-${useId().replace(/:/g, '')}`
  const mark = markSizes[size]

  return (
    <Link
      href="/"
      aria-label="AI Web Hub — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="23"
            y1="23"
            x2="41"
            y2="41"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {/* Six nodes on a point-top hexagon */}
        <g fill="#E2E8F0">
          <circle cx="32" cy="11" r="3.4" />
          <circle cx="50.2" cy="21.5" r="3.4" />
          <circle cx="50.2" cy="42.5" r="3.4" />
          <circle cx="32" cy="53" r="3.4" />
          <circle cx="13.8" cy="42.5" r="3.4" />
          <circle cx="13.8" cy="21.5" r="3.4" />
        </g>
        {/* Radiant core */}
        <circle cx="32" cy="32" r="9.5" fill={`url(#${gradientId})`} />
        <circle cx="32" cy="32" r="9.5" fill="none" stroke="#ffffff" strokeWidth="1.1" opacity="0.3" />
      </svg>

      <span
        className={cn(
          'font-black uppercase leading-none tracking-tight whitespace-nowrap',
          textSizes[size],
        )}
      >
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          AI
        </span>
        {' '}
        <span className="text-white">WEB HUB</span>
      </span>
    </Link>
  )
}
