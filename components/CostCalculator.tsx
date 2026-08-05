"use client"

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Link2, Check } from 'lucide-react'
import {
  BUILD_TYPES,
  SCALES,
  ONGOING_OPTIONS,
  SOURCES,
  DRIVERS,
  buildBands,
  ongoingBands,
  divergence,
  type Band,
  type BandPair,
  type BuildType,
  type Scale,
  type Ongoing,
  type Choice,
} from '@/lib/cost-calculator-data'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** Round the axis up to a readable ceiling so ticks land on whole numbers. */
const NICE_CEILINGS = [1000, 2500, 5000, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000]
const NICE_STEPS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000]

function axisCeiling(max: number): number {
  return NICE_CEILINGS.find((n) => n >= max) ?? Math.ceil(max / 50000) * 50000
}

/** Ticks must be round numbers, so pick the step first and derive the count. */
function ticksFor(ceiling: number): number[] {
  const step = NICE_STEPS.find((s) => ceiling / s <= 5) ?? ceiling / 4
  const count = Math.round(ceiling / step)
  return Array.from({ length: count + 1 }, (_, i) => step * i)
}

function shortMoney(v: number): string {
  if (v === 0) return '$0'
  if (v < 1000) return `$${v}`
  const k = v / 1000
  return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`
}

/**
 * The page's argument, drawn: two survey bands on one axis, sized to scale,
 * each labelled with who said it. No averaged midpoint — the gap is the point.
 */
function BandChart({
  pair,
  unit,
  caption,
  note,
}: {
  pair: BandPair
  unit: '' | '/mo'
  caption: string
  /** Rendered under the chart. Each chart argues its own gap in its own terms. */
  note: (multiple: string) => React.ReactNode
}) {
  const ceiling = axisCeiling(Math.max(pair.goodfirms.high, pair.webfx.high))
  const ticks = ticksFor(ceiling)
  const pct = (v: number) => Math.min(100, (v / ceiling) * 100)

  const rows: { band: Band; sourceId: 'goodfirms' | 'webfx'; heading: string; tone: string }[] = [
    {
      band: pair.goodfirms,
      sourceId: 'goodfirms',
      heading: 'Agencies worldwide quote',
      tone: 'bg-slate-500',
    },
    {
      band: pair.webfx,
      sourceId: 'webfx',
      heading: 'US buyers report paying',
      tone: 'bg-sky-300',
    },
  ]

  const centres = rows.map((r) => (r.band.low + r.band.high) / 2)
  const gapLeft = pct(Math.min(...centres))
  const gapRight = pct(Math.max(...centres))
  const multiple = divergence(pair)

  return (
    <figure className="mt-8">
      <figcaption className="sr-only">{caption}</figcaption>

      {/* Axis */}
      <div className="relative h-5 select-none" aria-hidden="true">
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute top-0 -translate-x-1/2 text-[11px] tabular-nums tracking-[0.08em] text-neutral-500"
            style={{ left: `${pct(t)}%` }}
          >
            {shortMoney(t)}
          </div>
        ))}
      </div>
      <div className="relative h-px w-full bg-white/10" aria-hidden="true">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute top-0 h-1.5 w-px bg-white/10"
            style={{ left: `${pct(t)}%` }}
          />
        ))}
      </div>

      {/* Bands */}
      <div className="mt-6 space-y-7">
        {rows.map(({ band, sourceId, heading, tone }) => {
          const source = SOURCES[sourceId]
          return (
            <div key={sourceId}>
              <div className="relative h-9">
                <div
                  className="absolute inset-y-0 rounded-md motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out"
                  style={{
                    left: `${pct(band.low)}%`,
                    width: `${Math.max(1.5, pct(band.high) - pct(band.low))}%`,
                  }}
                >
                  <div className={`h-full w-full rounded-md ${tone} opacity-90`} />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                  {heading}
                </span>
                <span className="text-xl font-light tabular-nums tracking-tight text-zinc-100">
                  {money.format(band.low)} – {money.format(band.high)}
                  {unit}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 underline decoration-white/20 underline-offset-2 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 rounded-sm"
                >
                  {source.name}
                </a>
                {' · '}
                {band.row}
                {' · '}
                {source.sample}
              </p>
            </div>
          )
        })}
      </div>

      {/* The signature: the disagreement, measured. */}
      {multiple >= 1.3 && (
        <div className="relative mt-6 hidden sm:block" aria-hidden="true">
          <div
            className="absolute h-3 border-x border-b border-amber-400/50 motion-safe:transition-all motion-safe:duration-500"
            style={{ left: `${gapLeft}%`, width: `${Math.max(2, gapRight - gapLeft)}%` }}
          />
          <div
            className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-amber-300/90 motion-safe:transition-all motion-safe:duration-500"
            style={{ left: `${(gapLeft + gapRight) / 2}%` }}
          >
            {multiple.toFixed(1)}× apart
          </div>
        </div>
      )}
      <p className="mt-4 text-sm text-neutral-400 sm:mt-14">{note(multiple.toFixed(1))}</p>
    </figure>
  )
}

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: Choice<T>[]
  value: T
  onChange: (v: T) => void
}) {
  const active = options.find((o) => o.value === value)
  return (
    <fieldset className="min-w-0">
      <legend className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const id = `${name}-${o.value}`
          const selected = o.value === value
          return (
            <span key={o.value}>
              <input
                type="radio"
                id={id}
                name={name}
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={`block cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-sky-300/60 ${
                  selected
                    ? 'border-sky-300/60 bg-sky-300/10 text-sky-100'
                    : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-neutral-200'
                }`}
              >
                {o.label}
              </label>
            </span>
          )
        })}
      </div>
      {active && <p className="mt-2 text-xs text-neutral-500">{active.hint}</p>}
    </fieldset>
  )
}

export function CostCalculator() {
  const [buildType, setBuildType] = useState<BuildType>('brochure')
  const [scale, setScale] = useState<Scale>('small')
  const [ongoing, setOngoing] = useState<Ongoing>('maintenance')
  const [copied, setCopied] = useState(false)

  // Read shared state after mount — the prerendered HTML must stay deterministic
  // under `output: 'export'`, so this cannot run during render.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const t = p.get('type') as BuildType | null
    const s = p.get('scale') as Scale | null
    const o = p.get('ongoing') as Ongoing | null
    if (t && BUILD_TYPES.some((x) => x.value === t)) setBuildType(t)
    if (s && SCALES.some((x) => x.value === s)) setScale(s)
    if (o && ONGOING_OPTIONS.some((x) => x.value === o)) setOngoing(o)
  }, [])

  // Mirror to the URL so a result is linkable. No email, no gate — the whole
  // point is that the number is shareable the moment it is on screen.
  useEffect(() => {
    const p = new URLSearchParams({ type: buildType, scale, ongoing })
    window.history.replaceState(null, '', `${window.location.pathname}?${p}`)
    setCopied(false)
  }, [buildType, scale, ongoing])

  const build = useMemo(() => buildBands(buildType, scale), [buildType, scale])
  const run = useMemo(() => ongoingBands(ongoing), [ongoing])

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  return (
    <div className="w-full">
      {/* Control strip — no submit button, because there is no step at which a
          gate could be inserted. The reading is always on screen. */}
      <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur sm:p-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ChoiceGroup
            legend="What you're building"
            name="type"
            options={BUILD_TYPES}
            value={buildType}
            onChange={setBuildType}
          />
          <ChoiceGroup
            legend="Roughly how big"
            name="scale"
            options={SCALES}
            value={scale}
            onChange={setScale}
          />
          <ChoiceGroup
            legend="After launch"
            name="ongoing"
            options={ONGOING_OPTIONS}
            value={ongoing}
            onChange={setOngoing}
          />
        </div>
      </div>

      {/* Reading */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
            To build it
          </h2>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/25 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? 'Link copied' : 'Copy this result'}
          </button>
        </div>

        <BandChart
          pair={build}
          unit=""
          caption="Two 2026 surveys' published cost ranges for the selected project, drawn to scale on a shared axis."
          note={(m) =>
            Number(m) >= 1.3 ? (
              <>
                These two surveys are <span className="tabular-nums text-amber-300">{m}×</span>{' '}
                apart on the same question. That gap is real, and it is why every number you have
                found online contradicts the last one.
              </>
            ) : (
              <>
                Here the two surveys nearly agree — <span className="tabular-nums text-sky-300">{m}×</span>{' '}
                apart. That is worth something: the wider the job, the more the sell side and the buy
                side converge, because there is less room for a cheap version of it to exist.
              </>
            )
          }
        />

        {run && (
          <div className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
              To keep it running
            </h2>
            <BandChart
              pair={run}
              unit="/mo"
              caption="Published monthly ongoing-cost ranges from the same two surveys."
              note={() => (
                <>
                  Read this gap more carefully than the one above: these two are not measuring quite
                  the same thing. GoodFirms is reporting what agencies charge on a retainer, while
                  the WebFX figure is an annual total across all businesses — including the ones
                  running a site themselves on a $20 builder. The truth for a maintained business
                  site sits nearer the upper band than the lower.
                </>
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export function CostDrivers() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      {(['up', 'down'] as const).map((dir) => (
        <div key={dir} className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur sm:p-8">
          <h3 className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">
            {dir === 'up' ? 'What pushes it up' : 'What brings it down'}
          </h3>
          <ul className="mt-4 space-y-3">
            {DRIVERS[dir].map((d) => (
              <li key={d} className="flex gap-3 text-sm text-neutral-300">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-px w-4 shrink-0 ${dir === 'up' ? 'bg-amber-400/60' : 'bg-sky-300/60'}`}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function QuoteCta() {
  return (
    <div className="mt-6 rounded-3xl border border-sky-300/20 bg-sky-300/5 p-6 backdrop-blur sm:p-8">
      <h2 className="text-2xl font-light tracking-tight text-zinc-100 sm:text-3xl">
        Want one number instead of two ranges?
      </h2>
      <p className="mt-3 max-w-[60ch] text-sm text-neutral-300">
        That is the honest limit of survey data: it can tell you what the market charges, but not
        what your project costs. For that, someone has to look at what you actually need. Tell us
        what you are building and we will send a fixed quote — no call required, and nothing on this
        page changes based on whether you do.
      </p>
      <a
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-300 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      >
        Request a quote
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}
