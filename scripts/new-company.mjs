#!/usr/bin/env node
/**
 * Scaffold a new per-company personalized page.
 *
 * Usage:
 *   node scripts/new-company.mjs <slug> "<Display Name>" "<Role>"
 *
 * Creates src/data/companies/<slug>.ts from a template, then inserts the
 * new entry into three places via marker comments:
 *   - src/data/companies/index.ts (imports + COMPANIES registry)
 *   - src/data/companies/_precomputed.json (placeholder match)
 *   - functions/lib/companies.ts (server-side mirror)
 *
 * After running, fill in keywords + whyFit + jdText in the new file,
 * then `pnpm precompute:match <slug>` and ship.
 */
import { readFile, writeFile, access } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function die(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

const [, , slugArg, displayName, role] = process.argv
if (!slugArg || !displayName || !role) {
  die('Usage: node scripts/new-company.mjs <slug> "<Display Name>" "<Role>"')
}
const slug = slugArg.toLowerCase()
if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
  die(`Invalid slug "${slug}". Must be lowercase letters/digits/dashes, starting with a letter.`)
}

const ident = slug.replace(/-([a-z0-9])/g, (_m, c) => c.toUpperCase())

const companyPath = resolve(ROOT, `src/data/companies/${slug}.ts`)
const indexPath = resolve(ROOT, 'src/data/companies/index.ts')
const precomputedPath = resolve(ROOT, 'src/data/companies/_precomputed.json')
const serverPath = resolve(ROOT, 'functions/lib/companies.ts')

let exists = false
try {
  await access(companyPath)
  exists = true
} catch {
  // good — file does not exist yet
}
if (exists) die(`Company already exists: src/data/companies/${slug}.ts`)

function insertBeforeClosingMarker(content, name, lines) {
  const closing = `// </new-company:${name}>`
  const idx = content.indexOf(closing)
  if (idx === -1) throw new Error(`Marker not found: ${closing}`)
  const lineStart = content.lastIndexOf('\n', idx) + 1
  const indent = content.slice(lineStart, idx).match(/^[ \t]*/)?.[0] ?? ''
  const inserted = lines.map((l) => indent + l).join('\n') + '\n'
  return content.slice(0, lineStart) + inserted + content.slice(lineStart)
}

const companyTemplate = `import type { Company } from './_types'

export const ${ident}: Company = {
  slug: '${slug}',
  displayName: '${displayName.replace(/'/g, "\\'")}',
  role: '${role.replace(/'/g, "\\'")}',
  heroGreeting: "Hi ${displayName.replace(/"/g, '\\"')} team — here's why this fits.",
  notes: \`<what you learned researching this company — what they do, products, regulatory context, recent news, competitors, anything you want the chat model to treat as known facts. The longer/richer the better; the model uses this to answer "do you know about us?" questions.>\`,
  keywords: [
    // TODO: lowercase terms from the JD. Multi-word phrases OK (e.g. 'argo cd').
  ],
  whyFit: [
    // TODO: 3–5 hand-written bullets. Keep \`point\` terse, \`detail\` one concrete sentence.
    // { point: '...', detail: '...' },
  ],
  jdText: \`<paste the full JD here as a backtick template literal — no \${'$'}{} interpolation>\`,
}
`

await writeFile(companyPath, companyTemplate, 'utf8')
console.log(`✓ wrote src/data/companies/${slug}.ts`)

// 1. Insert import + registry entry into index.ts
let indexContent = await readFile(indexPath, 'utf8')
indexContent = insertBeforeClosingMarker(indexContent, 'imports', [
  `import { ${ident} } from './${slug}'`,
])
indexContent = insertBeforeClosingMarker(indexContent, 'entries', [
  `${slug.includes('-') ? `'${slug}'` : slug}: enrich(${ident}),`,
])
await writeFile(indexPath, indexContent, 'utf8')
console.log(`✓ updated src/data/companies/index.ts`)

// 2. Insert placeholder into _precomputed.json
const precomputed = JSON.parse(await readFile(precomputedPath, 'utf8'))
if (!(slug in precomputed)) {
  precomputed[slug] = { result: null, computedAt: null }
  await writeFile(precomputedPath, JSON.stringify(precomputed, null, 2) + '\n', 'utf8')
  console.log(`✓ added _precomputed.json placeholder`)
}

// 3. Insert mirrored stub into server companies registry
let serverContent = await readFile(serverPath, 'utf8')
const serverStub = [
  `${slug.includes('-') ? `'${slug}'` : slug}: {`,
  `  slug: '${slug}',`,
  `  displayName: '${displayName.replace(/'/g, "\\'")}',`,
  `  role: '${role.replace(/'/g, "\\'")}',`,
  `  // TODO: mirror notes + jdText + whyFit from src/data/companies/${slug}.ts`,
  `  notes: \`<mirror from src/data/companies/${slug}.ts>\`,`,
  `  jdText: \`<mirror from src/data/companies/${slug}.ts>\`,`,
  `  whyFit: [],`,
  `},`,
]
serverContent = insertBeforeClosingMarker(serverContent, 'entries', serverStub)
await writeFile(serverPath, serverContent, 'utf8')
console.log(`✓ updated functions/lib/companies.ts`)

console.log(`
Next steps:
  1. Open src/data/companies/${slug}.ts
     - Fill in notes (what you learned about the company — the more detail, the better chat answers)
     - Paste the JD into jdText (keep it inside the backticks, no \${'$'}{} interpolation)
     - Fill in keywords (lowercase terms from the JD)
     - Write 3–5 whyFit bullets
  2. Mirror notes + jdText + whyFit into functions/lib/companies.ts (the worker can't import from src/)
  3. pnpm precompute:match ${slug}
  4. Visit /for/${slug} to verify, then pnpm deploy:prod
`)
