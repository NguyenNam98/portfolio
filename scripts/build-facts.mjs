#!/usr/bin/env node
/**
 * Build-time codegen for the worker's FACTS_BLOCK system prompt.
 *
 * Reads src/content/experience/*.md (frontmatter + "## What I shipped")
 * and writes functions/lib/facts.ts. Run via `pnpm build:facts`, which
 * is wired into `pnpm build`.
 *
 * NEVER edit functions/lib/facts.ts by hand — it's clobbered on build.
 */

import { readFile, writeFile, readdir, mkdtemp, rm } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { execFileSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const EXP_DIR = resolve(ROOT, 'src/content/experience')
const PROFILE_TS = resolve(ROOT, 'src/data/profile.ts')
const OUT_PATH = resolve(ROOT, 'functions/lib/facts.ts')

/* ============================================================
   Compile src/data/profile.ts via esbuild and dynamic-import
   it, so identity / stack / education stay in lockstep with
   the React-side single source of truth.
   ============================================================ */
async function loadProfile() {
  const dir = await mkdtemp(join(tmpdir(), 'facts-'))
  const out = join(dir, 'profile.mjs')
  try {
    execFileSync(
      'pnpm',
      [
        'exec',
        'esbuild',
        PROFILE_TS,
        '--format=esm',
        '--platform=node',
        `--outfile=${out}`,
      ],
      { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] },
    )
    return await import(pathToFileURL(out).href)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

/* ============================================================
   Section order + display label per experience.
   Editing this is how you add a new role to the prompt.
   ============================================================ */
const SECTIONS = [
  { id: 'sample-assist', label: 'CURRENT ROLE' },
  { id: 'ggjungle', label: 'PREVIOUS' },
  { id: 'fpt', label: 'EARLIER' },
  { id: 'startiny', label: 'SIDE PROJECT' },
]

/* ============================================================
   Builders for the blocks that ARE in src/data/profile.ts.
   IDENTITY pairs PROFILE with a single hardcoded origin string
   (not in profile.ts) + the most-recent education entry.
   ============================================================ */
function buildIdentity(profile, education) {
  const edu = education[0]
  const eduPhrase = edu
    ? ` Currently finishing a ${edu.degree} at ${edu.school} (${edu.dates}).`
    : ''
  return `IDENTITY
I'm ${profile.name} (full name ${profile.fullName}), ${profile.title} in ${profile.location}, with ${profile.yearsExp} years of production cloud experience. Originally from Ho Chi Minh City.${eduPhrase}`
}

function buildEducation(education) {
  const lines = education.map((e) => `- ${e.degree}, ${e.school} (${e.dates})`)
  return `EDUCATION\n${lines.join('\n')}`
}

function buildStack(skillGroups) {
  const lines = skillGroups.map((g) => {
    const names = g.items.map((i) => i.name).join(', ')
    return `- ${g.label}: ${names}`
  })
  return `STACK\n${lines.join('\n')}`
}

function buildContact(profile) {
  return `CONTACT
- Email: ${profile.email}
- Phone: ${profile.phone}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}`
}

/* ============================================================
   Static blocks not represented in profile.ts. Edit here.
   ============================================================ */
const LANGUAGES = `LANGUAGES SPOKEN
Vietnamese (native), English (professional), some Japanese (from GGJungle client work).`

const LOOKING_FOR = `LOOKING FOR
Senior DevOps / Platform engineering roles, or AI-engineering roles where infra + LLM ops overlap. Sydney-based, remote-friendly. Currently working at Sample Assist — open to conversations, not urgently job hunting.`

const THIS_SITE = `THIS SITE
Chat-driven portfolio. Vite + React 19 + TS + Tailwind v4 on Cloudflare Pages. This chat runs on Hono on Cloudflare Pages Functions, using Claude Haiku 4.5 via the Anthropic SDK with prompt caching enabled on the system prompt. Per-IP daily rate limit via Cloudflare KV.`

const NOTABLE_WINS = `NOTABLE WINS WORTH REFERENCING
- The Firebase → AWS replatform at Sample Assist (Firestore → RDS Postgres for 100+ tables, Cloud Functions → containerised NestJS on EKS, Firebase Auth → custom in-house auth, all in ~3 months pre-launch with one other engineer) is the strongest senior-platform-engineering proof point.
- The Startiny solo ship (concept → App Store in 2 weeks, AI-assisted via Claude Code) is the strongest end-to-end / AI-assisted-delivery proof point.
- The GGJungle Coupon module (designed and integrated cleanly into an existing checkout someone else wrote) is the strongest "thoughtful changes to a codebase I didn't architect" proof point. The VNPAY integration is the strongest "thinks about market opening, not just the code" proof point.
- The Japanese client work at GGJungle is the strongest cross-cultural / engineering-rigor proof point.`

/* ============================================================
   Minimal YAML frontmatter parser — only the top-level scalars
   we need (id, role, company, short, location, dates, headline).
   Nested keys like `metrics:` and `tags:` are intentionally
   ignored — they're consumed elsewhere.
   ============================================================ */
function parseFrontmatter(src, file) {
  if (!src.startsWith('---\n')) {
    throw new Error(`${file}: no frontmatter`)
  }
  const end = src.indexOf('\n---\n', 4)
  if (end === -1) throw new Error(`${file}: frontmatter unterminated`)
  const yaml = src.slice(4, end)
  const body = src.slice(end + 5)
  const meta = {}
  for (const line of yaml.split('\n')) {
    const m = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/)
    if (!m) continue
    const [, key, rawVal] = m
    let val = rawVal.trim()
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
    meta[key] = val
  }
  return { meta, body }
}

/* ============================================================
   Extract the bullets under `## What I shipped`. Handles
   multi-line bullets (continuation lines without a leading `-`).
   Strips **bold** markers so the prompt stays clean.
   ============================================================ */
function extractWhatIShipped(body, file) {
  const m = body.match(/##\s*What I shipped\s*\n([\s\S]*?)(?=\n##\s|$)/)
  if (!m) throw new Error(`${file}: missing "## What I shipped" section`)
  const section = m[1]

  const bullets = []
  let buf = []
  const flush = () => {
    if (buf.length) {
      bullets.push(buf.join(' ').replace(/\s+/g, ' ').trim())
      buf = []
    }
  }
  for (const line of section.split('\n')) {
    if (line.startsWith('- ')) {
      flush()
      buf = [line.slice(2)]
    } else if (line.trim() === '') {
      flush()
    } else if (buf.length) {
      buf.push(line.trim())
    }
  }
  flush()

  return bullets.map((b) =>
    b.replace(/\*\*(.+?)\*\*/g, '$1').replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '$1'),
  )
}

function buildExperienceBlock({ meta, bullets }, label) {
  const company = meta.company || meta.short || meta.id
  const role = meta.role || ''
  const dates = meta.dates || ''
  const location = meta.location || ''
  const headlineSep = meta.headline ? `\n${meta.headline}` : ''
  const locSep = location ? `, ${location}` : ''
  const list = bullets.map((b) => `- ${b}`).join('\n')
  return `${label} — ${company} (${dates}${locSep})\n${role}${headlineSep}\n${list}`
}

/* ============================================================
   Main
   ============================================================ */
const files = (await readdir(EXP_DIR)).filter((f) => f.endsWith('.md'))
const byId = {}
for (const file of files) {
  const src = await readFile(resolve(EXP_DIR, file), 'utf8')
  const { meta, body } = parseFrontmatter(src, file)
  if (!meta.id) throw new Error(`${file}: missing id in frontmatter`)
  byId[meta.id] = { meta, bullets: extractWhatIShipped(body, file) }
}

const missing = SECTIONS.filter((s) => !byId[s.id]).map((s) => s.id)
if (missing.length) {
  throw new Error(`SECTIONS references unknown ids: ${missing.join(', ')}`)
}

const { PROFILE, SKILL_GROUPS, EDUCATION } = await loadProfile()
if (!PROFILE || !SKILL_GROUPS || !EDUCATION) {
  throw new Error(
    'profile.ts must export PROFILE, SKILL_GROUPS, EDUCATION — codegen aborted',
  )
}

const experienceBlocks = SECTIONS.map((s) =>
  buildExperienceBlock(byId[s.id], s.label),
).join('\n\n')

const FACTS_BLOCK = [
  buildIdentity(PROFILE, EDUCATION),
  experienceBlocks,
  buildEducation(EDUCATION),
  buildStack(SKILL_GROUPS),
  LANGUAGES,
  LOOKING_FOR,
  buildContact(PROFILE),
  THIS_SITE,
  NOTABLE_WINS,
].join('\n\n')

const out = `/**
 * AUTO-GENERATED by scripts/build-facts.mjs — do not edit by hand.
 * Source of truth: src/content/experience/*.md.
 * Regenerate via \`pnpm build:facts\` (runs as part of \`pnpm build\`).
 */

export const FACTS_BLOCK = ${JSON.stringify(FACTS_BLOCK)}
`

await writeFile(OUT_PATH, out, 'utf8')
console.log(`✓ wrote functions/lib/facts.ts`)
console.log(`  experiences: ${SECTIONS.map((s) => s.id).join(', ')}`)
console.log(`  size: ${FACTS_BLOCK.length} chars`)
