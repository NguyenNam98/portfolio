import type { AccentKey } from '@/data/profile'

interface Props {
  size?: number
  /** Optional ring color for emphasis — currently unused but kept for future tweaks. */
  accent?: AccentKey
}

/**
 * Round avatar for Nam. Sized via prop. Falls back to a flat rose
 * background if the image fails to load (rare; the file ships in
 * /public).
 */
export default function NamGlyph({ size = 28 }: Props) {
  return (
    <img
      src="/avatar.png"
      alt="Nam"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        objectFit: 'cover',
        flexShrink: 0,
        background: 'var(--dw-gray-90)',
        display: 'block',
      }}
    />
  )
}
