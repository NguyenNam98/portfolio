/**
 * Static UI strings + frontend-side JD utilities.
 *
 * Note: the JD analyzer system prompt and JSON-parser live in
 * functions/api/[[catchall]].ts — they're worker-side and not
 * imported from here.
 */

import type { ProjectId } from './profile'

/* ============================================================
   Quick-action chips (hero + chat composer)
   ============================================================ */
export interface QuickAction {
  readonly id: 'skills' | 'projects' | 'pitch' | 'jd' | 'contact' | 'resume' | 'why-fit'
  readonly label: string
}

/* ============================================================
   Followup chips after each response
   ============================================================ */
type FollowupKey =
  | 'skills'
  | 'projects'
  | 'pitch'
  | 'jd'
  | 'contact'
  | 'default'

export const FOLLOWUPS: Readonly<Record<FollowupKey, readonly string[]>> = {
  skills: ['Show top projects', 'Why hire me in 30s', 'Paste a JD'],
  projects: ['Show technical skills', 'Why hire me in 30s', 'Paste a JD'],
  pitch: ['Show top projects', 'Show technical skills', 'Paste a JD'],
  jd: ['Show top projects', 'Show technical skills', 'How do I get in touch?'],
  contact: ['Show top projects', 'Why hire me in 30s', 'Download my resume'],
  default: ['Show technical skills', 'Show top projects', 'Why hire me in 30s'],
}

/* ============================================================
   Hero typewriter taglines & skills marquee
   ============================================================ */
export const TAGLINES: readonly string[] = [
  'Software Engineer, DevOps',
  'Backend → Platform',
  'NestJS + TypeScript backends',
  'AWS platform on EKS, in production',
  'Firebase → AWS, pre-launch',
  'Terraform · Argo CD · Helm',
  'Mentor 3 engineers',
]

export const MARQUEE_ITEMS: readonly string[] = [
  'AWS · EKS · RDS · ElastiCache',
  'Terraform (production)',
  'NestJS · TypeScript · TypeORM',
  'Argo CD GitOps · GitHub Actions',
  'Prometheus + Grafana from scratch',
  'Helm · 20+ services',
  'Firebase → AWS replatform · 100+ tables',
  'Custom auth · 7-app SSO',
  'iOS + Android · Fastlane + Match',
  'Cut AWS spend ~30%',
  'External pen test · passed',
  'Mentor 3 engineers',
  'My Health Records Act · APPs alignment',
  'AI-assisted iOS app · solo · ~2 weeks',
  'On-call · incident response',
]

/* ============================================================
   JD heuristic — looks like a job description?
   ============================================================ */
const JD_CUES = [
  'responsibilities',
  'requirements',
  'you will',
  'we are looking',
  "you'll",
  'qualifications',
  'experience with',
  'must have',
  'key responsibilities',
] as const

export function looksLikeJD(text: string): boolean {
  if (!text || text.length < 120) return false
  const lower = text.toLowerCase()
  const hits = JD_CUES.filter((c) => lower.includes(c)).length
  return hits >= 1 || text.length > 400
}

/* ============================================================
   JD match result shape (what the backend returns)
   ============================================================ */
export interface JDMatchResult {
  readonly match: number
  readonly headline: string
  readonly reasons: readonly { point: string; detail: string }[]
  readonly relevantSkills: readonly string[]
  readonly relevantProjects: readonly ProjectId[]
  readonly gaps: string
  readonly closer: string
}
