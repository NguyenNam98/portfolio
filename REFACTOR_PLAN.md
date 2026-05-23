# Refactor Plan — Chat-Driven Portfolio (DigiWize)

Date: 2026-05-23
Source design: `design/` (Babel-standalone JSX prototype, light-themed,
DigiWize tokens lifted from Figma 2026-04).
Target stack: keep current — Vite + React 19 + TS + Tailwind v4 + Hono on
Cloudflare Pages + `@anthropic-ai/sdk`. No infra change.

---

## 1. The big bet

Throw out the static section-scroll site (Hero / About / Work / Skills /
Footer) and replace it with a **two-state app**: hero landing → chat thread.
Recruiters land, paste a job description (or click a quick-action chip),
and "Nam" replies in rich content blocks — skills card with project
provenance dots, animated project showcase with metric tiles, 30-sec pitch,
and the killer feature: a Claude-powered **JD match analyzer** that returns
a score, reasons, mapped skills/projects, and an honest gap statement.

Visually: light theme, Hanken Grotesk + Geist Mono, rose accent (#e04c71),
rotating asterisk watermark, skills marquee, animated counters, typing
indicators. **DevOps-engineer positioning** (currently the site is mixed
DevOps + fullstack + iOS — we sharpen to one identity per the new copy).

---

## 2. What's new vs what's shipped today

| Area | Current v1 (live) | New design |
|---|---|---|
| Theme | Dark neutral (Tailwind) | Light DigiWize tokens (dark mode supported but not default) |
| Fonts | system mono + sans | Hanken Grotesk + Geist Mono + IBM Plex Mono |
| Accent | none | Rose `#e04c71` |
| Layout | Scrolling sections | Two views: `hero` (landing) → `chat` (after first interaction) |
| Hero | Static intro + embedded chat | Big "NAM NGUYEN." headline + cycling tagline + composer + chips + marquee |
| Content delivery | Static markup (About / Work / Skills sections) | All content delivered as chat replies (rich React blocks) |
| Chat | Single-turn streaming text | Multi-bubble thread (hr/nam sides), typing dots, followup chips, rich content payloads |
| JD analyzer | None | Modal → POST to backend → JSON match card with animated ring (0-100) |
| Positioning | Mixed (DevOps + fullstack + iOS) | DevOps-first ("DevOps Engineer · 5+ yrs · Sydney") |
| Phone | not shown | `0492 911 759` shown in profile rail |
| Profile rail | none | Optional left sidebar in chat view (default hidden per design defaults) |

---

## 3. Target architecture

```
public/
  fonts/
    HankenGrotesk-VariableFont_wght.ttf       (copy from design/fonts/)
    HankenGrotesk-Italic-VariableFont_wght.ttf
  favicon.svg                                  (keep)
  og.png                                       (regenerate — light theme now)

src/
  App.tsx                                       (rewritten: hero|chat state machine)
  main.tsx                                      (unchanged)
  index.css                                     (DigiWize tokens + keyframes + Tailwind)
  data/
    profile.ts                                  (PROFILE, SKILL_GROUPS, PROJECTS, PITCH, EDUCATION)
    prompts.ts                                  (JD_SYSTEM_PROMPT, QUICK_ACTIONS, FOLLOWUPS)
  components/
    NamGlyph.tsx
    TypingDots.tsx
    Bubble.tsx
    ChipRow.tsx
    JDModal.tsx
    ProfileRail.tsx
    hero/
      Hero.tsx
      StatusPill.tsx
      LiveClock.tsx
      CyclingTagline.tsx
      AsteriskBg.tsx
      SkillsMarquee.tsx
    chat/
      ChatView.tsx
      MessageList.tsx
    cards/
      SkillsCard.tsx          (with project-filter, provenance dots)
      ProjectsShowcase.tsx    (tabs + spotlight + animated metric tiles)
      ProjectCard.tsx         (dense variant used inside JDMatchCard)
      PitchCard.tsx
      JDMatchCard.tsx
      MatchRing.tsx
      MetricTile.tsx
      AnimatedMetricValue.tsx

functions/
  api/
    [[catchall]].ts                             (extend: keep /api/chat, add /api/jd-match)
```

**Deliberately dropped** from prototype:
- `tweaks-panel.jsx` — author tool, not for production
- Theme/accent/persona toggles — pick one (light + rose + first-person) and ship
- `window.claude.complete` — already have Hono+SDK backend; route through that

---

## 4. Backend changes (functions/api/[[catchall]].ts)

Two endpoints behind the same KV-backed per-IP daily rate limit:

### A) `POST /api/chat` (existing — refactor)
- Keep streaming SSE for free-text questions.
- Update `SYSTEM_PROMPT` to **DevOps-first positioning** matching `data/profile.ts`.
- Accept multi-turn `{ messages: [{ role, content }] }` instead of single `{ question }`. (Optional — single-turn is fine for v2; multi-turn defers if scope tight.)
- Keep prompt caching on the system block.

### B) `POST /api/jd-match` (NEW)
- Non-streaming. Single completion, parse JSON, return.
- Body: `{ jd: string }` (cap 8KB)
- Returns: `{ match: 0-100, headline, reasons[{point,detail}], relevantSkills[], relevantProjects[], gaps, closer }`
- System prompt: `JD_SYSTEM_PROMPT` from `data/prompts.ts` (lifted from `design/responses.jsx:226`)
- Rate-limited via same KV (`rl:YYYY-MM-DD:IP`). JD calls count as 2 (they're heavier).
- Returns `429` w/ `{ message }` when over limit. Returns `400` on JD too short / parse failure with a useful message the UI can show.

### Rate limit changes
- Bump `CHAT_DAILY_LIMIT_PER_IP` to 40 to absorb JD analyses.
- Add `CHAT_MAX_INPUT_CHARS` for `/api/chat` (already exists, 500). Add `JD_MAX_INPUT_CHARS=8000` for `/api/jd-match`.

---

## 5. Migration phases

Sequenced so the site stays buildable after each phase. Phase 1 lays
foundations; phases 2-4 build components in dependency order; phase 5
flips the App.tsx; phase 6 polishes.

### Phase 1 — Design system foundation (~15 min)
- [ ] `cp design/fonts/*.ttf public/fonts/`
- [ ] Replace `src/index.css`: keep `@import "tailwindcss"`, append all
  `:root` CSS variables from `design/tokens.css`, all `@keyframes`, the
  `[data-theme="dark"]` block. Drop the existing `@theme` override.
- [ ] Update `<html data-theme="light">` in `index.html`.
- [ ] Update `<title>` and meta description for chat portfolio framing.
- [ ] Verify dev server renders with new fonts (no Tailwind class breakage).

### Phase 2 — Data layer (~20 min)
- [ ] Create `src/data/profile.ts`:
  - `PROFILE` (add fullName, phone, github, yearsExp, available, currentlyAt)
  - `SKILL_GROUPS` — new schema: `{ label, accent, items: [{ name, projects: [id] }] }`. Lift from `responses.jsx:18`.
  - `PROJECTS` — new schema: `{ id, role, company, short, location, dates, accent, badge, headline, metrics[{value,label,caption}], impact[], tags[] }`. Lift from `responses.jsx:104`.
  - `PITCH` — `{ headline, points: [{k, v}] }` from `responses.jsx:205`.
  - `EDUCATION` from `responses.jsx:199`.
- [ ] Create `src/data/prompts.ts`:
  - `QUICK_ACTIONS`, `FOLLOWUPS`, `JD_SYSTEM_PROMPT` lifted from `app.jsx:4` and `responses.jsx:226`.
- [ ] Typed exports (strict TS) — `as const` on tuples, no `any`.

### Phase 3 — Backend (~30 min)
- [ ] Refactor `SYSTEM_PROMPT` in `functions/api/[[catchall]].ts` to import from a shared facts source (inline the relevant subset — DevOps-positioned, drops "Solo iOS shipper" as the lead and uses it as a side-project note).
- [ ] Add `/api/jd-match` route — see §4 spec.
- [ ] Update wrangler.toml: `CHAT_DAILY_LIMIT_PER_IP=40`, add `JD_MAX_INPUT_CHARS=8000`.
- [ ] Local test: `pnpm dev:pages`, curl `/api/jd-match` with the `sampleJD` from `app.jsx:41`. Verify it returns valid JSON in <8s.

### Phase 4 — Atoms & molecules (~45 min)
Build leaf components first; each one self-contained, ports cleanly from JSX.
- [ ] `NamGlyph.tsx` (from `components.jsx:12`)
- [ ] `TypingDots.tsx` (`components.jsx:583`)
- [ ] `StatusPill.tsx` (`hero.jsx:28`)
- [ ] `LiveClock.tsx` (`hero.jsx:5`)
- [ ] `CyclingTagline.tsx` (`hero.jsx:94`)
- [ ] `AsteriskBg.tsx` (`hero.jsx:47`)
- [ ] `SkillsMarquee.tsx` (`hero.jsx:140`)
- [ ] `Bubble.tsx` (`components.jsx:528`)
- [ ] `ChipRow.tsx` (`components.jsx:596`)

### Phase 5 — Rich content cards (~60 min)
- [ ] `MetricTile.tsx` + `AnimatedMetricValue.tsx` (`project-showcase.jsx:13,39`)
- [ ] `MatchRing.tsx` (`components.jsx:375`)
- [ ] `ProjectCard.tsx` (`components.jsx:256`) — dense variant for JD card
- [ ] `SkillsCard.tsx` + `SkillChipWithProvenance` (`components.jsx:47,101`) — full filter logic
- [ ] `PitchCard.tsx` (`components.jsx:344`)
- [ ] `JDMatchCard.tsx` (`components.jsx:430`)
- [ ] `ProjectsShowcase.tsx` (whole file from `project-showcase.jsx`, tabs + spotlight + dots nav)

### Phase 6 — Shells & state machine (~30 min)
- [ ] `JDModal.tsx` (`app.jsx:591`) — fixed overlay, paste textarea, sample-JD button, Escape closes
- [ ] `ProfileRail.tsx` (`components.jsx:632`) — opt-in rail
- [ ] `Hero.tsx` (`hero.jsx:179`) — composes everything; takes `onSubmit, onAction, onPasteJD`
- [ ] `ChatView.tsx` (`app.jsx:319`) — top strip, masthead, scrolling messages, composer
- [ ] **Rewrite `App.tsx`** to the state machine from `app.jsx:63`:
  - `view: "hero" | "chat"`, `messages: Message[]`, `busy`, `input`, `jdOpen`
  - Wire `handleQuickAction(id)` → static respond via `routeStaticAnswer`
  - Wire `submitJD(text)` → POST `/api/jd-match` → JDMatchCard
  - Wire `onSend` → if `looksLikeJD(text)` route to JD analyzer; else POST `/api/chat` and stream text into a bubble
- [ ] Drop the existing scrolling sections from `App.tsx`.

### Phase 7 — Polish (~30 min)
- [ ] Mobile responsive: ProfileRail collapses; hero textarea text size, headline clamp; chat masthead wraps.
- [ ] `prefers-reduced-motion`: gate `nam-spin`, `nam-marquee`, `CyclingTagline` typewriter.
- [ ] Focus rings using `--elev-focus`.
- [ ] Loading/error UI in JD analyzer (parse failure → friendly "try again" message).
- [ ] Regenerate `public/og.png` for light theme (use `browse` skill against the new hero).
- [ ] Drop `resume` link / make it discoverable as a chat quick-action ("Download my resume").
- [ ] Update README to reflect the chat-driven framing.

### Phase 8 — Ship (~10 min)
- [ ] `pnpm typecheck && pnpm build`
- [ ] `pnpm deploy:prod`
- [ ] Smoke test on the live `*.pages.dev` URL: hero loads, chips work, free-text streams, sample JD analysis returns sane JSON.

---

## 6. Decisions I'm making (auto mode — call out if you disagree)

| # | Decision | Reasoning |
|---|---|---|
| D1 | **Drop the dark theme** for v2 ship (keep `[data-theme="dark"]` block in CSS for future toggle, but no UI to flip) | Design defaults to light, current site was dark — picking one and shipping. Adding a toggle is a phase-7 polish if you want it. |
| D2 | **Drop TweaksPanel** entirely | Author tool. Hard-code accent=rose, persona=first, density=rich, stream=true, showProfile=false. |
| D3 | **Profile rail off by default** (chat view starts without it) | Matches `TWEAK_DEFAULTS.showProfile=false` in `design/index.html:96`. Hides phone/email behind a chat command (e.g., asking "how do I contact you"). |
| D4 | **Keep Tailwind** alongside DigiWize tokens | Migration would be huge; inline styles from the design + CSS variables work fine alongside Tailwind utility classes. Tailwind handles layout helpers; inline styles handle the typography/elevation system. |
| D5 | **Single-turn `/api/chat`**, no message history | Cleaner; replies are independent. Free-text is mostly a fallback — most users will use the quick-action chips. Easy to add multi-turn later if needed. |
| D6 | **DevOps-first positioning** in the system prompt + on-page metadata | New design copy is explicit: "DevOps Engineer · 5+ yrs". The iOS solo ship becomes a side-project signal of versatility, not the lead. |
| D7 | **Bump rate limit to 40/IP/day**, JD calls cost 2 | JD analyses are heavier (longer prompts, JSON parse). Recruiters who genuinely want to test will probably issue 3-5 quick-actions plus one JD = ~7 charges. 40 is roomy. |
| D8 | **Phone number on page** (`0492 911 759` from prototype data) | Visible only in ProfileRail (which is off by default), and on chat reply to "how do I contact you". Recruiters need a way to reach you fast. **Flag for you to confirm** the number — I'm copying from the prototype data block. |
| D9 | **`crypto.randomUUID()`** for message IDs | Already in prototype. Safari 15+ and all evergreen browsers have it. Polyfill not needed. |
| D10 | **Skip writing a new design doc** | This file IS the design doc. The original `~/.gstack/projects/personal-website/nguyennam-no-branch-design-20260523-142938.md` is stale; this supersedes it. |

---

## 7. Effort estimate

- Phase 1 (foundation): 15 min
- Phase 2 (data): 20 min
- Phase 3 (backend): 30 min
- Phase 4 (atoms): 45 min
- Phase 5 (cards): 60 min
- Phase 6 (shells + state): 30 min
- Phase 7 (polish): 30 min
- Phase 8 (ship): 10 min

**Total CC time: ~4 hours** (with parallelism on independent components,
likely ~3 hours of focused build).

Human review checkpoints: after Phase 1 (tokens render OK), after Phase 6
(localhost looks like the screenshots), after Phase 8 (live).

---

## 8. Risks & things to watch

| Risk | Mitigation |
|---|---|
| Hanken Grotesk fonts adding ~200KB to first load | Already designed as `font-display: swap`; system-ui falls back instantly. Acceptable. |
| Inline-style approach (no Tailwind utility classes) makes pages heavier | True but tractable — `gzip` collapses repeated style strings. If shipped bundle exceeds 200KB we can revisit. |
| JD analyzer returning malformed JSON | `parseJsonLoose` from `app.jsx:32` already handles common LLM stutter (code fences, surrounding prose). Fallback: friendly error UI prompts retry. |
| Phone number publicly indexed | Trade-off: recruiters need to reach you. Mitigation: phone visible only after user opens ProfileRail or asks "contact". Not in HTML on hero render. |
| Tailwind v4 + CSS variables conflict | Low risk — Tailwind v4's `@theme` block can coexist with manual `:root` variables. Verify in Phase 1. |
| OG image stale (still dark) | Phase 7 regenerates against new light hero. |
| Anthropic SDK streaming inside Cloudflare Pages Functions | Already working in current `/api/chat`. JD endpoint is non-streaming → simpler. |
| Existing pricing display / token meter on chat | Drop it. New design doesn't show it; not recruiter-facing. |
| Resume PDF link discoverable | Add to chat — "How can I see your CV?" → returns a download link bubble. |

---

## 9. What ships at the end

A single-page chat-driven portfolio:

- Lands on hero with NAM NGUYEN. headline, live clock, status pill, cycling tagline, big composer, action chips, skills marquee.
- Click "Paste a JD" or type a JD → modal → analyzer → animated match-ring card with reasons, mapped skills/projects, honest gap statement.
- Click "Show technical skills" → SkillsCard with project-filter chips and provenance dots.
- Click "Top projects" → ProjectsShowcase with tabbed nav, animated metric tiles, story bullets, tech stack chips.
- Click "Why hire me in 30s" → PitchCard with 4 numbered points.
- Type a free-text question → routes to `/api/chat` (or, if it looks like a JD, the analyzer).
- Mobile: hero stacks, marquee narrows, profile rail collapses.
- Per-IP daily rate limit (40 calls).

Recruiter walk-away: a portfolio that's actually a product, with a working
LLM feature that demonstrates AI engineering taste (prompt design + JSON
schema + animated response card).

---

## 10. Out of scope for this refactor

- Multi-turn chat memory (single-turn is enough for the showcase)
- Persistence (no DB, all in-memory state)
- Theme toggle UI (CSS supports it; no switch in v2)
- Analytics (defer — add Plausible after launch if interest justifies)
- Cloudflare Turnstile (defer — rate limit + IP cap is enough for v2 traffic levels)
- A11y audit beyond focus rings + reduced-motion
- i18n (Vietnamese / Japanese versions — out of scope, fun future flex)

---

Ready to execute on approval. Start point: Phase 1.
