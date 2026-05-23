import { useEffect, useState } from 'react'

interface Props {
  score: number
}

const SIZE = 96
const STROKE = 7
const R = SIZE / 2 - STROKE
const C = 2 * Math.PI * R

export default function MatchRing({ score }: Props) {
  const [animScore, setAnimScore] = useState(0)

  useEffect(() => {
    const duration = 1200
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setAnimScore(Math.round(eased * score))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  const off = C - (animScore / 100) * C
  const color =
    score >= 75 ? 'var(--dw-mint-2)' : score >= 50 ? 'var(--dw-rose)' : 'var(--dw-gold)'

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="var(--bg-subtle)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={off}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div
            style={{
              font: '700 30px/1 var(--font-display)',
              color: 'var(--fg-primary)',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {animScore}
          </div>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.1em',
              color: 'var(--fg-tertiary)',
              marginTop: 2,
            }}
          >
            / 100
          </div>
        </div>
      </div>
    </div>
  )
}
