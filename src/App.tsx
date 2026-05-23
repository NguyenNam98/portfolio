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

      {/* ABOUT */}
      <section className="px-6 py-16 md:py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-8">
            about
          </p>

          {/*
            Pitch paragraph: seeded from resume facts. Edit, rewrite,
            replace, or delete entirely. Your voice goes here.
          */}
          <p className="text-neutral-300 leading-relaxed max-w-2xl mb-12">
            Software engineer based in Sydney. Five years of production work
            across backend (NestJS, Postgres), infrastructure (AWS, Terraform,
            Docker), and most recently mobile (designed, built, and shipped
            an iOS app solo). Currently leading platform and backend at
            Sample Assist while finishing a Master&rsquo;s in Computer Science
            at the University of Wollongong.
          </p>

          {/* NOW */}
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-4">
              now
            </p>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2023&rarr;
                </span>
                <span>
                  Software Engineer &middot; Sample Assist &middot; Sydney
                </span>
              </li>
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2023&rarr;
                </span>
                <span>
                  Master&rsquo;s in Computer Science &middot; University of
                  Wollongong
                </span>
              </li>
            </ul>
          </div>

          {/* JOURNEY */}
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-4">
              journey
            </p>
            <ol className="space-y-3 text-sm text-neutral-400">
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2026
                </span>
                <span>
                  Shipped{' '}
                  <span className="text-neutral-200 font-medium">Startiny</span>{' '}
                  to the App Store solo in two weeks
                </span>
              </li>
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2023
                </span>
                <span>Moved Ho Chi Minh City &rarr; Sydney</span>
              </li>
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2022
                </span>
                <span>
                  Backend / Cloud Engineer &middot; GGJungle &middot; Ho Chi
                  Minh City
                </span>
              </li>
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2021
                </span>
                <span>
                  Software Engineer &middot; FPT Tan Thuan Telecom &middot; Ho
                  Chi Minh City
                </span>
              </li>
              <li className="flex gap-5">
                <span className="text-neutral-600 w-16 shrink-0 font-mono">
                  2016
                </span>
                <span>
                  BSc Computer Science &middot; UIT, Vietnam National
                  University
                </span>
              </li>
            </ol>
          </div>

          {/* RESUME */}
          <p className="font-mono text-xs">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-neutral-100 underline decoration-neutral-700 underline-offset-4 transition-colors"
            >
              download resume (pdf) &rarr;
            </a>
          </p>
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
        </div>
      </footer>
    </main>
  )
}

export default App
