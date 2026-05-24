import type { Company } from './_types'

export const mastt: Company = {
  slug: 'mastt',
  displayName: 'Mastt',
  role: 'Software Engineer',
  heroGreeting: "Hi Mastt team — here's why this fits.",
  notes: `Mastt is an Australian construction project management SaaS — headquartered in Sydney with regional footprints in North America (us.mastt.com), MENA, and Rest of World. Founded in 2019 by Doug Vincent (CEO, ex-Project Manager fed up with spreadsheets), Jamie Cerexhe (CTO, ARN 30 Under 30 Tech Awards 2020), and Raman Nambiar (Partnerships). Original mission: "kill spreadsheets and free the industry from the burden of manual reporting." That has evolved into an explicitly AI-first position they describe as "agentic AI in every construction project team, creating a true human + AI workforce" — AI that "works like a teammate, not a tool."

The product is a project management platform for capital projects, sold to project owners, real estate developers, owner's representatives, PM consultants, small businesses, and government entities across aviation, education, energy, healthcare, industrial, infrastructure, public works, retail, and utilities. Core modules: project workspace, document management with AI chat, program-level data roll-up, live dashboards, cost management (budgets/contracts/payments/forecasting), risk tracking, and schedule management. AI surface area today (publicly named): AI Assistant, AI Document Analysis, AI Contract Review, AI Payment Review.

Competitors are the big construction-tech incumbents: Procore, Kahua, InEight, Aconex, iTWOcx. CEMEX Ventures is a named backer. Notable recognition: AFR Best Places to Work 2021, Middle East Digital Construction Technology Provider of the Year 2023, Microsoft Scale-Up Cohort 2019, Top 50 ConTech Startups 2021.

Values (paraphrased): "Ruthless about customer's success" (partners not vendors), "Be bold, be brave" (back ambitious moves), "In the fight together" (all-in regardless of role), "Act with honesty, humility and integrity" (transparent), "Show up ready" (whole-person growth).

Stack from JD: TypeScript, Next.js, Go, MongoDB, Azure. Role wants an explicit "product builder" — software engineering + product + design hats — and calls out experience using LLM coding tools to build product, which is unusually direct hiring language and matches how I work day-to-day. Sydney hybrid; I'm Sydney-based.`,
  keywords: [
    'typescript',
    'nextjs',
    'next.js',
    'react',
    'golang',
    'go',
    'mongodb',
    'azure',
    'web development',
    'llm',
    'ai',
    'ai agents',
    'product builder',
    'cross-functional',
    'computer science',
    'software engineering',
  ],
  whyFit: [
    {
      point: 'TypeScript + Next.js + Node already in production',
      detail:
        "I run a NestJS / TypeScript backend at Sample Assist across 20+ services, and the site you're reading is React 19 + TS on Cloudflare Pages — same modern web stack Mastt runs, minus the Go side, which I'm comfortable picking up the way I picked up Terraform and Kubernetes from cold.",
    },
    {
      point: 'MongoDB experience from production, not a tutorial',
      detail:
        'Built Node.js / Express services against MongoDB at FPT Telecom for internal IT tooling — admin panels, dashboards, automation that replaced manual staff workflows. Document-model thinking is muscle memory, not a re-learn.',
    },
    {
      point: 'LLM coding tools in real workflows, not slideware',
      detail:
        "I lead the AI rollout for a 5-engineer team at Sample Assist (Cursor, Claude Code, Copilot) and shipped an Anthropic-powered iOS app solo in two weeks. This site's JD analyzer you just tried is Claude Haiku 4.5 with prompt caching — exactly the kind of LLM-as-product instinct Mastt's AI Agents pitch is built on.",
    },
    {
      point: 'Product builder, not just a code monkey',
      detail:
        "Startiny is an iOS app I took from idea to App Store in 2 weeks solo — I made the scope cuts, the UX calls, the App Store review iteration, and the distribution effort (Product Hunt, X, Reddit). At Sample Assist I drove the Firebase → AWS replatform pre-launch because the company needed it, not because someone handed me a ticket.",
    },
    {
      point: 'Sydney-based, hybrid-ready, no relocation lag',
      detail:
        "I'm in Sydney already — happy with hybrid in the Mastt office, and 2 weeks notice from my current role. I can be in the building this fortnight if it helps the interview loop.",
    },
  ],
  jdText: `About the job

Company Description

Mastt is committed to revolutionizing the construction industry through AI-driven solutions. Our advanced construction project management software, trusted by thousands of users, empowers everyone from small project management firms to Fortune 500 companies and government entities. Mastt's innovative AI Agents are designed to automate tasks such as extracting data from documents, triggering workflows, updating forecasts, and generating reports without manual effort. By partnering with Mastt, users can enhance productivity, streamline processes, and make data-driven decisions with confidence across construction projects and portfolios.

Role Description

This is a full-time hybrid role based in Sydney, NSW, with the flexibility to work remotely part of the time. As a Software Engineer at Mastt, you will play a key role in designing, developing, and maintaining scalable software solutions tailored to the construction industry. Your responsibilities will include collaborating with cross-functional teams to develop high quality software, building clean and efficient code, and contributing to the continuous improvement of our software using modern technologies. Additionally, you will take part in problem-solving sessions, perform code reviews, and ensure the implementation of best practices in software development. The ideal candidate is someone who is a product builder - core skillset in software engineering but also enjoys putting on a product and design hat.

Qualifications

Strong foundation in Computer Science principles.
Experience in Web Development in modern languages and frameworks.
Experience in using LLM coding tools to build product.
Ability to collaborate effectively within cross-functional teams.
Strong problem-solving skills and attention to detail.
Bachelor's degree in Computer Science, Software Engineering, or a related field is preferred but not required.

Our Stack

Typescript
NextJS
GoLang
MongoDB
Azure`,
}
