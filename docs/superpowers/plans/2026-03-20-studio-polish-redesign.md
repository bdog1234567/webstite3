# Studio Polish Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Nohea Media portfolio site to match the polish level of professional VFX studio sites (Overture, Golden.la, ILP) through refined typography, opacity-based color hierarchy, full-bleed hero video, and premium GSAP/Lenis scroll animations.

**Architecture:** Single-page static site (HTML/CSS/JS). All changes are in-place modifications to `index.html`, `style.css`, and `script.js`. Two CDN dependencies added (Lenis, GSAP+ScrollTrigger). No build tools, no framework.

**Tech Stack:** HTML5, CSS3 (custom properties, clamp, backdrop-filter), vanilla JS, GSAP 3 + ScrollTrigger, Lenis smooth scroll.

**Spec:** `docs/superpowers/specs/2026-03-20-studio-polish-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `index.html` | Modify | Hero restructure, CDN script tags, portfolio card restructure, about photo swap + skills markup |
| `style.css` | Modify | Full restyle — hero, nav, portfolio, about, contact, footer, global typography/spacing/color |
| `script.js` | Modify | Lenis init, GSAP ScrollTrigger animations, hero entrance timeline, word splitting, remove CSS reveal system |

---

### Task 1: Add CDN Dependencies

**Files:**
- Modify: `index.html:418` (before the `script.js` tag)

- [ ] **Step 1: Add Lenis and GSAP script tags to index.html**

Before the existing `<script src="script.js"></script>` line, add:

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

- [ ] **Step 2: Verify scripts load**

Open the site in a browser, check the DevTools console for no 404 errors on the CDN scripts. Verify `window.Lenis`, `window.gsap`, and `window.ScrollTrigger` are defined.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "chore: add Lenis and GSAP CDN dependencies"
```

---

### Task 2: CSS Global Foundation — Custom Properties, Easing, Spacing, Typography

**Files:**
- Modify: `style.css:1-87` (custom properties, reset, layout, typography sections)

- [ ] **Step 1: Update CSS custom properties**

In the `:root` block, make these changes:
- Change `--nav-h` from `68px` to `64px`
- Change `--ease` from `cubic-bezier(0.4, 0, 0.2, 1)` to `cubic-bezier(0.23, 1, 0.32, 1)`

- [ ] **Step 2: Remove `scroll-behavior: smooth`**

Remove `scroll-behavior: smooth;` from the `html` rule (line 32). Lenis will handle smooth scrolling.

- [ ] **Step 3: Update section padding**

Change `section { padding: 104px 0; }` to `section { padding: 130px 0; }`.

- [ ] **Step 4: Update section label styling**

In `.section-label`:
- Change `color: var(--accent)` to `color: rgba(255, 255, 255, 0.35)`

Remove the entire `.section-label::before` rule (the dash line before labels).

- [ ] **Step 5: Update responsive section padding**

In the `@media (max-width: 768px)` block, change `section { padding: 72px 0; }` to `section { padding: 88px 0; }`.

- [ ] **Step 6: Commit**

```bash
git add style.css
git commit -m "style: update global foundation — easing, spacing, typography, remove cyan labels"
```

---

### Task 3: Hero HTML Restructure

**Files:**
- Modify: `index.html:60-87` (hero section)

- [ ] **Step 1: Replace the hero section HTML**

Replace the entire `<section id="hero">` content with:

```html
<section id="hero" aria-label="Hero">
  <div class="hero-bg" aria-hidden="true">
    <video class="hero-video" src="Nomosaic4.mp4" autoplay muted loop playsinline></video>
    <div class="hero-gradient"></div>
    <div class="hero-grain"></div>
  </div>

  <div class="hero-content">
    <p class="hero-label">VFX &nbsp;·&nbsp; AI GENERATIVE &nbsp;·&nbsp; FILM</p>
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

  <div class="hero-scroll" aria-hidden="true">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

Key changes from current HTML:
- Video is now inside `.hero-bg` (was inside `.hero-mask-group`)
- Logo and title are direct children of `.hero-content` (no mask group wrapper)
- New `<hr class="hero-divider">` between title and name
- Button classes changed to `btn-hero-primary` and `btn-hero-ghost`

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: restructure hero HTML for full-bleed video layout"
```

---

### Task 4: Hero CSS Restyle

**Files:**
- Modify: `style.css:217-391` (hero section CSS)

- [ ] **Step 1: Restyle the hero background**

Replace the `.hero-video` styles. The video should now be full-bleed:

```css
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
```

Replace the `.hero-gradient` styles. Remove the radial gradients and `pulseGlow` animation, use a linear darkening gradient:

```css
.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(6, 6, 8, 0.3) 0%,
    rgba(6, 6, 8, 0.1) 40%,
    rgba(6, 6, 8, 0.5) 85%,
    rgba(6, 6, 8, 0.95) 100%
  );
  z-index: 1;
}
```

Remove the `@keyframes pulseGlow` rule entirely.

- [ ] **Step 2: Reduce film grain opacity**

Change `.hero-grain` opacity from `0.5` to `0.3`. Add `z-index: 2;` to ensure it layers above the gradient.

- [ ] **Step 3: Restyle hero content elements**

Update `.hero-content` to have `z-index: 3` (above grain).

Update `.hero-label`:
- Change `color` to `rgba(255, 255, 255, 0.4)`
- Change `letter-spacing` to `0.5em`
- Remove the CSS `animation` property (GSAP will handle this)
- Set `opacity: 0` (GSAP will animate in)

Update `.hero-logo`:
- Keep `filter: invert(1)`
- Change `height` to `clamp(100px, 14vw, 180px)`
- Remove the CSS `animation` property
- Set `opacity: 0`

Update `.hero-title`:
- Change `font-size` to `clamp(56px, 10vw, 120px)`
- Change `letter-spacing` to `-0.02em`
- Remove the CSS `animation` property
- Set `opacity: 0`

- [ ] **Step 4: Add hero divider styles**

Add new styles for the `<hr>` divider:

```css
.hero-divider {
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  margin: 18px auto;
  opacity: 0;
}
```

- [ ] **Step 5: Update remaining hero content styles**

Update `.hero-name`:
- Change `color` to `rgba(255, 255, 255, 0.45)`
- Remove the CSS `animation` property
- Set `opacity: 0`

Update `.hero-tagline`:
- Change `color` to `rgba(255, 255, 255, 0.3)`
- Remove the CSS `animation` property
- Set `opacity: 0`

Update `.hero-actions`:
- Remove the CSS `animation` property
- Set `opacity: 0`

- [ ] **Step 6: Add hero button styles**

Remove the old `.hero-mask-group`, `.hero-mask-overlay` CSS rules entirely. Add new hero button styles:

```css
.btn-hero-primary {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}
.btn-hero-primary:hover {
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.08);
}
.btn-hero-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.btn-hero-ghost:hover {
  color: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}
```

- [ ] **Step 7: Update scroll indicator**

Update `.hero-scroll span` color to `rgba(255, 255, 255, 0.15)`.
Update `.scroll-line` background to `linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, transparent 100%)`.

Remove the `@keyframes fadeUp` reference from `.hero-scroll` — set `opacity: 0` instead (GSAP will handle).

- [ ] **Step 8: Verify hero visually**

Open the site. The hero should show the video full-bleed behind the content. All hero text should be invisible (opacity: 0) since GSAP isn't wired up yet — that's expected. The gradient should darken the bottom of the hero.

- [ ] **Step 9: Commit**

```bash
git add style.css
git commit -m "style: restyle hero — full-bleed video, opacity hierarchy, ghost buttons"
```

---

### Task 5: Navigation CSS Refinements

**Files:**
- Modify: `style.css:124-213` (navigation section)

- [ ] **Step 1: Update nav styles**

Update `.nav-logo`:
- Change `color` to `rgba(255, 255, 255, 0.85)`

Update `.nav-links a`:
- Change `color` to `rgba(255, 255, 255, 0.4)`
- Change `font-size` to `0.75rem`

Update `.nav-logo:hover`:
- Change `color` from `var(--accent)` to `rgba(255, 255, 255, 1)`

Update `.nav-links a:hover`:
- Change `color` to `rgba(255, 255, 255, 0.85)`

Update `.nav-links a.active-link`:
- Change `color` to `rgba(255, 255, 255, 0.85)`

- [ ] **Step 2: Restyle nav CTA**

Replace the `.nav-cta` and `.nav-cta:hover` rules:

```css
.nav-cta {
  padding: 7px 18px !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 2px;
  color: rgba(255, 255, 255, 0.6) !important;
  transition: all var(--t) !important;
}
.nav-cta:hover {
  border-color: var(--accent) !important;
  color: var(--accent) !important;
  background: transparent !important;
}
```

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: refine nav — reduce weight, white opacity hierarchy, cyan hover CTA"
```

---

### Task 6: Portfolio HTML Restructure

**Files:**
- Modify: `index.html:104-241` (portfolio grid cards)

- [ ] **Step 1: Restructure all 7 portfolio cards**

For each card, apply these changes:
1. Remove the `portrait` class from Cards 1 and 2
2. Remove the `reveal`, `reveal-delay-1`, `reveal-delay-2` classes (GSAP replaces these)
3. Move `.card-info` content (tag + title only, not desc) into a new `.card-info-overlay` div inside `.card-thumbnail`
4. Remove the `.card-info` div and `.card-desc` elements

Example of Card 1 after restructuring:

```html
<article class="portfolio-card" data-category="ai" data-video-id="crHRXVX3aHU">
  <div class="card-media">
    <div class="card-thumbnail">
      <img src="" alt="H&amp;M Spec Ad" class="thumb-img" loading="lazy" />
      <div class="card-overlay">
        <button class="play-btn" aria-label="Play H&amp;M Spec Ad">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <div class="card-info-overlay">
        <span class="card-tag">AI Generative</span>
        <h3 class="card-title">H&amp;M Spec Ad</h3>
      </div>
    </div>
  </div>
</article>
```

Apply the same pattern to all 7 cards:
- Card 2: Saint Laurent Spec Ad (AI, `mf-8dzWB6WU`)
- Card 3: South Bay Real Estate Spec Ad (AI, `7QEYkuHp5iA`)
- Card 4: Fire VFX (VFX, `ACfLZuihFbk`)
- Card 5: 3D Tracking (VFX, `tlSXv_czMxo`)
- Card 6: Director Reel (Editing, `-38tTSXcPxs`)
- Card 7: Logo Animation (Editing, `QGd1htOqKSw`)

- [ ] **Step 2: Remove `reveal` classes from portfolio section header and filters**

Remove `reveal`, `reveal-delay-1` classes from the section header div and the portfolio filters div. GSAP will handle these animations.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: restructure portfolio cards — overlay info, uniform 16:9, remove CSS reveal classes"
```

---

### Task 7: Portfolio CSS Restyle

**Files:**
- Modify: `style.css:393-570` (portfolio section CSS)

- [ ] **Step 1: Update portfolio grid**

Change `.portfolio-grid` gap from `22px` to `16px`.

- [ ] **Step 2: Update card base styles**

Update `.portfolio-card`:
- Remove `border: 1px solid var(--border)`
- Change `border-radius` to `4px`

Update `.portfolio-card:hover`:
- Remove the `border-color` and complex `box-shadow` — replace with `box-shadow: 0 18px 52px rgba(0,0,0,0.65), 0 0 30px rgba(0, 200, 255, 0.04)`

Remove the `.portfolio-card.portrait .card-media` rule entirely (no more portrait cards).

- [ ] **Step 3: Update card media and thumbnail hover**

Change `.portfolio-card:hover .thumb-img` transform from `scale(1.04)` to `scale(1.02)`.

Remove the `.card-thumbnail:not(:has(...))::before` fallback rule (keep it simple).

- [ ] **Step 4: Add card info overlay styles**

Add new CSS for the info overlay inside the thumbnail:

```css
.card-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 16px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  z-index: 2;
  pointer-events: none;
}
```

- [ ] **Step 5: Update card tag and title styles for overlay**

Update `.card-tag`:
- Change `color` to `rgba(255, 255, 255, 0.4)`
- Remove `display: inline-block` (it's inside the overlay now)

Update `.card-title`:
- Change `color` to `rgba(255, 255, 255, 0.9)`
- Change `font-weight` to `500`

Remove the `.card-info` padding rule. Remove `.card-desc` styles entirely.

- [ ] **Step 6: Restyle play button**

Replace `.play-btn` styles:

```css
.play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--t) var(--ease);
}
.play-btn:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.1);
  transform: scale(1.08);
}
.play-btn svg {
  width: 18px;
  height: 18px;
  fill: rgba(255, 255, 255, 0.9);
  margin-left: 2px;
}
```

- [ ] **Step 7: Restyle filter buttons**

Replace `.filter-btn`, `.filter-btn:hover`, `.filter-btn.active` styles:

```css
.filter-btn {
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  color: rgba(255, 255, 255, 0.3);
  padding: 8px 4px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0;
  transition: all var(--t) var(--ease);
}
.filter-btn:hover {
  color: rgba(255, 255, 255, 0.6);
}
.filter-btn.active {
  color: rgba(255, 255, 255, 0.85);
  border-bottom-color: var(--accent);
  background: none;
  box-shadow: none;
}
```

Update `.portfolio-filters` gap from `6px` to `16px`.

- [ ] **Step 8: Verify portfolio visually**

Open the site. Portfolio should show a clean 2-column grid of 16:9 cards with no borders. Info text should overlay at the bottom of each thumbnail. Filters should be text-based tabs. Play buttons should be frosted glass.

- [ ] **Step 9: Commit**

```bash
git add style.css
git commit -m "style: restyle portfolio — overlay info, ghost play btn, text filters, no borders"
```

---

### Task 8: About Section — HTML Changes

**Files:**
- Modify: `index.html:245-297` (about section)

- [ ] **Step 1: Replace placeholder with real photo**

In the about section, replace the placeholder div:

```html
<div class="about-img-placeholder" aria-hidden="true">
  <span>BRADEN<br>DI MAURO</span>
</div>
```

with the real photo:

```html
<img src="2G9A5895-2.JPEG" alt="Braden Di Mauro" />
```

- [ ] **Step 2: Replace skills pill badges with dot-separated text**

Change the existing `<p class="skills-label">` text from "Tools &amp; Skills" to "Expertise". Then replace the entire `.skills-grid` div and its skill-tag children with:

```html
<p class="skills-text">
  After Effects <span class="skills-dot">·</span>
  Nuke <span class="skills-dot">·</span>
  DaVinci Resolve <span class="skills-dot">·</span>
  Cinema 4D <span class="skills-dot">·</span>
  Runway ML <span class="skills-dot">·</span>
  Kling AI <span class="skills-dot">·</span>
  Sora <span class="skills-dot">·</span>
  Midjourney <span class="skills-dot">·</span>
  Photoshop <span class="skills-dot">·</span>
  Compositing <span class="skills-dot">·</span>
  Motion Graphics <span class="skills-dot">·</span>
  Color Grading
</p>
```

- [ ] **Step 3: Remove `reveal` classes from about section elements**

Remove all `reveal`, `reveal-delay-1`, `reveal-delay-2`, `reveal-delay-3` classes from the about section. GSAP will handle these.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: swap about placeholder for real photo, replace skill pills with dot-separated text"
```

---

### Task 9: About Section — CSS Restyle

**Files:**
- Modify: `style.css:572-675` (about section CSS)

- [ ] **Step 1: Remove about image accent line**

Remove the entire `.about-image::before` rule (the gradient line above the photo).

- [ ] **Step 2: Update about image styling**

Update `.about-image img`:
- Change `filter` to `grayscale(15%)`
- Keep aspect-ratio, object-fit, border-radius, border

Remove the `.about-img-placeholder` and `.about-img-placeholder span` rules entirely (placeholder is gone).

- [ ] **Step 3: Update about typography**

Update `.about-subtitle`:
- Change `color` to `rgba(255, 255, 255, 0.4)`

Update `.about-bio`:
- Change `color` to `rgba(255, 255, 255, 0.45)`

Update `.skills-label`:
- Change `color` to `rgba(255, 255, 255, 0.2)`

- [ ] **Step 4: Restyle about CTA as ghost button**

The about section "Work With Me" button uses `.btn-primary`. Add an about-specific override. In `index.html`, add the class `btn-about` to the about CTA link (alongside `btn btn-primary`). Then add CSS:

```css
.btn-about {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}
.btn-about:hover {
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  background: transparent;
}
```

- [ ] **Step 5: Add skills text styles and remove old skill-tag styles**

Remove `.skills-grid`, `.skill-tag`, and `.skill-tag:hover` styles entirely. Add:

```css
.skills-text {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.35);
  line-height: 2;
  margin-bottom: 38px;
}
.skills-dot {
  color: rgba(255, 255, 255, 0.15);
  margin: 0 4px;
}
```

- [ ] **Step 5: Commit**

```bash
git add style.css
git commit -m "style: restyle about — remove accent line, opacity typography, dot-separated skills"
```

---

### Task 10: Contact Section Restyle

**Files:**
- Modify: `style.css:677-851` (contact section CSS)
- Modify: `index.html` (remove contact-top-line div, remove reveal classes)

- [ ] **Step 1: Remove gradient top line**

Remove the `.contact-top-line` CSS rule. In `index.html`, remove the `<div class="contact-top-line" aria-hidden="true"></div>` element.

- [ ] **Step 2: Update contact typography**

Update `.contact-info .section-title`:
- Already inherits the white color, no change needed.

Update `.contact-tagline`:
- Change `color` to `rgba(255, 255, 255, 0.4)`

- [ ] **Step 3: Update contact detail link**

Update `.contact-detail`:
- Change `color` to `rgba(255, 255, 255, 0.4)`

Update `.contact-detail:hover`:
- Keep `color: var(--accent)` (functional interactive use)

- [ ] **Step 4: Restyle social links as icon-only**

Update `.social-link`:
- Change dimensions: `width: 36px; height: 36px; padding: 0;`
- Add `justify-content: center`
- Add `font-size: 0` to visually hide text (keeps it for screen readers)
- Change `gap` to `0`

Update `.social-link svg`:
- Change `width` and `height` to `15px`

Update `.social-link:hover`:
- Keep cyan hover (`border-color: var(--accent); color: var(--accent)`)

- [ ] **Step 5: Update form styles**

Update `.form-group input, .form-group textarea, .form-group select`:
- Change `border` to `1px solid rgba(255, 255, 255, 0.035)`
- Change `padding` to `15px`

Update `.form-group label`:
- Change `color` to `rgba(255, 255, 255, 0.4)`

Update `.form-group input::placeholder, .form-group textarea::placeholder`:
- Change `color` to `rgba(255, 255, 255, 0.2)`

Keep `.form-group input:focus` etc. with `border-color: var(--accent)` (functional use).

- [ ] **Step 6: Restyle submit button as ghost**

The spec says the submit button should be ghost-style. Add a new rule to override `.btn-primary` when used as `.form-submit`:

```css
.form-submit {
  width: 100%;
  justify-content: center;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}
.form-submit:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
}

- [ ] **Step 7: Remove `reveal` classes from contact section elements**

In `index.html`, remove all `reveal`, `reveal-delay-1`, `reveal-delay-2`, `reveal-delay-3` classes from the contact section elements.

- [ ] **Step 8: Commit**

```bash
git add index.html style.css
git commit -m "style: restyle contact — remove gradient line, icon-only socials, refined form"
```

---

### Task 11: Footer CSS Restyle

**Files:**
- Modify: `style.css:853-906` (footer CSS)

- [ ] **Step 1: Update footer styles**

Update `footer`:
- Remove `border-top: 1px solid var(--border)`

Update `.footer-logo-img`:
- Change `opacity` from `0.5` to `0.4`

Update `.footer-copy`:
- Change `color` to `rgba(255, 255, 255, 0.15)`

Update `.footer-links a`:
- Change `color` to `rgba(255, 255, 255, 0.2)`

Update `.footer-links a:hover`:
- Change `color` from `var(--accent)` to `rgba(255, 255, 255, 0.5)`

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle footer — remove border, reduce visual weight"
```

---

### Task 12: CSS Cleanup — Remove Unused Rules and Animations

**Files:**
- Modify: `style.css` (various locations)

- [ ] **Step 1: Remove unused CSS**

Remove these CSS rules that are no longer used:
- `@keyframes pulseGlow` (hero gradient animation — removed)
- `@keyframes fadeUp` (replaced by GSAP)
- `@keyframes fadeIn` (replaced by GSAP)
- `.reveal`, `.reveal.is-visible`, `.reveal-delay-1`, `.reveal-delay-2`, `.reveal-delay-3` (replaced by GSAP ScrollTrigger)
- `.hero-mask-group`, `.hero-mask-overlay` (removed from HTML)
- `.portfolio-card.portrait .card-media` (no more portrait cards)
- `.card-info` (replaced by `.card-info-overlay`)
- `.card-desc` (removed from HTML)
- `.about-img-placeholder`, `.about-img-placeholder span` (removed from HTML)
- `.about-image::before { display: none; }` in the `@media (max-width: 960px)` block (orphaned after base rule removal)
- `.skills-grid`, `.skill-tag`, `.skill-tag:hover` (replaced by `.skills-text`)
- `.contact-top-line` (removed from HTML)

Keep `@keyframes grainShift` (still used for film grain) and `@keyframes scrollPulse` (still used for scroll indicator).

- [ ] **Step 2: Verify no broken styles**

Open the site and check each section for visual regressions. All sections should render correctly with the new styling (though scroll animations won't work yet — that's Task 13).

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "chore: remove unused CSS rules replaced by new design"
```

---

### Task 13: JavaScript — Lenis + GSAP Setup, Hero Animation, ScrollTrigger

**Files:**
- Modify: `script.js` (full rewrite of animation system)

- [ ] **Step 1: Add Lenis smooth scroll initialization**

At the top of `script.js` (after `'use strict';` and the footer year code), add:

```javascript
/* ============================================================
   LENIS SMOOTH SCROLL
   ============================================================ */
const isTouchDevice = 'ontouchstart' in window;
let lenis;

if (!isTouchDevice) {
  lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
} else {
  ScrollTrigger.normalizeScroll(true);
}
```

- [ ] **Step 2: Register ScrollTrigger and add word-splitting utility**

Add after Lenis init:

```javascript
/* ============================================================
   GSAP SCROLLTRIGGER SETUP
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* Utility: split element text into word spans for animation */
function splitWords(el) {
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.innerHTML = words.map(word =>
    `<span style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${word}</span></span>`
  ).join(' ');
  return el.querySelectorAll('.word-inner');
}
```

- [ ] **Step 3: Add hero entrance timeline**

Add the GSAP timeline for the hero entrance animation:

All hero elements start at `opacity: 0` in CSS. The GSAP timeline uses `.fromTo()` for clarity:

```javascript
/* ============================================================
   HERO ENTRANCE ANIMATION
   ============================================================ */
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .fromTo('.hero-label',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  .fromTo('.hero-logo',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45')
  .fromTo('.hero-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')
  .fromTo('.hero-divider',
    { opacity: 0, scaleX: 0 },
    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.6')
  .fromTo('.hero-name',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-tagline',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-actions',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2');
```

- [ ] **Step 4: Add scroll-triggered animations**

Replace the existing `revealObserver` IntersectionObserver code with GSAP ScrollTrigger animations:

```javascript
/* ============================================================
   SCROLL-TRIGGERED ANIMATIONS
   ============================================================ */

/* Section titles — word-by-word reveal */
document.querySelectorAll('.section-title').forEach(title => {
  const words = splitWords(title);
  gsap.from(words, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      once: true,
    },
  });
});

/* Section labels — fade in */
document.querySelectorAll('.section-label').forEach(label => {
  gsap.from(label, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: label,
      start: 'top 85%',
      once: true,
    },
  });
});

/* Portfolio cards — staggered fade up */
gsap.from('.portfolio-card', {
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-grid',
    start: 'top 85%',
    once: true,
  },
});

/* Portfolio filters — fade in */
gsap.from('.portfolio-filters', {
  y: 20,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-filters',
    start: 'top 85%',
    once: true,
  },
});

/* About section — sequential reveal */
const aboutElements = document.querySelectorAll('.about-content > *');
gsap.from(aboutElements, {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-content',
    start: 'top 85%',
    once: true,
  },
});

/* About image — fade in */
gsap.from('.about-image', {
  y: 30,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-image',
    start: 'top 85%',
    once: true,
  },
});

/* Contact info — fade up */
gsap.from('.contact-info > *', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-info',
    start: 'top 85%',
    once: true,
  },
});

/* Contact form — fade up */
gsap.from('.contact-form-wrapper', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-form-wrapper',
    start: 'top 85%',
    once: true,
  },
});
```

- [ ] **Step 5: Remove old IntersectionObserver reveal code**

Delete the entire `SCROLL REVEAL — Intersection Observer` section from `script.js` (the `revealObserver` and `document.querySelectorAll('.reveal').forEach(...)` code).

- [ ] **Step 6: Verify all animations**

Open the site and scroll through. Check:
- Hero entrance: staggered animation plays on page load
- Section titles: words slide up individually as you scroll
- Portfolio cards: fade up with stagger
- About section: content reveals sequentially
- Contact section: info and form fade up
- Smooth scroll: page scrolls smoothly (desktop only)

- [ ] **Step 7: Commit**

```bash
git add script.js
git commit -m "feat: add Lenis smooth scroll, GSAP hero animation and ScrollTrigger reveals"
```

---

### Task 14: Final Visual QA and Polish

**Files:**
- Possibly modify: `style.css`, `script.js` (minor tweaks)

- [ ] **Step 1: Desktop QA**

Open the site at full desktop width. Check each section:
- Hero: full-bleed video, logo visible, text hierarchy correct, buttons work
- Nav: transparent over hero, frosted glass on scroll, CTA hover shows cyan
- Portfolio: clean 16:9 grid, thumbnails load from YouTube, play buttons work, filters work
- About: real photo displays, skills as dot-separated text, CTA works
- Contact: no gradient top line, form inputs styled, social icons are icon-only squares
- Footer: no top border, reduced opacity text
- Scroll: smooth (Lenis), all reveal animations fire once

- [ ] **Step 2: Mobile QA**

Resize to mobile width (375px). Check:
- Hero: video still plays, text is readable and properly sized
- Nav: hamburger menu works, links open/close correctly
- Portfolio: single column grid
- About: photo switches to 16:9 aspect, content stacks vertically
- Contact: form is full width, social icons stack
- All text is legible, nothing overflows

- [ ] **Step 3: Fix any issues found**

Make adjustments as needed. Common issues to watch for:
- Hero text too large or too small at certain viewport widths
- Portfolio card overlay text hard to read over certain thumbnails
- Touch device smooth scroll issues (should be disabled)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "polish: final QA adjustments for studio polish redesign"
```
