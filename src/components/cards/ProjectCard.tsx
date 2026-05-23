import { useState } from 'react'

import type { Project } from '@/data/profile'
import { accentColor } from '../accent'

interface Props {
  p: Project
  dense?: boolean
  index?: number
}

export default function ProjectCard({ p, dense = false, index = 0 }: Props) {
  const [hover, setHover] = useState(false)
  const color = accentColor(p.accent)
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-default)',
        boxShadow: hover
          ? `inset 0 0 0 1px ${color}, 0 12px 32px rgba(0,0,0,0.08)`
          : 'var(--elev-hairline)',
        padding: 'var(--space-4)',
        paddingLeft: 'calc(var(--space-4) + 4px)',
        display: 'grid',
        gap: 'var(--space-3)',
        overflow: 'hidden',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all var(--motion-med) var(--ease-emphatic)',
        animation: `nam-rise 500ms ${index * 80}ms var(--ease-emphatic) both`,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: color,
          transform: hover ? 'scaleX(1.6)' : 'scaleX(1)',
          transformOrigin: 'left',
          transition: 'transform var(--motion-med) var(--ease-emphatic)',
        }}
      />
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'grid', gap: 2 }}>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color,
            }}
          >
            {p.role}
          </div>
          <div style={{ font: '600 16px/22px var(--font-sans)', color: 'var(--fg-primary)' }}>
            {p.company}
          </div>
          <div style={{ font: 'var(--font-caption)', color: 'var(--fg-tertiary)' }}>
            {p.location} · {p.dates}
          </div>
        </div>
        <span
          style={{
            padding: '3px 8px',
            borderRadius: 999,
            background: color,
            color: 'var(--fg-on-brand)',
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          {p.badge}
        </span>
      </header>

      <div style={{ font: '500 14px/20px var(--font-sans)', color: 'var(--fg-primary)' }}>
        {p.headline}
      </div>

      {!dense && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gap: 6,
            font: 'var(--font-body-s)',
            color: 'var(--fg-secondary)',
          }}
        >
          {p.impact.map((line, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: 'var(--fg-tertiary)',
                  marginTop: 8,
                  flexShrink: 0,
                }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              font: 'var(--font-mono-xs)',
              color: 'var(--fg-tertiary)',
              padding: '2px 6px',
              borderRadius: 4,
              background: 'var(--bg-subtle)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}
