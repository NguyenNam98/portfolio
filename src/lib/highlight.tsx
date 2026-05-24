import { useMemo, type ReactNode } from 'react'

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildRegex(keywords: readonly string[]): RegExp | null {
  const cleaned = keywords
    .map((k) => k.trim())
    .filter((k) => k.length > 0)
    .sort((a, b) => b.length - a.length)
  if (cleaned.length === 0) return null
  const pattern = `(?<![\\w-])(?:${cleaned.map(escape).join('|')})(?![\\w-])`
  return new RegExp(pattern, 'gi')
}

export function matchesAnyKeyword(
  text: string,
  keywords: readonly string[],
): boolean {
  const re = buildRegex(keywords)
  return re !== null && re.test(text)
}

export function countMatches(
  text: string,
  keywords: readonly string[],
): number {
  const re = buildRegex(keywords)
  if (!re) return 0
  const found = text.match(re)
  return found ? found.length : 0
}

interface HighlightedProps {
  text: string
  keywords: readonly string[]
}

const markStyle = {
  background: 'rgba(224,76,113,0.14)',
  color: 'var(--fg-primary)',
  padding: '0 4px',
  margin: '0 -1px',
  borderRadius: 4,
  boxShadow: 'inset 0 -1px 0 var(--dw-rose)',
} as const

export function Highlighted({ text, keywords }: HighlightedProps): ReactNode {
  const parts = useMemo(() => {
    const re = buildRegex(keywords)
    if (!re) return [{ text, match: false }]
    const out: { text: string; match: boolean }[] = []
    let lastIndex = 0
    for (const m of text.matchAll(re)) {
      const i = m.index ?? 0
      if (i > lastIndex) out.push({ text: text.slice(lastIndex, i), match: false })
      out.push({ text: m[0], match: true })
      lastIndex = i + m[0].length
    }
    if (lastIndex < text.length) out.push({ text: text.slice(lastIndex), match: false })
    return out
  }, [text, keywords])

  return (
    <>
      {parts.map((p, i) =>
        p.match ? (
          <span key={i} style={markStyle}>
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}
