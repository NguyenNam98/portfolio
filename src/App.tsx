function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-6">
          v0.1.0 &middot; day 1 &middot; bootstrap
        </p>
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
          Van Nam Nguyen
        </h1>
        <p className="text-lg text-neutral-400 mb-2">
          Software Engineer &middot; Sydney
        </p>
        <p className="font-mono text-sm text-neutral-500">
          backend &middot; frontend &middot; infra &middot; mobile &middot; ai
        </p>

        <div className="mt-16 border-t border-neutral-800 pt-6">
          <p className="font-mono text-xs text-neutral-600 leading-relaxed">
            building in public &middot; full site shipping in ~2 weeks
            <br />
            <span className="text-neutral-700">
              same finops muscle, two substrates &mdash; aws and llms
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
