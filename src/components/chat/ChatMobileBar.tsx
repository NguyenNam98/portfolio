import NamGlyph from '../NamGlyph'

interface Props {
  onResetHome: () => void
  onPasteJD: () => void
}

/**
 * Mobile-only slim top bar. Hidden on desktop (≥720px) via
 * .chat-mobile-bar in index.css. The chat sidebar handles
 * navigation on desktop; this gives mobile users a way back home
 * and a one-tap shortcut to the JD analyzer.
 */
export default function ChatMobileBar({ onResetHome, onPasteJD }: Props) {
  return (
    <div
      className="chat-mobile-bar"
      style={{
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-default)',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
      }}
    >
      <button
        onClick={onResetHome}
        title="Back to home"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--fg-primary)',
        }}
      >
        <NamGlyph size={32} accent="rose" />
        <span
          style={{
            font: '700 16px/1 var(--font-display)',
            letterSpacing: '-0.02em',
          }}
        >
          NAM NGUYEN<span style={{ color: 'var(--dw-rose)' }}>.</span>
        </span>
      </button>

      <div style={{ flex: 1 }} />

      <button
        onClick={onResetHome}
        aria-label="Home"
        style={{
          padding: '7px 11px',
          borderRadius: 999,
          background: 'transparent',
          border: '1px solid var(--border-default)',
          color: 'var(--fg-primary)',
          cursor: 'pointer',
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        ← Home
      </button>
      <button
        onClick={onPasteJD}
        style={{
          padding: '7px 12px',
          borderRadius: 999,
          background: 'var(--dw-rose)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          font: '600 11px/14px var(--font-sans)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(224,76,113,0.25)',
        }}
      >
        ＋ JD
      </button>
    </div>
  )
}
