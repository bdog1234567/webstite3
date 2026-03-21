# Nohea Media — Studio Polish Redesign

**Date:** 2026-03-20
**Approach:** Studio Polish — refine everything in place, same structure, dramatically better execution
**Reference sites:** overturestudios.com, golden.la, ilpvfx.com

## Overview

Comprehensive visual upgrade of the Nohea Media portfolio site. Keep the existing page structure (hero → portfolio → about → contact → footer) but elevate every section with refined typography, opacity-based color hierarchy, full-bleed video, premium scroll animations (Lenis + GSAP), and cleaner component styling. The goal is to match the polish level of professional VFX studio sites.

## Files Modified

- `style.css` — full restyle
- `index.html` — structural changes to hero, portfolio cards, about section (swap placeholder for real photo, restructure card info overlay), skills markup
- `script.js` — replace CSS reveal system with GSAP ScrollTrigger, add Lenis smooth scroll, update hero entrance choreography

## New Dependencies

- **Lenis** (smooth scroll) — loaded via CDN, ~8KB gzipped
- **GSAP + ScrollTrigger** (animations) — loaded via CDN, ~22KB gzipped combined
- Total added weight: ~30KB gzipped

---

## Section 1: Hero

### Current State
- Video plays inside a small masked box behind the logo/title
- Cyan accent color on the label
- Solid cyan primary button + ghost secondary
- Film grain overlay at 0.5 opacity
- CSS keyframe entrance animations

### Proposed Changes

**Layout:**
- Full-bleed `Nomosaic4.mp4` as background video covering the entire viewport
- Remove the `.hero-mask-group` / `.hero-mask-overlay` / `.hero-video` contained approach
- Video is `position: absolute; inset: 0; object-fit: cover` behind all content
- Dark gradient overlay on top of video: transparent at top → 30% at middle → 95% at bottom (seamless transition to next section)

**Content hierarchy (top to bottom, centered):**
1. Category label: "VFX · AI GENERATIVE · FILM" — white at 40% opacity, 0.5em letter-spacing
2. Logo image (`logo.png`) — `filter: invert(1)`, large (clamp 100px–180px height)
3. Title "NOHEA MEDIA" — massive fluid type, `clamp(56px, 10vw, 120px)`, white, tight letter-spacing (-0.02em)
4. Thin divider line — 40px wide, white at 20% opacity
5. Name "Braden Di Mauro" — white at 45% opacity, 0.35em letter-spacing
6. Tagline — white at 30% opacity
7. Two ghost buttons — thin white borders (25% opacity primary, 10% opacity secondary), no solid cyan

**Color:**
- No cyan anywhere in the hero
- All text is white at varying opacities: 100% (title), 45% (name), 40% (label), 30% (tagline)
- Buttons: white borders and text, hover adds glow

**Animation (GSAP):**
- Staggered entrance on page load, ~150ms between elements
- Each element: `opacity: 0, y: 30` → `opacity: 1, y: 0`
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)`
- Film grain retained at lower opacity (0.3)
- Gradient pulse animation retained but subtler

**Scroll indicator:**
- Kept, but even more subtle — white at 15% opacity

---

## Section 2: Navigation

### Current State
- 68px height, transparent → frosted glass on scroll
- "NOHEA MEDIA" text logo left, links right
- "Hire Me" CTA with solid cyan border

### Proposed Changes

- Reduce nav height slightly (64px)
- Keep transparent → frosted glass behavior
- "Hire Me" CTA: change from cyan border to thin white border at 25% opacity, white text at 60% opacity. On hover: border brightens, text goes full white. No cyan.
- Regular nav links: white at 40% opacity, hover → 85% opacity
- Slightly reduce font size of nav links for less visual weight
- Logo text: white at 85% opacity

---

## Section 3: Portfolio

### Current State
- 2-column grid with mixed aspect ratios (some portrait 3:4, some landscape 16:9)
- Card has separate `.card-info` section below thumbnail with tag, title, description
- Solid cyan play button
- Pill-shaped filter buttons with cyan active state
- Cards have visible borders

### Proposed Changes

**Grid:**
- All cards use uniform **16:9 aspect ratio** — remove the `.portrait` class entirely
- Keep 2-column grid on desktop, 1-column on mobile
- Increase gap to 16px

**Cards:**
- Remove the separate `.card-info` section below the thumbnail
- Overlay title and category **inside the thumbnail** at the bottom with a gradient fade (`linear-gradient(to top, rgba(0,0,0,0.7), transparent)`)
- Category tag: white at 40% opacity
- Title: white at 90% opacity, font-weight 500
- Remove visible card borders — no `border: 1px solid var(--border)`
- Hover: subtle scale(1.02) on thumbnail image, faint glow around card edges

**Play button:**
- Ghost style: 48px circle, `border: 1.5px solid rgba(255,255,255,0.5)`, `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(4px)`
- Play icon: white at 90% opacity
- Hover: border brightens, subtle glow

**Filters:**
- Replace pill buttons with text-based tabs
- Active state: bottom border (1px solid white at 50% opacity), text at 85% opacity
- Inactive: text at 30% opacity, no background, no border
- Hover: text brightens to 60% opacity

---

## Section 4: About

### Current State
- Placeholder div instead of real photo
- Cyan-to-purple gradient line above image
- Cyan accent on subtitle, section label has `::before` dash
- Skills displayed as cyan pill badges
- Solid cyan "Work With Me" button

### Proposed Changes

**Photo:**
- Replace placeholder with real photo: `2G9A5895-2.JPEG`
- Apply `filter: grayscale(15%)` for cinematic consistency
- Keep 3:4 aspect ratio with `object-fit: cover`
- Subtle bottom gradient fade to blend into dark background
- Remove the `::before` gradient accent line above the image

**Typography:**
- Section label "About": plain uppercase text, white at 35% opacity, no `::before` dash line
- Subtitle "VFX Artist & AI Content Creator": white at 40% opacity (not cyan)
- Bio text: white at 45% opacity, line-height 1.85

**Skills:**
- Replace pill badges with dot-separated plain text
- Skills listed inline with `·` separators between them
- Text at 35% opacity, dots at 15% opacity
- Label "Expertise" at 20% opacity

**CTA:**
- Ghost button: thin white border at 20% opacity, text at 70% opacity
- Hover: border brightens, text goes full white

---

## Section 5: Contact

### Current State
- Cyan-to-purple gradient line at top
- Social links as icon+text buttons with borders
- Form inputs with subtle borders
- Solid cyan submit button

### Proposed Changes

**Section separator:**
- Remove the gradient top line
- Use generous spacing (130px padding-top) as the separator

**Form:**
- Input borders: lower opacity (3-4% instead of 5.5%)
- Slightly larger padding (13px → 15px)
- Focus state: white border at 30% opacity (not cyan) — or keep cyan for this one functional use
- Labels: white at 40% opacity
- Placeholder text: white at 20% opacity
- Submit button: ghost style, full width. Hover: fills with white at 10% opacity

**Social links:**
- Icon-only row — remove text labels
- Circular or square icon containers with thin borders
- 36px containers, consistent spacing
- Hover: border brightens, icon brightens

**Contact info:**
- Email link: same opacity-based hierarchy
- Section title and tagline: opacity-based white, no cyan

---

## Section 6: Footer

### Current State
- Top border line
- Logo image, copyright, nav links in a row

### Proposed Changes

- Remove top border — use spacing as separator
- Keep the three-element layout (logo, copyright, links)
- Reduce overall visual weight — lower opacity on all elements
- Copyright text: white at 15% opacity
- Nav links: white at 20% opacity, hover → 50%
- Logo: keep filter invert, opacity 0.4

---

## Section 7: Global Polish

### Lenis Smooth Scroll
- Add Lenis via CDN in `<head>`
- Initialize with default settings
- Connect to GSAP's ticker via `gsap.ticker.add`
- This replaces the native scroll-behavior: smooth

### GSAP ScrollTrigger
- Load GSAP core + ScrollTrigger plugin via CDN
- Replace the existing CSS `.reveal` system entirely
- Register ScrollTrigger plugin

**Animation patterns:**
- **Section titles:** Split into words, each word slides up (`y: 30 → 0, opacity: 0 → 1`) with 0.08s stagger between words. Duration 0.8s.
- **Section labels:** Fade in with slight Y translate. Duration 0.6s.
- **Portfolio cards:** Fade up with `y: 40 → 0`, stagger 0.1s between cards. Duration 0.7s.
- **About content blocks:** Sequential reveal, 0.15s stagger. Duration 0.6s.
- **Contact form + info:** Fade up, stagger 0.1s. Duration 0.6s.
- **All animations:** `ease: "cubic-bezier(0.23, 1, 0.32, 1)"`, trigger when element is 85% from top of viewport, animate once (no reverse on scroll up).

### Hero Entrance (GSAP Timeline)
- Not scroll-triggered — plays on page load
- Timeline with 150ms staggers:
  1. Label fades in (0.6s)
  2. Logo slides up (0.8s)
  3. Title slides up (0.9s)
  4. Divider line scales from 0 width (0.5s)
  5. Name fades in (0.6s)
  6. Tagline fades in (0.6s)
  7. Buttons fade in (0.6s)

### Typography
- Remove `::before` dash lines from all section labels
- Increase section padding from 104px to 130px
- Bio line-height: 1.85 (already set, keep it)

### Color System
- Hero: pure white/opacity only, zero cyan
- Rest of site: cyan used sparingly for functional purposes only:
  - Portfolio filter active state (underline)
  - Form input focus border
  - Hover accents on interactive elements
- Remove cyan from: section labels, about subtitle, skill tags, decorative elements
- Keep `--accent: #00c8ff` in CSS vars for the functional uses

### Easing
- Replace `var(--ease)` (`cubic-bezier(0.4, 0, 0.2, 1)`) with `cubic-bezier(0.23, 1, 0.32, 1)` as the primary easing — smoother deceleration curve matching Golden.la

---

## What Stays the Same

- Page structure: hero → portfolio → about → contact → footer
- All 7 portfolio items and their YouTube video IDs
- Portfolio filter functionality (all/vfx/ai/editing)
- Contact form with Formspree integration
- Mobile nav hamburger toggle
- YouTube thumbnail loading + lazy iframe embed on play
- Active section highlight in nav
- Film grain texture (reduced opacity)
- Responsive breakpoints at 960px, 768px, 480px
