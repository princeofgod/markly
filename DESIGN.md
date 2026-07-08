---
name: Markly Africa
description: AI-assisted legal, compliance, and IP advisory — the record of a draft reviewed and countersigned by a human expert.
colors:
  deep-purple: "#2D106C"
  signal-orange: "#FE5F1B"
  soft-off-white: "#FAF8FF"
  paper-white: "#FFFFFF"
  slate-muted: "#64748B"
  hairline-border: "#E2E8F0"
typography:
  display:
    fontFamily: "Playfair Display, ui-serif, serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  headline:
    fontFamily: "Playfair Display, ui-serif, serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Playfair Display, ui-serif, serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  pill: "9999px"
  lg: "16px"
  md: "12px"
  sm: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.deep-purple}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.deep-purple}"
    textColor: "{colors.soft-off-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.soft-off-white}"
    textColor: "{colors.deep-purple}"
    rounded: "{rounded.lg}"
    padding: "24px"
  nav-link:
    textColor: "{colors.deep-purple}"
    typography: "{typography.body}"
    padding: "0 0 4px 0"
---

# Design System: Markly Africa

## Overview

**Creative North Star: "The Countersigned Draft"**

Markly's whole trust proposition is a single fact: an AI drafts, a qualified human reviews and countersigns, and nothing reaches the client that a person hasn't put their name behind. The visual system is built to look like the paper trail of that process — filings, exhibits, schedules, redlines, seals — rather than the interface of a SaaS tool that happens to talk about compliance. Every page should read like a document under active review: something drafted quickly, then marked up, corrected, and formally approved.

This is not a startup dashboard wearing legal-industry copy. It rejects both failure modes named in PRODUCT.md: the "generic AI-startup SaaS template" (gradient text, hero-metric stat blocks, icon-in-a-circle card grids, tiny tracked eyebrows above every heading) and the "stodgy traditional law-firm site" (navy-and-gold, handshake stock photography, dense text walls, no visual personality). Markly sits in the gap between them — modern and technology-enabled, but carrying the gravity and precision of an actual legal instrument.

Deep purple is the register of authority: identity, headings, structure. Orange is used the way a reviewing lawyer's pen is used — sparingly, to mark, correct, and flag, never as a surface. The redline strike (an AI-drafted line struck through next to its human-corrected replacement) is the system's signature device and should recur wherever a "before/after" or "draft/reviewed" moment is plausible, not just once in a hero.

**Key Characteristics:**
- Legal/compliance vernacular over tech iconography — exhibits, schedules, seals, registration marks, § section numbers, not rockets or gears.
- Purple carries identity; orange marks correction and action, at roughly 10% of any surface.
- Section-to-section structure varies by what's being communicated — no repeated eyebrow-heading-card-grid template.
- Motion demonstrates the "AI drafts, human reviews" claim (the redline strike drawing itself, a seal stamping in) rather than decorating unrelated content.

## Colors

The palette is intentionally narrow — two brand colors plus off-white and near-black-purple text, held to a strict usage ratio so neither color is ever ambient wallpaper.

### Primary
- **Deep Purple** (`#2D106C`): The brand's identity color. Used for headings, body emphasis, primary text, navigation, borders, icons, and secondary-button treatments. Never used as a full-bleed background for more than one section in a row — it reads as authority precisely because it's not everywhere.

### Secondary
- **Signal Orange** (`#FE5F1B`): The mark of review and action — primary CTA backgrounds, the redline-strike stroke, active-state underlines, small accent chips. Held to roughly 10% of any given surface. Never used as text color on light backgrounds (`#FAF8FF` / `#FFFFFF`) — the contrast fails outright (~2.9:1). On `#2D106C` it clears AA (4.90:1) and is safe for icon and accent use inside dark-purple sections.

### Neutral
- **Soft Off-White** (`#FAF8FF`): The primary page background and the default reading surface. Roughly 70% of any page by area.
- **Paper White** (`#FFFFFF`): The alternate surface used to separate adjacent sections without introducing a third hue — a "second sheet of paper," not a different material.
- **Slate Muted** (`#64748B`): Secondary/supporting text — captions, timestamps, de-emphasized copy. Never used for body copy that must carry primary meaning.
- **Hairline Border** (`#E2E8F0`): Dividers and row rules — the ruled lines of a schedule or ledger, not decorative card outlines.

### Named Rules
**The Pen, Not the Paint Rule.** Orange marks a specific correction, action, or moment of attention — like ink from a reviewing pen — and never becomes a surface, a background wash, or body text. If orange is covering more than a CTA, an icon, or a strike-line, it's being used wrong.

**The One Dark Section Rule.** `#2D106C` as a full-section background is a deliberate, occasional gravity anchor (the footer, one feature moment) — not a repeating alternation with the light sections. Stacking two purple-background sections back to back flattens its impact.

## Typography

**Display Font:** Playfair Display (with ui-serif, serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif fallback)

**Character:** A high-contrast serif for editorial, declarative moments (headlines, pull-statements, exhibit labels) paired with a neutral, highly legible grotesque for everything that has to be read quickly and accurately — the same pairing logic as a formal document: a serif masthead over sans-serif body clauses. The pairing itself enacts the brand thesis: a confident, human "signature" face over a precise, systematic "working" face.

### Hierarchy
- **Display** (700, 64px / `text-4xl`, 1.15 line-height): Hero statements only. One per page.
- **Headline** (700, 48px / `text-3xl`, 1.2 line-height): Section H2s.
- **Title** (600, 32px / `text-2xl`, 1.3 line-height): Section H3s, card/row titles.
- **Body** (400, 16px / `text-base`, 1.5 line-height, capped 65–75ch): Paragraph copy, descriptions.
- **Label** (600, 14px / `text-sm`, 0.02em tracking): Captions, exhibit/schedule labels, nav items, button text. Uppercase only for true labels (nav, eyebrows), never for full sentences.

Playfair Display is also used in-line, italic, at body/lead sizes (`text-lg italic`) for the "human-corrected" half of a redline pairing — italic Playfair signals "this is the considered, reviewed version" distinctly from the struck-through sans-serif draft next to it.

### Named Rules
**The Two-Voice Rule.** Playfair Display speaks in declarations (headlines, verdicts, corrected text); Inter speaks in explanation (body copy, captions, UI). If a sentence is explaining something, it's Inter. If it's asserting something, it's Playfair.

## Elevation

The system is layered, not lifted. Depth comes from paper-stacking (off-white sections against white sections, purple sections as the "different material" beneath) and ruled hairline borders — not drop shadows. Shadows exist but are reserved for genuinely floating UI (mobile menu overlay, hover states on interactive cards), where they signal "this is temporarily above the page," not general decoration.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 2px rgba(45,16,108,0.05)` / `shadow-sm`): Default state for card-shaped components that need to read as a distinct object.
- **Hover / active lift** (`box-shadow: 0 4px 12px rgba(45,16,108,0.1)` / `shadow-md`): Card hover states, the mobile menu sheet — a small, honest lift, not a glow.

### Named Rules
**The Ruled-Line Rule.** Where a SaaS site would use a shadowed card to separate items, Markly uses a hairline border (`#E2E8F0`) — the visual grammar of a ruled schedule or ledger, not a floating tile.

## Components

### Buttons
- **Shape:** Fully rounded (`rounded-full`, 9999px) — a stamp/seal silhouette, not a rectangular app button.
- **Primary:** Orange background (`#FE5F1B`), white text, semibold, ≥16px (`text-base font-semibold`). Hover inverts to deep purple background. This is the only place orange fills a shape larger than an icon chip.
- **Secondary:** Transparent with a 2px deep-purple border and purple text; hover fills solid purple with off-white/surface text. Used for lower-emphasis actions ("Explore All Services") that shouldn't compete with the primary CTA.
- **Hover / Focus:** All buttons use `transition-all duration-300 ease-in-out`, `active:scale-[0.98]` on press, and a visible 2px offset focus ring in the button's own color family (`focus-visible:outline-accent` on primary, `focus-visible:outline-primary` on secondary). Never remove the focus ring.

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl`) for feature/callout containers (e.g. the WhyChooseUs featured block, BrandPositioning panel); 12px (`rounded-xl`) for small icon chips; 8px (`rounded-lg`) for compact interactive rows (mobile menu items).
- **Background:** Off-white or white surface, occasionally solid deep purple for a single featured moment per page.
- **Shadow Strategy:** Resting cards use `shadow-sm`; interactive/hover cards escalate to `shadow-md`. See Elevation.
- **Border:** 1px `hairline-border` (`#E2E8F0`) on light-surface cards; `primary/15` (purple at 15% opacity) on the featured panel variant.
- **Internal Padding:** 24–40px (`p-6` to `p-10`), following the 8px grid.

### Schedule / Exhibit Rows (Signature Component)
The system's default alternative to a card grid: content presented as rows in a ruled schedule, each with a small structural label (`§01`, `§02...` for services; `Exhibit A`, `Exhibit B...` for value pillars) instead of a decorative icon-in-circle. Rows sit inside a `border-t` container, each row separated by a `border-b border-border-subtle` hairline, with generous vertical padding (40–48px) so the rhythm reads as a formal register, not a compressed list. This is where the redline motif lives: a struck-through "problem" line (`line-through decoration-accent decoration-1`, muted color) sits directly above its italic Playfair "solution" line, dramatizing draft → correction inline. Rows reveal on scroll (`[data-reveal]`, staggered `transition-delay` per row) rather than all at once, echoing documents being reviewed one at a time.

### Navigation
- **Style:** Sticky top bar, off-white at 95% opacity with backdrop blur, hairline bottom border. Wordmark in Playfair Display semibold; nav links in Inter medium with an animated orange underline that draws in on hover/active (`after:` pseudo-element, width 0 → 100%). Primary CTA button always visible at desktop widths.
- **Mobile:** Collapses to a rounded icon-button trigger (`rounded-lg`) opening a full-width sheet below the header (`shadow-md`, off-white background), links stacked with generous tap targets and a light orange-tint hover state.

## Do's and Don'ts

### Do:
- **Do** use legal/compliance vernacular for structural devices — `§` section numbers, "Exhibit A/B/C" labels, "Schedule" framing, ruled hairline rows — instead of generic tech iconography (rockets, gears, abstract blobs) or bare numbered scaffolding.
- **Do** demonstrate "AI drafts, human reviews" visually wherever plausible — the redline strike (struck-through draft text beside italic Playfair corrected text), the seal-in stamp motion — rather than asserting the claim once in a paragraph.
- **Do** vary layout structure section to section based on what that section is actually communicating; a single eyebrow-heading-card-grid pattern reused repeatedly is the generic-template failure mode this system explicitly rejects.
- **Do** hold orange to ~10% of any surface, used only as background/accent/CTA/redline-stroke — never as text on `#FAF8FF` or `#FFFFFF` (fails AA at ~2.9:1).
- **Do** respect `prefers-reduced-motion: reduce` on every entrance/reveal animation (fade-in-up, seal-in, redline strike draw, scroll-reveal) — remove motion, never remove content.
- **Do** push contrast pairings to AAA where the palette already clears it for free (purple-on-off-white 14.2:1, white-on-purple 15.0:1) rather than diluting them toward "softer" grays.

### Don't:
- **Don't** build a "generic AI-startup SaaS template": no gradient text, no hero-metric blocks (big number + small label + supporting stats), no identical icon-in-a-circle card grids repeated section after section, no tiny uppercase tracked eyebrow above every heading.
- **Don't** build a "stodgy traditional law-firm site": no navy-and-gold palettes, no stock photography of handshakes or skylines, no dense unbroken text walls.
- **Don't** write "overly playful or consumer-startup" copy: no gimmicks, mascots, or casual/meme-adjacent language — the register must stay authoritative for a compliance/legal audience while feeling contemporary.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on cards or rows — use full hairline borders, background tints, or the `§`/`Exhibit` label system instead.
- **Don't** stack two full-bleed deep-purple sections back to back; it's a deliberate, occasional gravity anchor, not an alternating background rhythm.
- **Don't** use a single `::after` pseudo-element strikethrough positioned at 50% height for multi-line text — it breaks on wrap. Use native `line-through decoration-*` utilities for any strikethrough text that can wrap.
