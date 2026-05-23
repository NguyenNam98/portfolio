# personal-website

Van Nam Nguyen &mdash; personal site.

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4
- **API:** Hono on Cloudflare Pages Functions
- **Host:** Cloudflare Pages (project `personal-website` under michalnam98@gmail.com)
- **Production URL:** https://personal-website-7h5.pages.dev
- **Custom domain (planned):** `nam.rosentech.online` (wire via dashboard)

## Dev

```bash
pnpm install
pnpm dev               # vite dev server (http://localhost:5173)
pnpm dev:pages         # local cloudflare pages runtime (after pnpm build)
pnpm typecheck         # app + worker tsconfigs
pnpm build             # production bundle to dist/
```

## Deploy

```bash
pnpm deploy:prod       # production (--branch=main)
pnpm deploy:preview    # preview (--branch=preview)
pnpm tail              # live logs from cloudflare
```

Manual cli deploy, no git integration (matches the startiny-landing pattern).

## Secrets

Set per-environment via wrangler when each is needed:

```bash
pnpm exec wrangler pages secret put ANTHROPIC_API_KEY --project-name personal-website
pnpm exec wrangler pages secret put SUPABASE_URL --project-name personal-website
pnpm exec wrangler pages secret put SUPABASE_ANON_KEY --project-name personal-website
pnpm exec wrangler pages secret put TURNSTILE_SECRET_KEY --project-name personal-website
```

## Project layout

```
.
|-- index.html
|-- vite.config.ts
|-- wrangler.toml
|-- tsconfig.json              # app: DOM + node types
|-- tsconfig.worker.json       # functions: cloudflare workers-types
|-- src/                       # react app
|   |-- App.tsx
|   |-- main.tsx
|   |-- index.css
|   `-- vite-env.d.ts
|-- functions/                 # cloudflare pages functions (api surface)
|   `-- api/[[catchall]].ts    # hono app
|-- resume/                    # cv pdf + photo
`-- dist/                      # build output (gitignored)
```
