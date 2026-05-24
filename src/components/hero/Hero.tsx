import { useEffect, useRef, useState } from 'react'

import { MARQUEE_ITEMS, type QuickAction } from '@/data/prompts'
import { useCompany } from '@/lib/company-context'
import AsteriskBg from './AsteriskBg'
import CyclingTagline from './CyclingTagline'
import LiveClock from './LiveClock'
import SkillsMarquee from './SkillsMarquee'
import StatusPill from './StatusPill'

interface Props {
  onSubmit: (text: string) => void
  onAction: (action: QuickAction) => void
  onPasteJD: () => void
}

const HERO_CHIPS: readonly QuickAction[] = [
  { id: 'jd', label: 'Paste a JD' },
  { id: 'skills', label: 'Show technical skills' },
  { id: 'projects', label: 'Top projects' },
  { id: 'pitch', label: 'Why hire me in 30s' },
]

export default function Hero({ onSubmit, onAction, onPasteJD }: Props) {
  const [text, setText] = useState('')
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const company = useCompany()

  useEffect(() => {
    taRef.current?.focus()
  }, [])

  const send = () => {
    const t = text.trim()
    if (!t) return
    setText('')
    onSubmit(t)
  }

  const chips: readonly QuickAction[] = company
    ? [
        { id: 'why-fit', label: `See why I fit at ${company.displayName}` },
        { id: 'skills', label: 'Show technical skills' },
        { id: 'projects', label: 'Top projects' },
        { id: 'pitch', label: 'Why hire me in 30s' },
      ]
    : HERO_CHIPS

  const statusLabel = company
    ? `ONLINE · TAILORED FOR ${company.displayName.toUpperCase()}`
    : 'ONLINE · OPEN TO ROLES'

  const eyebrow = company
    ? `FOR ${company.displayName.toUpperCase()} · ${company.role.toUpperCase()}`
    : 'CHAT-DRIVEN PORTFOLIO'

  const placeholder = company
    ? `Hi ${company.displayName} team — ask anything, or click "See why I fit" →`
    : 'What role are you hiring for? Paste a JD, or ask me anything…'

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-default)',
        animation: 'nam-fade-up 600ms var(--ease-emphatic) both',
      }}
    >
      <AsteriskBg accent="rose" />

      {/* Top status strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <StatusPill label={statusLabel} />
          <span
            style={{
              font: 'var(--font-mono-xs)',
              color: 'var(--fg-tertiary)',
              letterSpacing: '0.1em',
            }}
          >
            ·
          </span>
          <LiveClock />
          <span
            style={{
              font: 'var(--font-mono-xs)',
              color: 'var(--fg-tertiary)',
              letterSpacing: '0.1em',
            }}
          >
            ·
          </span>
          <span
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.1em',
              color: 'var(--fg-secondary)',
            }}
          >
            SYDNEY, AUSTRALIA
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            font: 'var(--font-mono-xs)',
            letterSpacing: '0.1em',
            color: 'var(--fg-tertiary)',
          }}
        >
          <span>PORTFOLIO / 2026</span>
          <span>·</span>
          <span>CHAT EDITION</span>
        </div>
      </div>

      {/* Center */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'grid',
          placeItems: 'center',
          padding: '32px 24px',
          minHeight: 0,
        }}
      >
        <div
          style={{
            width: 'min(880px, 100%)',
            display: 'grid',
            gap: 28,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.18em',
              color: 'var(--dw-rose)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--dw-rose)' }}
            />
            {eyebrow}
          </div>

          <h1
            style={{
              margin: 0,
              font: '700 clamp(56px, 11vw, 132px)/0.92 var(--font-display)',
              letterSpacing: '-0.04em',
              color: 'var(--fg-primary)',
              textWrap: 'balance',
            }}
          >
            <span
              style={{ display: 'block', animation: 'nam-rise 700ms var(--ease-emphatic) both' }}
            >
              NAM
            </span>
            <span
              style={{
                display: 'block',
                animation: 'nam-rise 700ms 90ms var(--ease-emphatic) both',
              }}
            >
              NGUYEN<span style={{ color: 'var(--dw-rose)' }}>.</span>
            </span>
          </h1>

          <div
            style={{
              font: '500 clamp(20px, 2.4vw, 28px)/1.4 var(--font-sans)',
              color: 'var(--fg-secondary)',
              animation: 'nam-rise 700ms 220ms var(--ease-emphatic) both',
            }}
          >
            <CyclingTagline />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              font: 'var(--font-mono-xs)',
              letterSpacing: '0.12em',
              color: 'var(--fg-tertiary)',
              animation: 'nam-rise 700ms 320ms var(--ease-emphatic) both',
            }}
          >
            <span>BACKEND + PLATFORM · NESTJS · AWS / EKS · TERRAFORM</span>
            <span>·</span>
            <span>CURRENTLY @ SAMPLE ASSIST</span>
          </div>

          {/* Composer */}
          <div
            style={{
              marginTop: 12,
              animation: 'nam-rise 700ms 420ms var(--ease-emphatic) both',
              display: 'grid',
              gap: 14,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 12,
                padding: '16px 18px',
                background: 'var(--bg-default)',
                border: '1.5px solid var(--border-default)',
                borderRadius: 20,
                boxShadow: 'var(--elev-2)',
                transition:
                  'border-color var(--motion-med) var(--ease-standard), box-shadow var(--motion-med) var(--ease-standard)',
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = 'var(--dw-rose)')}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
            >
              <textarea
                ref={taRef}
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder={placeholder}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: 'transparent',
                  font: '400 18px/26px var(--font-sans)',
                  color: 'var(--fg-primary)',
                  padding: '2px 4px',
                  maxHeight: 140,
                }}
              />
              <button
                onClick={send}
                disabled={!text.trim()}
                aria-label="Send"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: text.trim() ? 'var(--dw-rose)' : 'var(--bg-subtle)',
                  color: text.trim() ? '#fff' : 'var(--fg-tertiary)',
                  border: 'none',
                  cursor: text.trim() ? 'pointer' : 'default',
                  display: 'grid',
                  placeItems: 'center',
                  font: '600 18px/1 var(--font-sans)',
                  transition: 'all var(--motion-fast) var(--ease-standard)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (text.trim()) e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                ↑
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <span
                style={{
                  font: 'var(--font-mono-xs)',
                  letterSpacing: '0.1em',
                  color: 'var(--fg-tertiary)',
                  textTransform: 'uppercase',
                  marginRight: 4,
                }}
              >
                Try →
              </span>
              {chips.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => (a.id === 'jd' ? onPasteJD() : onAction(a))}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: 'var(--bg-default)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--fg-primary)',
                    font: '500 13px/16px var(--font-sans)',
                    cursor: 'pointer',
                    animation: `nam-rise 500ms ${500 + i * 70}ms var(--ease-emphatic) both`,
                    transition: 'all var(--motion-fast) var(--ease-standard)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--dw-gray-90)'
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.borderColor = 'var(--dw-gray-90)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-default)'
                    e.currentTarget.style.color = 'var(--fg-primary)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <SkillsMarquee items={MARQUEE_ITEMS} />
    </div>
  )
}
