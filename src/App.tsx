import Chat from '@/components/Chat'

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

          {/* OPEN TO OPPORTUNITIES */}
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl mb-6">
            Open to conversations about senior engineering, platform, or
            AI-engineering roles. The inbox is{' '}
            <a
              href="mailto:michalnam98@gmail.com"
              className="text-neutral-200 underline decoration-neutral-700 underline-offset-4 hover:decoration-neutral-300 transition-colors"
            >
              michalnam98@gmail.com
            </a>
            .
          </p>

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

          {/* Sample Assist platform */}
          <article className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600 mb-3">
              2023 &rarr; present &middot; platform engineering
            </p>
            <h3 className="text-xl font-medium text-neutral-100 mb-2">
              Sample Assist Platform
            </h3>
            <p className="text-sm text-neutral-300 italic mb-3 max-w-2xl">
              Production AWS infrastructure for a Sydney health-tech startup.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-2xl">
              Led the migration off serverless Firebase to a microservices
              architecture on AWS &mdash; 200% performance improvement, 100+
              SQL tables migrated to Postgres with zero downtime. Architected
              the production stack with Terraform across ECS, Fargate, ALB,
              Redis, Route 53, and RDS. Containerized 15+ services. Built
              the JWT + 2FA auth service. Established CI/CD via GitHub Actions
              and Fastlane for two Flutter apps that ship to the App Store.
              Standardized NestJS project templates across the backend team.
            </p>
            <p className="font-mono text-[11px] text-neutral-500">
              aws &middot; terraform &middot; docker &middot; nestjs &middot;
              postgres &middot; redis &middot; flutter &middot; github actions
            </p>
          </article>

          {/* GGJungle */}
          <article className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600 mb-3">
              2022 &rarr; 2023 &middot; backend &amp; product
            </p>
            <h3 className="text-xl font-medium text-neutral-100 mb-2">
              GGJungle
            </h3>
            <p className="text-sm text-neutral-300 italic mb-3 max-w-2xl">
              Cross-border product engineering for Japanese enterprise
              customers, out of Ho Chi Minh City.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-2xl">
              Engineered a coupon feature that drove a 20% sales lift
              post-release. Integrated VNPAY into the existing credit payment
              system. Led technical meetings directly with Japanese enterprise
              customers &mdash; requirements gathering, technical delivery,
              incident resolution. Implemented the monorepo strategy that
              centralised source across teams. Established disaster-recovery
              procedures the company hadn&rsquo;t had before.
            </p>
            <p className="font-mono text-[11px] text-neutral-500">
              nodejs &middot; nestjs &middot; mysql &middot; aws &middot;
              docker &middot; vnpay
            </p>
          </article>
        </div>
      </section>

      {/* ASK (LIVE AI DEMO) */}
      <section className="px-6 py-16 md:py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-3">
            ask
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-2xl">
            A small live demo. Ask anything about Nam&rsquo;s work, journey,
            or how he thinks. The chat below is a real Anthropic Claude call,
            streamed from a Hono function running on Cloudflare. Token cost
            and daily-remaining count tick in real time.
          </p>
          <Chat />
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16 md:py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-8">
            skills
          </p>

          <dl className="space-y-3 text-sm">
            {[
              { label: 'languages', value: 'JavaScript, TypeScript, Python, Bash, SQL' },
              { label: 'backend', value: 'Node.js, NestJS, Express' },
              { label: 'frontend', value: 'React, Redux, Flutter' },
              { label: 'cloud', value: 'AWS (ECS, EKS, Fargate, ALB, Route 53, RDS, SNS), Google Cloud, Cloudflare' },
              { label: 'infra', value: 'Terraform, Docker, Kubernetes, Argo CD' },
              { label: 'databases', value: 'PostgreSQL, MySQL, Firebase, Redis' },
              { label: 'ci / cd', value: 'GitHub Actions, Fastlane' },
              { label: 'observability', value: 'CloudWatch, Prometheus, Grafana' },
              { label: 'security', value: 'JWT, 2FA, OAuth, AWS Security Hub' },
              { label: 'ai', value: 'Anthropic Claude SDK, Cursor, Claude Code, prompt engineering' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col md:flex-row md:gap-6"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600 w-32 shrink-0 pt-1 mb-1 md:mb-0">
                  {row.label}
                </dt>
                <dd className="text-neutral-300 leading-relaxed">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
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
