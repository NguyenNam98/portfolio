---
id: sample-assist
role: Software Engineer, DevOps
company: Sample Assist
short: Sample Assist
location: Wollongong, NSW
country: Australia
dates: Oct 2023 — Present
badge: Current
accent: rose
headline: Built the AWS platform for a drug-testing platform serving hospitals and clinics; led the Firebase → AWS replatform alongside one other engineer.

metrics:
  - value: "~30%"
    label: AWS spend cut
    caption: Right-sizing + off-hours scale-down
  - value: "20+"
    label: Services on EKS
    caption: Containerised NestJS backends, Helm + Argo CD
  - value: "7 apps"
    label: One login
    caption: NestJS auth service powering 4 mobile + 3 web apps

tags:
  - AWS
  - EKS
  - ECS Fargate
  - Terraform
  - Argo CD
  - Helm
  - GitHub Actions
  - Prometheus
  - Grafana
  - NestJS
  - TypeScript
  - Node.js
  - React
  - JWT
  - OAuth2
  - RDS Postgres
  - ElastiCache
  - TypeORM
  - Fastlane
  - Match
  - iOS
  - Android
---

## Context

Sample Assist is an Australian drug-testing platform serving hospitals and clinics — collectors, clinic staff, and admins use it to run drug-testing workflows from booking through sample collection to reporting. The product is a suite of seven apps sharing a common backend: four mobile (collector-assist onsite, collect-assist in-clinic, work-assist, welcome-assist) and three web (collection manager, report-assist, online booking). When I joined, the product was pre-launch and running on Firebase + Google Cloud Functions: a prototype that had got the team this far but wasn't going to carry a regulated healthcare product into production. We replatformed it onto AWS before launch; it has since gone live and now runs in production with hundreds of users across roughly 5–20 customer clinics, handling data subject to the Australian Privacy Act and the My Health Records Act. I joined as a software engineer and grew into the technical lead role in practice, reporting directly to the CEO.

## Role in one paragraph

I was the founding technical lead in practice: I set up the codebase on AWS, made the architecture decisions, owned the backend services (NestJS / TypeScript) and the data model, and built the AWS platform that everything ran on. Success meant getting Sample Assist from a Firebase prototype to a production system trusted by clinic users, then keeping it reliable, secure, and economical as the platform launched, real customers came on, more services were added, and more engineers joined. I worked directly with the CEO on product direction, and as the team grew I led and mentored 3 other engineers — setting NestJS, Terraform, and code review standards across the team.

## What I shipped

- Led the migration off Firebase + Google Cloud Functions onto AWS in roughly three months with one other engineer (pre-launch): Firestore → RDS Postgres (100+ tables), Cloud Functions → containerised NestJS services on EKS, Firebase Auth → custom in-house auth service, Firebase Storage → S3.
- Built the backend in NestJS / TypeScript across 20+ services, using TypeORM against Postgres, with shared modules for auth, data access, and observability so new services could be stood up consistently.
- Built a custom in-house auth service in NestJS that provides cross-product SSO across the seven-app suite (4 mobile + 3 web), with email/password, Google login, and Apple login (the last required for App Store review on the iOS apps), short-lived access tokens + refresh tokens, and JWT verification on each downstream backend.
- Built the production AWS platform from zero: designed and provisioned VPC, EKS cluster, RDS Postgres, ElastiCache Redis, and IAM all in Terraform.
- Stood up a GitOps delivery pipeline using GitHub Actions for CI (build, test, push to ECR) and Argo CD for cluster deploys, with Helm charts as the packaging layer for 20+ services.
- Built the mobile release pipeline for all 4 mobile apps in the suite on both iOS and Android: GitHub Actions triggers on tag, Fastlane handles platform-specific build, signing, and upload to TestFlight (iOS) and Play Console internal track (Android), with Fastlane Match storing iOS signing certs in an encrypted private repo. Stopping at TestFlight / internal track was deliberate — store submission stays a human decision.
- Separated staging and production environments with per-environment Helm values and isolated AWS resources, replacing ad-hoc deploys with a repeatable promotion path.
- Set up Prometheus + Grafana from scratch for cluster and application metrics, and built the alerting + on-call rotation on top of it.
- Cut AWS spend by ~30% through right-sizing EKS nodes, scaling dev/staging environments down off-hours, and adding VPC endpoints to reduce NAT gateway traffic.
- Designed the ingress and traffic layer using the AWS Load Balancer Controller (ALB) on EKS, with ECS Fargate for supporting workloads that didn't belong on the cluster.
- Integrated AWS Secrets Manager into the deploy pipeline so services pulled secrets at runtime rather than baking them into images or Helm values.
- Built the platform to align with Australian Privacy Act (APPs) and My Health Records Act requirements: AWS Sydney region for data residency, encryption at rest and in transit by default, IAM least-privilege roles in Terraform, and RBAC at the application layer.
- Took the platform through an external penetration test and passed, addressing findings across the AWS configuration and backend services.
- Mentored 3 other engineers across backend and platform: set NestJS, Terraform, and Helm standards, ran code review, and onboarded them to the on-call rotation.

## Stories (depth for the LLM)

### Story 1 — Cutting the AWS bill ~30% in a week

**Situation:** A few months into running on EKS, our monthly AWS bill had crept up to the point where it was a meaningful line item on burn. Nothing was broken, but no one had ever gone back to look at the bill in detail — we'd provisioned for headroom early and never revisited.

**What I did:** I spent about a week treating the bill as a debugging problem. I went through Cost Explorer line by line, cross-referencing against what was actually running in EKS and what Grafana said the workloads were doing. Three things stood out: EKS nodes were sized for peak load that hadn't shown up yet, dev and staging environments were running 24/7 even though no one used them outside business hours, and NAT gateway data transfer was quietly one of our biggest line items because every pod was egressing through it. I right-sized the node groups based on actual Prometheus metrics, scheduled dev/staging to scale down off-hours, and added VPC endpoints for the AWS services we were hitting most often so that traffic stayed inside the VPC instead of going out the NAT.

**Result:** Monthly AWS spend dropped ~30%, with no impact on production performance or developer workflow. More importantly, we set up a habit of reviewing the bill quarterly so it wouldn't drift again.

### Story 2 — Migrating off Firebase + Google Cloud Functions onto AWS

**Situation:** When I joined, Sample Assist was running on Firebase and Google Cloud Functions — Firestore as the database, Cloud Functions for backend logic, Firebase Auth for users, Firebase Storage for files. It had got the product to where it was, but it was running into real walls: Cloud Functions and Firestore limits were starting to bite on certain workflows, the architecture was serverless glue rather than something we could reason about as a system, and data residency for an Australian drug-testing product handling data subject to the My Health Records Act was a question we needed a cleaner answer to than "trust Firebase."

**What I did:** With one other engineer, I planned and ran the migration to AWS over about three months. The target architecture was a deliberate choice: Postgres on RDS instead of Firestore (so the data model could be relational and we could write proper migrations), NestJS services on EKS instead of Cloud Functions (chosen over ECS Fargate because of multi-tenant isolation needs, Helm packaging, and not wanting another single-vendor lock-in), a custom in-house auth service replacing Firebase Auth, and S3 in place of Firebase Storage. We did it in slices rather than a big-bang cutover: data layer first (with a period of dual-writes so we could validate parity), then service-by-service moving logic off Cloud Functions onto containerised backends behind the ALB, then auth last because it was the most user-visible. I owned the data model rebuild and the infra; my colleague owned most of the service-layer rewrites.

**Result:** We landed the full migration in roughly three months with no data loss, validated by dual-write parity checks before each cutover. Worth noting: the product didn't have live users yet at that point, so we were migrating system data and integrations rather than a live customer base — but that was the point of doing it then, before real-world traffic made every migration order-of-magnitude harder. The new architecture gave us a normal relational database to reason about, a proper service boundary per workflow, AWS Sydney for data residency, and the platform foundation that everything since — the launch into clinic customers, the GitOps pipeline, the cost work, the pen test — has built on top of.

### Story 3 — Building the auth service that ties the product suite together

**Situation:** Sample Assist isn't a single app — it's a suite of seven: four mobile apps (collector-assist onsite, collect-assist in-clinic, work-assist, welcome-assist) and three web apps (collection manager, report-assist, online booking). When we replatformed off Firebase, Firebase Auth went with it, and we needed something that could give all seven products a single shared identity for each user. Off-the-shelf options were on the table — Cognito, Auth0 — but neither matched the shape of what we needed cleanly, and we wanted full control over the user model since drug-testing identity has its own quirks across collector, clinic, and admin roles.

**What I did:** Over about 1–2 months I built a NestJS auth service that acts as the single source of identity for the whole suite. Each app authenticates against it, gets a short-lived access token + refresh token pair, and uses the access token as a bearer credential for API calls. The service handles email/password sign-in, Google login, and Apple login (a hard requirement for the iOS apps to pass App Store review), with the social providers mapped onto the same internal user record so a user can sign in any way and land on the same identity. JWTs are signed by the auth service and verified by each downstream backend, which means the apps don't have to talk to auth on every request.

**Result:** All four mobile apps and three web apps now share a single login. A user can move between apps in the suite without re-authenticating, and adding a new app to the suite means wiring it up against one auth service rather than rebuilding identity. The short-lived token + refresh model means a compromised access token has a small blast radius, and rotating signing keys would only require an auth service deploy.

## Stack I actually touched

**Backend:** NestJS (TypeScript) across 20+ services, with shared modules for auth, data access, validation, and observability. Node.js runtime, Postgres via TypeORM, JWT-based auth with OAuth2 flows for Google and Apple sign-in.

**Frontend:** React across the three web apps in the suite (collection manager, report-assist, online booking). I'm not the deep specialist on the frontend, but I touch the React codebase when backend / API changes ripple through.

**Cloud & compute:** AWS (EKS for primary workloads, ECS Fargate for supporting services), VPC networking, ALB via AWS Load Balancer Controller, EKS cluster autoscaler for node provisioning.

**Infrastructure as code:** Terraform for all AWS infrastructure (VPC, EKS, RDS, ElastiCache, IAM, Secrets Manager).

**Delivery:** GitHub Actions for CI (build, test, image push to ECR). Argo CD for GitOps-style deploys to the cluster, with Helm charts as the packaging layer. Fastlane (with Match) for iOS and Android release pipelines on all 4 mobile apps, triggered from GitHub Actions on tag.

**Observability:** Prometheus + Grafana for metrics and dashboards; alerting + on-call rotation built on top.

**Data:** Amazon RDS (Postgres) as primary store, ElastiCache (Redis) for caching/session state, S3 for file storage.

**Platform services:** AWS Secrets Manager for secrets, custom in-house NestJS auth service providing cross-product SSO.

## What I learned here

- **The "build right vs ship now" tradeoff is real, and pre-launch is when you have the most room to choose "build right" — so use it.** Replatforming off Firebase before we had live users was the right call precisely *because* there were no users yet. Once real traffic and customers arrive, the same migration is an order of magnitude harder. Recognizing when that pre-launch window is open, and spending it well, is a skill in itself.
- **Managed services save more operational work than they look like they will on the spec sheet.** Every time I leaned on a managed component (RDS, Secrets Manager, ALB Controller, managed node groups) instead of building or self-hosting an equivalent, I got time back later. The cost premium was almost always cheaper than the engineering attention it would have taken to run it ourselves.
- **Kubernetes is the right answer less often than people think, and that's fine to say out loud.** EKS was right for Sample Assist because of multi-tenant isolation and portability, but I now think much harder before recommending it for smaller-scope products where ECS Fargate or even App Runner would carry the team further with less ongoing tax.
- **Build your own auth service only when the off-the-shelf options don't fit the shape of your product.** Running auth for seven apps in one suite is the kind of case where in-house wins — but I would not default to it for a single-app startup. The maintenance cost is real and the security responsibility is permanent.
- **Leading engineers without formal authority is mostly about being the person who writes things down.** The standards I set — NestJS conventions, Terraform layout, Helm chart structure, code review norms — landed not because I had a title, but because they were documented, defensible, and consistent. Mentoring 3 engineers through a system I built taught me that "tech lead" is a posture you earn by being useful, not a position you're handed.
- **Managing up to a non-technical CEO means translating tradeoffs into business terms before they ask.** Saying "this will save us ~30% on the AWS bill" lands differently than "I want to right-size our node groups." Same work, different framing.

## What I'd do differently

- **Write runbooks and docs from day one, not as a Phase 2.** I told myself I'd document the platform once it stabilised; what actually happened is that the platform never quite stabilised, and onboarding new engineers cost me more 1:1 time than writing the docs would have. The cheapest time to document a system is while you're building it.
- **I over-engineered parts of the platform early** — particularly around abstractions in Terraform and Helm that anticipated scale we didn't reach for a long time. A flatter, more boring setup would have been easier for the next engineer to read, and could have been refactored later when the actual usage patterns showed up. I now default to writing the obvious thing first.
- **I'd push back harder on product asks that didn't fit the architecture cleanly.** A few times I absorbed complexity into the backend that would have been better handled by saying "this isn't ready yet" or "we should do this differently." Healthy pushback is part of the tech lead role; I learned that slower than I'd like.