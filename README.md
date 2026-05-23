# personal-website

Nam Nguyen &mdash; chat-driven portfolio.

Visitors land on a hero with a single textarea. Paste a JD (or click a
quick-action chip) and "Nam" replies in rich content blocks — a
project-filtered skills card, an animated project showcase, a 30-second
pitch, or a Claude-powered JD match analyzer that returns a 0&ndash;100
score with reasons, mapped skills, and an honest gap callout.

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4 + DigiWize tokens
- **Fonts:** Hanken Grotesk (local variable), Geist Mono / IBM Plex Mono (Google)
- **API:** Hono on Cloudflare Pages Functions
- **LLM:** Claude Haiku 4.5 via the Anthropic SDK (prompt caching wired)
- **Host:** Cloudflare Pages (project `personal-website` under michalnam98@gmail.com)
- **Production URL:** https://personal-website-7h5.pages.dev
- **Custom domain (planned):** `nam.rosentech.online` (wire via dashboard)

## API surface

| Endpoint | Method | Cost vs limit | Purpose |
|---|---|---|---|
| `/api/health` | GET | 0 | Liveness probe |
| `/api/chat` | POST `{ question }` | 1 | Streaming SSE free-text Q&A |
| `/api/jd-match` | POST `{ jd }` | 2 | JSON match analysis for pasted JDs |

Per-IP daily rate limit is shared across endpoints (KV-backed,
`rl:YYYY-MM-DD:IP`, 86_400s TTL). Tunable via `CHAT_DAILY_LIMIT_PER_IP`.

## Dev

```bash
pnpm install
pnpm dev               # vite dev server (http://localhost:5173)
pnpm dev:pages         # local cloudflare pages runtime + worker
pnpm typecheck         # app + worker tsconfigs
pnpm build             # production bundle to dist/
```

For local `/api/chat` and `/api/jd-match` to actually call Claude, create
`.dev.vars` (gitignored) with:

```
ANTHROPIC_API_KEY=sk-...
```

Without it both endpoints return 503 `not_configured` (intentional graceful
fallback so the static parts of the site still work in dev).

## Deploy

```bash
pnpm deploy:prod       # production (--branch=main)
pnpm deploy:preview    # preview (--branch=preview)
pnpm tail              # live logs from cloudflare
```

Manual cli deploy, no git integration (matches the startiny-landing
pattern).

## Secrets

```bash
pnpm exec wrangler pages secret put ANTHROPIC_API_KEY --project-name personal-website
```

**Gotcha:** Pages Functions don't pick up newly-set secrets at runtime &mdash;
the running deployment can keep returning `not_configured` errors. Always
follow `secret put` with a fresh deploy:

```bash
pnpm exec wrangler pages secret put ANTHROPIC_API_KEY --project-name personal-website
pnpm deploy:prod   # <-- required to make the secret visible
```

## Tunables (wrangler.toml `[vars]`)

| Var | Default | What it does |
|---|---|---|
| `CHAT_MODEL` | `claude-haiku-4-5-20251001` | Model used by both endpoints |
| `CHAT_DAILY_LIMIT_PER_IP` | `40` | Shared per-IP daily budget |
| `CHAT_MAX_OUTPUT_TOKENS` | `500` | Cap on /api/chat response |
| `CHAT_MAX_INPUT_CHARS` | `500` | Cap on /api/chat question size |
| `JD_MAX_INPUT_CHARS` | `8000` | Cap on /api/jd-match JD size |

Tweak without redeploying secrets.

## Project layout

```
.
├── index.html
├── vite.config.ts
├── wrangler.toml
├── tsconfig.json              # app: DOM + node types
├── tsconfig.worker.json       # functions: cloudflare workers-types
├── src/                       # react app
│   ├── App.tsx                # hero|chat state machine
│   ├── main.tsx
│   ├── index.css              # tailwind + DigiWize tokens + keyframes
│   ├── data/
│   │   ├── profile.ts         # PROFILE, SKILL_GROUPS, PROJECTS, PITCH, EDUCATION
│   │   └── prompts.ts         # QUICK_ACTIONS, FOLLOWUPS, JD_SYSTEM_PROMPT, helpers
│   └── components/
│       ├── hero/              # Hero.tsx + AsteriskBg, StatusPill, LiveClock,
│       │                      #   CyclingTagline, SkillsMarquee
│       ├── chat/ChatView.tsx  # chat shell (masthead + messages + composer)
│       ├── cards/             # SkillsCard, ProjectsShowcase, PitchCard,
│       │                      #   JDMatchCard, MetricTile, MatchRing, ProjectCard,
│       │                      #   AnimatedMetricValue
│       ├── Bubble.tsx         # nam/hr chat bubble
│       ├── ChipRow.tsx        # generic pill row
│       ├── JDModal.tsx        # paste-JD modal w/ sample-JD button
│       ├── NamGlyph.tsx       # 'N' brand glyph
│       ├── TypingDots.tsx     # bouncing dots indicator
│       ├── ProfileRail.tsx    # dormant left sidebar
│       └── accent.ts          # AccentKey → CSS var() helper
├── functions/
│   └── api/[[catchall]].ts    # hono app: /health, /chat, /jd-match
├── public/
│   ├── favicon.svg
│   ├── og.png
│   ├── resume.pdf             # served via the in-chat "Download my resume" flow
│   └── fonts/                 # Hanken Grotesk variable fonts
├── design/                    # JSX prototype (Babel-standalone) — source of truth
│                              #   for the visual system; not shipped
└── dist/                      # build output (gitignored)
```

## Design system

Tokens live in `src/index.css` (lifted from `design/tokens.css`):

- **Surface tokens:** `--bg-default`, `--bg-raised`, `--bg-subtle`, `--bg-inverse`, ...
- **Text tokens:** `--fg-primary`, `--fg-secondary`, `--fg-tertiary`, `--fg-on-brand`
- **Brand:** `--dw-rose` (#e04c71), with `--dw-mint-2`, `--dw-blue`, `--dw-purple` accents
- **Type:** `--font-display` (Geist Mono), `--font-sans` (Hanken Grotesk), `--font-mono` (IBM Plex)
- **Motion:** `--motion-fast/med/slow`, `--ease-standard/emphatic`

Components consume tokens via inline `style={{ font: 'var(--font-body-l)' }}`.
Tailwind utilities remain for layout helpers; they coexist fine.

Dark theme is in CSS (`[data-theme="dark"]`) but no UI toggle in v2.
