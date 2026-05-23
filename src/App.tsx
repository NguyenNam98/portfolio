function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* HERO */}
      <section className="px-6 pt-24 pb-20 md:pt-32 md:pb-24 max-w-3xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-6">
          v0.1.0 &middot; scaffold
        </p>
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-3">
          Van Nam Nguyen
        </h1>
        <p className="text-lg text-neutral-400 mb-2">
          Software Engineer &middot; Sydney
        </p>
        <p className="font-mono text-sm text-neutral-500">
          backend &middot; frontend &middot; infra &middot; mobile &middot; ai
        </p>
      </section>

      {/*
        Below this comment, the page is intentionally empty. The shape of
        the site (what sections, in what order, with what voice) is Nam's
        design call. The scaffold is here, the deploy pipeline works, the
        api function is wired. Drop content in when ready.

        Sections that typically belong in a job-hunting engineer's
        portfolio (use, skip, or reorder as you like):
          - selected work / case studies
          - about / journey
          - skills / what i'm currently into
          - writing / notes
          - live demo or interactive piece
          - contact / hire me
      */}

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
        </div>
      </footer>
    </main>
  )
}

export default App
