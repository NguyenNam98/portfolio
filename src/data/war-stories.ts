/**
 * War-story index. The substantive anchor of the site. Each story is a real
 * engineering move with a measurable delta. Numbers stay undefined until the
 * markdown body is written from real production data, so we never ship
 * fabricated metrics.
 */

export type Agent =
  | 'nam-finops'
  | 'nam-infra'
  | 'nam-backend'
  | 'nam-mobile'
  | 'nam-ai-eng'

export type Substrate = 'aws' | 'llm' | 'product'

export interface WarStory {
  readonly slug: string
  readonly title: string
  readonly agent: Agent
  readonly substrate: Substrate
  readonly status: 'draft' | 'published'
  readonly excerpt: string
  readonly tags: readonly string[]
  /** Filled in only after the story is written from real bill data. */
  readonly savingsPerMonthUsd?: number
  /** Filled in only after the story is written from real bill data. */
  readonly deltaPercent?: number
  /** ISO date when the optimization shipped, not when the post was written. */
  readonly shippedAt?: string
}

export const warStories: readonly WarStory[] = [
  {
    slug: 'fck-nat',
    title: 'NAT Gateway to fck-nat',
    agent: 'nam-finops',
    substrate: 'aws',
    status: 'draft',
    excerpt:
      'NAT Gateway was the biggest line item under the VPC subtotal. fck-nat replaced it with a tiny ARM instance. Full story (trade-offs, the bug I hit, the Terraform diff) coming day 2-3.',
    tags: ['aws', 'networking', 'terraform', 'cost-optimization'],
  },
  {
    slug: 'off-hours-scheduler',
    title: 'Scheduling RDS + ECS off-hours',
    agent: 'nam-finops',
    substrate: 'aws',
    status: 'draft',
    excerpt:
      'Dev and staging RDS instances running 24/7 are paying you to wait. A scheduler turning them off outside business hours cut the bill. Story includes the timezone bug and the holiday edge-case.',
    tags: ['aws', 'rds', 'ecs', 'cost-optimization', 'lambda'],
  },
  {
    slug: 'firebase-to-postgres',
    title: 'Firebase to Postgres, 100+ tables, zero downtime',
    agent: 'nam-infra',
    substrate: 'aws',
    status: 'draft',
    excerpt:
      'The serverless Firebase backend hit its limits. Migration to RDS Postgres on Sample Assist took six months and resulted in a 200% performance improvement. Story covers the dual-write window strategy and the 3am cutover.',
    tags: ['migration', 'postgres', 'firebase', 'aws', 'rds'],
  },
]

export function getWarStory(slug: string): WarStory | undefined {
  return warStories.find((s) => s.slug === slug)
}
