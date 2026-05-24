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
  /**
   * Free-form research about the company — what they do, products,
   * regulatory context, anything Nam wants the chat model to treat
   * as known facts when answering recruiter questions on /for/<slug>.
   * Mirrored into functions/lib/companies.ts so the worker can inject it.
   */
  readonly notes?: string
  readonly jdText?: string
  readonly heroGreeting?: string
  readonly precomputedMatch?: JDMatchResult
  readonly precomputedMatchAt?: string
}
