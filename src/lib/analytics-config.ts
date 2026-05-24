// PostHog config — shared project with Todos (free tier = 1 project).
// Every event from this app is auto-tagged `app: 'personal-website'` so it's
// trivial to filter against Todos events in the same project.
//
// Safety note: PostHog project keys (phc_...) are designed as CLIENT keys —
// write-only, scoped to one project, safe to embed in a public bundle. The
// dangerous keys are the personal API keys (phx_...), which never go here.

export const POSTHOG_API_KEY = 'phc_kmTbrbVEF7SPsEyt6Si7Cz3cLYu57nzam25uqQeCG3Em'
export const POSTHOG_HOST = 'https://us.i.posthog.com'
export const APP_NAME = 'personal-website'
