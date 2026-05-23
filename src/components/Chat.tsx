import { useRef, useState } from 'react'

interface Usage {
  readonly inputTokens: number
  readonly outputTokens: number
  readonly remaining: number
}

const STARTERS: readonly string[] = [
  'What was your biggest production migration?',
  'Tell me about Startiny.',
  'What kind of role are you looking for next?',
  'How do you think about cost on AWS vs Cloudflare?',
]

export default function Chat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [usage, setUsage] = useState<Usage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  async function ask(prompt?: string) {
    const q = (prompt ?? question).trim()
    if (!q || loading) return

    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setQuestion(q)
    setAnswer('')
    setUsage(null)
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q }),
        signal: ctrl.signal,
      })

      if (!res.ok || !res.body) {
        const fallback = await res.json().catch(() => null) as
          | { message?: string; error?: string }
          | null
        setError(
          fallback?.message ??
            (res.status === 429
              ? 'Daily limit reached. Come back tomorrow.'
              : 'Something went wrong. Try again.'),
        )
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

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
            usage?: { input_tokens: number; output_tokens: number }
            remaining?: number
            message?: string
          }
          try {
            payload = JSON.parse(line.slice(6))
          } catch {
            continue
          }
          if (payload.type === 'text' && payload.value) {
            setAnswer((a) => a + payload.value!)
          } else if (payload.type === 'done' && payload.usage) {
            setUsage({
              inputTokens: payload.usage.input_tokens,
              outputTokens: payload.usage.output_tokens,
              remaining: payload.remaining ?? 0,
            })
          } else if (payload.type === 'error') {
            setError(payload.message ?? 'stream_error')
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'network_error')
    } finally {
      setLoading(false)
    }
  }

  const estimatedCost = usage
    ? ((usage.inputTokens * 1) / 1_000_000 +
        (usage.outputTokens * 5) / 1_000_000)
    : 0

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask()
        }}
        className="mb-4"
      >
        <label className="block">
          <span className="sr-only">your question</span>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="ask anything about Nam's work, journey, or how he thinks..."
            rows={2}
            maxLength={500}
            disabled={loading}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none disabled:opacity-50"
          />
        </label>
        <div className="flex items-center justify-between mt-2 gap-3">
          <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.15em]">
            powered by claude haiku 4.5 &middot; rate-limited per ip
          </p>
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="px-4 py-1.5 text-xs font-mono uppercase tracking-[0.15em] bg-neutral-100 text-neutral-950 rounded-md hover:bg-white disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors"
          >
            {loading ? 'thinking...' : 'ask'}
          </button>
        </div>
      </form>

      {!answer && !loading && !error && (
        <div className="mb-4">
          <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.15em] mb-2">
            or try one of these
          </p>
          <div className="flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={loading}
                className="text-xs text-neutral-400 hover:text-neutral-100 border border-neutral-800 hover:border-neutral-600 px-2.5 py-1.5 rounded-md transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {(answer || loading) && (
        <div className="border-l-2 border-neutral-700 pl-4 mb-3">
          <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap min-h-[1.5em]">
            {answer}
            {loading && (
              <span className="inline-block w-2 h-4 bg-neutral-500 ml-1 align-middle animate-pulse" />
            )}
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-amber-400/80 border-l-2 border-amber-500/40 pl-4 mb-3">
          {error}
        </p>
      )}

      {usage && (
        <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.15em]">
          in {usage.inputTokens} &middot; out {usage.outputTokens} &middot; $
          {estimatedCost.toFixed(4)} &middot; {usage.remaining} left today
        </p>
      )}
    </div>
  )
}
