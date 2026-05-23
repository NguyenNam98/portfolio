export default function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: 'var(--fg-tertiary)',
            animation: `nam-dot 1.2s ${i * 0.15}s infinite ease-in-out`,
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  )
}
