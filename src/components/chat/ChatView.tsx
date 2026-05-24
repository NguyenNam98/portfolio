import { useEffect, useRef, type Ref } from 'react'

import { useCompany } from '@/lib/company-context'
import Bubble, { type BubbleSide } from '../Bubble'
import ChipRow from '../ChipRow'
import TypingDots from '../TypingDots'
import ChatMobileBar from './ChatMobileBar'
import ChatSidebar from './ChatSidebar'
import ChatTopBar from './ChatTopBar'

export interface ChatMessage {
  readonly id: string
  readonly side: BubbleSide
  readonly label?: string
  readonly content?: React.ReactNode
  readonly typing?: boolean
  readonly followups?: readonly string[]
  readonly wide?: boolean
}

interface Props {
  messages: readonly ChatMessage[]
  input: string
  setInput: (v: string) => void
  onSend: () => void
  onPasteJD: () => void
  onResetHome: () => void
  onFollowupPick: (label: string) => void
  busy: boolean
  scrollRef: Ref<HTMLDivElement>
}

export default function ChatView({
  messages,
  input,
  setInput,
  onSend,
  onPasteJD,
  onResetHome,
  onFollowupPick,
  busy,
  scrollRef,
}: Props) {
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const company = useCompany()

  useEffect(() => {
    taRef.current?.focus()
  }, [])

  const starterChips: readonly string[] = company
    ? [
        `See why I fit at ${company.displayName}`,
        'Show top projects',
        'Why hire me in 30s',
      ]
    : ['Show top projects', 'Show technical skills', 'Why hire me in 30s']

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        animation: 'nam-fade-up 500ms var(--ease-emphatic) both',
      }}
    >
      <ChatSidebar onResetHome={onResetHome} />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          position: 'relative',
          background: 'var(--bg-default)',
        }}
      >
        <ChatMobileBar onResetHome={onResetHome} onPasteJD={onPasteJD} />
        <ChatTopBar />

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '32px 48px 220px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {messages.map((m) => (
              <div key={m.id}>
                <Bubble side={m.side} label={m.label} wide={!!m.wide}>
                  {m.typing ? <TypingDots /> : m.content}
                </Bubble>
                {m.followups && m.followups.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      marginLeft: 40,
                      animation: 'nam-fade-up 400ms 200ms both',
                    }}
                  >
                    <div
                      style={{
                        font: 'var(--font-mono-xs)',
                        letterSpacing: '0.1em',
                        color: 'var(--fg-tertiary)',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                      }}
                    >
                      What's next →
                    </div>
                    <ChipRow items={m.followups} onPick={(label) => onFollowupPick(label)} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ height: 4 }} />
          </div>
        </div>

        {/* Composer — sticky bottom, rose-outlined */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            padding: '18px 48px 24px',
            background:
              'linear-gradient(to top, var(--bg-default) 35%, rgba(255,255,255,0))',
            pointerEvents: 'none',
            zIndex: 4,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              maxWidth: 884,
              margin: '0 auto',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px 14px 22px',
              background: 'var(--bg-default)',
              border: '1.5px solid var(--dw-rose)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 12px 32px rgba(224,76,113,0.10)',
            }}
          >
            <textarea
              ref={taRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  onSend()
                }
              }}
              placeholder={
                company
                  ? `Hi ${company.displayName} team — ask me anything…`
                  : 'Ask me anything, or paste a job description…'
              }
              disabled={busy}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                resize: 'none',
                background: 'transparent',
                font: 'var(--font-body-l)',
                color: 'var(--fg-primary)',
                padding: '2px 0',
                maxHeight: 140,
              }}
            />
            <button
              onClick={onSend}
              disabled={!input.trim() || busy}
              aria-label="Send"
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: input.trim() && !busy ? 'var(--dw-rose)' : 'var(--dw-gray-10)',
                color: input.trim() && !busy ? '#fff' : 'var(--fg-secondary)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'grid',
                placeItems: 'center',
                transition: 'all var(--motion-fast) var(--ease-standard)',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

          <div
            style={{
              maxWidth: 884,
              margin: '12px auto 0',
              pointerEvents: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 8,
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
              Try →
            </span>
            {starterChips.map((label, i) => (
              <button
                key={label}
                onClick={() => onFollowupPick(label)}
                style={{
                  padding: '7px 13px',
                  background: 'var(--bg-default)',
                  border: 'none',
                  borderRadius: 999,
                  boxShadow:
                    i === 0
                      ? 'inset 0 0 0 1px var(--dw-rose)'
                      : 'var(--elev-hairline-soft)',
                  font: '500 13px/1 var(--font-sans)',
                  color: i === 0 ? 'var(--dw-rose)' : 'var(--fg-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--motion-fast) var(--ease-standard)',
                }}
                onMouseEnter={(e) => {
                  if (i === 0) {
                    e.currentTarget.style.background = 'var(--dw-rose)'
                    e.currentTarget.style.color = '#fff'
                  } else {
                    e.currentTarget.style.background = 'var(--dw-gray-10)'
                    e.currentTarget.style.color = 'var(--fg-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-default)'
                  e.currentTarget.style.color =
                    i === 0 ? 'var(--dw-rose)' : 'var(--fg-secondary)'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
