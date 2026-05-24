import type { Company } from '@/data/companies'

interface Props {
  company: Company
}

export default function WhyFitCard({ company }: Props) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <div
        style={{
          font: 'var(--font-mono-xs)',
          letterSpacing: '0.14em',
          color: 'var(--dw-rose)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 22,
            height: 1,
            background: 'var(--dw-rose)',
          }}
        />
        PERSONALIZED FOR {company.displayName.toUpperCase()}
      </div>

      <div
        style={{
          font: '600 22px/30px var(--font-sans)',
          color: 'var(--fg-primary)',
          letterSpacing: '-0.01em',
          textWrap: 'pretty',
        }}
      >
        Why I'm a fit for {company.role} at {company.displayName}
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        {company.whyFit.map((b, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'var(--space-3)',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                font: 'var(--font-mono-xs)',
                color: 'var(--dw-rose)',
                letterSpacing: '0.08em',
              }}
            >
              0{i + 1}
            </span>
            <div>
              <div
                style={{ font: '600 14px/20px var(--font-sans)', color: 'var(--fg-primary)' }}
              >
                {b.point}
              </div>
              <div
                style={{
                  font: 'var(--font-body-s)',
                  color: 'var(--fg-secondary)',
                  marginTop: 2,
                }}
              >
                {b.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
