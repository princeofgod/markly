# Markly Africa — Content Studio

This folder is a **standalone app**, separate from the Astro site. It is where writers
log in (email + password) to publish articles. It is **not** part of `astro build`, and
it is excluded from the site's TypeScript check.

The Astro site only ever **reads published content** from the Sanity API at build time,
so the site stays 100% static.

---

## One-time setup

### 1. Create the Sanity project

```bash
cd sanity
npm install
npx sanity login          # sign in / create a Sanity account
npx sanity init --create-project "Markly Africa" --dataset production
```

Copy the **project ID** it prints (also visible at https://sanity.io/manage).

### 2. Point the Studio at the project

Create `sanity/.env` (git-ignored):

```
SANITY_STUDIO_PROJECT_ID=<your-project-id>
SANITY_STUDIO_DATASET=production
```

### 3. Point the website at the project

Add the same project ID to the **Astro site** — locally in `.env`, and on
**Netlify → Site settings → Environment variables**:

```
PUBLIC_SANITY_PROJECT_ID=<your-project-id>
PUBLIC_SANITY_DATASET=production
```

> Until these are set, the blog builds empty. That's intentional — nothing breaks.

### 4. Make the dataset public

https://sanity.io/manage → API → Datasets → set `production` to **public**.

The site reads without an API token on purpose: with no token, Sanity serves **only
published documents**, so drafts are physically unreachable from the build rather than
merely filtered out.

### 5. Deploy the Studio

```bash
npx sanity deploy
```

Pick a hostname → writers use `https://<name>.sanity.studio`.

### 6. Invite the writers

https://sanity.io/manage → Members → **Invite by email**. Give them the **Editor** role.
They set their own password — **no GitHub account needed**.

### 7. Auto-publish to the live site

1. **Netlify** → Site settings → Build & deploy → **Build hooks** → Add build hook →
   copy the URL.
2. **Sanity** → https://sanity.io/manage → API → **Webhooks** → Create webhook:
   - **URL**: the Netlify build hook URL
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "article"`
   - **HTTP method**: POST

Publish → Netlify rebuilds → article live in ~1–2 minutes.

---

## Day-to-day

```bash
cd sanity
npm run dev      # Studio at http://localhost:3333
npm run deploy   # publish Studio changes (only needed when the schema changes)
```

## Notes

- **Drafts never reach the site.** Save freely; only **Publish** makes an article live.
- **Future-dated posts don't self-publish.** The site only changes when it builds — publish
  when you're ready to go live.
- **Slugs are locked after publish** to avoid breaking live URLs.
- Keep the `category` list in `schemaTypes/article.ts` in sync with `ARTICLE_CATEGORIES`
  in `../src/types/article.ts`.
