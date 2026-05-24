import type { Company } from './_types'

export const ofload: Company = {
  slug: 'ofload',
  displayName: 'Ofload',
  role: 'Software Engineer',
  heroGreeting: "Hi Ofload team — here's why this fits.",
  notes: `Ofload is Australia's leading digital freight partner — a Sydney-headquartered FreightTech scaleup tackling the AUD $66B Australian road freight market. The core problem they're solving is brutal and concrete: trucks in Australia drive empty 30% of the time, networks are fragmented, smaller transport operators can't compete with big incumbents, and supply chains lack visibility. Ofload's platform connects blue-chip enterprise customers (Asahi, Kimberly-Clark, Metcash, Noumi) with a growing network of small-to-medium transport operators — turning otherwise empty truck kilometres into smarter, greener freight. The pitch they sell to customers is "reduce empty truck miles, improve visibility, optimise supply chains"; the pitch they sell to carriers is "the long tail of Australian freight can now work with the biggest brands in the country."

They've raised over USD $100M from top-tier investors who also back Canva, Revolut, and HelloFresh. Recognition is unusually dense: #1 Deloitte Climate and Sustainability Award 2024 (for their pioneering Carbon Analytics Platform — the sustainability angle that makes this more than just a logistics marketplace), #2 AFR BOSS Best Places to Work 2024 in Transport and Construction, AFR BOSS Fast100 List 2025 (with second-highest revenue in the cohort), Deloitte Fast50 three consecutive years, AFR FastStarters three consecutive years. They explicitly self-position as "a tech startup with the impact of a massive, real-world problem" — agility plus scale of problem.

The product surface area named in the JD is genuinely interesting: AI-powered data ingestion, pricing and rate-card algorithms, bulk upload workflows, and systems that directly influence margin, cashflow, and operational efficiency. That's not glue work — pricing/rate-card logic and bulk-ingest are exactly where SaaS companies extract real margin, and AI-assisted data ingestion is the kind of LLM-as-product work I'm already doing on the side.

Stack from JD: PHP 8 / Laravel for the legacy / monolith side, Node.js / NestJS / TypeScript / React for newer services, Postgres + Redis + S3 + Kubernetes + AWS for infra. Python is mentioned as "highly regarded" for AI/data work. My NestJS/TypeScript and React/TypeScript work at Sample Assist + this site is a direct match. I also shipped production PHP features at GGJungle for 15 months against MySQL (not Laravel specifically — but PHP itself isn't a cold-start for me, which makes the Laravel ramp much shorter than the JD's "adjacent stack, willing to learn" baseline.

Engineering culture (from the JD): small cross-functional squads with PMs and Designers, autonomy + ownership trusted to engineers, AI-assisted development explicitly part of the workflow (Claude Code, Cursor named), code reviews and technical discussions standard, strong engineering culture focus. They want a "product engineering mindset" — exactly the framing I'd use for myself given Startiny + the Firebase→AWS replatform call at Sample Assist.

Hybrid Sydney role. I'm Sydney-based, 2 weeks notice.`,
  keywords: [
    'php',
    'laravel',
    'nodejs',
    'node.js',
    'nestjs',
    'typescript',
    'react',
    'python',
    'postgres',
    'postgresql',
    'redis',
    's3',
    'kubernetes',
    'aws',
    'apis',
    'relational databases',
    'ai-assisted',
    'claude code',
    'cursor',
    'ai',
    'llm',
    'saas',
    'product-led',
    'cross-functional',
    'data ingestion',
    'pricing',
    'rate card',
    'bulk upload',
    'freighttech',
    'logistics',
  ],
  whyFit: [
    {
      point: 'Full stack overlap — NestJS, TypeScript, React, and production PHP',
      detail:
        "I run a NestJS + TypeScript backend across 20+ services at Sample Assist, the site you're reading is React 19 + TS on Cloudflare Pages, and I shipped production PHP features at GGJungle for 15 months against MySQL. Laravel itself I'd pick up on the job, but PHP isn't a cold-start for me — I've owned features in it.",
    },
    {
      point: 'Postgres + Redis + S3 + Kubernetes + AWS — every line of your infra list',
      detail:
        'At Sample Assist I built the production AWS platform from zero in Terraform: EKS (20+ services on Helm + Argo CD GitOps), RDS Postgres (100+ tables I migrated off Firebase with dual-write + shadow reads, no incident), ElastiCache Redis, S3, VPC, IAM least-privilege. Your infra list is what I work in every day.',
    },
    {
      point: 'AI-assisted development in real workflows, not slideware',
      detail:
        "I lead the AI rollout for a 5-engineer team at Sample Assist (Cursor, Claude Code, Copilot) and shipped an Anthropic-powered iOS app solo in two weeks. This site's JD analyzer you just tried is Claude Haiku 4.5 with prompt caching — exactly the AI-enabled engineering posture Ofload is hiring for, applied to a real product.",
    },
    {
      point: 'Product builder, not just a code monkey',
      detail:
        'Startiny is an iOS app I took from idea to App Store in 2 weeks solo — I made the scope cuts, the UX calls, the App Store review iteration, and the distribution effort. At Sample Assist I drove the Firebase → AWS replatform pre-launch because the company needed it, not because someone handed me a ticket. The "product engineering mindset" in your JD is how I already work.',
    },
    {
      point: 'Regulated SaaS background — careful with data, margin, and cashflow systems',
      detail:
        "Sample Assist handles My Health Records Act–regulated data; we passed an external pen test, run IAM least-privilege in Terraform, and I've shipped zero-downtime migrations under live load. The mindset transfers cleanly to Ofload's pricing / rate-card / cashflow surface, where wrong answers cost money directly.",
    },
    {
      point: 'Sydney-based, hybrid-ready, no relocation lag',
      detail:
        "I'm in Sydney already — happy with hybrid in the Ofload office, and 2 weeks notice from my current role. I can be in the building this fortnight if it helps the interview loop.",
    },
  ],
  jdText: `About Ofload And Our Mission

FreightTech is one of the most exciting spaces to be in right now, with the opportunity to transform one of the largest industries. Freight in Australia is a $66 billion market, yet it is analogue and has many inefficiencies: 30% of the time, trucks drive empty. Networks lack transparency, data flows are fragmented, and smaller transport operators face barriers to competing with the big players.

At Ofload, we're changing how the freight industry operates and bringing it into the digital world. We leverage technology, data, and strategic partnerships to connect a growing roster of blue-chip customers with smaller, highly efficient transport operators. By reducing empty truck miles, improving visibility, and optimising supply chains, we're driving smarter, greener, and more efficient operations that benefit businesses and the environment.

This isn't just logistics—it's FreightTech: a tech-powered transformation of an industry that is the backbone of the economy and touches everyone's lives.

Why Join Ofload?

Joining Ofload means being part of a high-growth scaleup. It means working alongside motivated, ambitious individuals who are passionate about disrupting the status quo and making a real impact. Our team thrives on challenges, values direct and honest feedback, and is committed to growing together.

We've raised over $100M in funding from some of the world's top investors—backers of companies like Canva, Revolut, and HelloFresh. Along the way, we've been recognised for our innovation and culture:

Ranked #1: Deloitte Climate and Sustainability Award 2024 for our pioneering Carbon Analytics Platform
Ranked #2: AFR BOSS Best Places to Work 2024 in Transport and Construction
Recognised in AFR BOSS Fast100 List 2025 with second highest revenue
Recognised in Deloitte Fast50 3 consecutive years
Recognised in AFR FastStarters 3 consecutive years

At Ofload, we combine the agility of a tech startup with the impact of tackling a massive, real-world problem. If you're ready to be part of an ambitious team reshaping the freight future, we want to hear from you.

About The Role

We're growing our engineering team and are looking for a talented Software Engineer to join Ofload.

Our Engineering team is trusted with autonomy and ownership to do great work. We operate in small cross-functional squads, partnering closely with Product Managers and Designers to solve meaningful customer and business problems.

This role is ideal for an engineer who is hungry to learn, enjoys solving complex problems, and wants to grow in a fast-moving product and engineering environment.

You'll work on impactful initiatives across our logistics platform, including AI-powered data ingestion, pricing and rate card algorithms, bulk upload workflows, and systems that directly influence margin, cashflow, and operational efficiency.

Our stack includes PHP 8, Laravel, Node.js, NestJS, TypeScript and React, supported by Postgres, Redis, S3, Kubernetes and AWS.

What You'll Do

Work collaboratively within a cross-functional squad of Engineers, Product Managers and Designers to build and improve core platform features
Develop scalable backend & mobile services using PHP, Laravel, Node.js and NestJS
Contribute to front-end development using React and TypeScript where required
Help solve complex data ingest and bulk upload challenges, including AI-assisted workflows and pricing/rate-card logic
Build systems that have meaningful business impact across finance, operations, margin and cashflow optimisation
Write clean, maintainable and well-tested code
Participate in code reviews, planning sessions and technical discussions
Help debug production issues and improve system reliability and performance
Learn from senior engineers while progressively taking ownership of features and technical decisions
Contribute to a strong engineering culture focused on collaboration, continuous improvement and shipping quality products

What You'll Bring

Strong engineering fundamentals, a product engineering mindset, and curiosity to solve complex problems and edge cases. We're open to candidates from any engineering background — mindset, adaptability, and potential matter most.
2-5 years' experience building and maintaining production systems.
Experience with some of our core technologies including PHP/Laravel, Node.js/NestJS, React, and TypeScript, or adjacent languages and frameworks with a willingness to learn our stack.
Experience using AI-assisted development tools or coding agents such as Claude Code, Cursor or a genuine eagerness to be part of the AI-enabled engineering journey.
Interest in Python, AI models, or data-focused engineering challenges is highly regarded.
Experience working with APIs, relational databases, and modern development workflows.
Strong problem-solving skills and curiosity to work through unfamiliar challenges.
A growth mindset with a genuine desire to learn, improve, and continuously develop your craft.
Ability to collaborate effectively with engineers, designers, and product stakeholders.
Experience in SaaS or product-led technology environments is highly regarded

Core Qualities We Care About

Motivated, driven and eager to grow
A strong team player who enjoys collaborating and contributing to team success
Curious, adaptable and excited by technical challenges
Comfortable diving into new technologies and problem spaces
Passionate about building products that create meaningful customer and business value
Pragmatic, hands-on and willing to solve problems wherever needed
Excited about using technology to modernise and improve the logistics industry`,
}
