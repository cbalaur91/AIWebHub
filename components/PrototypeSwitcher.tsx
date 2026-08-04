"use client"

// PROTOTYPE — issue #12. Throwaway. Never rendered in production builds.

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PrototypeSwitcherProps {
  variants: { key: string; name: string }[]
  current: string
}

export const PrototypeSwitcher = ({ variants, current }: PrototypeSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current)
  )

  const go = (delta: number) => {
    const next = variants[(index + delta + variants.length) % variants.length]
    const params = new URLSearchParams(searchParams.toString())
    params.set('variant', next.key)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return
      }
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (process.env.NODE_ENV === 'production') return null

  const active = variants[index]

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full bg-white text-neutral-900 shadow-2xl shadow-black/50 px-1.5 py-1.5 ring-1 ring-black/10">
      <button
        onClick={() => go(-1)}
        aria-label="Previous variant"
        className="rounded-full p-2 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="px-3 text-sm font-medium tabular-nums whitespace-nowrap">
        {active.key} — {active.name}
      </span>
      <button
        onClick={() => go(1)}
        aria-label="Next variant"
        className="rounded-full p-2 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
