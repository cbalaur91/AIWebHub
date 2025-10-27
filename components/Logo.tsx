'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2', className)}>
      <span className={cn(
        'font-black tracking-tight text-white uppercase transition-all hover:text-blue-400',
        sizeClasses[size]
      )}>
        AIWEBHUB
      </span>
    </Link>
  )
}