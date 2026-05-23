import type { Project } from '@/data/profile'
import type { JDMatchResult } from '@/data/prompts'

import MatchRing from './MatchRing'
import ProjectCard from './ProjectCard'
import { SkillChip } from './SkillsCard'

interface Props {
  result: JDMatchResult
  projects: readonly Project[]
}

export default function JDMatchCard({ result, projects }: Props) {
  const matched = result.relevantProjects
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))

  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <MatchRing score={result.match} />
        <div style={{ display: 'grid', gap: 4 }}>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-tertiary)',
            }}
          >
            Match analysis
          </div>
          <div
            style={{
              font: '600 18px/24px var(--font-sans)',
              color: 'var(--fg-primary)',
              textWrap: 'pretty',
            }}
          >
            {result.headline}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
        <div
          style={{
            font: 'var(--font-label)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-tertiary)',
          }}
        >
          Why I fit
        </div>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gap: 'var(--space-2)',
          }}
        >
          {result.reasons.map((r, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr',
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
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div
                  style={{ font: '600 14px/20px var(--font-sans)', color: 'var(--fg-primary)' }}
                >
                  {r.point}
                </div>
                <div
                  style={{
                    font: 'var(--font-body-s)',
                    color: 'var(--fg-secondary)',
                    marginTop: 2,
                  }}
                >
                  {r.detail}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {result.relevantSkills.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <div
            style={{
              font: 'var(--font-label)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-tertiary)',
            }}
          >
            Skills that map to your JD
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {result.relevantSkills.map((s) => (
              <SkillChip key={s} accent="rose" filled>
                {s}
              </SkillChip>
            ))}
          </div>
        </div>
      )}

      {matched.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <div
            style={{
              font: 'var(--font-label)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-tertiary)',
            }}
          >
            Most relevant experience
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {matched.map((p, i) => (
              <ProjectCard key={p.id} p={p} dense index={i} />
            ))}
          </div>
        </div>
      )}

      {result.gaps && result.gaps.trim() !== '' && (
        <div
          style={{
            padding: 'var(--space-3)',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--dw-gold)',
            font: 'var(--font-body-s)',
            color: 'var(--fg-secondary)',
          }}
        >
          <span
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--dw-gold)',
              marginRight: 6,
            }}
          >
            Honest read
          </span>
          {result.gaps}
        </div>
      )}

      {result.closer && (
        <div
          style={{
            font: '500 15px/22px var(--font-sans)',
            color: 'var(--fg-primary)',
            paddingTop: 'var(--space-2)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {result.closer}
        </div>
      )}
    </div>
  )
}
