import { EDUCATION, PROFILE } from '@/data/profile'
import NamGlyph from '../NamGlyph'

interface Props {
  onResetHome: () => void
}

// Formats today's date in Sydney as `YYYY · MM · DD` — matches the
// mono · separator style the design uses elsewhere.
function todayInSydney(): string {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? ''
  return `${get('year')} · ${get('month')} · ${get('day')}`
}

// Six chips that signal both halves of the current role at Sample Assist:
// platform (AWS/EKS/Terraform/Argo CD) + backend (NestJS/Postgres).
// Tight set so recruiters scan it in one glance.
const STACK_PILLS: readonly string[] = [
  'AWS',
  'EKS',
  'Terraform',
  'Argo CD',
  'NestJS',
  'Postgres',
]

export default function ChatSidebar({ onResetHome }: Props) {
  return (
    <aside
      className="chat-sidebar"
      style={{
        width: 300,
        flexShrink: 0,
        borderRight: '1px solid var(--border-subtle)',
        background: 'var(--bg-raised)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-5)',
        gap: 'var(--space-5)',
        overflow: 'auto',
      }}
    >
      {/* 1. Brand (clickable → home) */}
      <button
        onClick={onResetHome}
        title="Back to home"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--space-2)',
          margin: 'calc(-1 * var(--space-2))',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          textAlign: 'left',
          color: 'var(--fg-primary)',
          transition: 'background var(--motion-fast) var(--ease-standard)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <NamGlyph size={48} accent="rose" />
        <div style={{ display: 'grid', gap: 2, minWidth: 0, paddingTop: 2 }}>
          <h2
            style={{
              margin: 0,
              font: '700 26px/1.05 var(--font-display)',
              letterSpacing: '-0.02em',
              color: 'var(--fg-primary)',
            }}
          >
            Nam Nguyen<span style={{ color: 'var(--dw-rose)' }}>.</span>
          </h2>
          <div
            style={{
              font: '500 12px/16px var(--font-sans)',
              color: 'var(--fg-secondary)',
              marginTop: 2,
            }}
          >
            {PROFILE.title} · {PROFILE.location.split(',')[0]}
          </div>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.08em',
              color: 'var(--fg-tertiary)',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            {todayInSydney()}  AEST
          </div>
        </div>
      </button>

      {/* 2. Available indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          font: '500 10px/14px var(--font-mono, var(--font-sans))',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-secondary)',
          marginTop: -8,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'var(--dw-mint-2)',
            boxShadow: '0 0 0 2px rgba(91,192,176,0.18)',
          }}
        />
        <span>{PROFILE.available}</span>
        <span aria-hidden style={{ color: 'var(--fg-tertiary)', opacity: 0.7 }}>·</span>
        <span style={{ color: 'var(--fg-tertiary)' }}>
          {PROFILE.noticePeriod} notice
        </span>
      </div>

      {/* 3. Tagline */}
      <p
        style={{
          margin: 0,
          font: 'italic 400 13px/20px var(--font-serif, var(--font-sans))',
          fontStyle: 'italic',
          color: 'var(--fg-secondary)',
        }}
      >
        “I might not have the answer right now — but I'll find it.”
      </p>

      {/* 4. Stack right now */}
      <Section title="Stack right now">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {STACK_PILLS.map((t) => (
            <span
              key={t}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--border-subtle)',
                background: 'transparent',
                font: 'var(--font-mono-xs)',
                letterSpacing: '0.06em',
                color: 'var(--fg-secondary)',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* 5. Education */}
      <Section title="Education">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
          {EDUCATION.map((e) => (
            <li key={e.degree} style={{ display: 'grid', gap: 2, minWidth: 0 }}>
              <div
                style={{
                  font: '600 13px/18px var(--font-sans)',
                  color: 'var(--fg-primary)',
                }}
              >
                {e.degree}
              </div>
              <div
                style={{
                  font: 'var(--font-body-s)',
                  color: 'var(--fg-secondary)',
                }}
              >
                {e.school}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* spacer pushes Contact to the bottom */}
      <div style={{ flex: 1 }} />

      {/* 6. Contact */}
      <Section title="Contact">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
          <ContactRow
            label="Email"
            href={`mailto:${PROFILE.email}`}
            value={PROFILE.email}
          />
          <ContactRow
            label="Phone"
            href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
            value={PROFILE.phone}
          />
          <ContactRow
            label="LinkedIn"
            href={`https://${PROFILE.linkedin}`}
            value={PROFILE.linkedin}
          />
          <ContactRow
            label="GitHub"
            href={`https://${PROFILE.github}`}
            value={PROFILE.github}
          />
        </ul>
      </Section>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'grid', gap: 'var(--space-3)' }}>
      <h3
        style={{
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.16em',
          color: 'var(--fg-tertiary)',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 5,
            height: 5,
            borderRadius: 999,
            background: 'var(--dw-mint-2)',
            display: 'inline-block',
          }}
        />
        {title}
      </h3>
      {children}
    </section>
  )
}

function ContactRow({
  label,
  href,
  value,
}: {
  label: string
  href: string
  value: string
}) {
  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr',
        gap: 12,
        alignItems: 'baseline',
      }}
    >
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.08em',
          color: 'var(--fg-tertiary)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          font: '500 13px/18px var(--font-sans)',
          color: 'var(--fg-primary)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </a>
    </li>
  )
}
