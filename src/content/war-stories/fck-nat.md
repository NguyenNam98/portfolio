---
slug: fck-nat
title: NAT Gateway to fck-nat
agent: nam-finops
substrate: aws
status: draft
tags: [aws, networking, terraform, cost-optimization]
---

# NAT Gateway to fck-nat

> **Draft.** Full ~2000-word version coming day 2-3. This file holds the
> structure so retrieval has chunks to index against when the RAG pipeline
> comes online on day 6-9.

## The line item

The AWS bill arrived. The biggest item under "VPC" was a NAT Gateway
sitting there at $128/month and growing with egress. Two NAT Gateways
across AZs would be worse. The traffic shape didn't justify it.

_TODO: open with the bill screenshot moment. Why was I looking at the
VPC subtotal in the first place?_

## The trade-off space

Three real options on the table, not just NAT Gateway vs none:

1. **AWS NAT Gateway** &mdash; the default, $0.045/hour + $0.045/GB.
2. **Self-managed NAT instance** &mdash; an EC2 with IP forwarding.
   Cheap but DIY ops.
3. **`fck-nat`** &mdash; an open-source AMI that does (2) but properly,
   with HA via ASG and t4g.nano running ARM.

_TODO: explain why VPC peering / VPC endpoints didn't fit the workload
shape. Egress was mostly to S3 + third-party APIs, not other VPCs._

## The deployment

_TODO: show the actual Terraform diff in unified-diff format
(red NAT Gateway, green fck-nat module). Note the `t4g.nano` choice
(cheapest viable ARM instance) and why we didn't use t4g.micro._

## The bug

_TODO: the egress shaping issue / the IMDSv2 misconfiguration / the
exact symptom + log line + fix. This is the part nobody else writes._

## The numbers

_TODO: real before/after dollar amounts from the actual bills,
egress GB shape, the AZ split. Will fill in from production data
when writing this for real._

## What I'd do differently

_TODO: at higher egress volumes, NAT Gateway is actually cheaper than
fck-nat because the $0.045/GB delta inverts when you cross ~X GB/month.
Document the inflection point so this isn't a one-size-fits-all rec._

## See also

- The off-hours scheduler story (same FinOps muscle, different line item)
- The Firebase &rarr; Postgres migration (different substrate, same lens)
