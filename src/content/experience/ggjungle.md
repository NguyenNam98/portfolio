---
id: ggjungle
role: Backend Engineer
company: GGJungle VN
short: GGJungle
location: Ho Chi Minh City, Vietnam
country: Vietnam
dates: Mar 2022 — Jun 2023
badge: Past
accent: mint
headline: Backend engineer on a Japanese e-commerce platform; owned the modules that opened the Vietnamese market.

tags:
  - NestJS
  - Node.js
  - TypeScript
  - PHP
  - MySQL
  - VNPAY
  - AWS (deploys)
  - Docker
  - ReactJs
---

## Context

GGJungle VN is the Vietnam office of a Japanese parent company. I worked there for 15 months on a single product the whole time: a Japanese e-commerce platform with end users in Japan, built in NestJS / Node.js against MySQL. About nine months in, the product began expanding into Southeast Asia — including Vietnam — and the Vietnam office's role shifted from pure development support to actively building the features needed for the local market.

## Role in one paragraph

I was a backend engineer in a codebase I didn't architect, working across whatever tickets came up against the product roadmap. The work was a mix of routine backend tasks — order and checkout features, admin tools, database changes — and, in the second half of my time there, two pieces of work that were entirely mine: the Coupon module (designed and integrated into the existing cart/checkout flow), and the VNPAY integration that unlocked the Vietnamese market. I touched AWS only at the deploy level; the cloud architecture was owned by other people.

## What I shipped

- **Owned the VNPAY integration end-to-end** as part of the product's Southeast Asia expansion: hosted-page redirect flow with webhook callbacks, plumbed into the existing checkout, with sandbox testing before going live. Took about 1–2 months working with a frontend developer.
- **Designed and built a new Coupon module** from scratch — database schema, NestJS service, and integration into the existing cart/checkout codebase someone else had written. Supported percentage and fixed-amount discounts, free-shipping coupons, expiry dates, and per-coupon and per-user usage limits. About a month of work.
- Contributed across the broader backend for 15 months — NestJS / TypeScript services AND production PHP feature work against MySQL — on order and checkout flows, admin tooling, and ongoing data model evolution.
- Worked inside a Japanese-organisation engineering process: detailed specs as the source of truth, careful code review, and documentation standards higher than I'd worked to before. The work itself was in English, but the documentation and review discipline were noticeably more rigorous than the smaller-team environments I'd been in previously.

## Stories (depth for the LLM)

### Story 1 — Owning the VNPAY integration for the Vietnam market expansion

**Situation:** The product had been a Japanese-only e-commerce platform for the first part of my time there. In the last six or so months of my role, the company decided to expand into Southeast Asia, with Vietnam as one of the first markets. That meant adding a Vietnamese payment method — VNPAY, the dominant domestic gateway — to a checkout that had only ever talked to Japanese payment infrastructure. I was the natural person to own the integration: I was at the Vietnam office, I read the VNPAY documentation in Vietnamese without needing translation, and the payment-side of the codebase already had some seams I'd been working around.

**What I did:** I worked through the VNPAY integration with a frontend developer over about 1–2 months. The flow is the standard VNPAY pattern: the user hits checkout, our backend creates an order in pending state and redirects them to VNPAY's hosted payment page, and once they complete (or cancel) the payment, VNPAY sends a callback to our server with the result. The work was less about clever code and more about getting the boring details right: making sure the order state machine handled the redirect-and-return flow correctly, validating callbacks before trusting them, and testing thoroughly against VNPAY's sandbox before pointing it at production. I also documented the integration well — that was a habit I'd picked up working inside the Japanese-company engineering process, and it served me here.

**Result:** The integration shipped on time for the Vietnam market launch and ran in production for the rest of my time at the company. Beyond the technical result, the project was the clearest case in my role where being a Vietnamese engineer at a Japanese company actually delivered value beyond translation — I owned a feature that the Japan team couldn't have built as easily, and that's a useful pattern to recognise about myself.

### Story 2 — Building the Coupon module inside an existing checkout codebase

**Situation:** The product needed coupons — percentage discounts, fixed amounts, free shipping, expiry dates, per-user usage limits. There was no coupon system at all. The complication wasn't the business logic itself, which is fairly standard e-commerce territory; it was that the cart and checkout code was already in production, already complex, and not something I had written. Adding a feature that needed to cleanly modify cart totals at the right point in the order pipeline — without breaking anything that already worked — was the actual job.

**What I did:** I spent about a month on it end-to-end. I started by reading the existing cart/checkout flow carefully, mapping where prices were calculated, where taxes applied, and where the natural insertion point for a discount step would be. Then I designed the database schema (coupons, redemptions, per-user limits) and built the NestJS service against it. The integration into the checkout was deliberately surgical: I picked the smallest seam I could change rather than refactoring around it, and I leaned on the existing test patterns so the surrounding code's behaviour stayed verified. I wrote the spec the way the Japanese engineering process had taught me — detailed, reviewed before implementation — which made the code review much smoother when it came.

**Result:** The coupon module shipped without breaking the existing checkout, which was the real success criterion. It's the piece of GGJungle work I'm most willing to stand behind technically: not because it was clever, but because adding a feature to a codebase someone else built without leaving a mess is a skill, and I think I did it cleanly.

## Stack I actually touched

**Backend:** NestJS / TypeScript / Node.js as the primary stack, MySQL via the project's ORM, working in an existing service-oriented backend codebase. The product also had a PHP side, and I shipped production feature work in it alongside the NestJS services — I'm comfortable in PHP itself, not specifically Laravel (I'd flag Laravel as "ramp on the job" rather than claim it).

**Payments:** Konbini (Japanese convenience-store) and bank transfer payments were already part of the product when I joined — I worked on order/checkout code that interacted with them rather than building the integrations themselves. VNPAY (hosted page + webhook flow) I owned end-to-end.

**Cloud / deploys:** AWS at the deploy level — pushing to environments other people had set up. EC2-based deployment, Docker for containerisation, but the cluster and infrastructure were owned by other engineers, not me.

## What I learned here

- **Working inside a Japanese-organisation engineering process raised my baseline for what "rigorous" means.** Detailed specs, careful code review, heavier documentation expectations, and a slower-but-more-thorough decision-making tempo were all noticeably more rigorous than what I'd worked to before. I now reach for the spec / doc step earlier in projects than I used to, even when no one's asking me to.
- **Cross-cultural communication is mostly about how you ask questions, not what language you ask them in.** Day-to-day work was in English, so the "cross-cultural" piece wasn't really about Japanese. It was about learning to ask questions more precisely, to confirm understanding back rather than assume, and to bring proposed answers rather than open-ended questions where possible. Those are habits I still default to.
- **Adding features to a codebase you didn't write is a skill in itself, and worth taking seriously.** The Coupon module taught me that the work in those situations is mostly *reading* — understanding the existing seams and the implicit contracts in the surrounding code — rather than *writing*. The cleanest changes are usually the ones that touch the fewest places.

## What I'd do differently

- **I'd have engaged more with the cloud / infrastructure side earlier than I did.** I treated AWS as someone else's responsibility for most of my time at GGJungle, and only used it at the deploy level. By the end of the role I was curious about it but hadn't pushed to take any of it on. That curiosity is what drove me to the next role where I built the platform from scratch — but I left some learning on the table at GGJungle by not pushing for it sooner.
- **I'd document my own modules more proactively, not just to the standard the team required.** The Japanese-process documentation I learned to write was for specs *before* code. Documenting the code I'd actually shipped — the architectural decisions inside the Coupon module, why I picked the integration seam I picked — would have made it easier for the next engineer (and for me, now, writing this up).