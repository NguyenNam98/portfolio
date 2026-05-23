---
slug: off-hours-scheduler
title: Scheduling RDS + ECS off-hours
agent: nam-finops
substrate: aws
status: draft
tags: [aws, rds, ecs, cost-optimization, lambda]
---

# Scheduling RDS + ECS off-hours

> **Draft.** Full version coming day 2-3.

## The line item

Dev and staging databases running 24/7 are paying you to wait. Nobody
queries them between 9pm Sydney and 8am Sydney. Same for the ECS dev
cluster.

_TODO: actual hourly cost of an `db.t3.medium` &times; 24 &times; 30
vs the same instance running 11h/day on weekdays only._

## What I considered

1. AWS Instance Scheduler (official, CloudFormation-based, opinionated)
2. In-house Lambda + EventBridge (simple, owns its own state)
3. Just stop them manually (works for a week, then drift)

_TODO: explain why I went with option 2 and what I'd do differently now._

## The timezone bug

_TODO: the actual story of forgetting that the Lambda was running in
UTC but the team was in AEDT, and what got noticed when nobody could
log in on a Monday morning._

## The holiday edge-case

_TODO: ANZAC Day / Christmas / Easter and the "should the dev DB even
exist on a public holiday" decision._

## The numbers

_TODO: real before/after from the bills. Note that the savings here
were the second-biggest individual win on the bill, after `fck-nat`._

## What this scales to

_TODO: same scheduler pattern applied to ECS tasks (drain non-prod
clusters off-hours), then to the bastion EC2, then to the Glue jobs._
