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

Add the following script tags to `index.html` before `<script src="script.js">`:

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

- **Lenis** (smooth scroll) — ~8KB gzipped
- **GSAP + ScrollTrigger** (animations) — ~22KB gzipped combined
- Total added weight: ~30KB gzipped

Note: Disable Lenis on touch devices (check `'ontouchstart' in window`) as it can cause issues on iOS Safari. Use `ScrollTrigger.normalizeScroll(true)` on mobile for consistent behavior.

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
- Replace the existing `.hero-gradient` (radial cyan/purple color splashes) with a simple linear darkening gradient: `linear-gradient(to bottom, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.1) 40%, rgba(6,6,8,0.5) 85%, rgba(6,6,8,0.95) 100%)`. This ensures text readability over the video and creates a seamless transition to the portfolio section. The old radial color glows are removed entirely — the video provides all the color.
- On mobile, consider a static poster frame fallback if autoplay video causes performance issues. Preserve `muted playsinline` attributes on the video element.

**New HTML structure for `#hero`:**
```html
<section id="hero">
  <div class="hero-bg">
    <video class="hero-video" src="Nomosaic4.mp4" autoplay muted loop playsinline></video>
    <div class="hero-gradient"></div>
    <div class="hero-grain"></div>
  </div>
  <div class="hero-content">
    <p class="hero-label">VFX · AI GENERATIVE · FILM</p>
    <img src="logo.png" alt="Nohea Media" class="hero-logo" />
    <h1 class="hero-title">NOHEA MEDIA</h1>
    <hr class="hero-divider" />
    <p class="hero-name">Braden Di Mauro</p>
    <p class="hero-tagline">Visual storytelling through cutting-edge technology</p>
    <div class="hero-actions">
      <a href="#portfolio" class="btn btn-hero-primary">View My Work</a>
      <a href="#contact" class="btn btn-hero-ghost">Get In Touch</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

Key structural changes:
- Video moves inside `.hero-bg` as a full-bleed background element
- Logo and title are direct children of `.hero-content` (no longer inside mask group)
- New `<hr class="hero-divider">` element between title and name
- Hero buttons use new classes `btn-hero-primary` and `btn-hero-ghost` instead of `btn-primary`/`btn-ghost` to avoid affecting buttons in other sections
- Font stays as `var(--font-display)` (Bebas Neue) for the title

**Content hierarchy (top to bottom, centered):**
1. Category label: "VFX · AI GENERATIVE · FILM" — white at 40% opacity, 0.5em letter-spacing
2. Logo image (`logo.png`) — `filter: invert(1)`, large (clamp 100px–180px height)
3. Title "NOHEA MEDIA" — massive fluid type, `clamp(56px, 10vw, 120px)`, Bebas Neue, white, tight letter-spacing (-0.02em)
4. Thin divider line (`<hr class="hero-divider">`) — 40px wide, white at 20% opacity, no default HR styling
5. Name "Braden Di Mauro" — white at 45% opacity, 0.35em letter-spacing
6. Tagline — white at 30% opacity
7. Two ghost buttons — both are ghost-style (no fill). `btn-hero-primary` has a brighter white border (25% opacity) and brighter text (85% opacity). `btn-hero-ghost` has a dimmer border (10% opacity) and dimmer text (35% opacity). On hover, both brighten. These classes are hero-specific and do not affect `.btn-primary` used in the about section CTA and contact form submit — those retain their existing cyan solid style.

**Color:**
- No cyan anywhere in the hero
- All text is white at varying opacities: 100% (title), 45% (name), 40% (label), 30% (tagline)
- Buttons: white borders and text, hover adds glow

**Animation (GSAP):**
- Staggered entrance on page load, ~150ms between elements
- Each element: `opacity: 0, y: 30` → `opacity: 1, y: 0`
- Easing: `ease: "power3.out"` (same as all other GSAP animations)
- Film grain retained at lower opacity (0.3)
- Gradient pulse animation removed (the old radial cyan/purple glows are removed entirely)

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
- "Hire Me" CTA: change from cyan border to thin white border at 25% opacity, white text at 60% opacity. On hover: border goes to cyan, text goes to cyan (subtle accent on interaction only).
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
- All cards use uniform **16:9 aspect ratio** — remove the `.portrait` class from Cards 1 and 2 in the HTML. This will change how their YouTube thumbnails crop (from tall 3:4 to wide 16:9), which is intentional since video content is natively 16:9.
- Keep 2-column grid on desktop, 1-column on mobile
- Reduce gap from current 22px to 16px for tighter grid

**Cards — new HTML structure:**
```html
<article class="portfolio-card reveal" data-category="ai" data-video-id="crHRXVX3aHU">
  <div class="card-media">
    <div class="card-thumbnail">
      <img src="" alt="H&amp;M Spec Ad" class="thumb-img" loading="lazy" />
      <div class="card-overlay">
        <button class="play-btn" aria-label="Play H&amp;M Spec Ad">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <!-- Info moved inside thumbnail as overlay -->
      <div class="card-info-overlay">
        <span class="card-tag">AI Generative</span>
        <h3 class="card-title">H&amp;M Spec Ad</h3>
      </div>
    </div>
  </div>
</article>
```

Key changes:
- Remove the separate `.card-info` div that was a sibling of `.card-media`
- Remove `.card-desc` elements entirely (description text is dropped)
- Add `.card-info-overlay` inside `.card-thumbnail`, positioned absolute at the bottom
- `.card-info-overlay` gets `background: linear-gradient(to top, rgba(0,0,0,0.7), transparent)` and bottom padding

**Card styling:**
- Category tag: white at 40% opacity
- Title: white at 90% opacity, font-weight 500
- Remove visible card borders — no `border: 1px solid var(--border)`
- Hover: subtle scale(1.02) on thumbnail image (reduced from current 1.04), faint glow around card edges

**Play button:**
- Ghost style: 48px circle, `border: 1.5px solid rgba(255,255,255,0.5)`, `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(4px)`
- Play icon: white at 90% opacity
- Hover: border brightens, subtle glow

**Filters:**
- Replace pill buttons with text-based tabs
- Active state: bottom border `1px solid var(--accent)`, text at 85% opacity (cyan underline is the one functional accent use here)
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
- Input borders: lower opacity (3-4% instead of current 5.5%)
- Increase vertical padding from current 11px to 15px for more spacious feel
- Focus state: keep cyan (`border-color: var(--accent)`) — this is a functional accent use for clear focus indication
- Labels: white at 40% opacity
- Placeholder text: white at 20% opacity
- Submit button: ghost style, full width. Hover: fills with white at 10% opacity

**Social links:**
- Icon-only row — hide text labels with CSS (`font-size: 0` or visually hidden), keep text in DOM for screen readers alongside existing `aria-label` attributes
- Square icon containers with thin borders, 36px × 36px
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
- Loaded via CDN (see Dependencies section)
- Initialize with default settings
- Connect to GSAP's ticker via `gsap.ticker.add`
- Remove `html { scroll-behavior: smooth; }` from CSS — Lenis replaces this and the two can conflict
- Disable Lenis on touch devices to avoid iOS Safari issues (check `'ontouchstart' in window`)

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
- **All animations:** `ease: "power3.out"` (GSAP equivalent of cubic-bezier(0.23, 1, 0.32, 1)), trigger when element is 85% from top of viewport, animate once (`once: true`, no reverse on scroll up).

**Word splitting approach:** Use manual DOM manipulation — wrap each word in a `<span>` via JS (no external library needed). Select all `.section-title` elements (they are the ones that get word-split animation), split `textContent` on spaces, wrap each word in `<span style="display:inline-block; overflow:hidden">` containing an inner `<span>` for the actual animation target, then animate the inner spans with GSAP stagger. No `data-split-text` attribute needed — just target `.section-title` directly in JS.

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
- Increase section padding from 104px to 130px on desktop
- Mobile section padding: increase from 72px to 88px (proportional)
- Bio line-height: 1.85 (already set, keep it)

### Color System
- Hero: pure white/opacity only, zero cyan
- Rest of site: cyan used sparingly for functional/interactive purposes only:
  - Portfolio filter active state underline
  - Form input focus border
  - Interactive hover accents (nav CTA hover, social link hover)
- Remove cyan from all decorative/static uses: section labels, about subtitle, skill tags, card tags, gradient lines
- Footer link hover: white at 50% opacity (not cyan)
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
