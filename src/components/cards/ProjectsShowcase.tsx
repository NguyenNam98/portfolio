import { useState } from 'react'

import type { Project } from '@/data/profile'
import { accentColor } from '../accent'
import MetricTile from './MetricTile'

interface ShowcaseProps {
  projects: readonly Project[]
}

interface SpotlightProps {
  project: Project
}

function ProjectSpotlight({ project }: SpotlightProps) {
  const color = accentColor(project.accent)
  return (
    <article
      key={project.id}
      style={{
        display: 'grid',
        gap: 28,
        animation: 'nam-fade-in 220ms var(--ease-standard) both',
      }}
    >
      {/* Nameplate — role label, project name, dateline. Badge sits inline
          as a quiet mono word, no pill, no shadow. */}
      <header style={{ display: 'grid', gap: 6 }}>
        <div
          style={{
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.14em',
            color,
            textTransform: 'uppercase',
          }}
        >
          {project.role}
        </div>
        <h3
          style={{
            margin: 0,
            font: '700 clamp(36px, 4.4vw, 56px)/0.95 var(--font-display)',
            letterSpacing: '-0.03em',
            color: 'var(--fg-primary)',
          }}
        >
          {project.short}
          <span style={{ color }}>.</span>
        </h3>
        <div
          style={{
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.1em',
            color: 'var(--fg-tertiary)',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          {project.location} · {project.dates} · <span style={{ color }}>{project.badge}</span>
        </div>
      </header>

      {/* Headline — the one-line thesis. */}
      <p
        style={{
          margin: 0,
          font: '400 clamp(18px, 1.8vw, 22px)/1.45 var(--font-sans)',
          color: 'var(--fg-primary)',
          textWrap: 'pretty',
          maxWidth: 720,
        }}
      >
        {project.headline}
      </p>

      {/* Metric tiles — rule-topped, no animation, no card. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0 28px',
        }}
      >
        {project.metrics.map((m, i) => (
          <MetricTile key={project.id + '-' + i} metric={m} accent={project.accent} />
        ))}
      </div>

      {/* Impact — editorial list. Numbers in a thin mono column, no card, no animation. */}
      <section style={{ display: 'grid', gap: 14 }}>
        <h4
          style={{
            margin: 0,
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.14em',
            color: 'var(--fg-tertiary)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          What I shipped
        </h4>
        <ol
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gap: 12,
            counterReset: 'impact',
          }}
        >
          {project.impact.map((line, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr',
                gap: 16,
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  font: 'var(--font-mono-xs)',
                  color: 'var(--fg-tertiary)',
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  font: 'var(--font-body-l)',
                  color: 'var(--fg-primary)',
                  textWrap: 'pretty',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Stack — quiet pills, no inner dots, no animation. */}
      <section style={{ display: 'grid', gap: 10 }}>
        <h4
          style={{
            margin: 0,
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.14em',
            color: 'var(--fg-tertiary)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Stack
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--border-subtle)',
                background: 'transparent',
                font: '500 12px/16px var(--font-sans)',
                color: 'var(--fg-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}

interface TabsProps {
  projects: readonly Project[]
  activeIdx: number
  onPick: (i: number) => void
}

function ProjectTabs({ projects, activeIdx, onPick }: TabsProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {projects.map((p, i) => {
        const active = i === activeIdx
        const color = accentColor(p.accent)
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={active}
            onClick={() => onPick(i)}
            style={{
              padding: '12px 18px',
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${active ? color : 'transparent'}`,
              marginBottom: -1,
              cursor: 'pointer',
              textAlign: 'left',
              color: active ? 'var(--fg-primary)' : 'var(--fg-tertiary)',
              font: `${active ? 600 : 500} 14px/18px var(--font-sans)`,
              transition: 'color var(--motion-fast) var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--fg-secondary)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--fg-tertiary)'
            }}
          >
            {p.short}
          </button>
        )
      })}
    </div>
  )
}

export default function ProjectsShowcase({ projects }: ShowcaseProps) {
  const [idx, setIdx] = useState(0)
  const active = projects[idx]
  if (!active) return null

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <ProjectTabs projects={projects} activeIdx={idx} onPick={setIdx} />
      <ProjectSpotlight project={active} />
    </div>
  )
}
