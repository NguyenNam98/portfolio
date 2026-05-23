interface Props {
  label?: string
  tone?: 'ok' | 'warn'
}

export default function StatusPill({ label = 'ONLINE', tone = 'ok' }: Props) {
  const color = tone === 'ok' ? 'var(--dw-mint-2)' : 'var(--dw-gold)'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        font: 'var(--font-mono-xs)',
        letterSpacing: '0.1em',
        color: 'var(--fg-secondary)',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 0 0 ${color}`,
          animation: 'nam-pulse 1.8s ease-out infinite',
          color,
        }}
      />
      {label}
    </span>
  )
}
