import type { AccentKey, ProjectMetric } from '@/data/profile'
import { accentColor } from '../accent'

interface Props {
  metric: ProjectMetric
  accent?: AccentKey
}

export default function MetricTile({ metric, accent = 'rose' }: Props) {
  const color = accentColor(accent)
  return (
    <div
      style={{
        padding: '18px 0 16px',
        borderTop: `1px solid ${color}`,
      }}
    >
      <div
        style={{
          font: '600 clamp(26px, 3.2vw, 36px)/1 var(--font-display)',
          color: 'var(--fg-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 10,
          textWrap: 'balance',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {metric.value}
      </div>
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--fg-tertiary)',
          marginBottom: 4,
        }}
      >
        {metric.label}
      </div>
      <div
        style={{
          font: 'var(--font-body-s)',
          color: 'var(--fg-secondary)',
          textWrap: 'pretty',
        }}
      >
        {metric.caption}
      </div>
    </div>
  )
}
