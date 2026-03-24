# Postmate Client — Documentation Site

Built with [VitePress](https://vitepress.dev). Dark-themed, Markdown-based, static output.

---

## Setup

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot reload — edit any `.md` file and the browser updates instantly.

## Build for Production

```bash
npm run build
```

Output goes to `docs/.vitepress/dist/`. This folder is your deployable static site.

## Preview the Build

```bash
npm run preview
```

---

## Adding New Content

### Add a new page

1. Create a `.md` file in the appropriate folder under `docs/`:

   ```
   docs/testing/my-new-page.md
   ```

2. Add it to the sidebar in `.vitepress/config.mjs`:

   ```js
   {
     text: 'Testing',
     items: [
       { text: 'My New Page', link: '/testing/my-new-page' },
       // ...existing items
     ]
   }
   ```

That's it. The page is live on next `npm run dev`.

### Add a new section

1. Create a new folder under `docs/`:

   ```
   docs/my-new-section/
   ```

2. Add `.md` files inside it.

3. Add a new sidebar group in `.vitepress/config.mjs`:

   ```js
   {
     text: 'My New Section',
     items: [
       { text: 'Overview', link: '/my-new-section/overview' },
     ]
   }
   ```

---

## Project Structure

```
postmate-docs/
├── docs/
│   ├── index.md                        ← Home page
│   ├── getting-started/
│   │   ├── introduction.md
│   │   ├── quick-start.md
│   │   └── installation.md
│   ├── core-concepts/
│   │   ├── building-requests.md
│   │   ├── environments.md
│   │   ├── collections.md
│   │   └── headers.md
│   ├── testing/
│   │   ├── tests-assertions.md
│   │   ├── pm-library.md
│   │   ├── scripts.md
│   │   └── test-snippets.md
│   ├── data-driven/
│   │   ├── data-tables.md
│   │   ├── collection-runner.md
│   │   └── request-chaining.md
│   ├── import-export/
│   │   ├── import-curl-swagger.md
│   │   └── migrate-from-postman.md
│   ├── ci-cd/
│   │   ├── cli-reference.md
│   │   └── reporting.md
│   └── reference/
│       ├── variable-resolution.md
│       ├── autocomplete.md
│       └── troubleshooting.md
└── .vitepress/
    ├── config.mjs                      ← Nav, sidebar, theme settings
    └── theme/
        ├── index.js                    ← Extend default theme
        └── custom.css                  ← All brand/color overrides
```

---

## Customising the Theme

All visual overrides are in `.vitepress/theme/custom.css`. The key CSS variables:

```css
--vp-c-brand-1: #6d8aff;   /* accent color */
--vp-c-bg:      #0d0f14;   /* dark background */
```

Fonts are loaded via Google Fonts in `.vitepress/config.mjs` (`head` array).

---

## Deployment

### GitHub Pages

Add this workflow at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

### Netlify / Vercel

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `docs/.vitepress/dist` |
| Node version | 20 |

Both platforms auto-detect VitePress with zero extra config.
