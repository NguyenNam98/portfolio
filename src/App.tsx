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

      {/* SELECTED WORK */}
      <section className="px-6 py-16 md:py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-10">
            selected work
          </p>

          {/*
            Pattern per item:
              <p>  meta line: year + medium (font-mono, neutral-600)
              <h3> title (text-xl, neutral-100)
              <p>  tagline (italic, neutral-300)
              <p>  description (neutral-400, max-w-2xl)
              <p>  links (font-mono, separated by space-x-5)

            To add another item, duplicate the <article> block below and
            replace the year, title, tagline, description, and links.
            Reverse-chronological order looks best.
          */}

          {/* Startiny */}
          <article className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600 mb-3">
              2026 &middot; iOS app
            </p>
            <h3 className="text-xl font-medium text-neutral-100 mb-2">
              Startiny
            </h3>
            <p className="text-sm text-neutral-300 italic mb-3 max-w-2xl">
              The to-do app for brains that freeze when the task is too big.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-2xl">
              iOS productivity app for ADHD brains. AI breaks any task into
              10-30 minute steps so &ldquo;start&rdquo; isn&rsquo;t the hardest
              part. Designed, built, and shipped to the App Store solo in
              two weeks (May 2026). Backed by a Cloudflare Worker proxying
              Claude calls so the API key never ships in the mobile bundle.
            </p>
            <p className="font-mono text-xs space-x-5">
              <a
                href="https://apps.apple.com/app/startiny/id6762548413"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-neutral-100 underline decoration-neutral-700 underline-offset-4 transition-colors"
              >
                app store &rarr;
              </a>
              <a
                href="https://startiny.rosentech.online"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-neutral-100 underline decoration-neutral-700 underline-offset-4 transition-colors"
              >
                landing page &rarr;
              </a>
            </p>
          </article>

          {/*
            More items go here. Strong candidates from your background:
              - Sample Assist platform: Firebase->Postgres, ECS+ALB,
                Argo CD GitOps, 200% perf win
              - GGJungle: coupon feature (+20% sales), VNPAY integration,
                Japanese client work
              - FPT: TikTok API + Voice Recognition CAPTCHA, browser extensions
              - any open-source / personal repos worth featuring

            Pick what to show, in what order. Delete this comment block when
            this section is fully populated.
          */}
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
