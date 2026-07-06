# Markly — Frontend Architecture Blueprint

Reference inputs: [SKILL.md](../SKILL.md) (design system source of truth), current scaffold at [src/](../src) (fresh Astro starter — `Welcome.astro`, `Layout.astro`, `index.astro`, no Tailwind installed yet). This blueprint assumes Tailwind CSS gets added as part of step 1 of the roadmap.

---

## 1. Project Folder Structure

```
src/
│
├── assets/          Images, SVGs, fonts referenced via Astro's image pipeline (astro:assets).
│                     Not for static files needed at a fixed public URL — those go in /public.
│
├── components/
│   ├── common/       Small, generic, cross-page primitives with no business meaning
│   │                  (ButtonPrimary, ButtonSecondary, Card, SectionHeading, Badge).
│   ├── layout/        Structural chrome shared by every page (Navbar, MobileMenu, Footer, Container).
│   ├── sections/      Page-level composition blocks (Hero, ServicesOverview, CTASection).
│   │                  These assemble common/ + layout/ primitives into a full section.
│   ├── forms/         Form components and their client-side validation logic (ContactForm).
│   └── icons/          Individual .astro icon components (one file per icon, no icon-font/sprite indirection).
│
├── content/          Astro content collections — Markdown/MDX-backed content that editors may
│                     touch often: Insights/blog posts, case studies. Has a config.ts schema.
│
├── data/             Static structured data with no prose content: nav links, services list,
│                     footer links, company info, social links, FAQs, testimonials. Plain .ts
│                     files exporting typed arrays/objects — no Markdown, no CMS.
│
├── layouts/          Page-shell templates (MainLayout.astro). Owns <html>, <head>, SEO meta,
│                     Navbar + Footer composition, and the <slot /> pages render into.
│
├── lib/              Framework-adjacent helper modules with external concerns: SEO tag builders,
│                     content-collection query helpers, third-party integration glue (e.g. form
│                     submission endpoint client). Distinguish from utils/ below.
│
├── pages/            Route files only. Each page imports MainLayout + sections and composes
│                     them. No original markup, no business logic, no data fetching logic beyond
│                     calling lib/ or content/ helpers.
│
├── styles/           Global stylesheet: Tailwind directives, `@theme`/CSS variable definitions
│                     mapped from SKILL.md tokens, any global resets. No component-scoped CSS.
│
├── types/            Shared TypeScript interfaces used across components/data/content.
│
└── utils/            Pure, framework-agnostic helper functions (formatDate, slugify, cn/clsx
                      wrapper, truncate). No I/O, no Astro/DOM APIs — distinguishes from lib/.
```

**lib/ vs utils/ rule of thumb:** if a function touches Astro APIs, content collections, or an external system → `lib/`. If it's a pure function you could unit-test with zero imports → `utils/`.

---

## 2. Component Architecture

### Layout Components

| Component | Responsibility | Use when | Do NOT include |
|---|---|---|---|
| `MainLayout` | Owns `<html>/<head>/<body>`, injects SEO meta, mounts Navbar + Footer, exposes a single `<slot />` | Every page, exactly once | Page-specific content, section markup |
| `Container` | Applies the site's max-width + horizontal padding rhythm | Wrapping any section's inner content | Vertical spacing (that's the section's job), background colors |

### Navigation

| Component | Responsibility | Use when | Do NOT include |
|---|---|---|---|
| `Navbar` | Renders logo, desktop nav links (from `data/navigation.ts`), CTA button, mounts `MobileMenu` | Once, inside `MainLayout` | Route-specific active-state business logic beyond URL comparison |
| `MobileMenu` | Slide-in/overlay nav for small screens, traps focus, closes on route change or Escape | Rendered by `Navbar`, hydrated with minimal client JS (`client:load` or `client:idle`) | Desktop nav markup (no duplication of link data — reads the same `data/navigation.ts`) |

### Sections

| Component | Responsibility | Use when | Do NOT include |
|---|---|---|---|
| `Hero` | Above-the-fold intro: heading, subheading, primary CTA, optional media | Top of Home, optionally a simplified variant on inner pages | Multiple competing CTAs, unrelated content blocks |
| `ServicesOverview` | Grid/list of `FeatureCard`s summarizing service offerings, sourced from `data/services.ts` | Home, optionally embedded/linked from Services page | Full service detail copy (that belongs on the Services page itself) |
| `ValueProposition` | Communicates differentiators/value pillars | Home, About | Testimonials, pricing |
| `WhyChooseUs` | Trust signals: stats, credentials, methodology | Home, About | Service-specific detail |
| `CTASection` | Single focused conversion prompt (contact/consult) | Bottom of most pages, reused as-is | Forms inline (link to Contact page or open a modal — don't duplicate `ContactForm` markup) |

**Reuse rule:** sections accept typed props/content, never hardcode copy. A page decides *which* sections and *what content*; the section decides *how* it looks.

### UI Components

| Component | Responsibility | Do NOT include |
|---|---|---|
| `SectionHeading` | Consistent eyebrow/heading/subheading pattern used at the top of every section | Section-specific layout (grids, cards) |
| `ButtonPrimary` / `ButtonSecondary` | Encapsulate the two button visual variants + hover/focus/active states from SKILL.md | Icon-only button variants (add a prop, don't fork a new component unless visually distinct) |
| `Card` | Generic bordered/shadowed container with padding rhythm | Content-specific fields |
| `FeatureCard` | `Card` + icon + title + description, used for services/features grids | Pricing, testimonials (those get their own card if ever needed) |

### Forms

| Component | Responsibility | Do NOT include |
|---|---|---|
| `ContactForm` | Field rendering, client-side validation, submission handling, success/error states | Layout chrome (heading, surrounding section copy — that's the Contact page section's job) |

### Footer

| Component | Responsibility | Do NOT include |
|---|---|---|
| `Footer` | Company info, footer nav columns, social links, legal line — all sourced from `data/` | Newsletter signup logic beyond a simple form include (extract if it grows) |

---

## 3. Section Architecture

- **Hero** — always first section on Home; inner pages use a lighter `Hero` variant (prop-driven, e.g. `variant="compact"`) rather than a separate component, to avoid duplicating spacing/typography rules.
- **ServicesOverview** — Home only (teaser); the Services page itself doesn't reuse this component verbatim, it has its own fuller list, but both read from the same `data/services.ts` to avoid content drift.
- **ValueProposition** and **WhyChooseUs** — reusable across Home/About; treated as interchangeable "trust blocks" that can be reordered per page without code changes, only content prop changes.
- **CTASection** — appears once near the bottom of every page except Contact (where the form itself is the CTA). Always the same visual treatment, only the heading/button text varies via props.

**Consistency mechanism:** every section owns its own vertical rhythm via a shared spacing scale (e.g. `py-16 md:py-24`) defined once in `styles/` as a Tailwind utility pattern or applied via a shared class map — sections never pick arbitrary padding. Horizontal alignment is always delegated to `Container`, never re-implemented per section.

---

## 4. Layout Strategy

- **MainLayout.astro** is the only file that renders `<html>`, `<head>`, `Navbar`, `Footer`, and `<slot />`. It accepts typed props: `title`, `description`, `ogImage?`, `noIndex?`.
- **Page structure consistency:** every file in `pages/` follows the same shape — import `MainLayout`, pass SEO props, compose `<Section />` components inside the slot. No page hand-rolls header/footer or duplicates `<head>` tags.
- **Header/footer reuse:** singletons, mounted once in `MainLayout`, never imported directly by a page.
- **Metadata handling:** centralized in `lib/seo.ts`, which builds `<title>`, meta description, canonical URL, and Open Graph tags from page-provided props plus a `data/company.ts` fallback (site name, default OG image, base URL). `MainLayout` calls this helper once.

---

## 5. Data Architecture

| Data | Location | Reasoning |
|---|---|---|
| Navigation links | `data/navigation.ts` | Structural, not prose; typed as `NavigationItem[]` |
| Services | `data/services.ts` | Structured list consumed by both Home teaser and Services page |
| Footer links | `data/footer.ts` (or reuse `navigation.ts` with a `footer` group) | Keep single source if link sets overlap |
| Company info | `data/company.ts` | Name, tagline, address, phone, email — consumed by SEO, Footer, Contact page |
| Contact details | `data/company.ts` | Same file as above, avoid a separate near-duplicate file |
| Social links | `data/social.ts` | Typed as `SocialLink[]`, consumed by Footer (and Navbar if present) |
| FAQs | `data/faqs.ts` (simple, static) — promote to `content/faqs/` collection only if FAQs need per-entry Markdown/rich text | Decide based on whether copy needs formatting beyond plain strings |
| Testimonials | `data/testimonials.ts` if short quotes; `content/testimonials/` if long-form with attribution photos/bios | Same criterion as FAQs |
| Insights/blog articles | `content/insights/` (Astro content collection) | Long-form Markdown content, needs frontmatter schema, pagination, individual routes |

**Rule:** `data/` = typed TS objects/arrays, no prose formatting needed. `content/` = Markdown/MDX where authors need rich formatting or the content set will grow into individual routed pages.

---

## 6. TypeScript Organization

All shared interfaces live in `types/`, one file per domain concern, re-exported from `types/index.ts`:

```ts
// types/navigation.ts
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[]; // only if a dropdown is actually needed
}

// types/service.ts
export interface Service {
  slug: string;
  title: string;
  summary: string;
  icon?: string;
}

// types/feature.ts
export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

// types/testimonial.ts
export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
}

// types/faq.ts
export interface FAQ {
  question: string;
  answer: string;
}

// types/social.ts
export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  href: string;
}

// types/company.ts
export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
}
```

`Feature` and `Service` stay separate even though similar — `Service` has a `slug` (routable), `Feature` doesn't. Don't collapse them prematurely; if they truly converge later, merge then.

---

## 7. Styling Strategy

- **Single source of truth:** every raw value (color hex, font family, spacing unit) is defined once, mapped from SKILL.md into Tailwind theme tokens (`tailwind.config` or CSS `@theme` block, depending on Tailwind version). Components reference tokens (`bg-primary`, `text-accent`), never raw hex values or arbitrary pixel values.
- **Spacing:** strict 8px-grid Tailwind scale only (`p-4`, `gap-8`, `py-16`) — no arbitrary values (`p-[13px]`) except for the rare pixel-perfect icon alignment case, and even then it must be commented with why.
- **Typography hierarchy:** a fixed scale (e.g. `text-display-1`, `text-h2`, `text-body`) defined once as Tailwind utilities/theme extensions mirroring SKILL.md's Display/Body split and 1.5x line-height rule — components pick from this scale, never set `font-size` ad hoc.
- **Color usage:** semantic Tailwind color aliases (`bg-surface`, `text-brand`, `border-muted`) mapped to SKILL.md's Navy/Emerald/Light palette, so a future palette tweak is a one-file change.
- **Reusable utility patterns:** common combinations (card shadow + radius + border, button base styles) extracted via Tailwind's `@apply` in `styles/` only when a pattern repeats 3+ times verbatim — otherwise keep as component-level class strings to avoid a shadow "second design system."
- **Hover/transition standard:** one shared transition utility class (`transition-all duration-300 ease-in-out`, per SKILL.md) applied consistently to all interactive elements; not reinvented per component.

---

## 8. Responsiveness Strategy

- **Mobile-first:** base Tailwind classes target mobile (320px+); `md:`/`lg:`/`xl:` prefixes layer up. Never write desktop-first overrides.
- **Breakpoint philosophy:** rely on Tailwind's default breakpoints (`sm/md/lg/xl/2xl`) — no custom breakpoints unless a specific layout genuinely requires one, to keep behavior predictable across the whole site.
- **Container width:** `Container` component enforces one `max-w-*` value (e.g. `max-w-7xl`) with responsive horizontal padding (`px-4 md:px-8`) — this is the only place page width is decided.
- **Grid system:** CSS Grid for card/feature layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), Flexbox for one-dimensional alignment (nav items, button groups). No fixed pixel widths on layout containers — fluid from 320px to 2560px per SKILL.md.

---

## 9. Accessibility Strategy

- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` used structurally; `MainLayout` guarantees exactly one `<main>` per page.
- **Heading hierarchy:** exactly one `<h1>` per page (owned by the page's Hero or top section); `SectionHeading` renders `<h2>` by default with an overridable `as` prop for correct nesting — never skip levels.
- **Keyboard navigation:** all interactive elements are real `<button>`/`<a>` tags (never `<div onclick>`); `MobileMenu` traps focus while open and restores focus to its trigger on close.
- **Focus states:** every interactive element has a visible `:focus-visible` ring (SKILL.md's transition/emphasis treatment), never `outline-none` without a replacement.
- **Form accessibility:** every `ContactForm` field has an associated `<label>`, `aria-describedby` for error messages, and errors are announced (e.g. `aria-live="polite"` region) rather than color-only indication.
- **ARIA:** used only to fill gaps native HTML can't cover (e.g. `aria-expanded` on the mobile menu trigger, `aria-current="page"` on active nav link) — never as a substitute for semantic elements.

---

## 10. SEO Strategy

- **Per-page metadata:** each `pages/*.astro` file passes `title` and `description` props into `MainLayout`; `lib/seo.ts` composes the final `<title>` as `"{page title} | {company name}"` and builds the meta description, falling back to `data/company.ts` defaults if a page omits them.
- **Open Graph:** one shared OG image default (`data/company.ts` or `assets/`) with a per-page override option; `lib/seo.ts` emits `og:title`, `og:description`, `og:image`, `og:url` consistently.
- **Semantic structure:** enforced by `MainLayout` (`header` → `main` → `footer`), so every page is crawlable in a predictable DOM order.
- **Structured data (optional):** JSON-LD for `Organization` (site-wide, injected once in `MainLayout` from `data/company.ts`) and `Article` schema per Insights entry if/when that collection ships — added only when there's a concrete SEO payoff, not speculatively.

---

## 11. Performance Strategy

- **Rendering:** static output by default (Astro's zero-JS-by-default model) — this is a marketing site, no SSR needed unless the Contact form requires a server endpoint (which can be a single Astro API route, not a reason to SSR the whole site).
- **Hydration:** `client:*` directives used only on components with real interactivity — `MobileMenu` and `ContactForm`. Everything else ships zero client JS. Prefer `client:idle` or `client:visible` over `client:load` where interaction isn't needed immediately.
- **Images:** all imagery routed through `astro:assets` (`<Image />`/`<Picture />`) for automatic optimization/responsive `srcset`; `loading="lazy"` for any image below the fold, `loading="eager"`/`fetchpriority="high"` only for the Hero's LCP image.
- **JS budget:** no client-side framework (React/Vue/Svelte) unless a specific interactive component genuinely needs it — plain Astro + minimal vanilla JS (or a tiny script tag) covers nav toggle and form validation.
- **Asset organization:** source images live in `assets/` (processed at build time); truly static, unprocessed files (favicon, robots.txt) live in `public/`.

---

## 12. Design System Strategy

- SKILL.md tokens are mapped once into Tailwind theme config — components never redefine spacing/color/typography locally.
- The **Home/Landing page is the reference implementation**: it's built first and exercises every shared component and section. Any inconsistency discovered here gets fixed at the component level before other pages are built, not patched per-page later.
- Future pages (Services, About, Contact, Resources) **compose** existing sections/components with new content — they do not introduce new button styles, new card variants, or new spacing values without first checking whether an existing pattern already fits.
- Any genuinely new visual pattern needed by a later page is added as an extension to the shared component library (e.g. a new `Card` variant prop), not a one-off inline implementation.

---

## 13. Engineering Conventions

- **Naming:** PascalCase for components (`ButtonPrimary.astro`), camelCase for data/utils/lib files (`navigation.ts`, `formatDate.ts`), kebab-case for route files where Astro requires it (`pages/about-us.astro` only if the route needs a hyphen — prefer simple single words like `about.astro` where possible).
- **Imports:** absolute imports via the `@/` alias (configured in `tsconfig.json`) for anything outside the current directory, relative imports only for same-folder siblings — avoids brittle `../../../` chains.
- **Component composition:** sections compose common/layout primitives; pages compose sections. No file skips a layer (a page should not reach into `common/` to hand-assemble what a section already provides).
- **Props over duplication:** any visual variant (compact Hero, inverted CTA) is a typed prop, never a copy-pasted second component, unless the divergence is large enough that sharing would need heavy conditional branching — then split deliberately, not by accident.
- **Readability:** one component = one responsibility = one file. If an `.astro` file's template exceeds roughly 100–150 lines, that's a signal to extract a sub-section, not a hard rule to enforce blindly.

---

## 14. Implementation Roadmap

1. **Folder structure setup** — scaffold empty directories per Section 1; install/configure Tailwind mapped to SKILL.md tokens. *Nothing else can be built correctly without the token mapping existing first.*
2. **Layout (MainLayout)** — build the shell before any content, so every subsequent component/page has a correct container to render into.
3. **Data layer** (navigation, services, company, social, FAQs) — typed and populated before UI components need real content to render against; prevents components being built against guessed shapes.
4. **Shared UI components** (Button, Card, SectionHeading, FeatureCard) — the visual vocabulary every section will draw from; building sections before these exist would cause rework.
5. **Navigation + Footer** — global chrome finished next since every page depends on it and it's now unblocked by steps 3–4.
6. **Landing Page** (design system reference) — the first full assembly of sections; surfaces any gaps in the component library while there's only one page to fix, not five.
7. **Services Page** — reuses `data/services.ts` and established components; validates the system holds up for a second, differently-structured page.
8. **About Page** — reuses trust-block sections (ValueProposition/WhyChooseUs); tests reordering/reuse of Home sections in a new context.
9. **Contact Page** — introduces the one new interactive piece (`ContactForm`); isolated to its own step since it's the only page needing client-side logic and possibly a server endpoint.
10. **Resources/Insights Page** — introduces the `content/` collection; deliberately last among content pages since it's the most structurally different (listing + detail routes).
11. **Final review & optimization** — cross-page audit against SKILL.md (spacing/typography/color consistency), accessibility pass (heading order, focus states, contrast), performance pass (image weights, hydration audit), SEO pass (titles/meta/OG on every route).

**Why this order:** the design system and data contracts are locked before any pixel is drawn, so no page gets built against a guess that later changes. The Landing Page absorbs the cost of discovering component gaps once, instead of that cost being paid — and inconsistently patched — across five separate pages later.
