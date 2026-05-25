import { useMemo, useState } from 'react'

import type {
  AccentKey,
  Project,
  ProjectId,
  SkillGroup,
  SkillItem,
} from '@/data/profile'
import { useCompany } from '@/lib/company-context'
import { matchesAnyKeyword } from '@/lib/highlight'
import { accentColor } from '../accent'

interface SkillChipProps {
  children: React.ReactNode
  accent?: AccentKey
  filled?: boolean
}

export function SkillChip({ children, accent = 'rose', filled = false }: SkillChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--font-mono-xs)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        background: filled ? accentColor(accent) : 'var(--bg-subtle)',
        color: filled ? 'var(--fg-on-brand)' : 'var(--fg-primary)',
        border: filled ? 'none' : '1px solid var(--border-subtle)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

interface ProvenanceProps {
  skill: SkillItem
  projects: readonly Project[]
  dim?: boolean
  focusProject?: ProjectId | null
  highlightForCompany?: string | null
}

function SkillChipWithProvenance({
  skill,
  projects,
  dim = false,
  focusProject = null,
  highlightForCompany = null,
}: ProvenanceProps) {
  const projMap = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<ProjectId, Project>
  const ids = skill.projects
  const usedAt = ids.map((id) => projMap[id]).filter(Boolean)
  const baseTooltip = usedAt.length
    ? `Used at: ${usedAt.map((p) => p.short).join(' · ')}`
    : 'No specific project — exposure / familiarity'
  const tooltip = highlightForCompany
    ? `${baseTooltip} · Match for ${highlightForCompany}`
    : baseTooltip
  const isFocused = focusProject !== null && ids.includes(focusProject)
  const focusColor = focusProject ? accentColor(projMap[focusProject]?.accent) : 'var(--dw-rose)'

  let boxShadow: string
  if (isFocused) {
    boxShadow = `0 0 0 1.5px ${focusColor}, var(--elev-1)`
  } else if (highlightForCompany) {
    boxShadow = '0 0 0 1.5px var(--dw-rose), var(--elev-1)'
  } else {
    boxShadow = 'var(--elev-hairline)'
  }

  return (
    <span
      title={tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 12px',
        borderRadius: 999,
        background: 'var(--bg-default)',
        boxShadow,
        font: '500 13px/16px var(--font-sans)',
        color: 'var(--fg-primary)',
        maxWidth: '100%',
        opacity: dim ? 0.32 : 1,
        transform: dim ? 'scale(0.98)' : 'scale(1)',
        transition: 'all var(--motion-med) var(--ease-standard)',
        cursor: 'default',
      }}
    >
      <span>{skill.name}</span>
      {ids.length > 0 ? (
        <span style={{ display: 'inline-flex', gap: 3 }}>
          {usedAt.map((p) => (
            <span
              key={p.id}
              aria-label={p.short}
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: accentColor(p.accent),
                boxShadow:
                  isFocused && p.id === focusProject
                    ? `0 0 0 2px var(--bg-default), 0 0 0 3px ${accentColor(p.accent)}`
                    : 'none',
                transition: 'box-shadow var(--motion-fast) var(--ease-standard)',
              }}
            />
          ))}
        </span>
      ) : (
        <span
          style={{
            font: 'var(--font-mono-xs)',
            color: 'var(--fg-tertiary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          familiar
        </span>
      )}
    </span>
  )
}

interface Props {
  groups: readonly SkillGroup[]
  projects: readonly Project[]
}

export default function SkillsCard({ groups, projects }: Props) {
  const [filter, setFilter] = useState<ProjectId | null>(null)
  const company = useCompany()

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    projects.forEach((p) => (c[p.id] = 0))
    groups.forEach((g) =>
      g.items.forEach((it) => {
        it.projects.forEach((id) => {
          c[id] = (c[id] || 0) + 1
        })
      }),
    )
    return c
  }, [groups, projects])

  const totalSkills = useMemo(
    () => groups.reduce((n, g) => n + g.items.length, 0),
    [groups],
  )

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      {/* Legend / project filter */}
      <div style={{ display: 'grid', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.14em',
              color: 'var(--fg-tertiary)',
              textTransform: 'uppercase',
            }}
          >
            Where I picked these up
          </div>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.1em',
              color: 'var(--fg-tertiary)',
              textTransform: 'uppercase',
            }}
          >
            {filter
              ? 'Filtering — click again to clear'
              : `${totalSkills} skills · click a project to filter`}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {projects.map((p) => {
            const active = filter === p.id
            const color = accentColor(p.accent)
            return (
              <button
                key={p.id}
                onClick={() => setFilter(active ? null : p.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: active ? color : 'var(--bg-default)',
                  color: active ? '#fff' : 'var(--fg-primary)',
                  border: 'none',
                  boxShadow: active ? `0 6px 18px ${color}40` : 'var(--elev-hairline)',
                  cursor: 'pointer',
                  font: '500 13px/16px var(--font-sans)',
                  transition: 'all var(--motion-fast) var(--ease-standard)',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: active ? '#fff' : color,
                  }}
                />
                <span>{p.short || p.company}</span>
                <span
                  style={{
                    font: 'var(--font-mono-xs)',
                    letterSpacing: '0.06em',
                    color: active ? 'rgba(255,255,255,0.78)' : 'var(--fg-tertiary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {counts[p.id] || 0}
                </span>
              </button>
            )
          })}
          {filter && (
            <button
              onClick={() => setFilter(null)}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                background: 'transparent',
                border: '1px dashed var(--border-default)',
                color: 'var(--fg-secondary)',
                cursor: 'pointer',
                font: 'var(--font-mono-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* Skill groups */}
      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        {groups.map((g, gi) => {
          const visibleItems = g.items.filter((it) => {
            if (!filter) return true
            return it.projects.includes(filter)
          })
          if (filter && visibleItems.length === 0) return null

          return (
            <div
              key={g.label}
              style={{
                display: 'grid',
                gap: 'var(--space-2)',
                animation: `nam-rise 500ms ${gi * 60}ms var(--ease-emphatic) both`,
              }}
            >
              <div
                style={{
                  font: 'var(--font-label)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: accentColor(g.accent),
                  }}
                />
                {g.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {g.items.map((s, i) => {
                  const matches = !filter || s.projects.includes(filter)
                  const keywordMatch =
                    company && matchesAnyKeyword(s.name, company.keywords)
                      ? company.displayName
                      : null
                  return (
                    <span
                      key={s.name}
                      style={{
                        display: 'inline-block',
                        animation: `nam-pop 360ms ${gi * 50 + i * 22}ms var(--ease-emphatic) both`,
                      }}
                    >
                      <SkillChipWithProvenance
                        skill={s}
                        projects={projects}
                        dim={!matches}
                        focusProject={filter}
                        highlightForCompany={keywordMatch}
                      />
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.08em',
          color: 'var(--fg-tertiary)',
          textTransform: 'uppercase',
          paddingTop: 4,
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        Dots = projects where I used it · "Familiar" = exposure without a shipped project.
      </div>
    </div>
  )
}
