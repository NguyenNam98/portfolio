import type { JDMatchResult } from '@/data/prompts'

export interface WhyFitBullet {
  readonly point: string
  readonly detail: string
}

export interface Company {
  readonly slug: string
  readonly displayName: string
  readonly role: string
  readonly keywords: readonly string[]
  readonly whyFit: readonly WhyFitBullet[]
  readonly jdText?: string
  readonly heroGreeting?: string
  readonly precomputedMatch?: JDMatchResult
  readonly precomputedMatchAt?: string
}
