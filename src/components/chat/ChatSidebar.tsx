import { useEffect, useState } from 'react'

import { EDUCATION, PROFILE, SKILL_GROUPS } from '@/data/profile'

interface Props {
  onResetHome: () => void
}

const STACK_PILLS: readonly string[] = [
  'AWS',
  'EKS',
  'Terraform',
  'Argo CD',
  'NestJS',
  'Postgres',
]

const TOTAL_SKILLS = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0)

function formatSydneyDate(d: Date): string {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d)
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? ''
  return `${get('year')} · ${get('month')} · ${get('day')}`
}

export default function ChatSidebar({ onResetHome }: Props) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <aside
      className="cp-sidebar"
      style={{
        width: 340,
        flexShrink: 0,
        borderRight: '1px solid var(--border-subtle)',
        background: 'var(--dw-gray-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        padding: '32px 28px 28px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* Identity (clickable → home) */}
      <button
        onClick={onResetHome}
        title="Back to home"
        style={{
          display: 'grid',
          gridTemplateColumns: '56px 1fr',
          gap: 14,
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          textAlign: 'left',
          color: 'inherit',
        }}
      >
        <div style={{ position: 'relative', width: 56, height: 56 }}>
          <img
            src="/avatar.jpeg"
            alt={PROFILE.name}
            width={56}
            height={56}
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              objectFit: 'cover',
              display: 'block',
              boxShadow: 'var(--elev-hairline)',
            }}
          />
          <span
            title="Online"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 2,
              width: 12,
              height: 12,
              background: 'var(--dw-mint, var(--dw-mint-2))',
              borderRadius: 999,
              boxShadow: '0 0 0 2.5px var(--dw-gray-5)',
            }}
          />
        </div>

        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              font: '700 22px/1.15 var(--font-sans)',
              letterSpacing: '-0.02em',
              color: 'var(--fg-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {PROFILE.name}
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                background: 'var(--dw-rose)',
                display: 'inline-block',
                marginBottom: 2,
              }}
            />
          </h1>
          <p
            style={{
              margin: '2px 0 0',
              font: '500 13px/1.4 var(--font-sans)',
              color: 'var(--fg-secondary)',
            }}
          >
            {PROFILE.title}
          </p>
          <p
            style={{
              margin: '4px 0 0',
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.04em',
              color: 'var(--fg-tertiary)',
            }}
          >
            {PROFILE.location.split(',')[0]} · {formatSydneyDate(now)} AEST
          </p>
        </div>
      </button>

      {/* Status pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'var(--bg-default)',
          borderRadius: 999,
          boxShadow: 'var(--elev-hairline-soft)',
          alignSelf: 'flex-start',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            background: 'var(--dw-mint, var(--dw-mint-2))',
            borderRadius: 999,
            boxShadow: '0 0 0 3px rgba(91,192,176,0.18)',
          }}
        />
        <span style={{ font: 'var(--font-body-s)', color: 'var(--fg-primary)' }}>
          <strong style={{ fontWeight: 600 }}>{PROFILE.available}</strong>
          {' · '}
          {PROFILE.noticePeriod} notice
        </span>
      </div>

      {/* Quote with rose left rule */}
      <blockquote
        style={{
          margin: 0,
          font: 'italic 400 14px/1.55 var(--font-sans)',
          color: 'var(--fg-secondary)',
          borderLeft: '2px solid var(--dw-rose)',
          padding: '4px 0 4px 14px',
        }}
      >
        <span style={{ color: 'var(--dw-rose)', fontWeight: 600, marginRight: 2 }}>“</span>
        I might not have the answer right now — but I'll find it.
        <span style={{ color: 'var(--dw-rose)', fontWeight: 600, marginLeft: 2 }}>”</span>
      </blockquote>

      <Section label="Stack right now" hint={`${STACK_PILLS.length} of ${TOTAL_SKILLS}`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {STACK_PILLS.map((t) => (
            <span
              key={t}
              style={{
                padding: '5px 11px',
                background: 'var(--bg-default)',
                borderRadius: 999,
                boxShadow: 'var(--elev-hairline-soft)',
                font: 'var(--font-mono-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--fg-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section label="Education">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
          {EDUCATION.map((e) => (
            <li key={e.degree} style={{ minWidth: 0 }}>
              <div style={{ font: '600 13.5px/1.35 var(--font-sans)', color: 'var(--fg-primary)' }}>
                {e.degree}
              </div>
              <div
                style={{
                  font: '400 13px/1.4 var(--font-sans)',
                  color: 'var(--fg-secondary)',
                  marginTop: 1,
                }}
              >
                {e.school}
              </div>
              <div
                style={{
                  font: 'var(--font-mono-xs)',
                  letterSpacing: '0.04em',
                  color: 'var(--fg-tertiary)',
                  marginTop: 4,
                }}
              >
                {e.dates}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <div style={{ flex: 1 }} />

      <Section label="Contact">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
          <ContactRow label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
          <ContactRow
            label="Phone"
            value={PROFILE.phone}
            href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
          />
          <ContactRow
            label="LinkedIn"
            value={PROFILE.linkedin}
            href={`https://${PROFILE.linkedin}`}
          />
          <ContactRow label="GitHub" value={PROFILE.github} href={`https://${PROFILE.github}`} />
        </ul>
      </Section>

    </aside>
  )
}

function Section({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span
          style={{
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--fg-tertiary)',
            position: 'relative',
            paddingLeft: 14,
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 6,
              height: 6,
              background: 'var(--dw-rose)',
              borderRadius: 999,
            }}
          />
          {label}
        </span>
        {hint && (
          <span
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.04em',
              color: 'var(--fg-muted, var(--fg-tertiary))',
            }}
          >
            {hint}
          </span>
        )}
      </header>
      <div>{children}</div>
    </section>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--fg-muted, var(--fg-tertiary))',
        }}
      >
        {label}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          font: '500 13px/1.3 var(--font-sans)',
          color: 'var(--fg-primary)',
          textDecoration: 'none',
          wordBreak: 'break-all',
          transition: 'color var(--motion-fast) var(--ease-standard)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--dw-rose)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-primary)')}
      >
        {value}
      </a>
    </li>
  )
}
