interface Props {
  items: readonly string[]
}

export default function SkillsMarquee({ items }: Props) {
  // Duplicate so the loop seamlessly cycles
  const stream = [...items, ...items]
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-default)',
        padding: '10px 0',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 32,
          animation: 'nam-marquee 38s linear infinite',
          width: 'max-content',
        }}
      >
        {stream.map((s, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.12em',
              color: 'var(--fg-secondary)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: 999,
                background: 'var(--dw-rose)',
                opacity: 0.5,
              }}
            />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
