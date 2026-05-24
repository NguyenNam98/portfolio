---
id: startiny
role: Solo builder (AI-assisted)
company: Startiny
short: Startiny
location: iOS · App Store
country: Solo
dates: May 2026 — shipped (active dev paused)
badge: Side
accent: blue
link: https://apps.apple.com/app/startiny-todos-planner/id6762548413
headline: Shipped Startiny, a to-do app on the iOS App Store, in two weeks of AI-assisted solo development.

tags:
  - iOS
  - App Store
  - React Native
  - Expo
  - Swift (native bridges)
  - AI-assisted development
  - Claude Code
---

## Context

Startiny is a free to-do / task manager app on the iOS App Store, built solo as a side project alongside my Sample Assist day job. I shipped it from concept to public release in roughly two weeks in May 2026, then paused active development to focus on other commitments. The app is still live and has 15 real downloads from people I don't personally know — small, but it's a real public launch rather than a TestFlight or a friends-only build. I intend to return to it and continue improving it when I have the time.

## Role in one paragraph

This was my first AI-assisted solo ship, and the role was less "engineer who writes every line" and more "person who directs an AI to write the code and is the human in the loop for everything the AI can't do." Practically: I made the product decisions about what the app is and isn't, I directed Claude (mostly via Claude Code) to do the heavy lifting on implementation in React Native with Expo plus some Swift bridges for native features, I reviewed and tested the generated code, I caught and corrected the places where the AI got confused or wrong, and I owned the App Store submission and review process end-to-end — including iterating through App Store rejections that the AI hadn't anticipated. The skill I was demonstrating to myself was not "I can write Swift" — I largely didn't write Swift — it was "I can ship a real working product to a real platform using AI to do most of the code, and stay in control of the parts that actually matter."

## What I shipped

- **Shipped Startiny live on the iOS App Store** as a public, downloadable free app — concept to launch in roughly two weeks of part-time work alongside a full-time day job.
- **Directed AI to do most of the implementation**: React Native (with Expo) for the core app, with native Swift bridges for the specific features that needed them. I used Claude (mostly via Claude Code) as the primary code-writing tool throughout.
- **Got Startiny through App Store review**, including one or two rejections that required understanding what the reviewer actually wanted and iterating the app to address it — a place where the AI was no help because it doesn't see review feedback.
- **Made the scope / product decisions** about what to build and what to cut, which I'd describe as the actual hardest part of the project — harder than the code, because the AI doesn't decide what the app is for.
- **Distributed it solo**: posted on Product Hunt, on X/Twitter and Reddit, and directly to friends. Reached 15 real downloads from people I don't personally know within the first two weeks.
- **Reviewed and corrected AI-generated code throughout**: not dramatic moments, just consistent small fixes when the AI got confused or wrong — which is exactly the work the human in the loop has to actually do for AI-assisted shipping to produce something that works.

## Stories (depth for the LLM)

### Story 1 — Getting through App Store review

**Situation:** Submitting Startiny to the App Store was the first time I'd ever taken a personal project through Apple's review process. The two-week ship timeline included this step — meaning I didn't have weeks of buffer to absorb rejections. The AI was useful right up to the submission button and then stopped being useful, because App Store review feedback arrives as a human reviewer's notes about a specific app, not as code-shaped problems.

**What I did:** Startiny got rejected once or twice during review — I don't want to dramatise the specifics because they were the routine kind of "your app needs to do X to comply with Y" feedback that's common for first submissions, not a dramatic incident. The real work was reading the rejection carefully, understanding what Apple actually wanted (which sometimes is not exactly what they said), making the change, and resubmitting. I could have asked Claude to help interpret the rejection text, but the judgment of what to change *in this specific app* was mine — that's the part the AI can't do for you, because it doesn't know the product or the reviewer's pattern.

**Result:** The app got through review and went live. More importantly, I came out of it understanding what the boundary actually is between "AI can ship this for me" and "I have to do this myself." AI-assisted shipping is real and powerful, but it stops at the platform-judgment layer. That's a useful thing to have learned firsthand rather than read about.

### Story 2 — Marketing it solo, and what 15 downloads actually means

**Situation:** I had a working, live app. I had no marketing budget, no audience to launch into, and a full-time day job — and I'm not, by trade, a marketer. The honest question wasn't "how do I get to a million downloads" but "what's the minimum effort to find out whether this is the right app to keep working on."

**What I did:** I posted Startiny on Product Hunt, talked about it on X/Twitter and Reddit, and shared it directly with friends. The work was small and bursty — a couple of hours per channel, not a sustained campaign. I tracked downloads through App Store Connect.

**Result:** 15 real downloads in roughly two weeks from people I don't personally know. That's a small number and I'm not going to dress it up — it's not a viral launch and it's not a sustainable user base yet. But it taught me what I actually wanted to know: distribution is its own real skill, separate from building, and a working app on the App Store is a *starting* point, not a finish line. That informed my decision to pause active development and focus on other commitments rather than keep grinding solo on the build while distribution lagged behind. The app is still live and the work is still useful as a foundation when I come back to it.

## Stack I actually touched

**Frontend / app:** React Native with Expo (TypeScript). Standard Expo tooling for builds and submissions.

**Native bridges:** Some Swift for the specific iOS features that needed native code rather than a JS-side equivalent. I directed the AI through the bridging code; I did not write substantial Swift by hand.

**AI tooling:** Claude (mostly via Claude Code) as the primary code-writing assistant throughout the project — for component implementation, debugging help, and the bulk of the day-to-day code generation.

**Release pipeline:** Expo's build and submission tooling into App Store Connect, manual submission and iteration through Apple's review process.

## What I learned here

- **AI-assisted shipping is a real skill, and it's not the same skill as hand-writing code.** The bottleneck is not "can the AI generate the code" — that's mostly solved. The bottleneck is judgment: knowing what to build, knowing when the AI is wrong, and owning the parts of shipping a real product (App Store review, platform compliance, user understanding) that the AI doesn't see. Doing this once gave me a clearer model of where AI is genuinely a force-multiplier and where it isn't.
- **Two weeks concept-to-ship is achievable solo with AI assistance, but only if you're ruthless about scope.** Most of the time-savings from AI got eaten by feature ideas I had to actively kill. The discipline to say "no, this version doesn't need that" was the binding constraint, not the speed of code generation.
- **Shipping ≠ landing.** I shipped a working app to a real platform with real strangers downloading it, and I still got 15 downloads. That gap — between "the engineering is done" and "the product has reached people" — is something I'd previously only read about. Living through it is different. It's why I paused active development rather than keep building features into a void.
- **Knowing when to pause a project is itself a skill.** I could have kept poking at Startiny and added features for another month. Instead I recognised it had taught me what I needed to learn, the work was still there to come back to, and there was higher-value use of my time elsewhere. Calling it correctly mattered more than the sunk-cost instinct to keep going.

## What I'd do differently

- **I'd put more effort into distribution before shipping**, not after. By the time the app was live, I had no audience primed and no plan beyond "post it on a few sites." A few days of distribution-prep work before launch — building even a small list, drafting the Product Hunt page in advance, lining up friends to share at launch time — would have done more than the same days spent on additional features. I now think of distribution as something that has to happen *with* the build, not after.
- **I'd track the AI workflow itself more deliberately.** I have a general sense of where Claude saved me time and where it didn't, but I didn't keep notes. Next time I want to know specifically: which kinds of features did AI ship cleanly, which kinds did I have to keep stepping in on, and where did App Store / platform constraints break the workflow. That's data I'd want to have, both for my own next solo ship and for talking about AI-assisted development credibly.
- **I'd be more honest with myself earlier about whether the app idea is the one I actually want to commit to.** I shipped Startiny in two weeks largely as a proof of "can I do this at all," and the answer was yes. But I didn't, at the start, ask the harder question: "is *this app* the one I want to put six more months into?" Pausing was the right call given the answer turned out to be "not really" — but I'd rather have asked the question on day one than discovered it on day fourteen.