---
title: How I work, what I want
updated: 2026-05-23
---

## Career arc

I started as a junior Node.js engineer at FPT Telecom out of university — a small-team internal-IT environment with light process, where I picked up the gap between school code and production code. From there I joined GGJungle VN, the Vietnam office of a Japanese company, and spent 15 months on a Japanese e-commerce platform — a much more rigorous engineering environment that raised my baseline for what "careful" looks like. At Sample Assist I crossed from pure backend into platform / DevOps and grew into the technical lead role, because what I want in the long run is to handle systems end-to-end and own the system design, not only the code that runs on top. I moved to Australia and plan to stay long-term. For the next 3 years I want to keep going deeper on platform work, ideally at a mid-size company with enough real user load to teach me what scale problems actually feel like in production.

## What I want to be known for

The engineer who can take a product from a Firebase prototype to a real production platform — backend, infrastructure, deployment, observability, the whole stack — without dressing up what isn't true. Builds things well when there's runway, says so when there isn't, and is honest about which is which.

## Vision (3–5 years)

A mid-size company with real user load — enough scale that workload problems are routine rather than theoretical. The exact title matters less than the work; Platform Engineer, Tech Lead of a small platform team, or Staff/Principal track at a mid-size shop are all shapes that would fit. I want to stay hands-on technically while leading a small team — the tech-lead-IC path, not the pure management track. Domain isn't a strong driver; I care more about engineering rigor and a platform that actually has interesting workload behind it than the industry it serves.

## Long-term (10 years)

I haven't decided this carefully enough to commit to a single answer. The shape I'd lean toward right now is staff/principal-level platform work or a platform engineering leadership role, possibly with some involvement in building my own thing on the side (Startiny was a first taste of that). But I'd rather leave this section open and honest than write down an aspiration I haven't earned the right to make yet.

## How I operate

- **Build it right when you have the runway. Recognise when you do.** I deliberately spent three months replatforming Sample Assist off Firebase before launch *because* we had no live users — the cost of doing it right was lowest then. Different situations need different defaults, but my honest default leans toward "do the work properly when the window is open" rather than "ship now, fix forever."
- **Boring tech beats new tech that's better on paper.** Postgres, Terraform, well-trodden Kubernetes patterns, AWS managed services — I default to the choices the broadest set of engineers can pick up and maintain. New tech has to earn its place against a concrete benefit, not just look interesting.
- **Code should be self-documenting; docs are for the hard parts.** Names, structure, and small functions should carry most of the explanation. I write docs for the things code can't say — architectural decisions, the *why* behind a non-obvious choice, runbooks for the parts that page you at 11pm. (Honest caveat: I learned at Sample Assist that I let runbook-style docs slip too long, and I'm trying to fix that. See "Things I'm bad at" below.)
- **Push back on product asks the architecture can't cleanly absorb.** I learned slower than I'd like that absorbing complexity quietly into the backend is usually worse than saying "this doesn't fit yet, here's how we'd do it differently." Healthy pushback is part of the technical lead role; I lean into it now where I used to flinch.
- **Close knowledge gaps quickly.** When I hit a thing I don't know, my default is "I might not have the answer right now, but I'll find it" rather than "that's outside my scope." Most of what I know about platform / infra was learned this way — bridging from backend into DevOps at Sample Assist was a deliberate decision to acquire a set of skills I didn't have, and I expect to keep doing that for the rest of my career.

## What I'm looking for

- **Role:** Platform / DevOps / Backend-heavy roles where I can own systems end-to-end. Tech Lead or Senior IC track. I want to keep my hands on the keyboard and lead a small team if the role calls for it, but I'm not chasing pure management yet.
- **Team size / scope:** Small enough that I'm hands-on with the platform, not abstracted away from it. A platform that supports a handful of product teams is the right shape; running a 50-person platform org isn't (yet).
- **Stage / size:** Open for my immediate next role — the change matters more than the stage. In 2–3 years I specifically want to be at a mid-size company with enough real users that scale problems are a routine part of the work.
- **Tech I want to keep doing:** AWS, EKS, Terraform, GitOps with Argo CD + Helm, NestJS / TypeScript backends, Postgres at the data layer. The Sample Assist stack, deepened.
- **Tech I want to learn:** Distributed systems and event-driven architectures (the patterns you can only learn at real scale), Kubernetes operated at significantly larger workload than Sample Assist's, deeper SRE / production-reliability practice (real on-call rotations against meaningful traffic).
- **Comp:** Market rate, open to discuss. I'm not optimising for top-of-band on this next move; I'm optimising for the right role.
- **Location / remote:** Sydney-based; hybrid is fine. I'd rather be in office some of the week than fully remote.

## Dealbreakers

- **Toxic culture or bad management reputation.** Real or well-sourced. I'd rather walk away from a great-sounding role at a place with a known people problem than spend a year there.

## Things I'm learning right now

I learn mostly by working, not through structured courses or books — which I'd rather say honestly than dress up. What I'm currently absorbing through the Sample Assist day job and adjacent reading: how distributed systems and event-driven architectures behave at scales beyond what I've personally operated, what production-reliability practice looks like at companies with meaningful traffic, and what AI-assisted development workflows (continuing on from Startiny) start to look like when applied to bigger codebases than a 2-week solo ship.

## Things I'm bad at (and how I compensate)

- **I avoid hard conversations with people longer than I should.** The pattern: when I disagree with a technical decision or a product ask, I sometimes try to make it work quietly rather than raising the disagreement directly. I caught this in my Sample Assist reflection — "I'd push back harder on product asks that didn't fit the architecture cleanly" — and I'm actively working on it. Compensation in the meantime: I now try to surface the disagreement in writing (a doc, a PR comment, a Slack thread) rather than letting it stew, because writing it down forces me past the urge to silently absorb.

## Off-the-clock

*(Skipped for now — section can be added later if useful.)*