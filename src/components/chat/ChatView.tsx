import { useEffect, useRef, type Ref } from 'react'

import Bubble, { type BubbleSide } from '../Bubble'
import ChipRow from '../ChipRow'
import TypingDots from '../TypingDots'
import AsteriskBg from '../hero/AsteriskBg'
import ChatMobileBar from './ChatMobileBar'
import ChatSidebar from './ChatSidebar'

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
  useEffect(() => {
    taRef.current?.focus()
  }, [])

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
          overflow: 'hidden',
        }}
      >
        {/* Asterisk + grid backdrop (dimmed) */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none' }}
        >
          <AsteriskBg accent="rose" />
        </div>

        <ChatMobileBar onResetHome={onResetHome} onPasteJD={onPasteJD} />

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'var(--space-8) var(--space-6) var(--space-5)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: 820,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
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

        {/* Composer */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'var(--space-5) var(--space-6) var(--space-6)',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-default)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              maxWidth: 820,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 12,
                padding: '14px 16px',
                background: 'var(--bg-default)',
                border: '1.5px solid var(--border-default)',
                borderRadius: 20,
                boxShadow: 'var(--elev-2)',
                transition: 'border-color var(--motion-med) var(--ease-standard)',
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = 'var(--dw-rose)')}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
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
                placeholder="Ask me anything, or paste a job description…"
                disabled={busy}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: 'transparent',
                  font: '400 17px/26px var(--font-sans)',
                  color: 'var(--fg-primary)',
                  padding: '4px 2px',
                  maxHeight: 140,
                }}
              />
              <button
                onClick={onSend}
                disabled={!input.trim() || busy}
                aria-label="Send"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: input.trim() && !busy ? 'var(--dw-rose)' : 'var(--bg-subtle)',
                  color: input.trim() && !busy ? '#fff' : 'var(--fg-tertiary)',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'grid',
                  placeItems: 'center',
                  font: '600 18px/1 var(--font-sans)',
                  transition: 'all var(--motion-fast) var(--ease-standard)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (input.trim()) e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
