---
target: src/pages/services.astro
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-07-08T13-19-39Z
slug: src-pages-services-astro
---
Method: dual-agent (A: afaba85962b8d13bf · B: a5c37b1cfb4ca3f64)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Jump-nav gives structure, but no "you are here" highlight as the user scrolls past a row |
| 2 | Match Between System and Real World | 4 | "Schedule of Services" / §-numbering still fits the legal-advisory register well |
| 3 | User Control and Freedom | 3 | Expand/collapse + jump-nav are good escape hatches; no "back to top" after a long scroll |
| 4 | Consistency and Standards | 2 | `max-w-[38rem]` here vs `max-w-[65ch]` in Hero/CTASection; the "+N more" threshold (`>6`) doesn't match the visible-item count (4), so two groups bypass chunking entirely; `<summary>` toggle lacks the site's standard `focus-visible` ring |
| 5 | Error Prevention | 4 | Read-only content, no destructive actions |
| 6 | Recognition Rather Than Recall | 3 | Jump-nav pills show category only; workable since categories are unique, but no active-state once scrolling manually |
| 7 | Flexibility and Efficiency of Use | 3 | Jump-nav plus native `<details>` keyboard support meaningfully improved this since the last run |
| 8 | Aesthetic and Minimalist Design | 3 | Clean per-row, but 7 visually identical rows in sequence create mid-page monotony |
| 9 | Error Recovery | 3 | n/a — no error states on this page |
| 10 | Help and Documentation | 3 | Closing CTA still functions as the page's soft help affordance |
| **Total** | | **31/40** | **Good — solid foundation, address the remaining consistency gaps** |

## Anti-Patterns Verdict

**LLM assessment**: Clean. No gradient text, no side-stripe cards, no glassmorphism-as-decoration (the jump-nav's `backdrop-blur-sm` matches the existing navbar pattern functionally, not a trend flourish), no identical-card grids, no hero-metric template. The §01–§07 numbering remains legitimately motivated by the "Schedule of Services" conceit rather than generic step-scaffolding. This page is not AI-slop; what remains are UX/consistency defects — several of them newly introduced by the fixes themselves.

**Deterministic scan**: CLI static scan (`detect.mjs`) returned clean (exit 0, `[]`). The browser-injected live detector found:
- **Desktop (1280×800)**: 1× `line-length` finding — the `text-sm` note paragraph (`max-w-[38rem]` = 608px) still renders ~87 chars/line against an ~80-char guideline. The fixed `38rem` width was sized for 16px body copy; it doesn't compress for the smaller 14px note text, so this one instance still trips the rule. Down from 7 findings in the prior run, but not fully closed.
- **Mobile (375×812)**: the line-length finding disappears (container becomes viewport-constrained), leaving only the two expected page-level findings below.
- **Both viewports**: `overused-font` (Inter, 85%) — expected, deliberate per DESIGN.md, not a slop signal. `bounce-easing` on `body` — re-confirmed **false positive**: `getComputedStyle(document.body).animation` returns `"none"` and `grep -rn "animate-bounce" src/` returns zero matches; Tailwind v4 declares the `--animate-bounce` custom property globally regardless of usage.

**Where the two assessments converge**: Both independently flagged the same root issue from different angles — Assessment A found the `max-w-[38rem]` vs `max-w-[65ch]` unit inconsistency across components by reading the code; Assessment B's live detector then measured the actual consequence of that inconsistency (the note paragraph still overflowing at ~87 chars/line). Fixing the unit mismatch closes both findings at once.

**Contrast, independently reverified by both assessments**: Assessment A computed `text-primary` (#2D106C) on `bg-accent` (#FE5F1B) at ≈4.9:1 via WCAG relative-luminance math from the source. Assessment B independently measured the same ratio live via `getComputedStyle` on all 4 rendered `ButtonPrimary` instances (3× "Book a Consultation", 1× "Talk to Our Team"). Both agree: **the P0 contrast fix is genuinely resolved**, up from 3.06:1.

## Overall Impression

The three fixes from the last pass landed cleanly: contrast is independently verified at 4.9:1 by both assessments, §07's italic/serif inconsistency is gone, and progressive disclosure plus the jump-nav meaningfully reduced scroll fatigue. But the jump-nav fix introduced a new defect it didn't have before — a z-index collision with the mobile menu panel — and the curation fix is inconsistently applied: the `>6` collapse threshold doesn't match the `4`-item visible count, so two "medium" groups (5–6 items) fall through the chunking rule entirely. Nothing here is AI-slop; it's the normal residue of a fast fix pass — tightening two numbers and one z-index closes most of what's left.

## What's Working

1. **The P0 contrast fix holds up under independent re-verification by both assessments** — 4.9:1 on all 4 live `ButtonPrimary` instances, computed two different ways (source math and live `getComputedStyle`).
2. **§07's styling inconsistency is fully resolved** ([services.astro:72-74](src/pages/services.astro:72)) — every row now renders its description through the same plain-paragraph treatment regardless of whether it has item groups.
3. **Progressive disclosure is well-built where it fires**: native `<details>/<summary>` needs zero JS for keyboard/screen-reader support, the chevron rotates on `group-open`, and `motion-reduce:transition-none` is respected ([services.astro:94-112](src/pages/services.astro:94)).

## Priority Issues

**[P1] New z-index collision between the jump-nav and the mobile menu panel**
- **What**: The jump-nav ([services.astro:32-34](src/pages/services.astro:32)) is `sticky top-20 z-40`. The mobile hamburger panel (`MobileMenu.astro:56`, `.mobile-menu-panel`) is `fixed inset-x-0 top-20 z-40` — identical position, identical z-index. Since `MobileMenu` is nested in `<header>` which precedes `<main>` in DOM order, the jump-nav paints on top of the open mobile menu.
- **Why it matters**: A mobile user who scrolls into "Schedule of Services" (the jump-nav's entire reason for existing) and then opens the hamburger menu sees the jump-nav pill strip rendered over the open nav panel — a visually broken interaction directly caused by this pass's own fix.
- **Fix**: Drop the jump-nav to `z-30` (below the mobile menu's `z-40`), or hide the jump-nav while the mobile menu is open.
- **Suggested command**: `/impeccable harden`

**[P1] Progressive-disclosure threshold doesn't match the visible-item count**
- **What**: `hasMore = group.items.length > 6` while only 4 items show before the toggle ([services.astro:77](src/pages/services.astro:77)). Groups with exactly 5–6 items — "We Support" (Startup Advisory) and "Training Formats" (Training) in `services.ts` — render fully open with no toggle at all.
- **Why it matters**: Directly undercuts the ≤4-item chunking goal this pass was meant to establish; produces visibly inconsistent row heights across the schedule — some rows show 4-then-toggle, others show a full 6-item wall.
- **Fix**: Lower the threshold to `> 4` so it matches `visibleCount`, or raise `visibleCount` to match whichever threshold you keep — the two numbers should agree.
- **Suggested command**: `/impeccable distill`

**[P2] Note paragraph still overflows the intended line-length measure**
- **What**: The `text-sm` note paragraph uses the same `max-w-[38rem]` as body copy, but at 14px it renders ~87 chars/line (confirmed live by the detector), and separately uses a different unit system (`rem`) than `Hero.astro`/`CTASection.astro`'s `max-w-[65ch]`.
- **Why it matters**: One real overflow left from the original line-length fix, caused by not accounting for the smaller font size; the unit mismatch is also why it's easy to miss when eyeballing the page.
- **Fix**: Standardize on `ch` (matches DESIGN.md's 65–75ch spec) across all body-copy containers, and size the note paragraph's measure for its own 14px font rather than reusing the 16px body value.
- **Suggested command**: `/impeccable polish`

**[P2] No "you are here" state in the jump-nav**
- **What**: Jump-nav pills ([services.astro:38-45](src/pages/services.astro:38)) have `hover:` states but nothing marks which row is currently in view.
- **Why it matters**: Nielsen #6 (Recognition over Recall) — after jumping or scrolling manually, users get no confirmation of where they are, undercutting the nav's own value as an orientation device.
- **Fix**: Add an `IntersectionObserver` (the codebase already has this exact pattern for `[data-reveal]` in `MainLayout.astro:56-70`) to toggle an `aria-current`/active style on the pill matching the row in view.
- **Suggested command**: `/impeccable polish`

**[P2] Missing focus-visible style on the "+N more" toggle**
- **What**: The `<summary>` element ([services.astro:96](src/pages/services.astro:96)) has no `focus-visible:outline` utility, unlike every other interactive element on the site (buttons and nav links all use `focus-visible:outline-2 outline-accent`).
- **Why it matters**: Keyboard users tabbing through the page get an inconsistent browser-default focus ring on this one control, breaking the site's otherwise-consistent focus language.
- **Fix**: Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm` to the `<summary>` class.
- **Suggested command**: `/impeccable harden`

## Persona Red Flags

**Jordan (First-Timer)**
- Jump-nav pills show category labels only ("Compliance," "Advisory," "IP"), which works since categories are unique, but Jordan scanning for "trademark search" specifically has to already know it lives under "Trademark."
- Loses orientation once scrolling manually after a jump, since no pill shows an active state (see P2 above).

**Riley (Stress Tester)**
- Opens the mobile hamburger after scrolling into the schedule section → hits the P1 z-index collision, a concrete, reproducible bug.
- At tablet widths (640–1024px), 7 pills in a `sm:flex-wrap sm:rounded-full` container will wrap to two rows — worth a visual check that the wrapped pill bar doesn't look broken against the `rounded-full` container treatment.

**Casey (Mobile)**
- The jump-nav's horizontal-scroll strip (`overflow-x-auto`) has no edge fade/gradient hinting that more pills exist off-screen — Casey may only interact with the first 2-3 visible pills.
- Casey is also the persona most likely to trigger the hamburger/jump-nav z-index collision, since the hamburger is the primary mobile nav mechanism.

## Minor Observations

- The orange checkmark bullet is technically permitted by DESIGN.md (icons are an allowed use), but its repetition across ~30-40 remaining visible items still leans toward ambient decoration rather than "a specific correction" — a design-director eyebrow, not a violation.
- §07 (Continuous Compliance Monitoring) is now stylistically consistent but visually thinner than its six siblings (just a badge + title + one paragraph, no item list) — a minor peak-end miss, since it's the last row before the CTA. Not a bug; worth a deliberate visual treatment if revisited.
- `scroll-mt-40` against a navbar+jump-nav stack of roughly 130-140px leaves an adequate buffer by class-level arithmetic; worth a quick visual spot-check but nothing suggests it's insufficient.
- Collapsed `<details>` content is present in the server-rendered DOM regardless of open state, so search-in-page and SEO are non-issues.

## Questions to Consider

- The jump-nav pills show category names, not full service titles — is category-level granularity what visitors are actually trying to jump to, or would they rather jump by outcome ("I need a trademark," "I need a DPO")?
- The `>6` collapse threshold was clearly chosen to avoid collapsing "small" groups — but is an ungrouped 6-item list actually easier to scan than a collapsed 4-plus-toggle? Should the threshold commit fully to ≤4 everywhere, even at the cost of an extra click for borderline groups?
- Now that each row is cleaner, is 7 nearly-identical rows still the right format — would 2-3 rows benefit from a differentiating visual treatment (a stat, a short case reference, a distinct icon) to break the mid-page monotony noted in the emotional-journey review?
