import { warStories } from '@/data/war-stories'

interface RoadmapStep {
  readonly day: string
  readonly label: string
  readonly live?: boolean
}

const roadmap: readonly RoadmapStep[] = [
  { day: 'day 1', label: 'bootstrap shipped', live: true },
  { day: 'day 2-3', label: 'writing the fck-nat war story' },
  { day: 'day 4-5', label: 'cost-curve hero + aws bill component' },
  { day: 'day 6-9', label: 'rag chat with visible context + token meter' },
  { day: 'day 10', label: 'naive vs optimized toggle (the killer demo)' },
  { day: 'day 11-12', label: 'about + now + abuse protection + polish' },
  { day: 'day 14', label: 'launch' },
]

function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* HERO */}
      <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-6">
          v0.1.0 &middot; day 1 &middot; bootstrap
        </p>
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-3">
          Van Nam Nguyen
        </h1>
        <p className="text-lg text-neutral-400 mb-2">
          Software Engineer &middot; Sydney
        </p>
        <p className="font-mono text-sm text-neutral-500 mb-10">
          backend &middot; frontend &middot; infra &middot; mobile &middot; ai
        </p>
        <p className="text-neutral-300 leading-relaxed max-w-2xl">
          Same FinOps muscle, two substrates &mdash; AWS and LLMs. The same
          instinct that replaces a NAT Gateway with{' '}
          <code className="font-mono text-neutral-400">fck-nat</code> applies
          to a 100k-token context window. This site is the receipts for that
          thesis, plus a live multi-agent chat that demonstrates it.
        </p>
      </section>

      {/* ROADMAP STRIPE */}
      <section className="px-6 py-12 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-6">
            v1 roadmap &middot; building in public
          </p>
          <ol className="space-y-3 text-sm font-mono">
            {roadmap.map((step) => (
              <li key={step.day} className="flex gap-4">
                <span className="text-neutral-600 w-20 shrink-0">
                  {step.day}
                </span>
                <span className={step.live ? 'text-neutral-200' : 'text-neutral-500'}>
                  {step.label}
                  {step.live && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-emerald-500">
                      live
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WAR STORIES PREVIEW */}
      <section className="px-6 py-12 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-6">
            war stories &middot; v1
          </p>
          <ul className="space-y-7">
            {warStories.map((s) => (
              <li
                key={s.slug}
                className="border-l-2 border-neutral-800 pl-5"
              >
                <h3 className="text-base font-medium text-neutral-100 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                  {s.excerpt}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">
                  {s.agent} &middot; {s.substrate} &middot; {s.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-neutral-600 leading-relaxed">
            <a
              className="hover:text-neutral-300 underline decoration-neutral-800 underline-offset-4 transition-colors"
              href="https://github.com/NguyenNam98"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>{' '}
            &middot;{' '}
            <a
              className="hover:text-neutral-300 underline decoration-neutral-800 underline-offset-4 transition-colors"
              href="https://linkedin.com/in/nam-nguyen98"
              target="_blank"
              rel="noreferrer"
            >
              linkedin
            </a>{' '}
            &middot;{' '}
            <a
              className="hover:text-neutral-300 underline decoration-neutral-800 underline-offset-4 transition-colors"
              href="mailto:michalnam98@gmail.com"
            >
              email
            </a>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-700 mt-4">
            building in public &middot; full site shipping ~14 days from day 1
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
