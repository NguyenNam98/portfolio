import type { JDMatchResult } from '@/data/prompts'

interface Props {
  result: JDMatchResult
  /** How many reasons to surface as cards. Defaults to 3 — matches the design. */
  limit?: number
}

export default function WhyFitGrid({ result, limit = 3 }: Props) {
  const reasons = result.reasons.slice(0, limit)
  return (
    <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
      <TabStrip count={reasons.length} match={result.match} />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gap: 14,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: 16,
            top: 24,
            bottom: 24,
            width: 0,
            borderLeft: '1px dashed var(--border-default)',
            zIndex: 0,
          }}
        />
        {reasons.map((r, i) => (
          <FitCard key={i} index={i} point={r.point} detail={r.detail} />
        ))}
      </div>
    </div>
  )
}

function TabStrip({ count, match }: { count: number; match: number }) {
  const labels = [
    { text: 'Why I fit', active: true },
    { text: `${count} reason${count === 1 ? '' : 's'}`, active: false },
    { text: `${match}% match`, active: false },
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 22,
        paddingBottom: 8,
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {labels.map((l) => (
        <span
          key={l.text}
          style={{
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: l.active ? 'var(--dw-rose)' : 'var(--fg-tertiary)',
            position: 'relative',
            paddingBottom: 6,
          }}
        >
          {l.text}
          {l.active && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -9,
                height: 2,
                background: 'var(--dw-rose)',
              }}
            />
          )}
        </span>
      ))}
    </div>
  )
}

function FitCard({
  index,
  point,
  detail,
}: {
  index: number
  point: string
  detail: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '34px 1fr',
        gap: 18,
        padding: '14px 0',
        alignItems: 'start',
      }}
    >
      <span
        style={{
          font: 'var(--font-mono-xs)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'var(--dw-rose)',
          background: 'var(--bg-default)',
          textAlign: 'center',
          padding: '4px 0',
          width: 32,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div style={{ display: 'grid', gap: 6, minWidth: 0 }}>
        <div
          style={{
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--fg-tertiary)',
            lineHeight: 1.5,
          }}
        >
          {point}
        </div>
        <div
          style={{
            font: '500 16px/24px var(--font-sans)',
            color: 'var(--fg-primary)',
            textWrap: 'pretty',
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  )
}
