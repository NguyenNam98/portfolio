import type { Company } from './_types'

export const magentus: Company = {
  slug: 'magentus',
  displayName: 'Magentus',
  role: 'Software Engineer',
  heroGreeting: "Hi Magentus team — here's why this fits.",
  keywords: [
    'typescript',
    'node.js',
    'react',
    'aws',
    'serverless',
    'containers',
    'devops',
    'ai',
    'healthcare',
    'saas',
    'ownership',
  ],
  whyFit: [
    {
      point: 'TypeScript + Node + AWS already in production',
      detail:
        "I run a NestJS/TypeScript backend on Amazon EKS at Sample Assist with the full AWS footprint (RDS, ElastiCache, ALB, VPC, IAM) as Terraform. The React side I keep current — this site you're reading is React 19 + TS on Cloudflare Pages.",
    },
    {
      point: 'Zero-downtime migrations under production load',
      detail:
        'I migrated 100+ tables from Firebase to RDS Postgres at Sample Assist with a dual-write + shadow-read window — no incident, no rollback. Exactly the careful, end-to-end ownership a regulated-data SaaS demands.',
    },
    {
      point: 'AI tooling in real workflows, not slideware',
      detail:
        "I lead the AI rollout for a 5-engineer team at Sample Assist (Cursor, Claude Code, Copilot) and shipped an Anthropic-powered iOS app solo. This site's JD analyzer you just tried is Claude Haiku 4.5 with prompt caching — same playbook I'd bring to product work.",
    },
    {
      point: 'End-to-end ownership, proven solo',
      detail:
        'Startiny is an iOS productivity app I took from idea to App Store in 2 weeks — Swift frontend, Cloudflare Worker backend, rate-limited Anthropic proxy. Proof I drive features through to production without needing a team around me.',
    },
  ],
  jdText: `At Magentus, our goal is to create a healthier society through technology. We do that by delivering smart workflows that connect people, systems, and data - making care more intelligent, efficient, and accessible. Whether it's supporting clinicians, streamlining operations, or improving patient outcomes, we're here to make a real difference in healthcare through digital innovation.

About The Role

Reporting to the Development Team Lead, you'll play a critical role in designing, building, and supporting our Practice Management SaaS products.

As a Software Engineer, you'll work in a collaborative team environment to deliver high-quality features, enhance system architecture, and continuously improve our products. You'll take ownership of your work end-to-end and contribute to solutions that directly impact healthcare delivery.

Key Responsibilities

Design, build, and deliver new features for our health-tech SaaS platform
Own solutions end-to-end—from design and development through to production support
Contribute to continuous improvement across software design, product capability, and system architecture
Collaborate with cross-functional teams to deliver shared outcomes across the Magentus group
Leverage modern development practices, including DevOps and AI-assisted workflows
Play an active role in fostering a collaborative, high-performing team culture

About You

Degree in Computer Science/IT or equivalent practical experience
Strong experience with TypeScript, Node.js, and React in production environments
Hands-on experience with AWS (serverless, containers, networking, databases)
Solid understanding of modern DevOps practices
Experience using AI tools in development workflows
Exposure to regulated industries (healthcare, pharma, or medical devices) is highly regarded

You'll Bring

Thrive in a fast-paced, delivery-focused environment
Strong communication skills and proactive collaboration style
Ability to prioritise high-impact work and seek clarity when needed
Team-first mindset, contributing both in-office and remotely
Strong ownership mentality—seeing work through to completion

Join Today!

At Magentus, we live our values every day:

One Team – We collaborate and support each other
Constant Evolution – We embrace change and keep improving
We Care – About our people, our customers, and our impact
Make A Difference – We're here to create real, positive change
Trust – We do what we say and act with integrity

What's in it for you:

Flexible work options to support work-life balance
Learning and development programs to grow your career
A supportive, inclusive team culture
Opportunities to work across departments and expand your skills
A purpose-driven company where your work truly matters`,
}
