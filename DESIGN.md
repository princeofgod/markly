---
name: Markly Africa
description: AI-assisted compliance, IP protection, and business advisory — a confident, contemporary professional-services voice built on a deep-purple brand canvas.
colors:
  deep-purple: "#2D106C"
  purple-950: "#1A0942"
  signal-orange: "#FE5F1B"
  soft-off-white: "#FAF8FF"
  surface-alt: "#FFFFFF"
  ink: "#1D0E42"
  muted: "#57607A"
  faint: "#8A90A6"
  border-subtle: "#E6E2F0"
  border-strong: "#D4CEE6"
typography:
  display:
    fontFamily: "Petrona, Iowan Old Style, Georgia, ui-serif, serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Petrona, Iowan Old Style, Georgia, ui-serif, serif"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Petrona, Iowan Old Style, Georgia, ui-serif, serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  pill: "9999px"
  xl: "28px"
  lg: "20px"
  md: "14px"
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
    textColor: "{colors.deep-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.deep-purple}"
    textColor: "{colors.soft-off-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.deep-purple}"
    textColor: "{colors.soft-off-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.deep-purple}"
    rounded: "{rounded.lg}"
    padding: "28px"
  nav-link:
    textColor: "{colors.deep-purple}"
    typography: "{typography.body}"
    padding: "0 0 4px 0"
---

# Design System: Markly Africa

## Overview

**Creative direction: "Confident professional services, technology-native."**

Markly's proposition is AI-accelerated capability under human professional supervision. The visual system carries that as poise, not pastiche: a deep-purple brand canvas that reads as authority, warm photography of real people at work, a high-contrast serif for declarations, and a clean grotesque for everything that must be read quickly. It is modern and technology-enabled while keeping the gravity a compliance and IP audience expects — no gimmicks, no legal-document cosplay.

The brand colors are fixed identity and carried over verbatim from prior work: deep purple `#2D106C`, signal orange `#FE5F1B`, soft off-white `#FAF8FF`. Everything else — type, spacing rhythm, radius, motion — is a fresh, contemporary system.

**Key characteristics:**
- Deep purple is the authority register: hero canvas, dark feature panels, footer, headings, body emphasis.
- Orange is an accent only — CTA fill, icon-hover, the short heading rule, avatar chips. Never body text on a light surface.
- Committed-color strategy: purple carries 30–40% of the marketing surfaces (hero, testimonials, CTA, one feature panel per page), off-white/white carry the reading surfaces.
- Photography over iconography for human moments; simple line icons for structural labelling.
- Motion is a single well-behaved reveal grammar plus a couple of deliberate entrance/ambient gestures, all degrading cleanly under `prefers-reduced-motion`.

## Colors

### Primary
- **Deep Purple** (`#2D106C`) / **Purple-950** (`#1A0942`): Brand identity. Purple-950 is the darker canvas for hero, testimonials, and CTA panels; `#2D106C` is used for headings, emphasis, borders, and icons on light surfaces. Aura glows use `primary-700` (`#4D2A98`) at low opacity behind dark panels.

### Accent
- **Signal Orange** (`#FE5F1B`): The mark of action and attention — primary CTA background, the short heading rule, icon-hover fill, avatar initials. **Never used as text on `#FAF8FF` or `#FFFFFF`** — it fails AA (~2.76:1). On the orange CTA fill, text is **deep purple** (`#2D106C`, 4.75:1 AA), never white. Orange text on purple-950 is reserved for large display accents (the italic hero flourish).

### Neutral & Text
- **Soft Off-White** (`#FAF8FF`): Primary page background and default reading surface.
- **Surface-Alt** (`#FFFFFF`): Alternate section surface to separate adjacent light sections without a third hue.
- **Ink** (`#1D0E42`): Densest long-form body / list items on light surfaces.
- **Muted** (`#57607A`): Secondary body copy — darkened from a generic slate so it clears AA (4.5:1+) on off-white.
- **Faint** (`#8A90A6`): Captions and meta labels only.
- **Border Subtle** (`#E6E2F0`) / **Border Strong** (`#D4CEE6`): Purple-tinted hairlines for dividers and card outlines; the strong variant is the hover border.

### Named Rules
**Accent, not surface.** Orange marks a CTA, an icon state, a short rule, or an avatar — never a background wash or body text. If orange covers more than that, it's wrong.

**Contrast is non-negotiable.** Orange CTA carries purple text (4.75:1). White-on-orange is banned. Muted body on off-white must clear 4.5:1 — bump toward `ink` before reaching for a lighter gray.

## Typography

**Display Font:** Petrona (with Iowan Old Style, Georgia, ui-serif fallback)
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui fallback)

**Character:** A warm, high-contrast transitional serif for declarative moments paired with a clean, slightly humanist grotesque for reading. The pairing works on a genuine contrast axis (serif + grotesque), not two near-identical sans faces. Display type is set with tightened tracking (`-0.018em` to `-0.02em`) and `text-wrap: balance`; long prose uses `text-wrap: pretty`.

### Hierarchy
- **Display** (Petrona 600, clamped ~42–60px, 1.05): Hero statements. One per page.
- **Headline** (Petrona 600, ~32–44px, 1.1): Section H2s.
- **Title** (Petrona 600, ~20–24px): Card and row titles.
- **Body** (Hanken Grotesk 400, 16–18px, 1.6, capped 60–75ch): Paragraph copy.
- **Label** (Hanken Grotesk 600, 12px, 0.16–0.22em tracking, uppercase): The heading kicker, category tags, meta labels. Uppercase only for true labels, never sentences.

### Named Rules
**Two voices.** Petrona asserts (headlines, pull-statements, the featured differentiator); Hanken Grotesk explains (body, captions, UI, list items). If a line is explaining, it's the grotesque.

**The kicker is a system, not a reflex.** The short orange rule + uppercase label appears on deliberate section intros and hero, not above every heading. Most sections lead with the headline alone.

## Elevation

Depth is restrained and purple-tinted, never a gray glow. Light cards rest on a soft two-part shadow; dark panels get depth from ambient aura glows rather than drop shadows.

### Shadow Vocabulary
- **Card resting** (`--shadow-card`: `0 1px 2px rgba(29,14,66,0.04), 0 8px 24px -18px rgba(29,14,66,0.28)`): Default for card-shaped objects.
- **Card lift** (`--shadow-lift`: `0 18px 48px -24px rgba(29,14,66,0.4)`): Hover state and hero image frame.
- **Aura** (accent/`primary-700` at 20–25% opacity, heavy blur): Ambient depth behind purple hero, testimonial, and CTA panels; drifts slowly via `animate-aura`, static under reduced motion.

## Components

### Buttons
- **Shape:** `rounded-md` (14px) — a calm, contemporary button, not a pill.
- **Primary:** Orange fill, **deep-purple** text, semibold. Hover inverts to purple fill with off-white text and lifts `-translate-y-0.5`. The only place orange fills a shape larger than an icon.
- **Secondary:** Bordered, purple text (or off-white text via `inverted` variant on dark panels); hover fills solid.
- **Interaction:** `transition` on transform/color, `active:scale-[0.98]`, visible 2px accent focus ring. Never remove the focus ring. All motion respects `motion-reduce`.

### Cards / Panels
- **Radius:** `rounded-lg` (20px) for content cards; `rounded-xl` (28px) for feature panels and CTA blocks; `rounded-md` for icon chips.
- **Light card:** off-white/white surface, `border-subtle` hairline, `--shadow-card`; hover lifts to `border-strong` + `--shadow-lift`.
- **Dark feature panel:** `purple-950` surface with an accent aura, orange icon chip, used once per section cluster (WhyChooseUs featured differentiator, CTA, testimonials).
- **Icon chip:** `rounded-md`, `primary/8` fill with purple icon; on card hover the accent chips flip to orange fill + purple icon.

### Section Rhythm
Content is presented as clean grids and rows without decorative scaffolding. The one legitimate numbered sequence is HowItWorks (a real 3-step process, `01/02/03` set large and faint inside each step card). Service lists use a category label + serif title + hairline-separated rows with a sticky pill jump-nav. The industries register is a masked marquee (`animate-marquee`, pauses on hover, wraps static under reduced motion).

### Navigation
- Sticky top bar, `surface-alt` at 95% with backdrop blur, hairline bottom border. Nav links in the grotesque with an animated orange underline (`after:` width 0 → 100%). Primary CTA always visible at desktop.
- **Mobile:** rounded icon trigger opening a full-width sheet below the header; stacked links with generous tap targets.

## Motion

A single reveal grammar plus deliberate accents:
- **`[data-reveal]` scroll reveal:** opacity + 18px rise, staggered per item via `transition-delay`, driven by one IntersectionObserver. Enhances an already-laid-out element.
- **`animate-rise-in`:** hero entrance stagger (kicker → title → subtitle → CTAs → image).
- **`animate-aura`:** slow ambient drift of the accent glow behind dark panels.
- **`animate-marquee`:** the industries register.
- **HowItWorks 3D tilt:** step cards lift + rotate-x on hover.

Every animation has a `@media (prefers-reduced-motion: reduce)` fallback that removes motion and pins content to its static end state. Motion never gates content visibility.

## Do's and Don'ts

### Do
- **Do** keep the three brand colors exact and use orange as an accent only.
- **Do** put purple text on the orange CTA (4.75:1); keep muted body above 4.5:1 on off-white.
- **Do** lead most sections with the headline; reserve the kicker rule for deliberate intros and the hero.
- **Do** use photography for human moments and a committed purple canvas for the hero, testimonials, and CTA.
- **Do** respect `prefers-reduced-motion` on every reveal, aura, marquee, and tilt.

### Don't
- **Don't** put white text on orange, or orange text on off-white/white.
- **Don't** add a tiny uppercase eyebrow above every section, or numbered `01/02/03` markers on non-sequential sections (HowItWorks is the one earned exception).
- **Don't** use gradient text, side-stripe accent borders, decorative glassmorphism, or hero-metric stat blocks.
- **Don't** stack two full-bleed purple sections back to back; the dark canvas is a deliberate gravity anchor.
- **Don't** reintroduce the retired "Countersigned Draft" devices (redline strikes, `§` numbers, wax-seal badges, exhibit/schedule framing).
