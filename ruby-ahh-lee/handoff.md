# Handoff — ruby-ahh-lee

A personal gift website built for Ruby-Lee (Milan's girlfriend) for her birthday and their 2-year anniversary. The whole site is a surprise — she unlocks it with a combination (their anniversary date) and then explores four sections.

---

## Stack

| Thing | Version |
|---|---|
| Next.js | 16.2.6 — App Router, Turbopack dev |
| React | 19.2.4 |
| TypeScript | 5.x strict |
| Tailwind CSS | 4.x (`@import "tailwindcss"` syntax) |
| react-markdown | 10.x |
| remark-gfm | 4.x |

> **Read `AGENTS.md` before touching Next.js APIs.** This version has breaking changes vs training data (params are Promises, no auto-lint on build, Turbopack default, etc.). Docs live in `node_modules/next/dist/docs/`.

---

## What's Built

### Landing page (`/`) — fully working
- `app/page.tsx` → renders `<LandingClient />`
- `components/LandingClient.tsx` — manages `phase` state (`'lock' | 'menu' | null`)
  - On mount, checks `localStorage.getItem('ruby-unlocked')`. If set, skips straight to menu.
  - `phase === null` renders nothing (prevents SSR flash).
  - `handleSolved` saves `'ruby-unlocked'` to localStorage, transitions to menu.
  - `handleBack` clears localStorage, increments `lockKey` (remounts LockScreen with reset digits), returns to lock.

### Lock screen — fully working
- `components/LockScreen.tsx` — heart-shaped padlock with 4 combination dials
  - Combination: `[1, 2, 0, 5]` (i.e. 12/05 — their anniversary, MM/DD)
  - `useRef` guard (`hasStarted`) prevents the timeout being cancelled when `setSolved(true)` triggers a re-render. This was a bug that caused the fade to never fire — do NOT revert to the `solved` dep-array approach.
  - On correct combo: shackle lifts (CSS `.is-open`), status text appears, after 1700ms calls `onSolved()`.
- `components/Dial.tsx` — single digit up/down, keyed span triggers `@keyframes tick` CSS animation on each change.

### Menu screen — fully working
- `components/MenuScreen.tsx` — blue sky + cream card with ornamental pink frame
  - `shown` prop drives the fade-in transition (`.is-shown` class).
  - "lock it up and leave" pill clears localStorage and returns to lock.
  - Items 1–3 (`know`, `years`, `gift`) navigate to their routes via `useRouter`.
  - Item 4 (`letter`) expands the card in-place (no page navigation) — see below.
- `components/SkyBackground.tsx` — shared sky layer (sun SVG + 6 animated cel-shaded clouds). Used by both MenuScreen and the letter page route.

### Letter — fully working (in-page expansion)
- Clicking "A letter from me" in the menu does NOT navigate. It triggers an in-place transition:
  1. `exiting` state → `.menu-inner.is-exiting` opacity fades to 0 (280ms)
  2. `view` flips to `'letter'`, card gets `.is-letter` class → width expands from 640px → 740px, height set to fill viewport, padding → 0
  3. `.letter-inner` rises in with staggered `rise` animation
- Going back: same fade in reverse, view flips back to `'menu'`.
- Pill label swaps: `🔒 lock it up and leave` ↔ `← back to menu` depending on `view`.
- The actual letter text lives in the `LETTER` constant at the top of `MenuScreen.tsx`. **Milan needs to replace this with the real letter before gifting.** It's standard markdown — h1, h2, p, hr, em, strong, blockquote all render correctly via `react-markdown + remark-gfm`.
- `app/letter/page.tsx` also exists as a standalone route (same design) but is not the primary path — the in-menu expansion is what the user sees.

### Stub pages — placeholder only
- `app/know/page.tsx` — "coming soon" text. See spec below.
- `app/years/page.tsx` — "coming soon" text. See spec below.
- `app/gift/page.tsx` — "coming soon" text. See spec below.

---

## What Still Needs Building

### 1. How well do you know Ruby-Lee? (`/know`)
Multiple-choice picture quiz. 8 questions total.

- 4 options per question, each rendered as a **tile** with an image + label.
- Wrong answer: tile flips (CSS 3D flip), reveals red outline + "Nope — you should know this".
- Right answer: tile flips, reveals green + "Damn, look at you go".
- Only one tile is flippable per question (once answered, rest lock out).
- After all 8: show a score banner "You got X/8" with a congratulations message.
- Images will be provided by Milan (not yet uploaded).
- Questions/answers also need to be provided by Milan.

### 2. Us over the years (`/years`)
Photo book with named chapters.

- Photos grouped by time period, each period = one "page" of a book.
- Displayed in a **book format** with left/right arrow navigation.
- Page-turn animation when navigating.
- Chapter names to be provided by Milan.
- Photos to be uploaded by Milan.

### 3. Ruby-Lee's birthday present (`/gift`)
Simple redirect — Milan is building the present experience elsewhere.
Just needs a redirect URL (not yet provided) or a "coming soon + link" treatment.

---

## Design System

All styling is custom CSS in `app/globals.css` (no Tailwind utility classes in components — Tailwind is imported but used as a reset/foundation only).

### Colour palette
| Variable / Value | Use |
|---|---|
| `#0c1118` (`--bg`) | Lock screen background |
| `#ff4f6d` (`--accent`) | Heart fill, accent dots |
| `#3a78d6 → #8fbbec` | Sky gradient (menu + inner pages) |
| `#f6e9cf` (`--cream`) | Menu card background |
| `#e07a99` (`--pink`) | Card border, button borders, accents |
| `#c95a7d` (`--pink-deep`) | Headings, eyebrow text, number badges |
| `#fbd9e3` (`--pink-soft`) | Button shadow, number badge background |
| `#5a3a4a` (`--ink`) | Body text on cream |

### Fonts
Loaded via `next/font/google`, injected as CSS variables on `<html>`:
- `--font-inter` → Inter (weights 200–600) — UI, labels, small caps
- `--font-cormorant` → Cormorant Garamond (300–500, normal + italic) — headings, titles, letter body

### Shared CSS classes (key ones)
- `.page-sky` — full-page sky background wrapper for inner routes
- `.menu-card` — cream card with double pink border (`::before`/`::after`) and corner diamond ornaments
- `.menu-card.is-letter` — expanded card state (flex column, 740px wide, fills viewport height)
- `.back-pill` — frosted glass pill button, `position: fixed`, top-left
- `.letter-paper` — white scrollable inner area (used inside letter card)
- `.letter-content` — markdown typography (Cormorant Garamond, pink headings)
- `.sky` — sky layer container (`position: absolute; inset: 0`)
- `.cloud.c1`–`.cloud.c6` — positioned drifting clouds with `@keyframes drift`

---

## File Map

```
app/
  layout.tsx          Root layout — fonts, metadata
  page.tsx            Home (/) — renders <LandingClient />
  globals.css         All custom CSS (~540 lines)
  know/page.tsx       Stub
  years/page.tsx      Stub
  gift/page.tsx       Stub
  letter/page.tsx     Standalone letter route (not the primary path)

components/
  LandingClient.tsx   Phase state + localStorage persistence
  LockScreen.tsx      Heart lock + dials + unlock animation
  Dial.tsx            Single digit dial
  MenuScreen.tsx      Menu + in-place letter expansion + letter markdown
  SkyBackground.tsx   Shared sky (sun SVG + 6 clouds)
```

---

## Known Gotchas

1. **`solved` in effect deps causes timeout cancellation.** `LockScreen` uses a `useRef` (`hasStarted`) instead of including `solved` in the `useEffect` dep array. This is intentional — reverting it breaks the unlock transition.

2. **`localStorage` check is async (useEffect).** `LandingClient` renders `null` while checking localStorage to avoid hydration mismatch. Don't render anything conditional on `phase` before the effect fires.

3. **`display: contents` breaks opacity transitions.** `.menu-inner` and `.letter-inner` are normal `div`s with opacity transitions — do NOT change them to `display: contents`.

4. **`height: auto` can't be CSS-transitioned.** The card height change (menu → letter) is not animated. This is intentional — the content fades mask it.

5. **`position: fixed` inside `.menu-screen`.** `.back-pill` is `position: fixed`. This works because `.menu-screen` has no `transform`/`filter`/`will-change`. Adding any of those to `.menu-screen` would break the pill's viewport positioning.

6. **ESM packages.** `react-markdown` and `remark-gfm` are ESM-only. They work fine in `'use client'` components. Avoid importing them in Server Components without verifying RSC compatibility first.

---

## Running Locally

```bash
npm run dev    # Turbopack dev server at localhost:3000
npm run build  # Production build
npm run lint   # ESLint (NOT run automatically on build in Next.js 16)
```

The combination to unlock is **1 2 0 5** (December 5th, their anniversary, in MM/DD format).
