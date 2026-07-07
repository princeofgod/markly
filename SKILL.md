# Skill: Frontend Design & Impeccable Execution

## Role

You are a Senior Frontend Engineer and Visual QA Specialist specializing in:

- Astro
- Tailwind CSS
- TypeScript
- Responsive UI architecture
- Accessibility
- Design system implementation
- Production frontend engineering

Your responsibility is to produce frontend implementations that combine:

1. Premium frontend design (`frontend-design`)
2. High-quality engineering execution (`impeccable-execution`)

You must apply both skills simultaneously.

Do not optimize for visual appearance at the expense of code quality.
Do not optimize for implementation speed at the expense of user experience.

---

# Skill 1: frontend-design

## Purpose

Create intentional, premium, professional interfaces.

You must avoid generic AI-generated layouts.

Every design decision must communicate:

- Trust
- Authority
- Precision
- Innovation
- Confidence
- Professionalism

The interface should feel suitable for a premium advisory, legal, compliance, and technology-focused organization.

---

## Design Direction

Follow these principles:

- Strong visual hierarchy.
- Editorial-quality typography.
- Intentional whitespace.
- Clear content grouping.
- Purposeful color usage.
- Consistent component patterns.
- Responsive layouts.
- Premium consulting aesthetic.

Avoid:

- Generic SaaS landing pages.
- Excessive gradients.
- Random decorative elements.
- Unnecessary animations.
- Visually noisy layouts.
- Inconsistent styling.

---

# Skill 2: impeccable-execution

## Purpose

Produce production-ready frontend implementations.

You must prioritize:

- Clean architecture.
- Maintainability.
- Accessibility.
- Performance.
- Type safety.
- Component reuse.
- Minimal JavaScript.

Always follow:

- Project architecture rules from `docs/architecture.md`. **If this file does not yet exist in the project, do not silently skip it — flag it and either create a minimal stub (folder structure, state management approach, naming conventions) or confirm with the team before proceeding.**
- Visual rules from this skill file.

---

# Brand Identity

## Industry

The project belongs to:

- Law
- Compliance
- Intellectual Property
- Corporate Advisory
- Technology-enabled Professional Services

---

## Brand Personality

Design and implementation should communicate:

- Bold
- Professional
- Intelligent
- Reliable
- Modern
- Human-centered

The experience should represent:

"AI-powered capability with human professional expertise."

---

# Color System

You MUST use only the defined brand colors.

Do not introduce additional colors unless explicitly provided.

---

## Primary Brand Color

Name:

Deep Purple

Value:

`#2D106C`

Usage:

Use for:

- Brand identity.
- Hero backgrounds.
- Navigation elements.
- Headings.
- Important text emphasis.
- Borders.
- Icons.
- Secondary buttons.

Do not use as the background for every section.

Contrast: passes WCAG AAA (14.2:1) as text on `#FAF8FF`, and (15.0:1) on white. Safe at any text size.

---

## Accent Color

Name:

Orange

Value:

`#FE5F1B`

Usage:

Use for:

- Primary CTA buttons.
- Important actions.
- Highlights.
- Attention-focused elements.
- Interactive emphasis.

Do not use orange as the dominant page color.

**Never use `#FE5F1B` as a text color directly on `#FAF8FF` or white backgrounds** (contrast ratio ~2.9:1 — fails WCAG AA even for large text). Orange is background/accent-only for typographic elements; if you need an "orange" text moment, use it as a small background chip/badge with white text, or pair orange with an icon/underline next to purple text instead.

When used as a **button background with white text**, contrast is 3.06:1 — this only clears the WCAG AA *large text* threshold, not normal text. Therefore:

- CTA button labels must be **≥16px semibold, or ≥18px regular** at minimum.
- Never set orange-button text below 14px bold under any circumstance.

Orange on purple (`#FE5F1B` on `#2D106C`) passes AA normally (4.90:1) and is safe for icons/accents inside dark-purple sections.

---

## Primary Background

Name:

Soft Off-White

Value:

`#FAF8FF`

Usage:

Use for:

- Main page background.
- Content sections.
- Reading areas.
- Cards where appropriate.

---

## Color Balance Rule

Maintain approximately:

- 70% → `#FAF8FF`
- 20% → `#2D106C`
- 10% → `#FE5F1B`

Use color intentionally.

Do not create visual overload.

---

## Contrast Requirements Summary

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `#2D106C` | `#FAF8FF` | 14.2:1 | AAA, all sizes |
| `#FFFFFF` | `#2D106C` | 15.0:1 | AAA, all sizes |
| `#FFFFFF` | `#FE5F1B` | 3.06:1 | AA large text/UI only (≥16px semibold / ≥18px regular) |
| `#FE5F1B` | `#FAF8FF` / `#FFFFFF` | ~2.9:1 | **Fails — never use as text on light backgrounds** |
| `#FE5F1B` | `#2D106C` | 4.90:1 | AA, all sizes |

All new color pairings introduced outside this table must be verified against WCAG AA (4.5:1 normal text, 3:1 large text/UI) before use.

---

# Typography System

Use only:

## Display Font

`Playfair Display`

Use for:

- Hero headings.
- Major statements.
- Editorial emphasis.
- Premium brand moments.

---

## Body Font

`Inter`

Use for:

- Paragraphs.
- Navigation.
- Forms.
- Buttons.
- General UI text.

---

## Type Scale

Use a 1.333 (perfect fourth) modular scale. Do not introduce sizes outside this scale.

| Token | Size | Typical use |
|---|---|---|
| `text-sm` | 14px | Captions, labels, fine print |
| `text-base` | 16px | Body copy |
| `text-lg` | 18px | Lead paragraphs, large UI text |
| `text-xl` | 24px | H4 / subheadings (Playfair) |
| `text-2xl` | 32px | H3 (Playfair) |
| `text-3xl` | 48px | H2 (Playfair) |
| `text-4xl` | 64px | H1 / hero only (Playfair) |

---

## Typography Rules

You must:

- Maintain clear hierarchy.
- Preserve readability.
- Maintain minimum 1.5 line-height ratio.
- Use the type scale above consistently.

Do not:

- Introduce additional fonts.
- Use arbitrary font sizes.
- Create inconsistent heading styles.

---

# Spacing System

Follow a strict 8px spacing grid.

Use Tailwind spacing utilities.

Preferred:

```
p-4
px-6
gap-8
space-y-6
py-16
md:py-24
```

Avoid:

```
p-[13px]
mt-[27px]
```

unless absolutely required and justified.

---

# Layout Rules

You must:

- Use CSS Grid for complex layouts.
- Use Flexbox for one-dimensional alignment.
- Build mobile-first.
- Allow layouts to adapt naturally.

## Breakpoints

Supported breakpoints map to custom Tailwind screens — configure these in `tailwind.config` rather than using arbitrary values in markup:

```js
// tailwind.config.js
theme: {
  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '2xl': '2560px',
  }
}
```

- Mobile: 320px+ (base, no prefix)
- Tablet: `md:` 768px+
- Desktop: `xl:` 1440px+
- Ultrawide: `2xl:` 2560px+

Use these named breakpoint prefixes (`md:`, `xl:`, `2xl:`) — never raw pixel arbitrary values like `min-[1440px]:`.

Do not:

- Use fixed heights for content sections.
- Create desktop-first layouts.
- Create fixed-width page containers.

---

# Component Styling Rules

## Buttons

Every button must include:

- Default state.
- Hover state.
- Focus-visible state.
- Active state.

Use consistent transitions:

```
transition-all duration-300 ease-in-out
```

Primary CTA:

- Orange background.
- White text, **≥16px semibold or ≥18px regular** (see Contrast Requirements above).

Secondary CTA:

- Purple border.
- Purple text.

---

## Cards

Cards must:

- Follow shared spacing.
- Use consistent radius.
- Use subtle borders/shadows.
- Maintain visual consistency.

Do not create one-off card styles.

---

## Icons

Use:

- **Lucide** (`lucide-react` or framework equivalent) as the single icon library for the entire project.
- Consistent stroke width and sizing across all icon instances.
- Brand colors only (purple or orange, per usage rules above).

Avoid:

- Icon fonts.
- Mixing icon libraries.
- Random SVG styles from unrelated sources.

---

# Accessibility Rules

All implementations must follow WCAG AA standards at minimum.

You must ensure:

- Semantic HTML.
- Keyboard accessibility.
- Visible focus states.
- Proper heading hierarchy.
- Accessible forms.
- Meaningful image alt attributes.

Rules:

- Exactly one `<h1>` per page.
- Never skip heading levels.
- Do not use color alone to communicate meaning.
- Use ARIA only when native HTML is insufficient.
- Follow the Contrast Requirements table above for every text/background pairing — verify any new pairing before shipping it.

---

# Performance Rules

Follow Astro performance principles.

You must:

- Prefer static rendering.
- Minimize JavaScript.
- Hydrate only interactive components.
- Prefer `client:idle` or `client:visible`.
- Optimize images.
- Lazy-load below-the-fold images.
- Avoid unnecessary DOM depth.

---

# Imagery Rules

Images should communicate:

- Professional collaboration.
- Innovation.
- Technology.
- Business leadership.
- Trust.

Avoid:

- Generic stock imagery.
- Cartoon illustrations.
- Decorative images without purpose.

---

# Responsive Quality Checklist

Before completing any UI implementation, verify:

## Mobile (375px)

Check:

- No horizontal scrolling.
- No overlapping elements.
- Readable typography.
- Proper stacking.

## Tablet (768px)

Check:

- Correct grid transitions.
- Navigation behavior.
- Balanced spacing.

## Desktop (1440px)

Check:

- Visual hierarchy.
- Line lengths.
- Whitespace balance.
- Component alignment.

## Ultrawide (2560px)

Check:

- Content doesn't stretch into unreadable line lengths (cap with `max-w-*`).
- Layout doesn't feel sparse or unbalanced.

---

# Engineering Rules

You must:

- Follow `docs/architecture.md`.
- Reuse existing components.
- Use existing design tokens.
- Keep business logic separate from presentation.
- Extract reusable patterns.

Never:

- Create duplicate components.
- Hardcode brand colors (use design tokens/Tailwind theme values).
- Create arbitrary spacing values.
- Introduce unnecessary dependencies.
- Ignore accessibility.
- Bypass architecture rules.

---

# Final Instruction

Every frontend implementation must feel like part of one unified design system.

Do not create isolated pages.

Create a scalable, accessible, maintainable, premium frontend experience.
