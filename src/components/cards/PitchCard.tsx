import type { Pitch } from '@/data/profile'

interface Props {
  pitch: Pitch
}

export default function PitchCard({ pitch }: Props) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <div
        style={{
          font: '600 22px/30px var(--font-sans)',
          color: 'var(--fg-primary)',
          letterSpacing: '-0.01em',
          textWrap: 'pretty',
        }}
      >
        "{pitch.headline}"
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        {pitch.points.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'var(--space-3)',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                font: 'var(--font-mono-xs)',
                color: 'var(--dw-rose)',
                letterSpacing: '0.08em',
              }}
            >
              0{i + 1}
            </span>
            <div>
              <div style={{ font: '600 14px/20px var(--font-sans)', color: 'var(--fg-primary)' }}>
                {p.k}
              </div>
              <div
                style={{
                  font: 'var(--font-body-s)',
                  color: 'var(--fg-secondary)',
                  marginTop: 2,
                }}
              >
                {p.v}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
