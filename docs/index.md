---
layout: home
title: Postmate Client — Privacy-First Postman Alternative for VS Code
description: Privacy-first REST, GraphQL & WebSocket API client for VS Code. Import Postman collections, run data-driven tests, compare responses. No cloud, no login — free.
hero:
  name: Postmate Client
  text: Your APIs. Your Machine. Your Data.
  tagline: A privacy-first REST, GraphQL, and WebSocket API client built natively into VS Code. No cloud sync, no login, no telemetry — just fast, local API testing that respects your data.
  actions:
    - theme: brand
      text: Install Free →
      link: https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate
    - theme: alt
      text: Docs
      link: /getting-started/introduction
    - theme: alt
      text: Community ↗
      link: https://github.com/shyyadav/postmateClient-docs/discussions
---

<script setup>
import { ref } from 'vue'
const compareMode = ref('single')
</script>

<!-- ============================================ -->
<!-- HERO SCREENSHOT                              -->
<!-- ============================================ -->
<div class="hero-screenshot">
  <img
    src="/hero-screenshot.png"
    alt="Postmate Client running inside VS Code — request builder, collections sidebar, and response panel"
    width="1280"
    loading="eager"
  />
</div>

<!-- ============================================ -->
<!-- FEATURES GRID                               -->
<!-- ============================================ -->
<div class="features-grid">

  <a href="/import-export/migrate-from-postman" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
    <div class="feature-title">Import from Postman, OpenAPI & Swagger</div>
    <div class="feature-details">Bring your work with you. Import Postman v2.1 collections, OpenAPI 3.0, Swagger 2.0, and cURL commands in one click. Stay productive from minute one — no rebuilding.</div>
    <div class="feature-link">Migrate from Postman →</div>
  </a>

  <a href="/core-concepts/graphql" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5z"/><path d="m12 3 9 5-9 5-9-5 9-5z"/><circle cx="12" cy="13" r="1.5"/></svg></div>
    <div class="feature-title">GraphQL, Built-In</div>
    <div class="feature-details">Send GraphQL queries and mutations with a dedicated Query and Variables editor. Same builder as your REST calls. Variable autocomplete works inside both editors.</div>
    <div class="feature-link">GraphQL guide →</div>
  </a>

  <a href="/core-concepts/websocket" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/><path d="M19 12h-4"/><path d="M5 5v14"/></svg></div>
    <div class="feature-title">WebSocket & WSS Testing</div>
    <div class="feature-details">Connect to any ws:// or wss:// endpoint, send messages, and watch responses stream in real time. Pick TEXT, JSON, XML, or HTML mode with inline validation. Save WebSocket requests to collections — free, no paid tier.</div>
    <div class="feature-link">WebSocket guide →</div>
  </a>

  <a href="/testing/compare-api-response" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/><path d="m15 9-3-3 3-3"/><circle cx="19" cy="18" r="3"/><path d="M12 18H7a2 2 0 0 1-2-2V9"/><path d="m9 15 3 3-3 3"/></svg></div>
    <div class="feature-title">Side-by-Side Response Compare</div>
    <div class="feature-details">Diff two API responses with differences highlighted in clean JSONPath notation. Run single comparisons or bulk comparisons across CSV data tables — perfect for staging vs prod regression checks.</div>
    <div class="feature-link">See it in action →</div>
  </a>

  <a href="/data-driven/data-tagging" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg></div>
    <div class="feature-title">Data Tables & Per-Request Tagging</div>
    <div class="feature-details">Attach a CSV data table to any environment — automatically active across every request. Tag rows with a _dtag column to filter which rows appear per request. Unique to Postmate Client.</div>
    <div class="feature-link">Learn about tagging →</div>
  </a>

  <a href="/testing/tests-assertions" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
    <div class="feature-title">Tests, Assertions & Scripts</div>
    <div class="feature-details">Write tests in plain English with the tabular editor, or use the full pm scripting library. Pre/post-request scripts, built-in test snippets, one-click JSON Schema generator — all without leaving VS Code.</div>
    <div class="feature-link">Testing guide →</div>
  </a>

  <a href="/core-concepts/collections" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/></svg></div>
    <div class="feature-title">Collections, Environments & Chaining</div>
    <div class="feature-details">Organise requests into collections and nested folders. Manage dev, staging, and prod with named environments and variables. Chain requests visually to pass tokens and IDs between calls.</div>
    <div class="feature-link">Learn more →</div>
  </a>

  <a href="/ci-cd/cli-reference" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg></div>
    <div class="feature-title">CI/CD Ready</div>
    <div class="feature-details">Run collections from the command line, automate API tests in any pipeline, and generate HTML reports for stakeholders. Free CLI — no paid tier required.</div>
    <div class="feature-link">CLI reference →</div>
  </a>

 <a href="/security/security-overview" class="feature-card">
    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
    <div class="feature-title">Local-First. VS Code Native. Free Forever.</div>
    <div class="feature-details">Runs entirely inside VS Code with zero external runtime. Every feature, every collection, No cloud sync, no login, no telemetry, no paid tiers. Secrets stay in local files and requests never leave your machine unless you send them.</div>
    <div class="feature-link">How your data is stored →</div>
  </a>

</div>

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
Requests leave your machine only when you send them — secrets live in local files, client certificates are used solely for the TLS handshake, and corporate proxies are fully supported. The security overview explains exactly what is stored and where.

### A real request builder, not a text file

Postmate Client gives you a full visual request builder inside VS Code — tabs for params, headers, body, auth, tests, and pre/post-request scripts. Build REST, GraphQL, and WebSocket calls without writing any boilerplate.

Every input field supports **dynamic variables** out of the box, so you can keep tests realistic without hardcoding data:

![Postmate Client UI — privacy-first Postman alternative running inside VS Code with request builder, response panel, and data tables](/postmateClientUI.png)

Combine with environments to switch between dev, staging, and prod without touching the request. Chain requests, write tests, compare responses, stream WebSocket messages, filter test data by tag — all from the same visual editor.
</div>

<!-- ============================================ -->
<!-- COMPARISON TABLE                              -->
<!-- ============================================ -->
<div class="prose-section">

## Postmate Client vs Postman vs Thunder Client

|  | Postmate Client | Postman | Thunder Client |
| --- | --- | --- | --- |
| Works offline                         | ✅ Always         | ⚠️ Limited                | ⚠️ Limited                 |
| Works without login                   | ✅ Always         | ❌ Required to use        | ⚠️ For paid features       |
| No cloud sync                         | ✅ Local-only     | ❌ Cloud default          | ✅ Local                   |
| Zero telemetry & tracking             | ✅ None           | ❌ Cloud account required | ⚠️ Opt-out (On by default) |
| WebSocket / WSS support               | ✅ Free           | ⚠️ Yes (login required)   | 💰 Paid tier only          |
| Pre/post-request scripts              | ✅ Built-in       | ✅ Yes                    | 💰 Paid tier only          |
| `pm` library                          | ✅ Built-in       | ✅ Native                 | ❌ Not supported           |
| Side-by-side response compare         | ✅ Built-in       | ❌ Manual                 | ❌ Not available           |
| Bulk response comparison (CSV-driven) | ✅ Built-in       | ❌ Scripting required     | ❌ Not available           |
| Data tables linked to environments    | ✅ Built-in       | ❌ Not available          | ❌ Not available           |
| Per-request data tag filtering        | ✅ Built-in       | ❌ Not available          | ❌ Not available           |
| CLI for CI/CD                         | ✅ Free, built-in | ⚠️ Separate tool (Newman) | 💰 Paid tier               |
| Free features                         | ✅ Everything     | ⚠️ Core features free     | 💰 Most features paid      |

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
  <a href="/core-concepts/websocket" class="docs-card">
    <div class="docs-card-title">WebSocket Testing</div>
    <div class="docs-card-desc">Connect, stream, and save ws:// and wss:// requests</div>
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
    <a href="/security/security-overview" class="docs-card">
      <div class="docs-card-title">Security &amp; Privacy</div>
      <div class="docs-card-desc">Where your data lives and what leaves your machine</div>
    </a>
    <a href="/security/client-certificates" class="docs-card">
      <div class="docs-card-title">Client Certificates</div>
      <div class="docs-card-desc">mTLS for corporate environments</div>
    </a>
    <a href="/security/corporate-proxy" class="docs-card">
      <div class="docs-card-title">Corporate Proxy</div>
      <div class="docs-card-desc">Test APIs from behind a company proxy</div>
    </a>
</div>

</div>
