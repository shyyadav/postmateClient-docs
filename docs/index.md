---
layout: home
title: Postmate Client — Privacy-First Postman Alternative for VS Code
description: Privacy-first REST API client built natively into Visual Studio Code. No cloud sync, no login, no telemetry. Test, compare, and automate APIs locally with collections, environments, data-driven testing, and side-by-side response comparison.
head:
  - - meta
    - name: description
      content: Privacy-first REST API client built natively into Visual Studio Code. No cloud sync, no login, no telemetry. Test, compare, and automate APIs locally with collections, environments, data-driven testing, and side-by-side response comparison.
  - - meta
    - property: og:title
      content: Postmate Client — Privacy-First Postman Alternative for VS Code
  - - meta
    - property: og:description
      content: Privacy-first REST API client built natively into Visual Studio Code. No cloud sync, no login, no telemetry. Test, compare, and automate APIs locally.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com
  - - meta
    - name: twitter:title
      content: Postmate Client — Privacy-First Postman Alternative for VS Code
  - - meta
    - name: twitter:description
      content: Privacy-first REST API client built natively into Visual Studio Code. No cloud sync, no login, no telemetry. Test, compare, and automate APIs locally.
  - - link
    - rel: canonical
      href: https://www.postmateclient.com
hero:
  name: Postmate Client
  text: Your APIs. Your Machine. Your Data.
  tagline: A privacy-first REST API client built natively into VS Code. No cloud sync, no login, no telemetry — just fast, local API testing that respects your data.
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
  - icon: 🔒
    title: Privacy-First by Design
    details: No cloud sync, no login, no telemetry. Your requests, tokens, and payloads never leave your machine. Built for teams that take data seriously.
  - icon: ⚡
    title: Native VS Code Performance
    details: A fully native REST API client inside your editor. No Electron wrapper, no external runtime. Instant startup, zero overhead.
  - icon: 🔍
    title: Side-by-Side Response Compare
    details: Diff two API responses with differences highlighted in clean JSONPath notation. Run single comparisons or bulk comparisons across CSV data tables — perfect for staging vs prod regression checks.
    link: /testing/compare-api-response
    linkText: See it in action →
  - icon: 📊
    title: Data Tables, Out of the Box
    details: Attach a CSV data table to any individual request — no collection runner needed. Tables stay linked to your environment, so the same dataset works across dev, staging, and prod. Unique to Postmate Client.
    link: /data-driven/data-tables
    linkText: Learn more →
  - icon: 🌍
    title: Environments & Variables
    details: Manage dev, staging, and production configs with named environments. Reference values anywhere with {{variableName}} — secrets stay local.
    link: /core-concepts/environments
    linkText: Learn more →
  - icon: 📂
    title: Collections & Folders
    details: Organise requests into collections and nested folders. Share, export, and version-control your entire API suite alongside your code.
    link: /core-concepts/collections
    linkText: Learn more →
  - icon: 🧪
    title: Tests & Assertions
    details: Write tests in plain English with the tabular test editor, or use the full pm scripting library for advanced assertions and chained workflows.
    link: /testing/tests-assertions
    linkText: Learn more →
  - icon: 🚀
    title: CI/CD Ready
    details: Run collections from the command line, automate API tests in any pipeline, and generate HTML reports for stakeholders.
    link: /ci-cd/cli-reference
    linkText: CLI reference →
  - icon: 💸
    title: Free, Forever
    details: Every feature, every collection, every environment — free. No paid tiers, no team seats, no surprise paywalls on the features you actually need.
---

<script setup>
import { ref } from 'vue'
const compareMode = ref('single')
</script>

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
        src="/public/compare1.png"
        alt="Postmate Client comparing two API responses side-by-side with diff highlights"
      />
      <img
        v-show="compareMode === 'bulk'"
        src="/public/compare2.png"
        alt="Postmate Client running bulk comparison across CSV data table rows with summary of total, passed, and failed"
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

Postmate Client gives you a full visual request builder inside VS Code — tabs for params, headers, body, auth, tests, and pre-request scripts. Build the most complex API call without writing any boilerplate.

Every input field supports **dynamic variables** out of the box, so you can keep tests realistic without hardcoding data:

![Postmate Client UI](/public/postmateClientUI.png)

Combine with environments to switch between dev, staging, and prod without touching the request. Chain requests, write tests, and compare responses — all from the same visual editor.
</div>

<!-- ============================================ -->
<!-- COMPARISON TABLE                              -->
<!-- ============================================ -->
<div class="prose-section">

## Postmate Client vs Postman vs Thunder Client

|  |               Postmate Client | Postman                    |       Thunder Client |
| --- |------------------------------|----------------------------|---------------------|
| Runs inside VS Code |                      ✅ Native | ❌ Separate desktop app     |             ✅ Native |
| Works offline | ✅ Always (no telemetry calls) | ⚠️ Limited                 |   ⚠️ Sends telemetry |
| Cloud sync required |                       ✅ Never | ❌ Default                  |              ✅ Never |
| Login required |                       ✅ Never | ❌ Required to use          | ⚠️ For paid features |
| Side-by-side response compare |                    ✅ Built-in | ❌ Manual                   |      ❌ Not available |
| Bulk response comparison |                    ✅ Built-in | ❌ Scripting required       |      ❌ Not available |
| Data-driven testing |                        ✅ Free | ⚠️ Paid tiers              |         ⚠️ Paid tier |
| Data tables (per-request) |                        ✅ Built-in, free | ⚠️ Collection runner only              |         ⚠️ Collection runner only |
| Data tables linked to environments |                        ✅  Built-in | ⚠️ Not available              |         ⚠️ Not available |
| CLI for CI/CD |                        ✅ Free | ⚠️ Paid (Newman/Enterprise) |         ⚠️ Paid tier |
| Telemetry |                        ✅ None | ❌ Yes                      |                ❌ Yes |
| Price |                ✅ Free forever | 💰 Paid plans              | 💰 Free + paid plans |


</div>

<!-- ============================================ -->
<!-- GETTING STARTED                              -->
<!-- ============================================ -->
<div class="prose-section">

## Get started in under a minute

1. Install the **[Postmate Client extension](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)** from the VS Code Marketplace
2. Open the Postmate Client sidebar and create your first collection
3. Send a request, write a test, compare two environments — all without leaving your editor

[Read the Getting Started guide →](/getting-started/introduction)

### Explore the docs

<div class="docs-grid">
  <a href="/getting-started/introduction" class="docs-card">
    <div class="docs-card-title">Getting Started</div>
    <div class="docs-card-desc">Install, first request, first collection</div>
  </a>
  <a href="/testing/compare-api-response" class="docs-card">
    <div class="docs-card-title">Compare API Responses</div>
    <div class="docs-card-desc">Single-row diff between two builds</div>
  </a>
  <a href="/testing/compare-api-response-bulk-data" class="docs-card">
    <div class="docs-card-title">Bulk Response Comparison</div>
    <div class="docs-card-desc">CSV-driven diffs across hundreds of inputs</div>
  </a>
  <a href="/data-driven/collection-runner" class="docs-card">
    <div class="docs-card-title">Collection Runner</div>
    <div class="docs-card-desc">Run hundreds of requests in sequence</div>
  </a>
  <a href="/data-driven/data-tables" class="docs-card">
    <div class="docs-card-title">Data Tables</div>
    <div class="docs-card-desc">Data-driven testing with CSV</div>
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
  .flagship-section { padding: 48px 16px; }
  .flagship-title { font-size: 24px; }
  .flagship-subtitle { font-size: 15px; }
  .flagship-image-wrap { padding: 12px; }
  .prose-section { margin: 48px auto; padding: 0 16px; }
}
</style>
