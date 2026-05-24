import type { Company } from './_types'

export const acme: Company = {
  slug: 'acme',
  displayName: 'Acme Robotics',
  role: 'Senior Platform Engineer',
  heroGreeting: "Hi Acme team — here's why this fits.",
  keywords: [
    'terraform',
    'eks',
    'kubernetes',
    'argo cd',
    'gitops',
    'prometheus',
    'grafana',
    'observability',
    'aws',
    'rds',
  ],
  whyFit: [
    {
      point: 'EKS + Terraform in production, not toy projects',
      detail:
        'I own the prod EKS stack at Sample Assist — Deployments, Helm, Argo CD GitOps — and the entire AWS footprint as Terraform (EKS, RDS, ElastiCache, ALB, Route 53, VPC, IAM).',
    },
    {
      point: 'Zero-downtime migrations under load',
      detail:
        'Moved 100+ tables from Firebase to RDS Postgres with a dual-write window + shadow reads — no incident, no rollback.',
    },
    {
      point: 'Observability built from scratch',
      detail:
        'Stood up Prometheus + Grafana with dashboards, alerts, and on-call runbooks. The team went from "is it down?" to paged-and-fixed.',
    },
  ],
  jdText: `Senior Platform Engineer · Acme Robotics

About the role:
Acme Robotics is hiring a Senior Platform Engineer to own our production Kubernetes
infrastructure end-to-end. You'll lead the platform that ships our perception and
control workloads to dozens of fleet sites, with strong observability and zero-downtime
release practices.

You will:
- Operate production EKS clusters running ~30 services
- Own Terraform for the entire AWS footprint (VPC, IAM, RDS, ElastiCache, ALB)
- Build out our Argo CD GitOps pipeline and developer self-service flows
- Run Prometheus + Grafana, define SLOs, lead incident response and post-mortems
- Mentor a small team of engineers on platform best practices

Requirements:
- 5+ years operating production Kubernetes (EKS preferred)
- Deep Terraform experience in a real production environment
- Strong observability background (Prometheus, Grafana, structured logging, on-call)
- Experience leading non-trivial migrations or platform rebuilds
- Comfort working across backend (Node.js / Go), CI/CD, and AWS services

Nice to have:
- Prior Firebase / Cloud Functions to AWS migration experience
- Helm, ingress controllers, IAM least-privilege design
- Mentorship or tech lead experience`,
}
