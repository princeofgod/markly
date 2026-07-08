---
target: src/pages/index.astro
total_score: 26
p0_count: 1
p1_count: 2
timestamp: 2026-07-07T20-33-49Z
slug: src-pages-index-astro
---
Method: dual-agent (A: a1546fec266e6adb2 · B: ae3f4361a95c0acae)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active nav state and hover/focus feedback present; no scroll-progress cue on a long single-page scroll, but low stakes for a marketing page |
| 2 | Match Between System and Real World | 2 | Legal vernacular (§, Exhibit, Declaration of Practice) is excellent, but undercut by the rocket/sparkles icons and generic-role-only testimonials that break the "real legal practice" register |
| 3 | User Control and Freedom | 3 | Standard nav/scroll, no traps; mostly n/a for a static marketing page |
| 4 | Consistency and Standards | 2 | The redline-strike signature motif is implemented two different, inconsistent ways on one page: Hero uses the banned `::after` 50%-height pseudo-element, ValueProposition correctly uses native `line-through` — same signature device, two techniques, one broken |
| 5 | Error Prevention | 3 | n/a — no forms/destructive actions on this page |
| 6 | Recognition Rather Than Recall | 3 | Nav is text-labeled, not icon-only; icons throughout have adjacent text labels |
| 7 | Flexibility and Efficiency of Use | 3 | n/a for a marketing page; `prefers-reduced-motion` is respected site-wide, a genuine win |
| 8 | Aesthetic and Minimalist Design | 2 | Per-section hierarchy is fine, but the eyebrow+heading+row template repeats across 6 of 7 sections plus 3x icon-in-circle recurrence, flattening the "each section earns its own layout" principle DESIGN.md itself sets |
| 9 | Error Recovery | 3 | n/a — no error states on this page |
| 10 | Help and Documentation | 2 | No visible FAQ/help entry point on the homepage itself |
| **Total** | | **26/40** | **Acceptable — significant improvement needed before this reads as the "flawless craft" the brand's own PRODUCT.md demands** |

## Anti-Patterns Verdict

**Start here. Does this look AI-generated?** Partially — the token system (color/type/spacing) is genuinely disciplined and not a tell by itself, but several concrete elements are.

**LLM assessment (Assessment A):** This would not pass a "how was this made?" test. A rocket icon (`RocketIcon.astro`) is used for "Startup & Business Advisory Services" (`src/data/services.ts:13`) and again for the "Empowering Growth" value pillar (`src/data/valuePropositions.ts:29`) — DESIGN.md's own Overview states, verbatim, "not rockets or gears" as what this brand must avoid. A generic "sparkles" icon represents the "Human + AI Collaboration" differentiator (`src/data/differentiators.ts:7`) — the single biggest brand differentiator, illustrated with the most generic possible AI-SaaS glyph. The tiny-uppercase-tracked-eyebrow pattern DESIGN.md's own Don'ts bans appears on 6 of 7 sections via `SectionHeading.astro:22`. Icon-in-a-circle repeats across 3 sections despite DESIGN.md's own Schedule/Exhibit Row spec stating the § / Exhibit label exists "instead of a decorative icon-in-circle." Per the identity-preservation exception, Playfair Display + Inter, the purple/orange palette, and pill buttons are correctly NOT flagged — they're the brand's own locked identity.

**Deterministic scan (Assessment B):** CLI scan (`detect.mjs --json` over `src/pages/index.astro`, `src/components/sections`, `src/components/common`, `src/components/layout`) exited 2 with **1 finding**: `border-accent-on-rounded` on `src/pages/index.astro:30` — a `border-t-4 border-accent` on a `rounded-2xl` Hero card, flagged because a thick accent border clashes with rounded corners. DESIGN.md's Don'ts only ban left/right accent stripes, not top borders, so this isn't an explicitly-declared exception — it's a real, if minor, finding.

The live-browser overlay (injected via `live-server.mjs` into the running `localhost:4321` page) surfaced additional computed-style findings the static CLI scan missed: `low-contrast` (3.1:1 on white-on-orange primary CTA text), `overused-font` (Inter at 60% of text), `bounce-easing` (`--animate-bounce` present on `<body>`), `call-caps-body` (37 chars of uppercase text on a `text-xs` label), and `line-length` (several paragraphs running 85–114 characters/line, above the <80 recommendation).

**False positives to disclose:**
- **`low-contrast` on the CTA button (3.1:1)** is a false positive against this project's own documented rule: SKILL.md/DESIGN.md explicitly carve out white-on-orange as AA-compliant when text is ≥16px semibold or ≥18px regular (large-text threshold, 3:1), and `ButtonPrimary.astro` uses `text-base font-semibold` (16px semibold) — it qualifies. The detector is applying the normal-text 4.5:1 bar, not the documented exception.
- **`overused-font` (Inter, 60%)** is expected and correct — Inter is the deliberate, documented body/UI face paired with Playfair Display for display moments; a single-page computed-style scan can't see the two-font system is intentional brand identity.
- **`bounce-easing` on `<body>`** is very likely a Tailwind v4 artifact (the framework registers `--animate-bounce` as a theme custom property even when no element uses `animate-bounce`), not an actual bounce animation firing on the page — worth a quick visual confirmation but not a real finding as reported.
- **`call-caps-body`** is most likely a categorization gap: the flagged element is a `text-xs uppercase` label/kicker, not body copy — short labels are explicitly permitted to be uppercase per brand.md ("Reserve caps for short labels and headings").

**Real, non-false-positive detector finding worth acting on:** the `line-length` findings are legitimate — several paragraphs (the Hero's redline strike text, its italic "corrected" line, ValueProposition copy) run meaningfully past the 65–75ch guideline this project's own design guidance sets, and Assessment A's code-reading pass didn't independently flag this.

**Browser evidence:** No horizontal scroll or overflow at 375/768/1440px (mechanically verified via `scrollWidth`/`clientWidth`), no console errors, no overlapping/broken layout. The Hero redline-strike wrap break and the CTA/Footer purple-stacking were confirmed by direct visual screenshot inspection (Assessment A), not by the detector — a good example of why the visual pass catches what static rules can't.

## Overall Impression

The underlying system — tokens, accessibility scaffolding, the Schedule/Exhibit row concept — is more disciplined than most AI-generated marketing sites get. But the page undercuts its own documented rules in exactly the places that matter most for a trust-first legal/compliance brand: the flagship trust artifact (Hero's redline) is visibly broken, the differentiator that's supposed to be the entire pitch (Human + AI Collaboration) is illustrated with a generic AI-SaaS sparkle icon, and the page closes on an unbroken purple slab with a placeholder phone number. The single biggest opportunity: audit every icon and copy element against DESIGN.md's own written rules — the system already tells you what to fix, several sections just don't follow it yet.

## What's Working

1. **ValueProposition is the strongest section on the page.** It correctly uses native `line-through decoration-accent` for the struck "problem" line paired with italic Playfair "solution" copy beneath — the one place the Countersigned Draft concept executes exactly as DESIGN.md specifies, and it reads distinctly from a generic card grid.
2. **Token and accessibility discipline is real.** `global.css` maps every color/font/spacing token to DESIGN.md's frontmatter 1:1, `prefers-reduced-motion` is centrally handled for every animation class, and focus-visible rings are present on every interactive element checked.
3. **BrandPositioning's roman-numeral Declaration of Practice list** (`i. / ii. / iii.`) is a genuinely distinctive structural device that reads like an actual document clause list rather than a reflexive card grid.

## Priority Issues

**[P0] Generic tech iconography directly contradicts the design system's own explicit ban**
- **What:** A rocket icon is used for "Startup & Business Advisory Services" (`src/data/services.ts:13`) and the "Empowering Growth" pillar (`src/data/valuePropositions.ts:29`); a sparkles/magic-wand icon represents "Human + AI Collaboration" (`src/data/differentiators.ts:7`).
- **Why it matters:** DESIGN.md states, verbatim, "not rockets or gears." Shipping the literal banned icon — on the page meant to prove rigor and precision, on the differentiator that's the entire brand pitch — is the single most visible "AI made this" tell on the site.
- **Fix:** Replace `rocket` with legal/business vernacular (a filing folder, an ascending ledger mark, a compass/growth-mark in the brand's line style); replace `sparkles` with a review/signature glyph (a pen nib, a stamp, a checkmark-in-seal).
- **Suggested command:** `/impeccable polish`

**[P1] The redline-strike signature motif is broken on wrap, in the Hero's first-fold trust artifact**
- **What:** `global.css:79-93`'s `.redline-strike` uses a single `::after` positioned at `top: 50%` — exactly the pattern DESIGN.md's own Don'ts bans ("breaks on wrap"). Visually confirmed at 375px and 1440px: "The mark is available for registration in all classes." wraps to two lines, and the strike only appears under the first line.
- **Why it matters:** This is the first demonstration of "AI drafts, human reviews" a visitor sees. A visibly broken correction-mark on the flagship trust artifact directly undermines the "practice what you preach" precision claim (PRODUCT.md Design Principle 4) — and it's inconsistent with ValueProposition, which already fixed this exact bug correctly.
- **Fix:** Replace the Hero's `.redline-strike` usage with the native `line-through decoration-accent decoration-1 [text-decoration-skip-ink:none]` approach already used correctly in `ValueProposition.astro:35`.
- **Suggested command:** `/impeccable harden`

**[P1] Three full-bleed deep-purple sections stack with no separation**
- **What:** Hero (`bg-primary`), CTASection (`bg-primary`), and Footer (`bg-primary`) are all full-bleed purple, with CTA flowing directly into Footer with zero visual separation (confirmed visually).
- **Why it matters:** Direct violation of DESIGN.md's own "One Dark Section Rule" ("a deliberate, occasional gravity anchor, not an alternating background rhythm"). It also flattens the page's ending — the last impression is an undifferentiated purple slab rather than a crafted close.
- **Fix:** Give CTASection a light-toned variant so Footer becomes the page's single dark anchor, or insert a hairline/off-white separation between them per the Elevation section's paper-stacking model.
- **Suggested command:** `/impeccable layout`

**[P2] Anonymous, unverifiable testimonials at the highest-stakes trust moment**
- **What:** `src/data/testimonials.ts` gives only generic roles ("Compliance Manager," "Founder & CEO," "Startup Founder") with no names, companies, or attribution, placed right before the final CTA.
- **Why it matters:** This is the exact moment PRODUCT.md names as the primary anxiety to resolve ("can I trust an AI-assisted advisory firm"); unattributed quotes read as fabricated rather than social proof.
- **Fix:** Add real or realistically-specific names, titles, and company names; at minimum use full names and company types instead of bare role labels.
- **Suggested command:** `/impeccable harden`

**[P2] Body/quote line lengths run past the comfortable reading width**
- **What:** Detector-confirmed: several paragraphs (Hero's redline strike text and its italic corrected line, ValueProposition copy) run 85–114 characters per line, above the project's own <80ch guidance.
- **Why it matters:** Long line lengths reduce readability precisely in the sections doing the most persuasive work; this is a real, detector-caught issue the design-review pass didn't independently flag.
- **Fix:** Cap these paragraphs with a `max-w-*` utility consistent with the 65–75ch target already used elsewhere.
- **Suggested command:** `/impeccable typeset`

**[P3] Placeholder phone number ships live in the footer**
- **What:** `company.ts:9` — phone `+234 000 000 0000` renders directly in the footer.
- **Why it matters:** It's the last thing visible on the page and reads as an unfinished template, undermining trust at the very end of the scroll.
- **Fix:** Replace with a real number or remove the field until one exists.
- **Suggested command:** `/impeccable polish`

**[P3] Accent top-border clashes with rounded corners on the Hero card**
- **What:** `src/pages/index.astro:30` — `border-t-4 border-accent` on a `rounded-2xl` card (detector-confirmed, `border-accent-on-rounded`).
- **Why it matters:** A thick straight border doesn't follow a rounded corner cleanly, producing a small visual seam on the page's most prominent card.
- **Fix:** Either drop the border-radius on that edge, use a full 1px border instead of a 4px partial one, or move the accent to a different treatment (e.g. a small corner mark).
- **Suggested command:** `/impeccable polish`

## Persona Red Flags

**Jordan (Confused First-Timer):** Jordan doesn't know what "§01," "Exhibit A," or "Declaration of Practice" mean on first contact — these labels have zero inline definition anywhere on the page. The Schedule of Services and Exhibit rows are visually elegant but assume the visitor already understands the legal-document metaphor. A first-timer skimming for "what do they actually do" has to parse 7 dense, uncategorized rows.

**Riley (Deliberate Stress Tester):** Riley would immediately notice the redline-strike breaking on wrap — exactly the "feature that appears to work but produces a broken result" Riley's red-flag list calls out. Riley would also notice the internal inconsistency between the Hero's broken strikethrough and ValueProposition's correct one — the same signature device behaving two different ways on one page.

**Ada, the Compliance Manager (project-specific persona, derived from AGENTS.md's Design Context — founders/operators/compliance managers evaluating trustworthiness):**
- **Profile:** Evaluating 2-3 advisory firms in parallel before booking a paid consultation; reads every claim skeptically because her job is literally risk assessment.
- **Behaviors:** Scans for concrete evidence (real client names, verifiable claims, working contact info) before believing a "reviewed by a human expert" seal; treats visual polish as a proxy signal for operational rigor, since that's what she's actually buying.
- **Red flags:** The rocket icon on "Startup & Business Advisory Services" reads as a firm that hasn't thought carefully about its own positioning. The anonymous testimonials give her nothing to verify. The placeholder phone number is the kind of detail a careful risk-evaluator notices and flags as "this firm ships things unfinished."

## Minor Observations

- `Card.astro` and `FeatureCard.astro` exist in `src/components/common/` but aren't used anywhere on the homepage — worth checking if they're dead code or reserved for other pages.
- ServicesOverview's icon chip is hidden below the `sm:` breakpoint while the `§` label and title remain — mobile loses the icon entirely, an inconsistent presentation between breakpoints for the same content.
- Testimonials' decorative opening quote mark is orange text on the white/off-white background (`aria-hidden`, so not a WCAG failure, but it contradicts this project's own stricter house rule against orange-as-text-on-light).
- Nav sits at 5 top-level items plus the primary CTA — right at the recommended ceiling, no room to add another item without regrouping.
- A preview-tool screenshot artifact (narrow-column captures at 768/1440px that didn't match the real DOM layout, confirmed via `getBoundingClientRect()`) was a tooling race condition, not a site defect.

## Questions to Consider

1. If the redline-strike is meant to be the system's single signature device, should it be built as one shared component with one animation implementation, rather than reimplemented per-section — so a fix in one place can't drift out of sync?
2. Hero, CTA, and Footer are all purple by default — was that ever weighed against DESIGN.md's own "One Dark Section Rule," or did each section default independently?
3. Given the brand's own "vary structure section to section" rule, what would it look like to make ServicesOverview, ValueProposition, and WhyChooseUs recognizably different "documents," not just internally coherent?
4. If real client testimonials aren't available yet, is showing the testimonials section at all — versus a smaller, more honest "case study" or "as featured in" treatment — the more trustworthy choice for a compliance audience that specifically distrusts unverifiable claims?
