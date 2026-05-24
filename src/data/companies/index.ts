import type { JDMatchResult } from '@/data/prompts'

import type { Company } from './_types'
import precomputed from './_precomputed.json'
// <new-company:imports>
import { acme } from './acme'
import { testCo } from './test-co'
import { magentus } from './magentus'
import { mastt } from './mastt'
// </new-company:imports>

interface PrecomputedEntry {
  result: JDMatchResult | null
  computedAt: string | null
}

const PRECOMPUTED = precomputed as Record<string, PrecomputedEntry | undefined>

function enrich(c: Company): Company {
  const entry = PRECOMPUTED[c.slug]
  if (!entry?.result) return c
  return {
    ...c,
    precomputedMatch: entry.result,
    precomputedMatchAt: entry.computedAt ?? undefined,
  }
}

const COMPANIES = {
  // <new-company:entries>
  acme: enrich(acme),
  'test-co': enrich(testCo),
  magentus: enrich(magentus),
  mastt: enrich(mastt),
  // </new-company:entries>
} as const satisfies Record<string, Company>

export type CompanySlug = keyof typeof COMPANIES

export function getCompanyBySlug(slug: string): Company | null {
  const key = slug.toLowerCase()
  if (key in COMPANIES) return COMPANIES[key as CompanySlug]
  return null
}

export type { Company, WhyFitBullet } from './_types'
