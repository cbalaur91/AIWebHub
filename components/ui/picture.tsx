import type { ImgHTMLAttributes } from 'react'
import manifest from '@/public/_opt/manifest.json'

/**
 * One source image, as recorded by scripts/generate-images.ts.
 * `base` + `-<width>.<format>` is the derivative URL.
 */
interface ManifestEntry {
  width: number
  height: number
  base: string
  formats: Record<string, number[]>
}

const MANIFEST = manifest as Record<string, ManifestEntry>

export interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Path under public/, exactly as it appears on disk — e.g. "/services/web.jpg". */
  src: string
  alt: string
  /** Layout hint for srcset selection. Defaults to the browser's 100vw. */
  sizes?: string
}

/**
 * Renders a build-time-optimised image (issue #27).
 *
 * Emits a <picture> with WebP <source> derivatives and an <img> fallback that
 * still points at the original path — originals are a public contract, they are
 * referenced as absolute URLs inside JSON-LD. Intrinsic width/height come from
 * the manifest, which fixes layout shift as a side effect.
 *
 * Sources the pipeline excludes (blog OG cards, favicons, SVGs, missing files)
 * have no manifest entry and fall through to a plain <img>.
 */
export function Picture({ src, alt, sizes, ...rest }: PictureProps) {
  const entry = MANIFEST[src]

  if (!entry) {
    return <img src={src} alt={alt} sizes={sizes} {...rest} />
  }

  return (
    // `contents` keeps <picture> out of the box tree, so the <img> lays out
    // against the same parent a raw <img> would have — height percentages and
    // absolute positioning behave identically.
    <picture className="contents">
      {Object.entries(entry.formats).map(([format, widths]) =>
        widths.length > 0 ? (
          <source
            key={format}
            type={`image/${format}`}
            sizes={sizes}
            srcSet={widths.map((width) => `${entry.base}-${width}.${format} ${width}w`).join(', ')}
          />
        ) : null
      )}
      {/* No srcSet here, so no sizes either — this is the plain-format fallback. */}
      <img src={src} alt={alt} width={entry.width} height={entry.height} {...rest} />
    </picture>
  )
}
