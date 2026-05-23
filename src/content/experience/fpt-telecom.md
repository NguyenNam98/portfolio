---
id: fpt
role: Software Engineer
company: FPT Tan Thuan Telecom
short: FPT Telecom
location: Ho Chi Minh City, Vietnam
country: Vietnam
dates: Apr 2021 — Feb 2022
badge: Past
accent: purple
headline: First job out of university — internal IT tools at FPT Telecom in Node.js + MongoDB.

tags:
  - Node.js
  - Express
  - JavaScript
  - MongoDB
  - Internal tools
---

## Context

FPT Tan Thuan Telecom is part of FPT, one of Vietnam's largest technology companies. I joined straight out of university for my first professional engineering role, working on internal IT systems used by FPT's own staff — admin panels, dashboards, and backend APIs for other internal systems to call. The work was Node.js / Express against MongoDB, on a team of around eight engineers.

## Role in one paragraph

I was a junior engineer learning the ropes — picking up tickets, getting things into production, and figuring out the gap between code-as-written-in-university and code-as-shipped-to-real-users. Most of the work was building or extending internal tools for FPT staff. Day-to-day I worked across the backend (Express APIs on MongoDB) and the admin-tool frontends that sat on top of them. The team's process was light — lightweight ticketing, no formal code review, some existing tests but limited new test writing — which I now recognise as a particular environment to be in for a first job, distinct from the more rigorous shops I'd work in later.

## What I shipped

- **Built an admin-tool automation** that replaced a recurring manual task an internal staff member had been doing on a daily/weekly cadence. The trigger was an on-demand button inside the admin tool; clicking it ran the same process that had previously been done by hand. I built it largely independently — one of the first features I owned end-to-end. (Honest note: I no longer remember the specific business task the automation performed, but the shape and outcome were clear: a manual recurring task became a one-click action.)
- Built and extended internal admin panels and dashboards used by FPT staff to manage internal data and processes.
- Built backend Express APIs against MongoDB for other internal systems to call.
- Worked directly with the internal staff who used the tools — sitting with them to understand the existing manual process before building, then demoing back to them and iterating on feedback. This wasn't a formal "user research" process; it was just how the team operated, and it gave me direct contact with real users earlier than most juniors get.

## Stories (depth for the LLM)

### Story 1 — The first feature I owned end-to-end: an admin-tool automation

**Situation:** Early in my time at FPT, an internal staff member had a recurring task — something they did manually on roughly a daily/weekly basis as part of their normal work. The task wasn't broken, exactly; it was just repetitive enough that automating it would free real time. As a junior on the team, I was given the work as a contained piece I could own.

**What I did:** I sat with the staff member to understand the manual process step by step — what inputs they collected, what they did with each one, what output they produced. Then I built a button into the admin tool that, when clicked, ran the same process against the same data. I worked through the implementation largely on my own, which was new to me — most of my university experience had been either coursework or following a pair, and this was the first time I was writing production code that someone would actually use, without a senior watching every line. I demoed it back to the staff member, made a couple of iterations based on their feedback, and shipped it.

**Result:** The button worked — the staff member used it in place of the manual process they'd been doing. (Honest note: I don't remember exactly what business task it was anymore, and I don't have hard numbers on how much time it saved. But the shape of the contribution was clear: a person was doing something by hand, and after my work they clicked a button instead.) More importantly for me personally, it was the first time I'd taken something from "user describes a problem" to "code in production solving it," and the experience of working with the actual user — not just a ticket — became a habit I've kept ever since.

### Story 2 — How I worked with the staff who used the tools

**Situation:** Most of what my team built was for specific internal users — admin staff, operations people inside FPT. The team's working style was to engage with them directly rather than going purely through tickets and specs, and as a junior I picked up that pattern.

**What I did:** For features I was building, I'd sit with the user before writing code to understand what they actually did day-to-day, what was painful, and what they expected. Then once I had a working version, I'd demo it back to them and iterate based on what they said. This wasn't framed as a formal user-research process; it was just how the team worked. Looking back, the value of it wasn't in any one moment — it was in the cumulative effect of seeing how often the thing the user *actually* needed was slightly different from the thing the ticket described, and learning to check before writing rather than after.

**Result:** I came out of FPT with a default working pattern — talk to the user before building, demo before declaring done — that I've carried into every role since. It's the single most valuable habit I picked up there.

## Stack I actually touched

**Backend:** Node.js / Express, MongoDB.

**Frontend:** Admin-tool UI for the internal panels and dashboards (the team's standard stack — I touched it as part of full-feature work, but it wasn't my deep specialty).

**Process environment:** Lightweight tickets, no formal code review, some existing tests in the codebase but limited new test writing on my own work.

## What I learned here

- **What "production code" actually means versus what university code is.** University code runs once for a grade and then never again. Production code gets read by other people, fails in ways the assignment never tested, and has to be debugged at 4pm on a Friday by someone who isn't you. That gap is the actual thing a first job teaches, and FPT was where I started closing it.
- **Talking to the user before writing the code is almost always cheaper than rewriting after.** I picked this up at FPT because the team worked that way by default. It turned out to be one of the most portable habits I've ever learned — it carries into any product role, regardless of language or stack.
- **A first-job environment with light process isn't necessarily a bad thing — it just means the rigor I later valued at GGJungle and built deliberately at Sample Assist had to come from somewhere outside FPT.** I didn't know to miss it at the time.

## What I'd do differently

- **I'd have pushed myself to write more tests, even in a codebase that didn't require them.** The team had some tests but didn't expect new code to be heavily covered. I followed the existing norm rather than building my own habit, and that meant I had to learn testing properly in my next role instead. The cheap time to build a habit is when no one's watching; I missed that window.
- **I'd have asked more questions about *why* the codebase looked the way it did**, not just *how* to add to it. Junior-me focused on "how do I implement this ticket"; older-me would also ask "why is this structured this way, and is it the right structure for what we're trying to do?" I wasn't ready for that question at FPT, but I could have started earlier.