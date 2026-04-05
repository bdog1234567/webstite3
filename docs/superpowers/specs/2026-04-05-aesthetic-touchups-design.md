# Aesthetic Touch-Ups — Design Spec
_2026-04-05_

## Summary

Eight CSS-only refinements to style.css. No HTML or JS changes. All touch-ups extend the existing dark cinematic design system without altering structure or layout.

---

## Changes

### A — Editorial Typography

1. **Section label accent line** — Add `::before` pseudo-element to `.section-label` with `width: 28px; height: 1px; background: var(--accent)`. Appears as a short pink horizontal line to the left of every section label.

2. **Active nav dot** — Add `::after` pseudo-element to `.nav-links a.active-link` rendering a 4px pink dot centered below the text. Replaces relying solely on color change to indicate active section.

### B — Portfolio Drama

3. **Stronger card hover glow** — On `.portfolio-card:hover`, bump the pink bloom in `box-shadow` from `rgba(255,107,157,0.04)` to `rgba(255,107,157,0.14)`.

4. **Play button accent on card hover** — Add `.portfolio-card:hover .play-btn` rule that applies the same pink border/background/glow as the existing `.play-btn:hover` rule. Entire card hover activates it.

5. **Card tag accent on card hover** — Add `.portfolio-card:hover .card-tag` rule setting `color: var(--accent)`. Currently stays muted regardless of hover state.

### C — Detail & Depth

6. **About photo corner bracket** — Add `::after` pseudo-element to `.about-image` with two perpendicular pink lines (top-right L-shape, `36px × 1px` + `1px × 36px`) positioned at `top: -6px; right: -6px`. Requires `.about-image { position: relative; overflow: visible; }`.

7. **Hero video full-bleed** — Change `.hero-video` from `object-fit: contain` to `object-fit: cover`. Removes letterbox bars, fills full viewport.

8. **Footer accent border** — Add `border-top: 1px solid rgba(255,107,157,0.2)` to the `footer` rule. Provides a subtle visual separation from the contact section.

---

## Constraints

- All changes confined to `style.css`
- No new classes, no HTML edits
- Must not break existing responsive breakpoints
