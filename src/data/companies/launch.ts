import type { Company } from './_types'

export const launch: Company = {
  slug: 'launch',
  displayName: 'Launch',
  role: 'Software Engineer (Full Stack contract)',
  heroGreeting: "Hi Launch team — here's why this fits.",
  notes: `Launch (The Launch Group) is an Australian award-winning recruitment and talent-solutions group with offices across Australia, New Zealand, Japan, and Singapore. Three businesses sit under the group: Launch Recruitment (the main agency — permanent, contracting, payroll, executive search), Launch Talent Solutions (MSP, RPO, total talent management, vendor management systems), and LTS Consulting (business and technology transformation — strategy through to implementation, project services, workforce management). The recruitment side has specialist divisions across Project Services & Transformation, Infrastructure & Cloud, Software/Application Development, Digital, Cybersecurity, Data & Analytics, Emerging Technology, Corporate Services, and Finance & Procurement — so the Launch recruiter screening me is likely from the Software/Application Development or Digital division.

Public domains: launchrecruitment.com.au, launchts.com.au, ltsconsulting.com.au. They self-position around "positive, repeatable customer experience" and serving long-standing clients across the four ANZ + Asia markets.

The role they're sourcing me for is a Full Stack Software Engineer contract at a leading global financial organisation (100+ years in market, real-tech engineering focus). 6-month initial contract with view to extend/perm, ASAP start, max 2-week notice ideal, hybrid 3 days/week in office. Stack: React, Next.js, Node — strong frontend lean, with backend API / microservices / BFF and CI-CD / DevOps required. 4+ years Full Stack required; I'm 5+ years.

Framing for this page: since Launch is the agency, not the hiring client, the recruiter's job is to decide whether to put me forward. So what matters here is "am I a clean, low-risk placement they can confidently forward to a 100-year-old global financial org?" That means: stack match, fast availability, hybrid-ready, communication, the kind of CI-CD/DevOps maturity a regulated financial client expects, and a track record of driving technical direction (which is explicitly called out in the JD).`,
  keywords: [
    'react',
    'nextjs',
    'next.js',
    'next',
    'nodejs',
    'node.js',
    'node',
    'nestjs',
    'typescript',
    'javascript',
    'full stack',
    'fullstack',
    'frontend',
    'backend',
    'api',
    'apis',
    'microservices',
    'bff',
    'backend for frontend',
    'ci/cd',
    'cicd',
    'devops',
    'propose solutions',
    'technical direction',
    'growth mindset',
    'communication',
    'stakeholders',
    'contract',
    'hybrid',
    'sydney',
    'financial services',
    'fintech',
  ],
  whyFit: [
    {
      point: 'React, Node, and TypeScript already in production at Full Stack level',
      detail:
        "I run a NestJS + TypeScript backend across 20+ services at Sample Assist and the React 19 + TS frontend you're chatting with now — that's the Full Stack JS scope the role asks for. Next.js specifically isn't in my production work yet (Sample Assist and this site are Vite + React), but the React/Node fundamentals transfer cleanly and I'd be productive on Next inside a week.",
    },
    {
      point: 'Backend API + microservices breadth, not just CRUD',
      detail:
        'At Sample Assist I built and operate 20+ NestJS microservices behind a custom in-house auth service that does cross-product SSO across 7 apps (4 mobile + 3 web). The BFF / API-gateway shape Launch describes is the same architecture I work in daily.',
    },
    {
      point: 'CI/CD and DevOps maturity a regulated financial client will care about',
      detail:
        'GitHub Actions for CI, Argo CD + Helm for GitOps deploys across staging and prod, Terraform for the whole AWS footprint (EKS, RDS Postgres, ElastiCache, IAM least-privilege), Prometheus + Grafana for observability, passed an external pen test. This is exactly the discipline a 100-year-old financial org expects from a contractor on day one.',
    },
    {
      point: 'Proven at proposing solutions and driving technical direction',
      detail:
        "I led the Firebase → AWS replatform at Sample Assist with one other engineer over 3 months pre-launch — that wasn't a handed-down ticket, it was a call I made because the company needed it. Same posture transfers to the JD's 'propose solutions and drive technical direction' line.",
    },
    {
      point: 'Clean placement: Sydney-based, 2-week notice, hybrid-ready, fast start',
      detail:
        "I'm in Sydney already, on a standard 2-week notice from Sample Assist, and happy with 3 days/week in office. ASAP start is realistic — Launch can put me forward to the client without availability friction.",
    },
    {
      point: 'Communication track record across stakeholders and engineering teams',
      detail:
        'Mentored 3 engineers at Sample Assist (set NestJS/Terraform/Helm standards, ran code review, onboarded them to on-call), and worked through detailed cross-cultural spec-and-review processes at GGJungle. Stakeholder-facing communication is a habit, not a hurdle.',
    },
  ],
  jdText: `About The Role

Work with a leading global financial organisation who have been in the market for over 100 years. This is a great opportunity to join a leading engineering team in Australia and work on building and transforming the way they service their customers. They have a real-tech engineering focus where you will have the chance to experiment and work on new challenges as you grow within this role.

This role focuses on modern JavaScript frameworks. The ideal candidate will bring strong Full Stack experience with a frontend leaning focus in React, Next and Node with the ability to drive technical direction and propose solutions.

What will you be doing?

Building on and uplifting the current technology roadmap
Work in a team and autonomously to write code, develop and deliver new technologies
Always strive for excellence and continuous improvement - how can things be done better?
Experience in proposing solutions and direction
Maintain and improve the user experience across all frontend

What are we looking for?

Strong demonstrated experience in Full Stack (4+ years), with a frontend focus in React, Next and Node
Good backend API, microservices and BFF experience
Good CI/CD and DevOps experience
Ability to propose solutions and drive technical direction
Growth mindset - somebody eager to learn and keen to develop and grow
Excellent communication skills and ability to communicate with stakeholders

Benefits

This is an initial 6-month contract with view to extend/go perm
ASAP Start - max 2 week notice ideal
Hybrid working - 3 days required in office
Highly collaborative team

(Recruiter: Launch Recruitment — placing this role on behalf of a global financial organisation)`,
}
