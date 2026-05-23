import { useEffect, useRef, useState } from 'react'

interface Props {
  initial?: string
  onClose: () => void
  onSubmit: (text: string) => void
}

export default function JDModal({ initial = '', onClose, onSubmit }: Props) {
  const [text, setText] = useState(initial)
  const taRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    taRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(9,9,11,0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        backdropFilter: 'blur(6px)',
        animation: 'nam-fade-up 240ms var(--ease-standard) both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(640px, 100%)',
          background: 'var(--bg-default)',
          color: 'var(--fg-primary)',
          borderRadius: 20,
          boxShadow: 'var(--elev-3)',
          padding: 'var(--space-6)',
          display: 'grid',
          gap: 'var(--space-4)',
          animation: 'nam-pop 320ms var(--ease-emphatic) both',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                font: 'var(--font-mono-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--dw-rose)',
              }}
            >
              JD Analyzer
            </div>
            <div
              style={{
                font: '600 22px/28px var(--font-sans)',
                marginTop: 4,
                letterSpacing: '-0.01em',
              }}
            >
              Paste the job description
            </div>
            <div
              style={{
                font: 'var(--font-body-s)',
                color: 'var(--fg-secondary)',
                marginTop: 4,
                maxWidth: 480,
              }}
            >
              I'll read it, score the fit, and pull out the projects and skills that map to your
              role. Honest read — if there's a gap, I'll tell you.
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--fg-tertiary)',
              padding: 4,
              font: '20px/1 var(--font-sans)',
            }}
          >
            ×
          </button>
        </div>

        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the JD here — responsibilities, requirements, anything you've got."
          style={{
            width: '100%',
            minHeight: 220,
            padding: 'var(--space-3)',
            border: '1px solid var(--field-border)',
            borderRadius: 12,
            background: 'var(--field-bg)',
            font: 'var(--font-body-s)',
            color: 'var(--fg-primary)',
            resize: 'vertical',
            outline: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
            <button
              onClick={onClose}
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                background: 'transparent',
                border: '1px solid var(--border-default)',
                color: 'var(--fg-primary)',
                cursor: 'pointer',
                font: '500 14px/18px var(--font-sans)',
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(text)}
              disabled={!text.trim()}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: text.trim() ? 'var(--dw-rose)' : 'var(--bg-subtle)',
                color: text.trim() ? '#fff' : 'var(--fg-tertiary)',
                border: 'none',
                cursor: text.trim() ? 'pointer' : 'default',
                font: '600 14px/18px var(--font-sans)',
                boxShadow: text.trim() ? '0 4px 12px rgba(224,76,113,0.25)' : 'none',
              }}
            >
              Analyze the fit →
            </button>
        </div>
      </div>
    </div>
  )
}
