"use client"

// PROTOTYPE — issue #12, "Design the location page template."
//
// Three structurally different location pages on one throwaway route,
// switchable via ?variant=. All three read the SAME city data object, so the
// reuse mechanism gets tested alongside the layout.
//
//   /prototype/location-page?variant=A          Receipts — proof-led, ~1,400 words
//   /prototype/location-page?variant=B          Answers  — ungated estimator, ~2,800 words
//   /prototype/location-page?variant=C          Local    — place-led, ~2,000 words
//
// Add ?city=ann-arbor to any of them to see the template with ZERO local
// clients, which is the real Ann Arbor situation.
//
// Throwaway. Lives on branch prototype/location-page-template, never on main.

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PrototypeSwitcher } from '@/components/PrototypeSwitcher'
import { prototypeCities } from '@/lib/prototype-location-data'
import { VariantA } from './VariantA'
import { VariantB } from './VariantB'
import { VariantC } from './VariantC'

const variants = [
  { key: 'A', name: 'Receipts' },
  { key: 'B', name: 'Answers' },
  { key: 'C', name: 'Local' },
]

const PrototypeBody = () => {
  const searchParams = useSearchParams()
  const variant = (searchParams.get('variant') ?? 'A').toUpperCase()
  const city = searchParams.get('city') ?? 'detroit'
  const data = prototypeCities[city] ?? prototypeCities.detroit

  return (
    <>
      {variant === 'B' ? (
        <VariantB data={data} />
      ) : variant === 'C' ? (
        <VariantC data={data} />
      ) : (
        <VariantA data={data} />
      )}
      <PrototypeSwitcher variants={variants} current={variant} />
    </>
  )
}

export default function LocationPagePrototype() {
  return (
    <Suspense fallback={null}>
      <PrototypeBody />
    </Suspense>
  )
}
