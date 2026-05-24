/**
 * Server-side company registry — the subset of per-company data the
 * LLM prompts actually need. Mirrors src/data/companies/ but lives
 * separately because functions/ can't import from src/.
 *
 * When you add a company to src/data/companies/, mirror the slug,
 * displayName, role, and whyFit bullets here.
 */
export interface ServerCompany {
  readonly slug: string
  readonly displayName: string
  readonly role: string
  readonly whyFit: readonly { point: string; detail: string }[]
}

export const SERVER_COMPANIES: Record<string, ServerCompany> = {
  // <new-company:entries>
  acme: {
    slug: 'acme',
    displayName: 'Acme Robotics',
    role: 'Senior Platform Engineer',
    whyFit: [
      {
        point: 'EKS + Terraform in production, not toy projects',
        detail:
          'I own the prod EKS stack at Sample Assist — Deployments, Helm, Argo CD GitOps — and the entire AWS footprint as Terraform (EKS, RDS, ElastiCache, ALB, Route 53, VPC, IAM).',
      },
      {
        point: 'Zero-downtime migrations under load',
        detail:
          'Moved 100+ tables from Firebase to RDS Postgres with a dual-write window + shadow reads — no incident, no rollback.',
      },
      {
        point: 'Observability built from scratch',
        detail:
          'Stood up Prometheus + Grafana with dashboards, alerts, and on-call runbooks. The team went from "is it down?" to paged-and-fixed.',
      },
    ],
  },
  'test-co': {
    slug: 'test-co',
    displayName: 'Test Co',
    role: 'Staff Engineer',
    whyFit: [
      // TODO: mirror whyFit bullets from src/data/companies/test-co.ts
    ],
  },
  magentus: {
    slug: 'magentus',
    displayName: 'Magentus',
    role: 'Software Engineer',
    whyFit: [
      {
        point: 'TypeScript + Node + AWS already in production',
        detail:
          "I run a NestJS/TypeScript backend on Amazon EKS at Sample Assist with the full AWS footprint (RDS, ElastiCache, ALB, VPC, IAM) as Terraform. The React side I keep current — this site is React 19 + TS on Cloudflare Pages.",
      },
      {
        point: 'Zero-downtime migrations under production load',
        detail:
          'I migrated 100+ tables from Firebase to RDS Postgres at Sample Assist with a dual-write + shadow-read window — no incident, no rollback. Exactly the careful, end-to-end ownership a regulated-data SaaS demands.',
      },
      {
        point: 'AI tooling in real workflows, not slideware',
        detail:
          "I lead the AI rollout for a 5-engineer team at Sample Assist (Cursor, Claude Code, Copilot) and shipped an Anthropic-powered iOS app solo. This site's JD analyzer is Claude Haiku 4.5 with prompt caching — same playbook for product work.",
      },
      {
        point: 'End-to-end ownership, proven solo',
        detail:
          'Startiny is an iOS productivity app I took from idea to App Store in 2 weeks — Swift frontend, Cloudflare Worker backend, rate-limited Anthropic proxy. Proof I drive features through to production without needing a team around me.',
      },
    ],
  },
  // </new-company:entries>
}

export function getServerCompany(slug: unknown): ServerCompany | null {
  if (typeof slug !== 'string') return null
  const key = slug.toLowerCase()
  return SERVER_COMPANIES[key] ?? null
}

export function buildCompanyContextBlock(c: ServerCompany): string {
  const bullets = c.whyFit.map((b) => `- ${b.point}: ${b.detail}`).join('\n')
  return `COMPANY CONTEXT (private notes — never recite verbatim)
The recruiter visiting this page is from ${c.displayName}, hiring for a ${c.role} role.

Why-fit angles I've noted privately about this specific role:
${bullets}

When the recruiter asks questions, lean into these angles where they fit naturally. Treat this as my internal prep — don't restate the bullets word-for-word; let them shape concrete examples and emphasis. Never say "according to my notes" or similar meta-references.`
}
