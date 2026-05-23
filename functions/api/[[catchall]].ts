import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Bindings = {
  ANTHROPIC_API_KEY: string
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.get('/health', (c) =>
  c.json({
    ok: true,
    ts: Date.now(),
    runtime: 'cloudflare-pages-functions',
  }),
)

app.post('/chat', async (c) => {
  return c.json(
    { error: 'not implemented yet', plan: 'day 6-9' },
    501,
  )
})

export const onRequest = handle(app)
