interface ChipItem {
  readonly id?: string
  readonly label: string
}

interface Props<T extends ChipItem | string> {
  items: readonly T[]
  onPick: (item: T) => void
}

/**
 * Horizontal row of pill buttons. Supports either string items
 * (label is the string itself) or { id, label } objects.
 */
export default function ChipRow<T extends ChipItem | string>({ items, onPick }: Props<T>) {
  const labelOf = (item: T) => (typeof item === 'string' ? item : item.label)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((item) => (
        <button
          key={labelOf(item)}
          onClick={() => onPick(item)}
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--bg-default)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--fg-primary)',
            font: '500 13px/16px var(--font-sans)',
            cursor: 'pointer',
            transition: 'all var(--motion-fast) var(--ease-standard)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-inverse)'
            e.currentTarget.style.color = 'var(--fg-on-inverse)'
            e.currentTarget.style.borderColor = 'var(--bg-inverse)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-default)'
            e.currentTarget.style.color = 'var(--fg-primary)'
            e.currentTarget.style.borderColor = 'var(--border-subtle)'
          }}
        >
          {labelOf(item)}
        </button>
      ))}
    </div>
  )
}
