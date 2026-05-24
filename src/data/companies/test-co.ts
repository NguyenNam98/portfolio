import type { Company } from './_types'

export const testCo: Company = {
  slug: 'test-co',
  displayName: 'Test Co',
  role: 'Staff Engineer',
  heroGreeting: "Hi Test Co team — here's why this fits.",
  keywords: [
    // TODO: lowercase terms from the JD. Multi-word phrases OK (e.g. 'argo cd').
  ],
  whyFit: [
    // TODO: 3–5 hand-written bullets. Keep `point` terse, `detail` one concrete sentence.
    // { point: '...', detail: '...' },
  ],
  jdText: `<paste the full JD here as a backtick template literal — no ${'$'}{} interpolation>`,
}
