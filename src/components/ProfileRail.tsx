import type { AccentKey, Profile } from '@/data/profile'

import NamGlyph from './NamGlyph'

interface Props {
  profile: Profile
  accent?: AccentKey
}

/**
 * Optional left rail with profile facts (phone, email, links).
 * Dormant in v2 (hidden behind showProfile flag). Left in the codebase
 * so it can be toggled on by a future "show contact" flow without
 * re-implementing.
 */
export default function ProfileRail({ profile, accent = 'rose' }: Props) {
  return (
    <aside
      style={{
        width: 280,
        flexShrink: 0,
        padding: 'var(--space-6)',
        borderRight: '1px solid var(--border-subtle)',
        background: 'var(--bg-raised)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        overflow: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <NamGlyph size={56} accent={accent} />
        <div>
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-tertiary)',
            }}
          >
            Portfolio · Chat
          </div>
          <div
            style={{
              font: '600 22px/28px var(--font-sans)',
              color: 'var(--fg-primary)',
              marginTop: 4,
              letterSpacing: '-0.01em',
            }}
          >
            {profile.name}
          </div>
          <div
            style={{ font: 'var(--font-body-s)', color: 'var(--fg-secondary)', marginTop: 2 }}
          >
            {profile.title} · {profile.yearsExp} years
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: 'var(--dw-mint-2)',
            boxShadow: '0 0 0 3px rgba(91,192,176,0.18)',
          }}
        />
        <div style={{ font: 'var(--font-body-s)', color: 'var(--fg-primary)' }}>
          <div style={{ fontWeight: 600 }}>{profile.available}</div>
          <div style={{ font: 'var(--font-caption)', color: 'var(--fg-tertiary)' }}>
            Currently at {profile.currentlyAt}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <ProfileRow label="Location" value={profile.location} />
        <ProfileRow label="Email" value={profile.email} href={`mailto:${profile.email}`} />
        <ProfileRow
          label="Phone"
          value={profile.phone}
          href={`tel:${profile.phone.replace(/\s/g, '')}`}
        />
        <ProfileRow
          label="LinkedIn"
          value={profile.linkedin}
          href={`https://${profile.linkedin}`}
        />
        <ProfileRow label="GitHub" value={profile.github} href={`https://${profile.github}`} />
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          font: 'var(--font-caption)',
          color: 'var(--fg-tertiary)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--space-3)',
        }}
      >
        This is a chat-driven portfolio. Paste a job description below and I'll show you how I'd
        fit.
      </div>
    </aside>
  )
}

interface RowProps {
  label: string
  value: string
  href?: string
}

function ProfileRow({ label, value, href }: RowProps) {
  return (
    <div>
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fg-tertiary)',
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            font: '500 14px/18px var(--font-sans)',
            color: 'var(--fg-primary)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: 1,
          }}
        >
          {value}
        </a>
      ) : (
        <div style={{ font: '500 14px/18px var(--font-sans)', color: 'var(--fg-primary)' }}>
          {value}
        </div>
      )}
    </div>
  )
}
