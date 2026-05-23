import { useEffect, useState } from 'react'

import { TAGLINES } from '@/data/prompts'

type Phase = 'typing' | 'holding' | 'deleting'

export default function CyclingTagline() {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')

  useEffect(() => {
    const target = TAGLINES[i] ?? ''
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (shown.length < target.length) {
        timeout = setTimeout(
          () => setShown(target.slice(0, shown.length + 1)),
          40 + Math.random() * 40,
        )
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1400)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 1600)
    } else {
      if (shown.length > 0) {
        timeout = setTimeout(() => setShown(shown.slice(0, -1)), 18)
      } else {
        setI((n) => (n + 1) % TAGLINES.length)
        setPhase('typing')
        timeout = setTimeout(() => {}, 0)
      }
    }

    return () => clearTimeout(timeout)
  }, [shown, phase, i])

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--fg-primary)' }}>
      <span>{shown}</span>
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '0.9em',
          marginLeft: 4,
          background: 'var(--dw-rose)',
          animation: 'nam-caret 1s steps(2) infinite',
          verticalAlign: 'middle',
        }}
      />
    </span>
  )
}
