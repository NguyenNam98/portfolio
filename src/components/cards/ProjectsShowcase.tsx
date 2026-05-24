import { useMemo, useState } from 'react'

import type { Project } from '@/data/profile'
import { useCompany } from '@/lib/company-context'
import { countMatches, matchesAnyKeyword } from '@/lib/highlight'
import { accentColor } from '../accent'
import MetricTile from './MetricTile'

function projectMatchCount(project: Project, keywords: readonly string[]): number {
  if (keywords.length === 0) return 0
  const haystack = [
    project.headline,
    project.short,
    project.company,
    project.role,
    ...project.tags,
    ...project.impact,
  ].join(' \n ')
  return countMatches(haystack, keywords)
}

interface ShowcaseProps {
  projects: readonly Project[]
}

interface SpotlightProps {
  project: Project
}

function ProjectSpotlight({ project }: SpotlightProps) {
  const color = accentColor(project.accent)
  const company = useCompany()
  const keywords = company?.keywords ?? []
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
          {project.tags.map((tag) => {
            const matched = matchesAnyKeyword(tag, keywords)
            return (
              <span
                key={tag}
                title={matched && company ? `Match for ${company.displayName}` : undefined}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: matched
                    ? '1px solid var(--dw-rose)'
                    : '1px solid var(--border-subtle)',
                  background: matched ? 'rgba(224,76,113,0.10)' : 'transparent',
                  font: '500 12px/16px var(--font-sans)',
                  color: matched ? 'var(--fg-primary)' : 'var(--fg-secondary)',
                }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </section>
    </article>
  )
}

interface TabsProps {
  projects: readonly Project[]
  activeIdx: number
  onPick: (i: number) => void
  matchCounts?: readonly number[]
}

function ProjectTabs({ projects, activeIdx, onPick, matchCounts }: TabsProps) {
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
        const matches = matchCounts?.[i] ?? 0
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--fg-secondary)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = 'var(--fg-tertiary)'
            }}
          >
            <span>{p.short}</span>
            {matches > 0 && (
              <span
                aria-label={`${matches} keyword match${matches === 1 ? '' : 'es'}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 7px',
                  borderRadius: 999,
                  background: 'rgba(224,76,113,0.14)',
                  color: 'var(--dw-rose)',
                  font: '600 10px/14px var(--font-mono)',
                  letterSpacing: '0.06em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                ● {matches}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function ProjectsShowcase({ projects }: ShowcaseProps) {
  const company = useCompany()

  const { ordered, matchCounts } = useMemo(() => {
    const counts = projects.map((p) => projectMatchCount(p, company?.keywords ?? []))
    const hasAnyMatch = counts.some((n) => n > 0)
    if (!hasAnyMatch) {
      return { ordered: projects, matchCounts: counts }
    }
    const indices = projects.map((_, i) => i)
    indices.sort((a, b) => counts[b]! - counts[a]!)
    return {
      ordered: indices.map((i) => projects[i]!),
      matchCounts: indices.map((i) => counts[i]!),
    }
  }, [projects, company])

  const [idx, setIdx] = useState(0)
  const active = ordered[idx]
  if (!active) return null

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <ProjectTabs
        projects={ordered}
        activeIdx={idx}
        onPick={setIdx}
        matchCounts={matchCounts}
      />
      <ProjectSpotlight project={active} />
    </div>
  )
}
