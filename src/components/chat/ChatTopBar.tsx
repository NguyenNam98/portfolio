import { useEffect, useState } from 'react'

import { useCompany } from '@/lib/company-context'

function formatSydneyTime(d: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
}

export default function ChatTopBar() {
  const company = useCompany()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className="chat-top-bar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 36px',
        borderBottom: '1px solid var(--border-subtle)',
        font: 'var(--font-mono-xs)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--fg-tertiary)',
        background: 'var(--bg-default)',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--fg-secondary)',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              background: 'var(--dw-mint, var(--dw-mint-2))',
              borderRadius: 999,
              boxShadow: '0 0 0 3px rgba(91,192,176,0.18)',
            }}
          />
          Online
        </span>
        <Sep />
        <span>{company ? `Tailored for ${company.displayName}` : 'Open to roles'}</span>
        <Sep />
        <span>{formatSydneyTime(now)} AEST</span>
      </div>
      <div>Portfolio / 2026</div>
    </header>
  )
}

function Sep() {
  return (
    <span aria-hidden style={{ color: 'var(--dw-gray-30, var(--border-subtle))' }}>
      ·
    </span>
  )
}
