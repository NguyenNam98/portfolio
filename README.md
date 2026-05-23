# personal-website

Van Nam Nguyen &mdash; engineer portfolio. Built as a "Team of One" multi-agent system.

Tagline: _same FinOps muscle, two substrates &mdash; AWS and LLMs._

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4
- **API:** Hono on Cloudflare Pages Functions
- **Vector DB:** Supabase pgvector
- **Rate-limit state:** Cloudflare KV
- **LLM:** Anthropic API (Claude Sonnet / Haiku)
- **Host:** Cloudflare Pages

## Dev

```bash
pnpm install
pnpm dev            # Vite dev server at http://localhost:5173
pnpm dev:pages      # local Pages Functions runtime (after pnpm build)
pnpm typecheck
```

## Deploy

Push to `main` &rarr; Cloudflare Pages auto-deploys via GitHub integration.

Manual deploy:

```bash
pnpm deploy
```

## v1 Roadmap

| | What ships |
|---|---|
| v1   (week 2) | Single `nam-finops` chat &middot; 3 war stories &middot; cost-curve hero &middot; AWS bill index &middot; About + Now |
| v1.1 (week 4) | Add `nam-infra` agent |
| v1.2 (week 6) | Add `nam-ai-eng` agent &middot; skill registry |
| v1.3 (week 8) | Migrate hosting to self-provisioned AWS &middot; configs visible |
| v1.4 (week 10) | Publish `promptcache-meter` OSS tool |
| v2.0 (week 12) | Full Team of One |

## Design doc

`~/.gstack/projects/personal-website/nguyennam-no-branch-design-20260523-142938.md`
