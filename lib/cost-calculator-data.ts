/**
 * Sourced cost bands for /tools/website-cost-calculator.
 *
 * Every band here traces to a row in SEO/research/website-cost-ranges.md.
 * Nothing in this file is an AIWebHub price, and nothing is interpolated,
 * averaged or otherwise derived — each band is a range a named survey
 * actually published, carried through verbatim.
 *
 * If you want to change a number, change the source first.
 */

export type MarketSide = 'sell' | 'buy'

export interface CostSource {
  id: SourceId
  /** Short name used on the band label. */
  name: string
  url: string
  /** Rendered under the band, so the reader can weigh it without leaving. */
  sample: string
  side: MarketSide
  /** One line on why this source reads high or low. Shown in "why they disagree". */
  bias: string
}

export type SourceId = 'goodfirms' | 'webfx'

export const SOURCES: Record<SourceId, CostSource> = {
  goodfirms: {
    id: 'goodfirms',
    name: 'GoodFirms 2026',
    url: 'https://www.goodfirms.co/resources/website-construction-cost-survey',
    sample: '300+ web development firms across 31 countries, surveyed April–May 2026',
    side: 'sell',
    bias:
      'Global and sell-side. The same survey puts developers in India, Pakistan and Vietnam at $10–$15/hr against $50–$100/hr in the US, so its worldwide averages sit well below what a US buyer is quoted.',
  },
  webfx: {
    id: 'webfx',
    name: 'WebFX 2026',
    url: 'https://www.webfx.com/web-design/pricing/',
    sample: '250 US-based marketing professionals, 2026 pricing',
    side: 'buy',
    bias:
      'US-only and buy-side — what people report actually paying, which includes the revisions, content and scope creep a quote never mentions. It is also published by a large US agency whose own engagements start at $8,000/month.',
  },
}

export interface Band {
  low: number
  high: number
  /** The survey row this came from, shown verbatim so the mapping is auditable. */
  row: string
}

export type BuildType = 'brochure' | 'cms' | 'ecommerce' | 'webapp'
export type Scale = 'small' | 'mid' | 'large'
export type Ongoing = 'none' | 'maintenance' | 'maintenance-seo'

export interface Choice<T extends string> {
  value: T
  label: string
  /** Plain-language detail; the reader should never have to guess which one they are. */
  hint: string
}

export const BUILD_TYPES: Choice<BuildType>[] = [
  {
    value: 'brochure',
    label: 'Marketing site',
    hint: 'Pages that explain what you do and get people to call you. No login, no catalogue.',
  },
  {
    value: 'cms',
    label: 'Site you update yourself',
    hint: 'Everything above, plus a content system so you can post and edit without a developer.',
  },
  {
    value: 'ecommerce',
    label: 'Online store',
    hint: 'Products, cart, checkout, payments, and the tax and shipping rules behind them.',
  },
  {
    value: 'webapp',
    label: 'Web application',
    hint: 'Accounts, dashboards, booking or anything with logic behind the login.',
  },
]

export const SCALES: Choice<Scale>[] = [
  { value: 'small', label: '1–15 pages', hint: 'A typical local service business.' },
  { value: 'mid', label: '16–40 pages', hint: 'Multiple services, locations or a real blog.' },
  { value: 'large', label: '40+ pages', hint: 'Large catalogues, many locations, or years of content.' },
]

export const ONGOING_OPTIONS: Choice<Ongoing>[] = [
  { value: 'none', label: 'Nothing ongoing', hint: 'Hosting only. You handle the rest.' },
  { value: 'maintenance', label: 'Maintenance', hint: 'Updates, backups, security patches, small fixes.' },
  { value: 'maintenance-seo', label: 'Maintenance + SEO', hint: 'The above, plus ongoing search and content work.' },
]

/**
 * Build cost, one band per source.
 *
 * The mapping from (buildType, scale) to a survey row is a judgement call, so
 * the row name travels with the band and is rendered on the page. A reader who
 * disagrees with the mapping can see exactly what we picked and why.
 */
const BUILD_BANDS: Record<BuildType, Record<Scale, Record<SourceId, Band>>> = {
  brochure: {
    small: {
      goodfirms: { low: 1000, high: 3000, row: 'Basic website / MVP — 59.9% of firms' },
      webfx: { low: 6500, high: 15000, row: 'Basic small-business website' },
    },
    mid: {
      goodfirms: { low: 5000, high: 20000, row: 'Mid-sized website — 53.9% of firms' },
      webfx: { low: 6500, high: 15000, row: 'Basic small-business website' },
    },
    large: {
      goodfirms: { low: 5000, high: 20000, row: 'Mid-sized website — 53.9% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
  },
  cms: {
    small: {
      goodfirms: { low: 5000, high: 20000, row: 'CMS-based website — 45.4% of firms' },
      webfx: { low: 6500, high: 15000, row: 'Basic small-business website' },
    },
    mid: {
      goodfirms: { low: 5000, high: 20000, row: 'CMS-based website — 45.4% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
    large: {
      goodfirms: { low: 20000, high: 50000, row: 'Enterprise website — 36.2% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
  },
  ecommerce: {
    small: {
      goodfirms: { low: 5000, high: 50000, row: 'eCommerce vertical — 74% of firms' },
      webfx: { low: 6500, high: 15000, row: 'Basic small-business website' },
    },
    mid: {
      goodfirms: { low: 5000, high: 50000, row: 'eCommerce vertical — 74% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
    large: {
      goodfirms: { low: 20000, high: 50000, row: 'Enterprise website — 36.2% of firms' },
      webfx: { low: 50000, high: 100000, row: 'Advanced / enterprise website' },
    },
  },
  webapp: {
    small: {
      goodfirms: { low: 20000, high: 50000, row: 'Custom web application — 35.5% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
    mid: {
      goodfirms: { low: 20000, high: 50000, row: 'Custom web application — 35.5% of firms' },
      webfx: { low: 15000, high: 50000, row: 'Intermediate / mid-sized website' },
    },
    large: {
      goodfirms: { low: 20000, high: 50000, row: 'Custom web application — 35.5% of firms' },
      webfx: { low: 50000, high: 100000, row: 'Advanced / enterprise website' },
    },
  },
}

/**
 * Monthly ongoing cost. Both sources are normalised to a monthly figure so the
 * two bands sit on one axis; where that required converting an annual number,
 * the row says so rather than hiding the arithmetic.
 */
const ONGOING_BANDS: Record<Exclude<Ongoing, 'none'>, Record<SourceId, Band>> = {
  maintenance: {
    goodfirms: { low: 500, high: 3000, row: 'Monthly retainer — ~58% of the market' },
    webfx: { low: 42, high: 417, row: '$501–$5,000 per year, converted to monthly' },
  },
  'maintenance-seo': {
    goodfirms: { low: 500, high: 3000, row: 'Monthly retainer — ~58% of the market' },
    webfx: { low: 167, high: 833, row: 'SEO $2,000–$10,000, spread over 12 months' },
  },
}

export interface BandPair {
  goodfirms: Band
  webfx: Band
}

export function buildBands(type: BuildType, scale: Scale): BandPair {
  return BUILD_BANDS[type][scale]
}

export function ongoingBands(ongoing: Ongoing): BandPair | null {
  return ongoing === 'none' ? null : ONGOING_BANDS[ongoing]
}

/**
 * How far apart the two sources are, measured centre to centre. This is the
 * page's actual argument, so it is computed rather than asserted.
 */
export function divergence(pair: BandPair): number {
  const centre = (b: Band) => (b.low + b.high) / 2
  const a = centre(pair.goodfirms)
  const b = centre(pair.webfx)
  if (a === 0 || b === 0) return 1
  return Math.max(a, b) / Math.min(a, b)
}

/** What actually moves a real quote, per the surveys' own over-budget findings. */
export const DRIVERS = {
  up: [
    'Custom design rather than a theme — GoodFirms puts design at 10–20% of a build.',
    'Integrations with software you already run: booking, POS, CRM, inventory.',
    'Content you need written. WebFX puts copywriting at $60–$300 a page.',
    'Compliance work. Healthcare and finance sit a full tier above other verticals.',
  ],
  down: [
    'Copy and photographs ready before design starts.',
    'Fewer, better pages. Page count is the clearest cost lever there is.',
    'A theme or template where it will not be seen.',
    'Launching a core site first and adding the rest once it is earning.',
  ],
}
