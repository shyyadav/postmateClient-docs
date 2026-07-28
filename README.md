# Postmate Client — Documentation Site

Source for **https://www.postmateclient.com**, the docs for
[Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate) —
a privacy-first REST / GraphQL / WebSocket API client for VS Code.

Built with [VitePress](https://vitepress.dev). Deployed on Vercel from `main`.

```bash
npm install
npm run dev       # localhost:5173, hot reload
npm run build     # → docs/.vitepress/dist
npm run preview
```

Pages are Markdown files under `docs/`. Nav, sidebar, and SEO config live in
`docs/.vitepress/config.mjs` — a new page needs both a file and a sidebar entry.
Static assets go in `docs/public/` and are served from the root
(`docs/public/foo.png` → `/foo.png`).

---

## Internal links

Case-sensitive, no `docs/` prefix, no `.md` extension, and always point at a
real page rather than a folder:

```
/security/corporate-proxy      ✅
/docs/corporate-proxy          ❌  docs/ is the srcDir, not part of the URL
/Security/corporate-proxy      ❌  case-sensitive on Vercel
/ci-cd                         ❌  folder, not a page
```

Enforced in CI — see `.github/workflows/link-check.yml`.

---

## `vercel.json` — read before editing

Small file, but every line is load-bearing:

- **`cleanUrls`** — URLs without `.html`
- **`trailingSlash: false`** — one canonical form per URL
- **`redirects`** — 301s from legacy URLs Google still has indexed. Deleting
  these drops roughly 1,100 monthly impressions.

**Never add a catch-all `rewrites` rule.** This file once contained
`{ "source": "/:path*", "destination": "/index" }` — an SPA fallback that
doesn't apply to a static site generator. Every VitePress route already has its
own HTML file, so the rule only fired on URLs that *didn't* exist, returning
**200 with the homepage body** instead of a 404. Google indexed those broken
URLs and left the real pages unindexed. VitePress ships its own `404.html`,
which Vercel serves correctly once nothing is rewriting ahead of it.

After deploying, an unknown path should 404:

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://www.postmateclient.com/docs/corporate-proxy
```