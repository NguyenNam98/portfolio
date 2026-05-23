import type { AccentKey } from '@/data/profile'
import { accentColor } from '../accent'

interface Props {
  accent?: AccentKey
}

/**
 * Decorative background: slow-rotating asterisk on the right + a soft
 * grid pattern. Strictly cosmetic, aria-hidden, no pointer events.
 */
export default function AsteriskBg({ accent = 'rose' }: Props) {
  const color = accentColor(accent)
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          right: '-12%',
          top: '8%',
          width: 'min(64vh, 720px)',
          height: 'min(64vh, 720px)',
          opacity: 0.07,
          animation: 'nam-spin 60s linear infinite',
        }}
      >
        <g fill={color}>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="98"
              y="14"
              width="4"
              height="86"
              rx="2"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="6" />
        </g>
      </svg>

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }}>
        <defs>
          <pattern id="namgrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#namgrid)" />
      </svg>
    </div>
  )
}
