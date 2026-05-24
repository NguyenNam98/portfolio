#!/usr/bin/env node
/**
 * Precompute a JD-match result for a company and store it in
 * src/data/companies/_precomputed.json so /for/<slug> renders instantly,
 * without hitting the rate-limited /api/jd-match on every visitor.
 *
 * Usage:
 *   node scripts/precompute-match.mjs <slug>
 *
 * Reads jdText from src/data/companies/<slug>.ts. The script assumes
 * jdText is a backtick template literal with no ${} interpolation.
 *
 * Default API base is production; override with PRECOMPUTE_API_BASE
 * (e.g. http://localhost:8788 when running `pnpm dev:pages`).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const DEFAULT_API_BASE = 'https://personal-website-7h5.pages.dev'

function die(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

const slug = process.argv[2]?.toLowerCase()
if (!slug) die('Usage: node scripts/precompute-match.mjs <slug>')

const companyPath = resolve(ROOT, `src/data/companies/${slug}.ts`)
const precomputedPath = resolve(ROOT, 'src/data/companies/_precomputed.json')

let source
try {
  source = await readFile(companyPath, 'utf8')
} catch {
  die(`Company file not found: src/data/companies/${slug}.ts`)
}

const jdMatch = source.match(/jdText:\s*`([\s\S]*?)`/)
if (!jdMatch) {
  die(
    `Could not extract jdText from ${slug}.ts. ` +
      'Make sure jdText is a backtick template literal with no interpolation.',
  )
}
const jdText = jdMatch[1].trim()
if (jdText.length < 80) {
  die(`jdText is too short (${jdText.length} chars). Need at least 80.`)
}

const apiBase = process.env.PRECOMPUTE_API_BASE ?? DEFAULT_API_BASE
const url = `${apiBase.replace(/\/$/, '')}/api/jd-match`

console.log(`→ POST ${url}`)
console.log(`  slug:   ${slug}`)
console.log(`  jd:     ${jdText.length} chars`)

const res = await fetch(url, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ jd: jdText }),
})

const data = await res.json().catch(() => null)
if (!res.ok || !data?.result) {
  die(`API returned ${res.status}: ${JSON.stringify(data ?? '<no body>')}`)
}

let existing = {}
try {
  existing = JSON.parse(await readFile(precomputedPath, 'utf8'))
} catch {
  // first run — file will be created
}

existing[slug] = {
  result: data.result,
  computedAt: new Date().toISOString(),
}

await writeFile(precomputedPath, JSON.stringify(existing, null, 2) + '\n', 'utf8')

const r = data.result
console.log(`✓ wrote src/data/companies/_precomputed.json`)
console.log(`  match:    ${r.match}/100`)
console.log(`  headline: ${r.headline}`)
console.log(`  reasons:  ${r.reasons?.length ?? 0}`)
console.log(`  remaining quota: ${data.remaining}`)
