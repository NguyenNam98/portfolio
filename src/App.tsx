import { useEffect, useRef, useState, type ReactNode } from 'react'

import { PITCH, PROFILE, PROJECTS, SKILL_GROUPS } from '@/data/profile'
import { FOLLOWUPS, looksLikeJD, type JDMatchResult, type QuickAction } from '@/data/prompts'
import ChatView, { type ChatMessage } from '@/components/chat/ChatView'
import Hero from '@/components/hero/Hero'
import JDModal from '@/components/JDModal'
import JDMatchCard from '@/components/cards/JDMatchCard'
import PitchCard from '@/components/cards/PitchCard'
import ProjectsShowcase from '@/components/cards/ProjectsShowcase'
import SkillsCard from '@/components/cards/SkillsCard'

const NAM_LABEL = 'Nam'
const HR_LABEL = 'Recruiter'

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function makeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`
}

function idForFollowup(label: string): QuickAction['id'] | 'default' {
  const x = label.toLowerCase()
  if (x.includes('resume') || x.includes('cv')) return 'resume'
  if (x.includes('skill')) return 'skills'
  if (x.includes('project')) return 'projects'
  if (x.includes('hire') || x.includes('pitch') || x.includes('30')) return 'pitch'
  if (x.includes('jd') || x.includes('description')) return 'jd'
  if (x.includes('touch') || x.includes('contact')) return 'contact'
  return 'default'
}

const contactLinkStyle = {
  color: 'var(--fg-primary)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
} as const

function ContactBlock() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div>Easiest ways to reach me:</div>
      <div style={{ display: 'grid', gap: 6 }}>
        <a href={`mailto:${PROFILE.email}`} style={contactLinkStyle}>
          📧 {PROFILE.email}
        </a>
        <a
          href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
          style={contactLinkStyle}
        >
          📞 {PROFILE.phone}
        </a>
        <a
          href={`https://${PROFILE.linkedin}`}
          target="_blank"
          rel="noreferrer"
          style={contactLinkStyle}
        >
          🔗 {PROFILE.linkedin}
        </a>
        <a
          href={`https://${PROFILE.github}`}
          target="_blank"
          rel="noreferrer"
          style={contactLinkStyle}
        >
          🐙 {PROFILE.github}
        </a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" style={contactLinkStyle}>
          📄 Download my resume (PDF)
        </a>
      </div>
      <div style={{ font: 'var(--font-body-s)', color: 'var(--fg-secondary)' }}>
        I'm in Sydney (AEST). Happy to do an intro call any weekday.
      </div>
    </div>
  )
}

function ResumeBlock() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div>
        Here's the PDF — built from the same facts you'll see in the chat, just laid out for
        ATS-friendly skimming.
      </div>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          borderRadius: 999,
          background: 'var(--dw-rose)',
          color: '#fff',
          textDecoration: 'none',
          font: '600 13px/16px var(--font-sans)',
          letterSpacing: '0.04em',
          width: 'fit-content',
          boxShadow: '0 6px 18px rgba(224,76,113,0.25)',
        }}
      >
        📄 Download my resume (PDF)
      </a>
      <div style={{ font: 'var(--font-body-s)', color: 'var(--fg-secondary)' }}>
        Or stay in chat — paste a JD and I'll map the fit directly.
      </div>
    </div>
  )
}

function JDExcerpt({ text }: { text: string }) {
  const truncated = text.length > 280 ? text.slice(0, 280) + '…' : text
  const lines = truncated.split('\n').slice(0, 6).join('\n')
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}
      >
        📎 Job description · {text.length.toLocaleString()} chars
      </div>
      <div
        style={{
          font: 'var(--font-body-s)',
          whiteSpace: 'pre-wrap',
          opacity: 0.9,
          maxHeight: 140,
          overflow: 'hidden',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        }}
      >
        {lines}
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'hero' | 'chat'>('hero')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [jdOpen, setJdOpen] = useState(false)

  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Scroll-to-bottom on new messages / typing transitions
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  /* ---------------- Message helpers ---------------- */
  const pushMessage = (msg: Omit<ChatMessage, 'id'>): string => {
    const id = makeId('m')
    setMessages((prev) => [...prev, { ...msg, id }])
    return id
  }
  const pushTyping = (): string => {
    const id = makeId('typing')
    setMessages((prev) => [...prev, { id, side: 'nam', typing: true }])
    return id
  }
  const replaceMessage = (id: string, msg: Omit<ChatMessage, 'id'>) => {
    setMessages((prev) => prev.map((x) => (x.id === id ? { ...msg, id } : x)))
  }

  /* ---------------- Static answers ---------------- */
  const respondWithCard = async (
    content: ReactNode,
    followups: readonly string[],
    wide = false,
  ) => {
    setBusy(true)
    const tid = pushTyping()
    await sleep(600 + Math.random() * 350)
    replaceMessage(tid, {
      side: 'nam',
      label: NAM_LABEL,
      content,
      followups,
      wide,
    })
    setBusy(false)
  }

  const routeStaticAnswer = (id: QuickAction['id'] | 'default') => {
    if (id === 'skills') {
      void respondWithCard(
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            Here's my stack — each chip shows the projects where I actually shipped it. Click any
            project to filter.
          </div>
          <SkillsCard groups={SKILL_GROUPS} projects={PROJECTS} />
        </div>,
        FOLLOWUPS.skills,
        true,
      )
    } else if (id === 'projects') {
      void respondWithCard(
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={{ font: 'var(--font-body-l)' }}>
            Here's the full deck — pick any project to dig in. Most recent on the left.
          </div>
          <ProjectsShowcase projects={PROJECTS} />
        </div>,
        FOLLOWUPS.projects,
        true,
      )
    } else if (id === 'pitch') {
      void respondWithCard(<PitchCard pitch={PITCH} />, FOLLOWUPS.pitch)
    } else if (id === 'contact') {
      void respondWithCard(<ContactBlock />, FOLLOWUPS.contact)
    } else if (id === 'resume') {
      void respondWithCard(<ResumeBlock />, FOLLOWUPS.contact)
    }
  }

  /* ---------------- JD analyzer flow ---------------- */
  const submitJD = async (jdText: string) => {
    setJdOpen(false)
    const trimmed = jdText.trim()
    if (!trimmed) return
    if (view === 'hero') setView('chat')

    pushMessage({ side: 'hr', label: HR_LABEL, content: <JDExcerpt text={trimmed} /> })

    setBusy(true)
    const tid = pushTyping()
    await sleep(200)
    replaceMessage(tid, {
      side: 'nam',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ font: 'var(--font-body-s)', color: 'var(--fg-secondary)' }}>
            Reading the JD and mapping it to my background…
          </span>
        </div>
      ),
    })

    try {
      const res = await fetch('/api/jd-match', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jd: trimmed }),
      })
      const data = (await res.json().catch(() => null)) as
        | { result?: JDMatchResult; message?: string }
        | null

      if (!res.ok || !data?.result) {
        replaceMessage(tid, {
          side: 'nam',
          label: NAM_LABEL,
          content: (
            <div>
              {data?.message ??
                "Hmm — I had trouble parsing that one cleanly. Want to try pasting it again?"}
            </div>
          ),
          followups: FOLLOWUPS.default,
        })
        return
      }

      replaceMessage(tid, {
        side: 'nam',
        label: NAM_LABEL,
        wide: true,
        content: (
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ font: 'var(--font-body-l)' }}>
              Got it — I read through the JD. Here's where I see the fit:
            </div>
            <JDMatchCard result={data.result} projects={PROJECTS} />
          </div>
        ),
        followups: FOLLOWUPS.jd,
      })
    } catch {
      replaceMessage(tid, {
        side: 'nam',
        label: NAM_LABEL,
        content: <div>Network error — try again in a sec?</div>,
        followups: FOLLOWUPS.default,
      })
    } finally {
      setBusy(false)
    }
  }

  /* ---------------- Free-text chat (streaming SSE) ---------------- */
  const submitChat = async (text: string) => {
    if (view === 'hero') setView('chat')
    pushMessage({ side: 'hr', label: HR_LABEL, content: <span>{text}</span> })

    setBusy(true)
    const tid = pushTyping()

    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    let accumulated = ''

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: text }),
        signal: ctrl.signal,
      })

      if (!res.ok || !res.body) {
        const fb = (await res.json().catch(() => null)) as { message?: string } | null
        replaceMessage(tid, {
          side: 'nam',
          label: NAM_LABEL,
          content: <div>{fb?.message ?? 'Something went wrong. Try again?'}</div>,
          followups: FOLLOWUPS.default,
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      const renderStreamBubble = (final: boolean) => {
        replaceMessage(tid, {
          side: 'nam',
          label: NAM_LABEL,
          content: (
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {accumulated}
              {!final && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: '0.95em',
                    marginLeft: 2,
                    background: 'var(--dw-rose)',
                    verticalAlign: 'middle',
                    animation: 'nam-caret 1s steps(2) infinite',
                  }}
                />
              )}
            </div>
          ),
          followups: final ? FOLLOWUPS.default : undefined,
        })
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let payload: {
            type: string
            value?: string
            message?: string
          }
          try {
            payload = JSON.parse(line.slice(6))
          } catch {
            continue
          }
          if (payload.type === 'text' && payload.value) {
            accumulated += payload.value
            renderStreamBubble(false)
          } else if (payload.type === 'done') {
            renderStreamBubble(true)
          } else if (payload.type === 'error') {
            replaceMessage(tid, {
              side: 'nam',
              label: NAM_LABEL,
              content: <div>Error from the chat API: {payload.message}</div>,
              followups: FOLLOWUPS.default,
            })
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      replaceMessage(tid, {
        side: 'nam',
        label: NAM_LABEL,
        content: <div>Network error — try again?</div>,
        followups: FOLLOWUPS.default,
      })
    } finally {
      setBusy(false)
    }
  }

  /* ---------------- Quick action chips ---------------- */
  const handleQuickAction = (action: QuickAction) => {
    if (action.id === 'jd') {
      setJdOpen(true)
      return
    }
    if (view === 'hero') setView('chat')
    pushMessage({ side: 'hr', label: HR_LABEL, content: <span>{action.label}</span> })
    setTimeout(() => routeStaticAnswer(action.id), 60)
  }

  /* ---------------- Composer send (Hero + ChatView share this) ---------------- */
  const onSend = (rawOverride?: string) => {
    const text = (rawOverride ?? input).trim()
    if (!text || busy) return
    if (rawOverride === undefined) setInput('')

    // 1. JD-shape detection → JD analyzer
    if (looksLikeJD(text)) {
      void submitJD(text)
      return
    }

    // 2. Keyword shortcuts → static cards
    const lower = text.toLowerCase()
    if (/\b(skill|stack|tools|tooling)\b/.test(lower)) {
      handleQuickAction({ id: 'skills', label: text })
      return
    }
    if (/\b(project|projects|experience|work history|shipped|past role)\b/.test(lower)) {
      handleQuickAction({ id: 'projects', label: text })
      return
    }
    if (/\b(why hire|hire me|pitch|30 ?sec|sell yourself|tldr)\b/.test(lower)) {
      handleQuickAction({ id: 'pitch', label: text })
      return
    }
    if (/\b(contact|email|reach|phone|call|get in touch)\b/.test(lower)) {
      handleQuickAction({ id: 'contact', label: text })
      return
    }
    if (/\b(resume|cv|download)\b/.test(lower)) {
      handleQuickAction({ id: 'resume', label: text })
      return
    }

    // 3. Fallback → real LLM via /api/chat
    void submitChat(text)
  }

  const onFollowupPick = (label: string) => {
    const id = idForFollowup(label)
    if (id === 'jd') {
      setJdOpen(true)
      return
    }
    if (id === 'default') {
      handleQuickAction({ id: 'skills', label })
      return
    }
    handleQuickAction({ id, label })
  }

  const resetConversation = () => {
    abortRef.current?.abort()
    setView('hero')
    setMessages([])
    setInput('')
    setBusy(false)
  }

  /* ---------------- Render ---------------- */
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--bg-default)',
        color: 'var(--fg-primary)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {view === 'hero' ? (
        <Hero
          onSubmit={(t) => onSend(t)}
          onAction={handleQuickAction}
          onPasteJD={() => setJdOpen(true)}
        />
      ) : (
        <ChatView
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={() => onSend()}
          onPasteJD={() => setJdOpen(true)}
          onResetHome={resetConversation}
          onFollowupPick={onFollowupPick}
          busy={busy}
          scrollRef={scrollRef}
        />
      )}

      {jdOpen && <JDModal onClose={() => setJdOpen(false)} onSubmit={submitJD} />}
    </div>
  )
}
