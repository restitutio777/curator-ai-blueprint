# CLAUDE.md — Curator AI Blueprint

## 1. What This Project Is

A **production-ready one-page website blueprint** for B2B solo consultants in the DACH market (Germany, Austria, Switzerland). Target niches: KI-/Automatisierungsberater and Unternehmensberater Mittelstand.

This is NOT a single client site. It is a **sellable system** (4k–15k EUR) that the owner (Philippe) customizes per client — swapping name, photos, copy, accent color, and package details. The design, structure, and conversion logic stay constant.

**Business model:** Philippe sells 3 tiers:
- Foundation (4k–6k): Structure + Design + Implementation
- Identity (8k–12k): + Photoshoot + Visual Identity + Positioning
- Premium System (12k–15k): + Strategy Workshop + Case Development + Iteration

## 2. Files

```
curator-ai-blueprint.html   ← Production file (Tailwind CDN + inline config)
curator-ai-blueprint.jsx    ← React version (inline styles, no dependencies)
DESIGN.md                    ← Full design system reference
CLAUDE.md                    ← This file
```

The `.html` is the source of truth for Claude Code. The `.jsx` is a mirror for preview environments that block CDN scripts.

## 3. Tech Stack

- **HTML + Tailwind CSS** via CDN (`cdn.tailwindcss.com`) with inline `tailwind.config`
- **Fonts:** Google Fonts — Newsreader (serif, headlines) + Manrope (sans-serif, body)
- **No framework, no build step** — opens directly in browser
- **Animations:** Vanilla JS IntersectionObserver for scroll-reveal
- **Nav:** CSS glassmorphism (`backdrop-filter: blur(20px)`)
- **Images:** Unsplash placeholders (will be replaced with real portraits per client)

### Future conversion to React/Vite (for Bolt)
1. Extract each `<section>` into a component
2. Move Tailwind config to `tailwind.config.js`
3. Move color tokens to CSS custom properties for runtime accent-color switching
4. Replace IntersectionObserver with Framer Motion
5. Add Sanity CMS schemas mapping 1:1 to sections

## 4. Page Structure (top to bottom)

| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Nav | glass (surface 82% + blur 20px) | Fixed. Logo = name + "Curator AI" subline. 3 links + CTA button |
| 2 | Hero | surface (#f9f9f9) | 8/4 col split. Massive headline left, description right with left border |
| 3 | Packages | surface-container-low (#f2f4f4) | 3-col grid. Foundation / Identity (dark) / Premium. Pricing + CTAs |
| 4 | Image Break | surface (#f9f9f9) | Full-width editorial photo + overlapping quote block bottom-right |
| 5 | Case Study | surface-container-low (#f2f4f4) | 50/50 split. Photo left, structured case data right + metric badges |
| 6 | Process | surface (#f9f9f9) | 4/8 col split. Title left, 3 numbered steps right |
| 7 | FAQ | surface-container-low (#f2f4f4) | 4/8 col split. Sticky title left, 4 Q&A items right |
| 8 | About | surface (#f9f9f9) | 5/7 col split. Portrait left, philosophy text right + mini metrics |
| 9 | CTA | surface-container (#ebeeef) | Centered. Massive headline + 2 action buttons |
| 10 | Footer | surface-container-low (#f2f4f4) | Logo + tagline left, link columns right |

**Pattern:** Sections alternate between `surface` and `surface-container-low` to create depth without borders.

## 5. Design System (Complete Reference)

### 5.1 Creative Direction
"The Digital Curator" — Quiet Luxury. High-end editorial, not SaaS. The screen is a gallery wall. Authority is curated, not shouted.

### 5.2 Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #5f5e5e | Buttons, dark card bg, text emphasis |
| `primary-dim` | #535252 | Hover state for primary |
| `on-primary` | #faf7f6 | Text on primary backgrounds |
| `on-background` | #2d3435 | Main text color |
| `on-surface-variant` | #5a6061 | Secondary/muted text |
| `surface` | #f9f9f9 | Page background (Layer 0) |
| `surface-container-low` | #f2f4f4 | Alternating sections (Layer 1) |
| `surface-container-lowest` | #ffffff | Cards on Layer 1 (Layer 2) |
| `surface-container` | #ebeeef | CTA section background |
| `outline-variant` | #adb3b4 | Subtle borders (use at 15% opacity max) |
| `tertiary` | #785a1a | Muted gold accent — **max 1 per viewport** |
| `tertiary-dim` | #6b4e0e | Hover state for tertiary |
| `tertiary-fixed` | #fbd185 | Selection highlight bg |
| `tertiary-fixed-dim` | #ecc479 | Gold underlines, active nav indicator |
| `on-tertiary` | #fff8f1 | Text on tertiary backgrounds |
| `on-tertiary-container` | #624604 | Text on selection highlight |

### 5.3 Surface Hierarchy (The Layering Principle)
```
Layer 0 (Canvas):      surface          #f9f9f9
Layer 1 (Sub-section): surface-container-low  #f2f4f4
Layer 2 (Cards):       surface-container-lowest #ffffff
```
Cards get their "lift" from sitting on a darker layer. No shadows needed for cards.

### 5.4 Typography

| Role | Font | Size | Weight | Extras |
|------|------|------|--------|--------|
| Hero H1 | Newsreader | clamp(3rem,7vw,7rem) | 400 | `leading-[1.05]` |
| Section H2 | Newsreader | clamp(2.2rem,4.5vw,3.8rem) | 400 | `leading-[1.1]` |
| Card H3 | Newsreader | 2.2rem | 400 | `leading-tight` |
| FAQ question | Newsreader | 1.5rem (text-2xl) | 400 | — |
| Italic emphasis | Newsreader italic | inherit | 300 | Use class `.font-serif-italic` |
| Overline | Manrope | 10–11px | 600–700 | `uppercase tracking-[0.2em]` |
| Body | Manrope | 15–16px | 400 | `leading-relaxed` (1.625) |
| Small/Label | Manrope | 10px | 500–700 | `uppercase tracking-wider` |
| Package item | Manrope | 13px | 600 | `uppercase tracking-tight` |
| Numbers (metrics) | Newsreader | 1.8rem | 400 | `text-tertiary` for case metrics |
| Price | Newsreader | 1.8rem | 400 | — |

**Overline pattern** (used above every H2):
```html
<span class="text-tertiary font-label text-[11px] uppercase tracking-[0.22em] mb-5 block">Label Text</span>
```

### 5.5 Buttons

**Primary button:**
```html
<button class="bg-primary text-on-primary px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-primary-dim transition-all duration-300">
```
- 0px border-radius (sharp corners — NEVER rounded)
- Hover: `primary-dim` (#535252)

**Secondary button (ghost):**
```html
<button class="border border-primary text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-[0.18em] py-4 w-full transition-colors duration-300">
```

**Textual link (gold underline):**
```html
<a class="text-[11px] font-bold uppercase tracking-[0.18em] text-on-background border-b-2 border-tertiary-fixed-dim pb-1">
```

### 5.6 Elevation & Shadows
- **Cards:** NO shadows by default. Depth from surface layering.
- **Card hover:** Cloud shadow only: `box-shadow: 0 20px 80px rgba(45, 52, 53, 0.06)`
- **Ghost border fallback:** `outline-variant` at 10% opacity if accessibility requires it
- **Nav:** No shadow. Uses glassmorphism. On scroll: `box-shadow: 0 1px 0 rgba(173,179,180,0.15)`

### 5.7 Photography Rules
- **Hard crops:** Square or extreme vertical (3:4). No rounded corners. No `border-radius`.
- **Desaturation:** `filter: saturate(0.92) contrast(1.02)` — class `.editorial-img`
- **Asymmetrical bleeds:** Image touches edges, text overlaps from adjacent column
- **No stock aesthetic.** Real portraits only in production. Unsplash is placeholder only.

### 5.8 Layout Rules
- Max container: `1440px`
- Padding: `px-8 lg:px-12` (32px / 48px)
- Section padding: `py-32` (128px)
- Grid: Always asymmetric. Use `8/4`, `5/7`, `4/8`, `1fr 2fr` splits.
- **"The Empty Corner":** Let entire grid quadrants stay empty. Don't fill space.
- Card gap: `gap-6` (24px) for package cards
- Content gap: `gap-16` (64px) for split layouts

### 5.9 Animations
- Scroll reveal: `.reveal` class with IntersectionObserver
- Default: `opacity 0→1, translateY(24px→0)`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Duration: `0.7s`
- Stagger via `data-delay` attribute (0, 0.05, 0.08, 0.12, etc.)
- Card hover: cloud shadow fade-in, 500ms transition

## 6. The "No-Line" Rule (CRITICAL)

**Do NOT use `1px solid` borders between sections.** Section boundaries are defined ONLY by background color alternation (`surface` ↔ `surface-container-low`).

**Exceptions where thin borders ARE allowed:**
- Inside cards: price divider `border-t border-outline-variant/15`
- Inside about/case: metrics divider `border-t border-outline-variant/15`
- Dark card (Identity): `border-t border-on-primary/10`
- Hero description: `border-l-2 border-outline-variant/25`
- Nav active link: `border-b-2 border-tertiary-fixed-dim`

## 7. Component Patterns

### Nav Logo (Name + Subline)
```html
<a class="flex flex-col leading-none" href="#">
  <span class="font-headline text-[1.15rem] text-on-background tracking-[-0.01em]">Client Name</span>
  <span class="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant mt-1">Curator AI</span>
</a>
```

### Package Card (Light)
```
bg-surface-container-lowest p-10 lg:p-12
  ├── icon (SVG, tertiary stroke) + tier label
  ├── h3 (Newsreader 2.2rem)
  ├── description (14px, on-surface-variant)
  ├── numbered items (tertiary numbers, uppercase labels)
  ├── price divider (border-t outline-variant/15)
  ├── price (Newsreader 1.8rem) + label
  └── ghost button (border primary)
```

### Package Card (Dark — Identity)
```
bg-primary text-on-primary p-10 lg:p-12 relative overflow-hidden
  ├── ambient glow (tertiary/8 blur-80px, top-right)
  ├── same structure as light card
  ├── numbers use tertiary-fixed color
  ├── button: bg-tertiary text-on-tertiary
  └── price divider: border-on-primary/10
```

### Case Study Metrics
```html
<div class="flex gap-12 mt-10 pt-8 border-t border-outline-variant/15">
  <div>
    <span class="font-headline text-[1.8rem] text-tertiary">–68%</span>
    <span class="text-[10px] text-on-surface-variant block uppercase tracking-wider mt-1">Label</span>
  </div>
</div>
```

### FAQ Item
```html
<div>
  <span class="text-[10px] font-label uppercase tracking-[0.2em] text-tertiary mb-4 block">01. Category</span>
  <p class="text-on-background font-headline text-2xl mb-3">Question?</p>
  <p class="text-on-surface-variant leading-relaxed text-[15px]">Answer text.</p>
</div>
```

## 8. Customization Map (Per Client)

| What to change | Where | How |
|---------------|-------|-----|
| Client name | Nav logo, footer logo, copyright | Replace "Stefan Holz" |
| Subline brand | Nav + footer | Replace "Curator AI" or keep |
| Accent color | Tailwind config `tertiary` + `tertiary-dim` + `tertiary-fixed` + `tertiary-fixed-dim` | Swap all 4 hex values |
| Hero headline | `<h1>` in hero section | Client's positioning statement |
| Hero description | `<p>` right column | 1–2 sentences on their value prop |
| Hero overline | `<span>` overline | Their niche label |
| Package names | Card `<h3>` elements | Client's actual service tiers |
| Package items | Numbered list items | Client's deliverables |
| Package prices | Price `<span>` elements | Client's actual pricing |
| Case study | Case section | Real client data: situation, action, result + metrics |
| FAQ content | FAQ section | Client-specific objection handling |
| About text | About section | Client philosophy + working style |
| About metrics | 3 mini metrics | Client's experience/focus/region |
| Portrait images | All `<img>` tags | Replace Unsplash with photoshoot images |
| CTA headline | CTA section `<h2>` | Client's closing statement |
| CTA link | `<a href>` | Calendly URL or contact form |
| Footer links | Footer `<a>` tags | Client's LinkedIn, legal pages |

## 9. Strict Do NOT Rules

1. **No rounded corners** on buttons, cards, or images. Everything is 0px border-radius.
2. **No section borders.** Background color shifts only.
3. **No heavy shadows.** Cloud shadow on hover only.
4. **No blue links.** Use `primary` color with `tertiary` underline.
5. **No icons** unless absolutely necessary. Typography is the architecture.
6. **No stock photo aesthetic.** If adding placeholder images, use editorial-quality Unsplash.
7. **No cramped spacing.** When in doubt, add more margin. This system breathes.
8. **No generic fonts.** Only Newsreader + Manrope. Never Inter, Roboto, Arial.
9. **No SaaS aesthetic.** No gradient buttons, no pill shapes, no card grids with colorful icons.
10. **Max 1 gold accent element per viewport.** Overlines are exempt (they're navigation markers).

## 10. Working With This File

When modifying `curator-ai-blueprint.html`:
- Read DESIGN.md fully before any visual change
- Preserve the alternating surface color pattern between sections
- Maintain the reveal animation system (`.reveal` + `data-delay`)
- Keep the nav glassmorphism effect
- Test at 1440px width — that's the design target
- All Tailwind classes use the custom color tokens from the inline config
- The `font-serif-italic` utility class is defined in `<style>`, not Tailwind

When creating a new client version:
1. Duplicate `curator-ai-blueprint.html`
2. Search-replace "Stefan Holz" → client name
3. Swap tertiary color values in Tailwind config
4. Replace all copy per the Customization Map (Section 8)
5. Replace Unsplash images with client photoshoot files
6. Verify the Quality Checklist below

## 11. Quality Checklist

- [ ] No borders between sections (color-shift only)
- [ ] 0px border-radius on ALL buttons and cards
- [ ] Gold accent max 1x per viewport (overlines exempt)
- [ ] Images desaturated (`filter: saturate(0.92) contrast(1.02)`)
- [ ] Images hard-cropped, no rounded corners
- [ ] Overlines: 10–11px, uppercase, tracking-[0.2em], tertiary color
- [ ] Cloud shadows only (no hard dropshadows)
- [ ] Generous whitespace — section padding 128px, card gap 24px
- [ ] Nav glassmorphism working (blur + opacity)
- [ ] All reveal animations firing with stagger
- [ ] Asymmetric layouts preserved (no 50/50 splits except case study)
- [ ] Newsreader for all headlines, Manrope for all body text
- [ ] No blue links anywhere
- [ ] Identity card has ambient glow (tertiary blur) and gold CTA button
