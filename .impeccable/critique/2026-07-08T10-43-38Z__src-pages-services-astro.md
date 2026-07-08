---
target: src/pages/services.astro
total_score: 26
p0_count: 1
p1_count: 3
timestamp: 2026-07-08T10-43-38Z
slug: src-pages-services-astro
---
Method: dual-agent (A: ade3e25036f2f38ad · B: afba7d38ed5b17cb1)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav active state/hover underline work; nothing else needed on a static page |
| 2 | Match Between System and Real World | 4 | Legal vernacular ("Schedule," "§01–§07") genuinely fits a compliance-professional audience |
| 3 | User Control and Freedom | 2 | No in-page anchor/jump nav across 7 rows and ~5200px of desktop scroll |
| 4 | Consistency and Standards | 3 | The italic-Playfair treatment on the one groupless row (§07) is unexplained — reads as an edge case, not a rule |
| 5 | Error Prevention | 3 | n/a — no forms or destructive actions |
| 6 | Recognition Rather Than Recall | 3 | Everything spelled out, nothing hidden behind icons-only |
| 7 | Flexibility and Efficiency of Use | 1 | No filter, search, or category jump across 7 services / ~73 line items |
| 8 | Aesthetic and Minimalist Design | 2 | Schedule format is elegant, but 9–16-item unbroken checklists per row turn "restrained" into a checklist wall |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 2 | No FAQ/contextual help; closing CTA is the only concession, and it arrives only after the wall |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment**: Not structurally AI-slop at the component level — no gradient text, no hero-metric blocks, no icon-in-circle card grid, no eyebrow-on-every-section (only 2 eyebrows on the whole page). The `§01–§07` ruled-row Schedule component, hairline borders, and Playfair/Inter pairing are all executed per DESIGN.md. The real tell is content-level, not layout-level: every row is an unedited, unprioritized dump of the full raw service list (13–16 items per row) with identical visual weight throughout — the opposite of the brand's own "AI drafts, human reviews and curates" thesis. The system's signature device, the redline strike, doesn't appear anywhere on the page; the only trust signal (`ReviewedSeal`) shows up once, at the very bottom, after ~73 checkmarked items.

**Deterministic scan**: CLI static scan (`detect.mjs`) returned clean (exit 0, `[]`) — expected, since contrast and line-length require rendered layout. The browser-injected live detector found **11 finding-groups / 12 individual findings** at desktop viewport (1280×800):
- 3× `low-contrast` — white text (`#ffffff`) on accent orange (`#fe5f1b`) measuring **3.1:1** (needs 4.5:1), on the desktop nav CTA, hero CTA, and closing/footer CTA (all instances of the shared `ButtonPrimary` component).
- 7× `line-length` — service description paragraphs and the training-note paragraph rendering at ~88–131 chars/line despite a `max-w-[70ch]` constraint (a real `ch`-unit gotcha: `ch` is based on the `"0"` glyph, which is narrower than a proportional font's average character, so `70ch` renders wider than 70 actual characters).
- 1× `overused-font` (Inter, 87% of text) — factually accurate but a deliberate, fixed brand choice per DESIGN.md, not a slop signal for this project.
- 1× `bounce-easing` on `body` — **false positive**, confirmed by direct `getComputedStyle` check (`animation: none`) and a source grep (zero uses of `animate-bounce` anywhere in `src/`); Tailwind v4 declares the `--animate-bounce` custom property globally regardless of usage, and the rule appears to key off the token's existence rather than confirming an element actually references it.

**Visual overlays**: Browser injection succeeded (mutation preflight passed); the live detector ran directly in the page via `window.impeccableDetectAsync()`. No persistent human-visible overlay tab was left open — the live-server used for injection was started and stopped within the assessment.

## Overall Impression

Structurally, this page is a faithful, well-executed application of the site's own design system — the Schedule/Exhibit Rows pattern, restrained color usage, and Two-Voice typography all hold up under scrutiny, and it genuinely doesn't look like a generic AI-SaaS template. The gap is that the *content* wasn't edited to fit the format: seven rows of 9–16 raw checklist items, rendered with zero prioritization or curation, turn an elegant "ruled schedule" concept into a scroll-fatigue wall — and for a brand whose entire value proposition is "we review and correct before it reaches you," shipping an unreviewed data dump on its own newest page undercuts the thesis more than any layout choice could. The single biggest opportunity: apply the brand's own signature move (the redline: draft → correction) to curate and prioritize these lists in place, rather than defaulting to display-everything.

## What's Working

1. **The Schedule of Services row implementation** (`services.astro:32-79`) is a correct, faithful build of the Exhibit Rows signature component — `§01`/`§02` circular badges instead of icon-in-circle, hairline `border-t`/`border-b` instead of card shadows, staggered `data-reveal` per row. It visibly differentiates the page from a generic SaaS features grid.
2. **Typography discipline holds up live**: Playfair Display is reserved for declarative moments (H1, H2, row titles) and Inter for everything explanatory, with no stray serif body text or sans-serif headline anywhere on the rendered page.
3. **The closing CTA copy** ("Not Sure Which Service You Need?") is a smart, human, low-ego line — the one place on the page that reads like a person wrote it, and it correctly routes overwhelmed visitors to a human conversation instead of forcing them to keep parsing the list.

## Priority Issues

**[P0] Primary CTA buttons fail WCAG AA contrast — confirmed by both live review and the detector**
- **What**: White text on `#fe5f1b` orange measures 3.1:1 (needs 4.5:1), on the desktop nav CTA, hero CTA ("Book a Consultation"), and closing CTA ("Talk to Our Team") — all three primary conversion actions on this page, all instances of the shared `ButtonPrimary` component.
- **Why it matters**: DESIGN.md treats this as an intentional "large/semibold" exception at ~3:1, but 16px/`text-base` semibold doesn't meet WCAG's large-text threshold (needs ≥18.66px bold), so this is a genuine AA failure, not a documented exception. It's a systemic component issue, visible in three places on this page alone.
- **Fix**: Either bump primary-button text to a true large-text size (≥18.66px bold) to legitimately qualify for the 3:1 exception, or darken the button background slightly, or add a subtle outline/shadow for contrast. Fix once in `ButtonPrimary.astro`, verify across every page that uses it.
- **Suggested command**: `/impeccable harden`

**[P1] Service lists are unedited data dumps that blow past chunking guidelines, confirmed by rendered line-length overflow**
- **What**: §01 has 13 flat checklist items in one group; §02 and §06 each have two groups totaling 16 items apiece, all rendered with identical visual weight and no prioritization. Separately, the detector found 7 description/note paragraphs rendering at ~88–131 chars/line against an intended ~70ch measure.
- **Why it matters**: Blows past the cognitive-load "≤4 items per group" guideline by 3–4x, and works against the "review and curate before it reaches the client" brand thesis — this is the raw, unedited list, not a considered one.
- **Fix**: Curate each row to 4–6 "headline" services with a "+N more" progressive-disclosure toggle, or split long rows into a short always-visible "core services" tier plus an expandable "full scope" tier. While in there, fix the paragraph measure (swap `max-w-[70ch]` for a slightly tighter `ch` value, or a fixed `max-w` in `rem`/`px`, to actually land at ~70 rendered characters).
- **Suggested command**: `/impeccable distill`

**[P1] No way to jump to a specific service — linear-scroll-only across ~5200px on desktop, far more on mobile**
- **What**: No in-page anchor nav, sticky mini-index, or quick-jump exists for the 7 §-numbered rows. Reaching §04 (Global Trademark Registration) means scrolling past §01–§03 in full, including §01's 13-item list.
- **Why it matters**: The `§` numbering visually implies an indexed, referenceable document, but nothing makes that index actually navigable — directly hurts user control and efficiency of use.
- **Fix**: Add a small sticky or inline "Jump to: §01 §02 §03…" rail using the same ruled-line/label vocabulary already established, scrolling to each row's anchor.
- **Suggested command**: `/impeccable layout`

**[P1] The redline motif — the brand's signature device — is entirely absent from the page's core content**
- **What**: Not one row demonstrates "AI drafts, human reviews" inline. The only occurrence of the review-proof device is the generic `ReviewedSeal` pill, once, at the very bottom of the page, after ~73 checkmarked items.
- **Why it matters**: DESIGN.md explicitly says the redline motif "should recur wherever a before/after or draft/reviewed moment is plausible, not just once in a hero." A services page listing dozens of AI-assisted deliverables is the most plausible place on the entire site for this, and it's unused — the highest-stakes content on the site currently offers zero visible reassurance mid-scroll.
- **Fix**: Attach a small "Reviewed by [role]" chip or a one-line redline example (struck-through draft phrase next to its italic Playfair correction) to at least 2–3 of the higher-stakes rows (e.g., Data Protection Compliance, Global Trademark Registration).
- **Suggested command**: `/impeccable clarify`

**[P2] Orange checkmark bullets appear ~73 times across the page, diluting "the pen, not the paint"**
- **What**: Every one of the ~73 list items across all 7 rows uses an identical orange `check` icon as a routine bullet marker.
- **Why it matters**: DESIGN.md's Named Rule states orange marks "a specific correction, action, or moment of attention... never becomes... a repeating decorative element." Using it as a blanket bullet for every list item turns a deliberate accent into ambient decoration.
- **Fix**: Use a neutral/muted marker (hairline-colored dash, or a low-opacity purple check) for routine list bullets, and reserve orange specifically for 1–2 flagged/featured items per row.
- **Suggested command**: `/impeccable quieter`

## Persona Red Flags

**Jordan (First-Timer / SME founder evaluating trust)**
- Lands on §01 and is immediately confronted with 13 unlabeled compliance terms ("DPIA," "Data Controller/Processor of Major Importance Registration") with zero inline definitions.
- No way to jump straight to the one service they came for; must scroll past every prior row in full.
- The only reassurance signal on the page (`ReviewedSeal`) sits at the very bottom, after the point where an overwhelmed first-timer is statistically most likely to have already left.

**Riley (Deliberate Stress Tester)**
- §07 (Continuous Compliance Monitoring) is the only row with zero itemized groups and switches to italic Playfair styling with no explanation — reads as either a bug or an unexplained "lesser" tier.
- Row content length is wildly uneven (13–16 items vs. a single bare sentence) with no visible logic tying row weight to anything.
- `src/data/services.ts` defines an `icon` field per service (shield, ledger, scale, globe, lightbulb, users, chart) that `services.astro`'s row template never renders — dead data wired to nothing.

**Casey (Distracted Mobile User)**
- At 375px, the 2-column item grids collapse to 1 column, so §02 and §06 each become 16 stacked full-width rows and §01 becomes 13 — each requiring roughly 2+ phone-screens of pure scrolling before the next service even starts.
- The first tap target Casey sees (hero "Book a Consultation") fails contrast per the live audit — worse for one-handed outdoor phone use.
- No persistent/sticky CTA while scrolling the services list on mobile; converting mid-scroll requires backtracking to the top or continuing to the bottom.

## Minor Observations

- `src/data/services.ts`'s per-service `icon` field is never rendered in `services.astro` — either wire it in (nav dropdown, mobile quick-filter) or drop it from the data model.
- The orange dot badge on every `§0X` circle is identical and `aria-hidden` across all 7 rows — carries no distinguishing information.
- The `overused-font` (Inter, 87%) and `bounce-easing` detector findings are expected/false-positive respectively for this project: Inter dominance is a deliberate, fixed brand choice, and no element actually uses `animate-bounce` (Tailwind v4 declares the custom property globally regardless of usage).

## Questions to Consider

- If the redline strike is the brand's single most ownable visual device, why does the page most naturally suited to demonstrating it repeatedly — a services list — not use it once?
- Is the `§01–§07` schedule format serving the visitor, or serving the brand's aesthetic at the cost of scannability? What would this page look like if the organizing question were "what does a founder need to decide in the next 30 seconds" instead of "how do we list everything we offer"?
- If the closing CTA has to say "Not Sure Which Service You Need?" — is that the page acknowledging its own information overload? What would it take to make that CTA unnecessary rather than compensating for the wall above it?
