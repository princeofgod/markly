## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Design Context

This project uses `/impeccable` for design work. `PRODUCT.md` (register: brand) and `DESIGN.md` define the strategic and visual system — read both before making UI changes. Brand thesis: "AI-powered capability with human professional expertise," carried through a "Countersigned Draft" visual metaphor (redline strikes, exhibits, schedules, seals). Fixed palette: `#2D106C` deep purple, `#FE5F1B` orange (accent-only, never text-on-light), `#FAF8FF` off-white. Fixed fonts: Playfair Display (display) + Inter (body). Full token detail lives in `DESIGN.md`'s frontmatter and `.impeccable/design.json`.
