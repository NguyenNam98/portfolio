/**
 * Static portfolio facts. Single source of truth for the front-end
 * cards (SkillsCard, ProjectsShowcase, PitchCard, ProfileRail) AND
 * the backend JD analyzer (functions/api — see prompts.ts).
 *
 * Edit ONLY here; don't duplicate facts into the system prompt by hand.
 */

export type AccentKey = 'rose' | 'mint' | 'blue' | 'purple'

export type ProjectId =
    | 'sample-assist'
    | 'ggjungle'
    | 'startiny'
    | 'fpt'

export interface Profile {
  readonly name: string
  readonly fullName: string
  readonly title: string
  readonly location: string
  readonly email: string
  readonly phone: string
  readonly linkedin: string
  readonly github: string
  readonly currentlyAt: string
  readonly yearsExp: string
  readonly available: string
  readonly noticePeriod: string
}

export interface SkillItem {
  readonly name: string
  readonly projects: readonly ProjectId[]
}

export interface SkillGroup {
  readonly label: string
  readonly accent: AccentKey
  readonly items: readonly SkillItem[]
}

export interface ProjectMetric {
  readonly value: string
  readonly label: string
  readonly caption: string
}

export interface Project {
  readonly id: ProjectId
  readonly role: string
  readonly company: string
  readonly short: string
  readonly location: string
  readonly dates: string
  readonly accent: AccentKey
  readonly badge: string
  readonly headline: string
  readonly metrics: readonly ProjectMetric[]
  readonly impact: readonly string[]
  readonly tags: readonly string[]
}

export interface PitchPoint {
  readonly k: string
  readonly v: string
}

export interface Pitch {
  readonly headline: string
  readonly points: readonly PitchPoint[]
}

export interface EducationItem {
  readonly degree: string
  readonly school: string
  readonly location: string
  readonly dates: string
}

/* ============================================================
   PROFILE
   ============================================================ */
export const PROFILE: Profile = {
  name: 'Nam Nguyen',
  fullName: 'Van Nam Nguyen',
  title: 'Software Engineer, DevOps',
  location: 'Sydney, Australia',
  email: 'michalnam98@gmail.com',
  phone: '0492 911 759',
  linkedin: 'linkedin.com/in/nam-nguyen98',
  github: 'github.com/NguyenNam98',
  currentlyAt: 'Sample Assist',
  yearsExp: '5+',
  available: 'Open to roles',
  noticePeriod: '2 weeks',
}

/* ============================================================
   SKILLS — provenance dots link each skill back to projects.
   Skills are listed where the work is genuinely defensible —
   dots removed where we walked back the underlying claim.
   ============================================================ */
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    label: 'Cloud',
    accent: 'rose',
    items: [
      { name: 'AWS EKS', projects: ['sample-assist'] },
      { name: 'ECS / Fargate', projects: ['sample-assist'] },
      { name: 'EC2', projects: ['sample-assist', 'ggjungle'] },
      { name: 'ALB / AWS Load Balancer Controller', projects: ['sample-assist'] },
      { name: 'Route 53', projects: ['sample-assist'] },
      { name: 'S3', projects: ['sample-assist'] },
      { name: 'VPC + VPC Endpoints', projects: ['sample-assist'] },
      { name: 'IAM (least-privilege in Terraform)', projects: ['sample-assist'] },
      { name: 'RDS Postgres', projects: ['sample-assist'] },
      { name: 'ElastiCache (Redis)', projects: ['sample-assist'] },
      { name: 'AWS Secrets Manager', projects: ['sample-assist'] },
      // Note: removed CloudFront/SNS at GGJungle — you said your AWS at
      // GGJungle was deploy-level only, you didn't own the architecture.
      // GCP listed but with empty provenance — left for type compatibility
      // if your UI uses this, but I'd recommend removing entirely.
    ],
  },
  {
    label: 'Kubernetes & Containers',
    accent: 'mint',
    items: [
      { name: 'Amazon EKS (prod)', projects: ['sample-assist'] },
      { name: 'kubectl', projects: ['sample-assist'] },
      { name: 'Helm', projects: ['sample-assist'] },
      { name: 'Ingress (ALB Controller)', projects: ['sample-assist'] },
      { name: 'Docker', projects: ['sample-assist', 'ggjungle'] },
      { name: 'Pod / workload debug', projects: ['sample-assist'] },
    ],
  },
  {
    label: 'Infra as Code',
    accent: 'blue',
    items: [
      { name: 'Terraform (extensive)', projects: ['sample-assist'] },
    ],
  },
  {
    label: 'CI / CD',
    accent: 'purple',
    items: [
      { name: 'GitHub Actions', projects: ['sample-assist'] },
      { name: 'Argo CD', projects: ['sample-assist'] },
      { name: 'GitOps workflows', projects: ['sample-assist'] },
      { name: 'Multi-env deploys', projects: ['sample-assist'] },
      { name: 'Fastlane (iOS + Android, with Match)', projects: ['sample-assist'] },
    ],
  },
  {
    label: 'Observability',
    accent: 'mint',
    items: [
      { name: 'Prometheus', projects: ['sample-assist'] },
      { name: 'Grafana', projects: ['sample-assist'] },
      { name: 'Structured logging', projects: ['sample-assist'] },
      { name: 'On-call response', projects: ['sample-assist'] },
      // Note: removed CloudWatch and the AWS-specific security tools
      // (Security Hub / GuardDuty / Inspector). These weren't surfaced
      // during our conversations and I don't want to claim them on
      // your behalf. Add them back if you genuinely operated them.
    ],
  },
  {
    label: 'Security & Compliance',
    accent: 'rose',
    items: [
      { name: 'IAM least-privilege', projects: ['sample-assist'] },
      { name: 'Secrets management (AWS Secrets Manager)', projects: ['sample-assist'] },
      { name: 'Encryption at rest / in transit', projects: ['sample-assist'] },
      { name: 'Australian Privacy Act (APPs) alignment', projects: ['sample-assist'] },
      { name: 'My Health Records Act alignment', projects: ['sample-assist'] },
      { name: 'External penetration test (passed)', projects: ['sample-assist'] },
    ],
  },
  {
    label: 'Languages & Backend',
    accent: 'blue',
    items: [
      { name: 'NestJS / TypeScript', projects: ['sample-assist', 'ggjungle'] },
      { name: 'Node.js', projects: ['sample-assist', 'ggjungle', 'fpt'] },
      { name: 'Express', projects: ['fpt'] },
      { name: 'TypeORM', projects: ['sample-assist', 'ggjungle'] },
      { name: 'Postgres / SQL', projects: ['sample-assist'] },
      { name: 'MySQL', projects: ['ggjungle'] },
      { name: 'MongoDB', projects: ['fpt'] },
      { name: 'Bash', projects: ['sample-assist'] },
      // Note: removed standalone "Python" claim and "Swift / iOS" claim.
      // Python wasn't surfaced in our conversations. Swift at Startiny
      // was native bridges only — most of the code was React Native,
      // and most of *that* was AI-generated. See React Native below.
    ],
  },
  {
    label: 'Mobile & AI-assisted dev',
    accent: 'purple',
    items: [
      { name: 'React Native (Expo)', projects: ['startiny'] },
      { name: 'Swift (native bridges only)', projects: ['startiny'] },
      { name: 'App Store submission & review', projects: ['startiny'] },
      { name: 'AI-assisted development (Claude Code)', projects: ['startiny', 'sample-assist'] },
    ],
  },
  {
    label: 'Auth & Payments',
    accent: 'mint',
    items: [
      { name: 'Custom JWT auth service (cross-product SSO)', projects: ['sample-assist'] },
      { name: 'OAuth2 flows (Google, Apple Sign-in)', projects: ['sample-assist'] },
      { name: 'VNPAY integration', projects: ['ggjungle'] },
      // Note: Japanese payment methods (Konbini / bank transfer) at
      // GGJungle weren't yours — you worked on order/checkout code
      // around them but didn't build the integrations. Not listed.
    ],
  },
] as const

/* ============================================================
   PROJECTS — ordered most-recent first.

   This block was the most heavily rewritten. Every project's
   metrics, headline, and impact list has been replaced with the
   honest version we developed in our sessions. The originals had
   meaningful overclaims in all four projects.
   ============================================================ */
export const PROJECTS: readonly Project[] = [
  {
    id: 'sample-assist',
    role: 'Software Engineer, DevOps',
    company: 'Sample Assist',
    short: 'Sample Assist',
    location: 'Wollongong, NSW',
    dates: 'Oct 2023 — Present',
    accent: 'rose',
    badge: 'Current',
    headline: 'Drug-testing platform for hospitals and clinics; handles My Health Records Act–regulated data including Individual Healthcare Identifiers (IHIs). Live in production with hundreds of users across 5–20 customer clinics.',
    metrics: [
      { value: '~30%', label: 'AWS spend cut', caption: 'Right-sizing + off-hours scale-down' },
      { value: '20+', label: 'Services on EKS', caption: 'Containerised NestJS backends, Helm + Argo CD' },
      { value: '7 apps', label: 'SSO for Authentication', caption: 'NestJS auth service powering 4 mobile + 3 web apps' },
    ],
    impact: [
      'Led the migration off Firebase + Google Cloud Functions onto AWS in ~3 months with one other engineer: Firestore → RDS Postgres (100+ tables), Cloud Functions → containerised NestJS services on EKS, Firebase Auth → custom in-house auth, Firebase Storage → S3.',
      'Built the production AWS platform from zero in Terraform — VPC, EKS, RDS, ElastiCache, IAM, Secrets Manager.',
      'Built the backend in NestJS / TypeScript across 20+ services, using TypeORM against Postgres, with shared modules for auth, data access, and observability.',
      'Built a custom in-house auth service that provides cross-product SSO across the seven-app suite (4 mobile + 3 web), with email/password, Google login, and Apple login, short-lived access + refresh tokens, and JWT verification on each downstream backend.',
      'Stood up a GitOps delivery pipeline (GitHub Actions → ECR → Argo CD + Helm) for 20+ services, with isolated staging/prod and a repeatable promotion path.',
      'Built the mobile release pipeline for all 4 mobile apps on iOS and Android — GitHub Actions triggers Fastlane on tag for build/sign/upload to TestFlight and Play internal track, with Fastlane Match for iOS signing.',
      'Cut AWS spend ~30% by right-sizing EKS nodes, scaling dev/staging down off-hours, and adding VPC endpoints to reduce NAT gateway traffic.',
      'Stood up Prometheus + Grafana from scratch, plus alerting and on-call rotation on top.',
      'Aligned the platform to Australian Privacy Act (APPs) and My Health Records Act — AWS Sydney for residency, encryption at rest/in transit, IAM least-privilege in Terraform, RBAC at the app layer. Passed an external penetration test.',
      'Mentored 3 other engineers on backend and platform; set NestJS, Terraform, and Helm standards across the team.',
    ],
    tags: [
      'AWS', 'EKS', 'ECS Fargate', 'Terraform', 'Argo CD', 'Helm',
      'GitHub Actions', 'Prometheus', 'Grafana',
      'NestJS', 'TypeScript', 'Node.js', 'TypeORM',
      'JWT', 'OAuth2', 'RDS Postgres', 'ElastiCache',
      'Fastlane', 'Match', 'iOS', 'Android',
    ],
  },
  {
    id: 'ggjungle',
    // role corrected: "Backend / Cloud Engineer" → "Backend Engineer".
    // AWS at GGJungle was deploy-level only; "Cloud Engineer" overstated it.
    role: 'Backend Engineer',
    company: 'GGJungle VN',
    short: 'GGJungle',
    location: 'Ho Chi Minh City, Vietnam',
    dates: 'Mar 2022 — Jun 2023',
    accent: 'mint',
    badge: 'Past',
    headline: 'Backend engineer on a Japanese e-commerce platform; owned the modules that opened the Vietnamese market.',
    // Metrics dropped per our conversation — the original three were:
    // "15 mo AWS ops" (overstated), "🇯🇵 Customers" (not a metric),
    // "1st DR procedures" (placeholder, you confirmed this was not real
    // work you did). Empty array used; verify your UI handles this.
    metrics: [],
    impact: [
      'Backend engineer for 15 months on a Japanese e-commerce platform: NestJS / Node.js / TypeScript against MySQL, working in a codebase architected by others.',
      'Owned the VNPAY integration end-to-end (~1–2 months with a frontend dev) when the product expanded into Vietnam — hosted-page redirect flow with webhook callbacks, plumbed into the existing checkout, sandbox-tested before live.',
      'Designed and built a new Coupon module from scratch (~1 month): database schema, NestJS service, integration into the existing cart/checkout. Percentage and fixed-amount discounts, free-shipping coupons, expiry dates, per-user usage limits.',
      'Contributed across the broader backend on order/checkout flows, admin tooling, and ongoing data model evolution.',
      'Worked inside a Japanese-organisation engineering process — detailed specs, careful code review, heavier documentation expectations than I had worked to before.',
      // Removed: "first backup & DR procedures" — confirmed placeholder.
      // Removed: "Customised Docker configurations — improved deployment
      // reliability, cut release time" — not surfaced in our conversation.
      // Removed: "Tuned legacy MySQL" — you said DB ops weren't yours.
    ],
    tags: [
      'NestJS', 'Node.js', 'TypeScript', 'MySQL',
      'VNPAY', 'AWS (deploys)', 'Docker',
    ],
  },
  {
    id: 'startiny',
    // role corrected: "Solo founder" → "Solo builder (AI-assisted)".
    // Startiny is React Native, AI-generated, 15 downloads, dev paused.
    // "Solo founder" implies a different level of investment than is real.
    role: 'Solo builder (AI-assisted)',
    company: 'Startiny',
    short: 'Startiny',
    location: 'iOS · App Store',
    dates: 'May 2026 — shipped (active dev paused)',
    accent: 'blue',
    badge: 'Side',
    headline: 'Shipped Startiny, a to-do app on the iOS App Store, in two weeks of AI-assisted solo development.',
    // Metrics dropped. Original three were "2 wk concept → ship",
    // "iOS Native Swift" (false — it's React Native), and "Live on App
    // Store" (true but card-shaped overclaim given 15 downloads and
    // paused development). Honest version handled in `impact` below.
    metrics: [],
    impact: [
      'Shipped Startiny live on the iOS App Store as a public, free to-do app — concept to launch in roughly two weeks of part-time work alongside a full-time day job.',
      'Built in React Native with Expo plus some Swift bridges for native features; most code was AI-generated via Claude (mostly Claude Code), with me directing, reviewing, and correcting throughout.',
      'Got Startiny through App Store review including one or two rejections that required understanding what the reviewer wanted and iterating — a step the AI cannot do for you.',
      'Distributed it solo (Product Hunt, X/Twitter, Reddit, direct shares) and reached 15 real downloads from people I don\'t personally know in the first two weeks.',
      'Paused active development after launch to focus on other commitments; intend to return.',
      'Proof that I can direct AI to ship a real product to a real platform, and own the parts of shipping that AI doesn\'t see (App Store policy, scope decisions, platform judgment).',
    ],
    tags: [
      'iOS', 'App Store', 'React Native', 'Expo',
      'Swift (native bridges)', 'AI-assisted development', 'Claude Code',
    ],
  },
  {
    id: 'fpt',
    role: 'Software Engineer',
    company: 'FPT Tan Thuan Telecom',
    short: 'FPT Telecom',
    location: 'Ho Chi Minh City, Vietnam',
    dates: 'Apr 2021 — Feb 2022',
    accent: 'purple',
    badge: 'Past',
    // headline rewritten: original "formal SDLC under delivery & review
    // processes" was contradicted by your answers — no formal code review,
    // lightweight tickets, limited test writing. Reframed honestly.
    headline: 'First job out of university — internal IT tools at FPT Telecom in Node.js + MongoDB.',
    metrics: [],
    impact: [
      'First professional engineering role, straight out of university — junior engineer on a team of ~8 building internal IT systems used by FPT staff.',
      'Built admin panels, dashboards, and backend Express APIs against MongoDB.',
      'Owned an admin-tool automation that replaced a recurring manual task an internal staff member had been doing on a daily/weekly cadence — one of the first features I owned end-to-end.',
      'Worked directly with the internal staff who used the tools — sat with them to understand the manual process before building, then demoed and iterated.',
      // Removed: "First exposure to formal SDLC under enterprise
      // constraints" — confirmed inaccurate, the team had no formal
      // code review, lightweight tickets, limited new test writing.
    ],
    // tags rewritten: original was [Backend, Enterprise, Java].
    // Actual stack was Node.js / Express / MongoDB. Java wasn't used.
    tags: ['Node.js', 'Express', 'JavaScript', 'MongoDB', 'Internal tools'],
  },
]


/* ============================================================
   PITCH — 30-second elevator pitch.

   This version leads with personality and the career arc, not just
   the stack. It deliberately swaps out the generic "infra engineer"
   tone of the previous version for something that reads as Nam, not
   as a LinkedIn-staff-engineer voice. The headline frames the
   backend-into-platform arc; the five points each name a real trait
   anchored in something we did in our project files.
   ============================================================ */
export const PITCH: Pitch = {
  headline: 'A backend engineer who deliberately built into platform work — because owning systems end-to-end matters more to me than picking a side.',
  points: [
    {
      k: 'I lean toward the unfamiliar',
      v: 'Joined Sample Assist as a software engineer; grew into running the AWS platform because the company needed it and I didn\'t yet know how. Backend → DevOps wasn\'t an accident, and I expect the next stretch won\'t be either.',
    },
    {
      k: 'I take products end-to-end',
      v: 'At Sample Assist I replatformed a healthcare product off Firebase onto AWS pre-launch, built the auth service that ties seven apps to one login, and set up the mobile release pipelines. Not "I did DevOps" — I did the work the product needed.',
    },
    {
      k: 'Build it right when you have the runway. Recognise when you do.',
      v: 'Three months pre-launch replatforming Firebase → AWS was the right call because we had no users yet. The instinct I\'m proud of isn\'t "do it right always" — it\'s spotting when the window for doing it right is actually open.',
    },
    {
      k: 'Honest about what I know and what I don\'t',
      v: 'Shipped a real iOS app in 2 weeks with Claude Code doing the bulk of the code — and I\'d rather tell you that than dress it up as "I wrote native Swift." Same instinct runs through everything: I\'d rather walk back a claim than have it crumble in an interview.',
    },
    {
      k: 'I find what I don\'t know quickly',
      v: 'When I hit something I haven\'t seen before, my default is "I might not have the answer right now, but I\'ll find it" — not "that\'s outside my scope." Most of what I know about platform work was learned this way.',
    },
  ],
}

/* ============================================================
   EDUCATION
   ============================================================ */
export const EDUCATION: readonly EducationItem[] = [
  {
    degree: 'Master of Computer Science',
    school: 'University of Wollongong',
    location: 'Wollongong, NSW',
    dates: 'Jul 2023 — Jul 2025',
  },
  {
    degree: 'Bachelor of Science, Computer Science',
    school: 'Vietnam National University — UIT',
    location: 'Ho Chi Minh City',
    dates: 'Sep 2016 — Sep 2020',
  },
]