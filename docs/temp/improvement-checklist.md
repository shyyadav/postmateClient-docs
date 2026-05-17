# Postmate Client — Progress Checklist

_Last updated: end of session, May 13 2026_

---

## ✅ Completed

### Documentation
- [x] **Building Requests** — added GraphQL row to the body format table + new "GraphQL Body" subsection with screenshot + FAQ entry
- [x] **GraphQL** — new dedicated page at `/core-concepts/graphql` with full SEO frontmatter, walkthrough using countries.trevorblades.com, mutations, testing, FAQs
- [x] **Data Tables** — significant rewrite with correct create/attach workflow (hamburger menu → name → CSV in VS Code), `dataTableName` env mechanic, CSV format rules including comma-quoting, rainbow-csv tip framed as optional
- [x] **Data Tagging** — new dedicated page at `/data-driven/data-tagging` with the `_dtag` column rules, 4-scenario worked example, filtering behaviour, Collection Runner interaction, FAQs
- [x] **Sidebar config** — added Data Tagging entry between Data Tables and Collection Runner *(verify this is actually deployed)*

### Site infrastructure
- [x] **medium-zoom integration** — site-wide image zoom with z-index fix above sidebar
- [x] **Homepage zoom fix** — broadened selector to cover `.VPHome` layout, not just `.main`

### Homepage
- [x] **Frontmatter SEO** — description, keywords, OG, Twitter, canonical all updated to mention GraphQL, import, free forever
- [x] **Hero tagline** — "REST and GraphQL API client" (was REST-only)
- [x] **Trust band** — 5-star marketplace badge + "Switching from Postman?" inline link, styled to match existing design tokens
- [x] **Features grid** — restructured to 8 cards: Import, GraphQL, Compare, Data Tables & Tagging, Tests & Scripts, Collections/Env/Chaining, CI/CD, Local-First/Native/Free
- [x] **Comparison table** — expanded to 14 rows with icon-logic inversion fixed (negative-framed rows re-framed as positive); added GraphQL, Import, Pre/post-scripts, Per-request data tag filtering
- [x] **Comparison table alignment** — switched competitor columns from center to left-align
- [x] **Quick Start** — corrected steps to match real first-30-seconds workflow
- [x] **Docs grid** — expanded from 8 to 11 cards; added GraphQL, Migrate from Postman, Data Tagging

---

## 🔲 Open — verify before forgetting

These are things flagged during writing that need a quick check, not full work:

- [ ] **Marketplace review URL** — verify `?ssr=false#review-details` lands on the reviews tab on hover/click
- [ ] **GraphQL row in comparison table** — confirm Thunder Client cell (currently ⚠️ Limited); update if their GraphQL support has improved
- [ ] **Import row in comparison table** — confirm Postman and Thunder Client cells (currently ⚠️ Partial)
- [ ] **Variable autocomplete inside Query editor (GraphQL page)** — confirm the popup actually triggers inside query text, not just substitution. If only substitution works, soften the line in the GraphQL page that claims "autocomplete inside both editors"
- [ ] **Blog typo** — "hree practical ways" on `/blog/How-to-compare-json-response` (missing leading T). One-character fix.

---

## 🔲 Open — next session work

### Optional / nice-to-have docs work
- [ ] Pre/post-request Scripts dedicated page (referenced from GraphQL and Building Requests pages but doesn't exist yet — links go to `/testing/scripts` which 404s. Either create the page or remove the cross-references.)
- [ ] FAQ schema (JSON-LD) site-wide for rich snippets in Google search results
- [ ] "What's new" blog post bundling GraphQL + Import + Data Tagging + Snippets as a launch-style narrative — gives the homepage a "Read announcement" link and dates the new features

### Product roadmap (the original conversation goal)
- [ ] **WebSocket + SSE support** — your weekend project. Real-time API testing inside VS Code. Launch post writes itself once shipped: "Real-time APIs: WebSocket and SSE, fully supported."
- [ ] **gRPC support** — after WebSocket lands; needs `.proto` parsing, reflection, streaming modes. 4–6 weeks of real work; ship it complete or not at all
- [ ] **OAuth 2.0 flow helper** — Auth Code + PKCE and Client Credentials flows with auto-refresh; closes the biggest auth gap for enterprise switchers
- [ ] **Code snippet generation** — small build (postman-code-generators library), high "wow" moment; generates curl/fetch/axios/Python/Go/etc. from the current request

### Post-launch homepage updates (once WebSocket ships)
- [ ] Add WebSocket/SSE card to the features grid (replaces one of the existing cards or expands to 9)
- [ ] Add "WebSocket support" row to the comparison table — another ✅ ❌ ❌ row where you lead
- [ ] Update homepage frontmatter description to include "WebSocket" and "real-time API testing"
- [ ] Write the launch announcement blog post

---

## 📋 Files shipped this session (drop-in replacements)

These all live in your outputs folder and are ready to commit:

| File | Path in repo |
|---|---|
| `building-requests.md` | `docs/core-concepts/building-requests.md` |
| `graphql.md` | `docs/core-concepts/graphql.md` (new) |
| `data-tables.md` | `docs/data-driven/data-tables.md` |
| `data-tagging.md` | `docs/data-driven/data-tagging.md` (new) |
| `index.md` | `docs/index.md` (homepage) |
| `index.ts` (content) | `.vitepress/theme/index.js` (your file is `.js`, paste contents in) |
| `request-body-graphql.png` | `docs/public/request-body-graphql.png` |
| `data-table-create-and-list.png` | `docs/public/data-table-create-and-list.png` |
| `data-table-attach-to-env.png` | `docs/public/data-table-attach-to-env.png` |
| `request-data-tags-settings.png` | `docs/public/request-data-tags-settings.png` |
| `custom-zoom.css` | append rules to `docs/.vitepress/theme/custom.css` |

---

## 🎯 Strategic context (so you remember the why)

The goal we set at the start: **win switchers from Postman/Thunder Client.**

Current state: documentation gap is closed, homepage truthfully reflects the product. The single biggest remaining lever for switching is **WebSocket + SSE support** — it's the one place Postman genuinely beats you on capability, and closing it puts you ahead of Thunder Client too. Everything else (gRPC, OAuth, snippets) is depth work, not acquisition work.

The defensible long-term moat is the combination of:
1. **Privacy-first / local-only** — Postman can't copy without abandoning their cloud business
2. **Data tagging** — no competitor has this; ranks for queries with no competition
3. **Bulk response compare** — also unique to you
4. **Free, every feature** — sustainable as long as the project stays solo/lean

Don't lose the privacy-first story when shipping new features. Each new feature gets its on-brand "local, no cloud, no login" framing.

---

## 🧭 When you pick this up next

Start with the four "verify" items at the top — they take 5 minutes each and unblock confidence in everything already shipped. Then either:

**Path A — Marketing follow-through:** write the "What's new" blog post, fix the blog typo, create the Pre/Post Scripts page. Closes loose ends before product work.

**Path B — Product follow-through:** start WebSocket + SSE on the weekend as originally planned. Marketing follow-up can wait until WebSocket ships, then it all bundles into one launch story.

My honest recommendation: **Path B**. Marketing without new product is a small lift; product + bundled marketing is a big lift. Save the writing for when you have a real launch to announce.
