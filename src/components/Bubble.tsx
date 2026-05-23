import type { ReactNode } from 'react'

import NamGlyph from './NamGlyph'

export type BubbleSide = 'nam' | 'hr'

interface Props {
  side: BubbleSide
  label?: string
  wide?: boolean
  children: ReactNode
}

export default function Bubble({ side, label, wide = false, children }: Props) {
  const isNam = side === 'nam'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isNam ? 'row' : 'row-reverse',
        gap: 'var(--space-3)',
        alignItems: 'flex-end',
        maxWidth: '100%',
        animation: `nam-bubble-${isNam ? 'in-left' : 'in-right'} 420ms var(--ease-emphatic) both`,
      }}
    >
      {isNam ? (
        <NamGlyph size={28} />
      ) : (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: 'var(--dw-mint-2)',
            color: 'var(--fg-on-brand)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
            font: '600 12px/1 var(--font-sans)',
          }}
        >
          HR
        </div>
      )}
      <div
        style={{
          maxWidth: wide ? '100%' : 'min(560px, calc(100% - 44px))',
          width: wide ? 'calc(100% - 44px)' : 'auto',
          display: 'grid',
          gap: 4,
          alignItems: isNam ? 'flex-start' : 'flex-end',
          justifyItems: isNam ? 'flex-start' : 'flex-end',
        }}
      >
        {label && (
          <div
            style={{
              font: 'var(--font-mono-xs)',
              color: 'var(--fg-tertiary)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0 4px',
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: isNam ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
            background: isNam ? 'var(--bg-default)' : 'var(--bg-inverse)',
            color: isNam ? 'var(--fg-primary)' : 'var(--fg-on-inverse)',
            boxShadow: isNam ? 'var(--elev-hairline)' : 'none',
            font: 'var(--font-body-l)',
            textWrap: 'pretty',
            width: wide ? '100%' : 'fit-content',
            maxWidth: '100%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
