import { useEffect, useState } from 'react'

const FORMATTER = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export default function LiveClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      style={{
        font: 'var(--font-mono-xs)',
        letterSpacing: '0.08em',
        color: 'var(--fg-secondary)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {FORMATTER.format(now)} AEST
    </span>
  )
}
