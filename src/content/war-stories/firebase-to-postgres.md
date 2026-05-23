---
slug: firebase-to-postgres
title: Firebase to Postgres, 100+ tables, zero downtime
agent: nam-infra
substrate: aws
status: draft
tags: [migration, postgres, firebase, aws, rds]
---

# Firebase to Postgres, 100+ tables, zero downtime

> **Draft.** Full version coming day 2-3.

## The trigger

The serverless Firebase backend hit several limits at once: query cost,
schema rigidity, the inability to do real joins, and a security review
that flagged how Firestore rules were managing access. Migration was
not optional.

_TODO: open with the moment a single query cost more than the EC2
instance that would have replaced the whole stack._

## The shape of the problem

100+ Firestore collections to map to Postgres tables. Nested document
shapes that didn't fit relational rows cleanly. Half the collections
had subcollections that needed flattening, the other half had implicit
foreign keys hiding in document IDs.

_TODO: the actual table count and which collections had the most
violent shape mismatch._

## The strategy: dual-write window

_TODO: full breakdown of the dual-write pattern &mdash; writes go to
both Firestore and Postgres during the migration window, reads start
on Firestore and shift to Postgres after backfill verification._

## The backfill

_TODO: the ETL approach, the row-count verification, the floats vs
decimals issue, the timestamp timezone issue._

## The 3am bug

_TODO: the actual production bug at cutover that nobody on the team
had predicted. The exact log line. The exact fix._

## The numbers

_TODO: 200% perf improvement is the headline. Breakdown by query
class. Cost delta. Security-review verdict._

## What I'd do differently

_TODO: pick this apart honestly. The shadow-read verification phase
was too short. The fallback runbook had a step that would have
failed at 3am if we had needed it._
