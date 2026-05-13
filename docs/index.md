---
layout: home
title: Postmate Client — Privacy-First Postman Alternative for VS Code
description: Privacy-first REST and GraphQL API client built natively into VS Code. Import Postman, OpenAPI, and Swagger collections. Data-driven testing, response comparison, CLI for CI/CD. No cloud sync, no login, no telemetry — free forever.
head:
  - - meta
    - name: description
      content: Privacy-first REST and GraphQL API client built natively into VS Code. Import Postman, OpenAPI, and Swagger collections. Data-driven testing, response comparison, CLI for CI/CD. No cloud sync, no login, no telemetry — free forever.
  - - meta
    - name: keywords
      content: postman alternative, vs code api client, graphql vs code, import postman collection, data-driven api testing, free api client, privacy-first api testing, rest client vs code, thunder client alternative
  - - meta
    - property: og:title
      content: Postmate Client — Privacy-First Postman Alternative for VS Code
  - - meta
    - property: og:description
      content: Privacy-first REST and GraphQL API client built natively into VS Code. Import Postman collections, run data-driven tests, compare responses — free forever.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com
  - - meta
    - name: twitter:title
      content: Postmate Client — Privacy-First Postman Alternative for VS Code
  - - meta
    - name: twitter:description
      content: Privacy-first REST and GraphQL API client built natively into VS Code. Import Postman collections, run data-driven tests, compare responses — free forever.
  - - link
    - rel: canonical
      href: https://www.postmateclient.com
hero:
  name: Postmate Client
  text: Your APIs. Your Machine. Your Data.
  tagline: A privacy-first REST and GraphQL API client built natively into VS Code. No cloud sync, no login, no telemetry — just fast, local API testing that respects your data.
  actions:
    - theme: brand
      text: Install Free →
      link: https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate
    - theme: alt
      text: Get Started
      link: /getting-started/introduction
    - theme: alt
      text: Discussion Forum ↗
      link: https://github.com/shyyadav/postmateClient-docs/discussions
features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
    title: Import from Postman, OpenAPI & Swagger
    details: Bring your work with you. Import Postman v2.1 collections, OpenAPI 3.0, Swagger 2.0, and cURL commands in one click. Stay productive from minute one — no rebuilding.
    link: /import-export/migrate-from-postman
    linkText: Migrate from Postman

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5z"/><path d="m12 3 9 5-9 5-9-5 9-5z"/><circle cx="12" cy="13" r="1.5"/></svg>'
    title: GraphQL, Built-In
    details: Send GraphQL queries and mutations with a dedicated Query and Variables editor. Same builder as your REST calls. Variable autocomplete works inside both editors.
    link: /core-concepts/graphql
    linkText: GraphQL guide

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/><path d="m15 9-3-3 3-3"/><circle cx="19" cy="18" r="3"/><path d="M12 18H7a2 2 0 0 1-2-2V9"/><path d="m9 15 3 3-3 3"/></svg>'
    title: Side-by-Side Response Compare
    details: Diff two API responses with differences highlighted in clean JSONPath notation. Run single comparisons or bulk comparisons across CSV data tables — perfect for staging vs prod regression checks.
    link: /testing/compare-api-response
    linkText: See it in action

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="m17.5 17.5 3 3"/><circle cx="15.5" cy="15.5" r="2.5"/></svg>'
    title: Data Tables & Per-Request Tagging
    details: "Attach a CSV data table to any environment — automatically active across every request. Tag rows with a _dtag column to filter which rows appear per request. Unique to Postmate Client."
    link: /data-driven/data-tagging
    linkText: Learn about tagging

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
    title: Tests, Assertions & Scripts
    details: Write tests in plain English with the tabular editor, or use the full pm scripting library. Pre/post-request scripts, built-in test snippets, one-click JSON Schema generator — all without leaving VS Code.
    link: /testing/tests-assertions
    linkText: Testing guide

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/></svg>'
    title: Collections, Environments & Chaining
    details: "Organise requests into collections and nested folders. Manage dev, staging, and prod with named environments and {{variables}}. Chain requests visually to pass tokens and IDs between calls."
    link: /core-concepts/collections
    linkText: Learn more

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>'
    title: CI/CD Ready
    details: Run collections from the command line, automate API tests in any pipeline, and generate HTML reports for stakeholders. Free CLI — no paid tier required.
    link: /ci-cd/cli-reference
    linkText: CLI reference

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>'
    title: Local-First. VS Code Native. Free Forever.
    details: Runs entirely inside VS Code with zero external runtime. Every feature, every collection, every environment — free. No cloud sync, no login, no telemetry, no paid tiers.
    link: '#postmate-client-vs-postman-vs-thunder-client'
    linkText: Compare plans
---

<script setup>
import { ref } from 'vue'
const compareMode = ref('single')
</script>

<!-- ============================================ -->
<!-- TRUST BAND: marketplace rating + switcher    -->
<!-- ============================================ -->
<div class="trust-band">
  <a
    class="trust-badge"
    href="https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate&ssr=false#review-details"
    target="_blank"
    rel="noopener"
    aria-label="5-star rating on the VS Code Marketplace"
  >
    <span class="trust-badge-stars" aria-hidden="true">★★★★★</span>
    <span class="trust-badge-text">5.0 on the VS Code Marketplace</span>
  </a>
  <div class="trust-switcher">
    Switching from Postman?
    <a href="/import-export/migrate-from-postman">Import your collections in one click →</a>
  </div>
</div>

<!-- ============================================ -->
<!-- FLAGSHIP FEATURE: side-by-side compare        -->
<!-- ============================================ -->
<div class="flagship-section">
  <div class="flagship-inner">
    <div class="flagship-eyebrow">SEE IT IN ACTION</div>
    <h2 class="flagship-title">Compare two API responses in seconds</h2>
    <p class="flagship-subtitle">
      Pick two environments. Hit Compare. Postmate Client fires both calls in parallel, diffs the responses, and shows you only what changed — in clean JSONPath notation. Need to compare hundreds of inputs? Point it at a CSV data table.
    </p>
    <div class="compare-toggle">
      <button
        class="compare-toggle-btn"
        :class="{ active: compareMode === 'single' }"
        @click="compareMode = 'single'"
        type="button"
      >
        Single row
      </button>
      <button
        class="compare-toggle-btn"
        :class="{ active: compareMode === 'bulk' }"
        @click="compareMode = 'bulk'"
        type="button"
      >
        Bulk (CSV)
      </button>
    </div>
    <div class="flagship-image-wrap">
      <img
        v-show="compareMode === 'single'"
        src="/compare1.png"
        alt="Postmate Client comparing two API responses side-by-side with diff highlights — Postman alternative for VS Code"
      />
      <img
        v-show="compareMode === 'bulk'"
        src="/compare2.png"
        alt="Postmate Client running bulk API response comparison across CSV data table rows with summary of total, passed, and failed results"
      />
    </div>
    <div class="flagship-cta">
      <a href="/testing/compare-api-response">Single-row compare guide →</a>
      <span class="flagship-cta-divider">·</span>
      <a href="/testing/compare-api-response-bulk-data">Bulk CSV compare guide →</a>
    </div>
  </div>
</div>

<!-- ============================================ -->
<!-- WHY POSTMATE                                 -->
<!-- ============================================ -->
<div class="prose-section">

## Why developers are switching to Postmate Client

Most API clients were built for the cloud era — sync everything, log in everywhere, ship your tokens to someone else's servers. **Postmate Client takes the opposite approach.** It runs entirely inside VS Code, stores everything locally, and never phones home.

### A real request builder, not a text file

Postmate Client gives you a full visual request builder inside VS Code — tabs for params, headers, body, auth, tests, and pre/post-request scripts. Build REST and GraphQL calls without writing any boilerplate.

Every input field supports **dynamic variables** out of the box, so you can keep tests realistic without hardcoding data:

![Postmate Client UI — privacy-first Postman alternative running inside VS Code with request builder, response panel, and data tables](/postmateClientUI.png)

Combine with environments to switch between dev, staging, and prod without touching the request. Chain requests, write tests, compare responses, filter test data by tag — all from the same visual editor.
</div>

<!-- ============================================ -->
<!-- COMPARISON TABLE                              -->
<!-- ============================================ -->
<div class="prose-section">

## Postmate Client vs Postman vs Thunder Client

|  | Postmate Client | Postman | Thunder Client |
| --- | --- | --- | --- |
| Runs inside VS Code | ✅ Native | ❌ Separate desktop app | ✅ Native |
| Works offline | ✅ Always | ⚠️ Limited | ⚠️ Limited |
| Works without login | ✅ Always | ❌ Required to use | ⚠️ For paid features |
| No cloud sync | ✅ Local-only | ❌ Cloud default | ✅ Local |
| No telemetry | ✅ None | ❌ Yes | ❌ Yes |
| GraphQL support | ✅ Built-in | ✅ Yes | ⚠️ Limited |
| Import Postman / OpenAPI / Swagger / cURL | ✅ Built-in | ⚠️ Partial | ⚠️ Partial |
| Pre/post-request scripts | ✅ Built-in | ✅ Yes | ⚠️ Limited |
| Side-by-side response compare | ✅ Built-in | ❌ Manual | ❌ Not available |
| Bulk response comparison (CSV-driven) | ✅ Built-in | ❌ Scripting required | ❌ Not available |
| Data tables linked to environments | ✅ Built-in | ❌ Not available | ❌ Not available |
| Per-request data tag filtering | ✅ Built-in | ❌ Not available | ❌ Not available |
| CLI for CI/CD | ✅ Free | 💰 Paid (Newman / Enterprise) | 💰 Paid tier |
| Price | ✅ Free forever | 💰 Paid plans | 💰 Free + paid plans |

</div>

<!-- ============================================ -->
<!-- GETTING STARTED                              -->
<!-- ============================================ -->
<div class="prose-section">

## Get started in under a minute

1. Install the **[Postmate Client extension](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)** from the VS Code Marketplace.
2. Click the **Postmate Client** icon in the VS Code Activity Bar, then click **New Request**.
3. Paste a URL, hit **Send** — your first API call without leaving the editor.

[Read the Getting Started guide →](/getting-started/introduction) &nbsp; · &nbsp; [Or import everything you already have →](/import-export/migrate-from-postman)

### Explore the docs

<div class="docs-grid">
  <a href="/getting-started/introduction" class="docs-card">
    <div class="docs-card-title">Getting Started</div>
    <div class="docs-card-desc">Install, first request, first collection</div>
  </a>
  <a href="/core-concepts/graphql" class="docs-card">
    <div class="docs-card-title">GraphQL</div>
    <div class="docs-card-desc">Queries, mutations, and variables in VS Code</div>
  </a>
  <a href="/import-export/migrate-from-postman" class="docs-card">
    <div class="docs-card-title">Migrate from Postman</div>
    <div class="docs-card-desc">Bring your existing collections across</div>
  </a>
  <a href="/testing/compare-api-response" class="docs-card">
    <div class="docs-card-title">Compare API Responses</div>
    <div class="docs-card-desc">Single-row diff between two builds</div>
  </a>
  <a href="/testing/compare-api-response-bulk-data" class="docs-card">
    <div class="docs-card-title">Bulk Response Comparison</div>
    <div class="docs-card-desc">CSV-driven diffs across hundreds of inputs</div>
  </a>
  <a href="/data-driven/data-tables" class="docs-card">
    <div class="docs-card-title">Data Tables</div>
    <div class="docs-card-desc">Data-driven testing with CSV</div>
  </a>
  <a href="/data-driven/data-tagging" class="docs-card">
    <div class="docs-card-title">Data Tagging</div>
    <div class="docs-card-desc">Filter rows per request with the _dtag column</div>
  </a>
  <a href="/data-driven/collection-runner" class="docs-card">
    <div class="docs-card-title">Collection Runner</div>
    <div class="docs-card-desc">Run hundreds of requests in sequence</div>
  </a>
  <a href="/core-concepts/building-requests" class="docs-card">
    <div class="docs-card-title">Building Requests</div>
    <div class="docs-card-desc">Request syntax, headers, and variables</div>
  </a>
  <a href="/core-concepts/environments" class="docs-card">
    <div class="docs-card-title">Environments</div>
    <div class="docs-card-desc">Manage dev, staging, and production</div>
  </a>
  <a href="/ci-cd/cli-reference" class="docs-card">
    <div class="docs-card-title">CLI Reference</div>
    <div class="docs-card-desc">Automate API tests in CI/CD</div>
  </a>
</div>

</div>

<style scoped>
/* ---------- Feature grid refinements ---------- */
:deep(.VPFeature) {
  background: var(--vp-c-bg) !important;
  border: 1px solid var(--vp-c-divider) !important;
  border-radius: 12px !important;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

:deep(.VPFeature:hover) {
  border-color: var(--vp-c-brand-1) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.08);
}

/* Kill the gray icon container, let the icon breathe */
:deep(.VPFeature .icon) {
  background: transparent !important;
  border: none !important;
  width: auto !important;
  height: auto !important;
  font-size: 0 !important;
  margin-bottom: 16px !important;
  padding: 0 !important;
}

/* Style the SVG itself: brand color, proper size */
:deep(.VPFeature .icon svg) {
  width: 26px !important;
  height: 26px !important;
  color: var(--vp-c-brand-1) !important;
  stroke: currentColor !important;
}

/* Slightly tighten the title weight and spacing */
:deep(.VPFeature .title) {
  font-size: 16px !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
}

/* Remove underline from CTA on hover for cleaner feel */
:deep(.VPFeature:hover .link-text) {
  text-decoration: none;
}

/* ---------- Trust band: rating badge + switcher link ---------- */
.trust-band {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 48px auto 0;
  padding: 0 24px;
}

.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.trust-badge:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.trust-badge-stars {
  color: #f5a623;
  letter-spacing: 1px;
  font-size: 13px;
}
.trust-badge-text {
  color: var(--vp-c-text-1);
}

.trust-switcher {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.trust-switcher a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
  margin-left: 4px;
}
.trust-switcher a:hover {
  text-decoration: underline;
}

/* ---------- Flagship feature section ---------- */
.flagship-section {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 64px 24px;
  margin-top: 48px;
}
.flagship-inner {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.flagship-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
}
.flagship-title {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  border: none;
  padding: 0;
}
.flagship-subtitle {
  font-size: 17px;
  color: var(--vp-c-text-2);
  max-width: 640px;
  margin: 0 auto 36px;
  line-height: 1.6;
}
.flagship-image-wrap {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  max-width: 820px;
  margin: 0 auto;
}
.flagship-image-wrap img {
  width: 100%;
  height: auto;
  display: block;
}
.flagship-cta {
  margin-top: 28px;
  font-size: 15px;
  font-weight: 600;
}
.flagship-cta a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.flagship-cta a:hover {
  text-decoration: underline;
}
.flagship-cta-divider {
  color: var(--vp-c-text-3);
  margin: 0 12px;
}

/* ---------- Generic prose section wrapper ---------- */
.prose-section {
  max-width: 880px;
  margin: 64px auto;
  padding: 0 24px;
}
.prose-section h2 {
  font-size: 28px;
  border: none;
  padding: 0;
  margin-top: 0;
}
.prose-section h3 {
  font-size: 20px;
  margin-top: 32px;
}

/* ---------- Docs grid ---------- */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 20px;
}
.docs-card {
  display: block;
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none !important;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.docs-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.docs-card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}
.docs-card-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* ---------- Compare mode toggle ---------- */
.compare-toggle {
  display: inline-flex;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 4px;
  margin: 0 0 24px;
  gap: 2px;
}
.compare-toggle-btn {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.compare-toggle-btn:hover {
  color: var(--vp-c-text-1);
}
.compare-toggle-btn.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* ---------- Mobile ---------- */
@media (max-width: 768px) {
  .trust-band { margin-top: 32px; }
  .trust-badge { padding: 7px 14px; font-size: 13px; }
  .flagship-section { padding: 48px 16px; }
  .flagship-title { font-size: 24px; }
  .flagship-subtitle { font-size: 15px; }
  .flagship-image-wrap { padding: 12px; }
  .prose-section { margin: 48px auto; padding: 0 16px; }
}
</style>
