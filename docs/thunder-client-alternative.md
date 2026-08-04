---
layout: page
sidebar: false
aside: false
outline: false
title: Thunder Client Alternative for VS Code — Free for Commercial Use
description: Postmate Client is a free Thunder Client alternative for VS Code — unlimited collections, environments and runs, with a free CLI for CI/CD.
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Postmate Client",
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "API Client",
        "operatingSystem": "Windows, macOS, Linux",
        "url": "https://postmateclient.com/",
        "downloadUrl": "https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
---

<script setup>
import { ref } from 'vue'
const compareMode = ref('single')
</script>

<div class="tca">

<!-- ───────────────────────── HERO ───────────────────────── -->
<section class="tca-hero">
  <p class="tca-eyebrow">Thunder Client alternative for VS Code</p>

  <h1>You didn't outgrow&nbsp;Thunder&nbsp;Client.<br><span class="tca-hl">You hit its limits.</span></h1>

  <p class="tca-lede">
    First they capped requests. Then collections. Now the free tier can't create one at all. Postmate Client is a free API client for VS Code with no tier above it — and a CLI that runs in CI/CD without a subscription.
  </p>

  <div class="tca-cta-row">
    <a class="tca-btn tca-btn-primary" href="https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate">Install from the Marketplace</a>
    <a class="tca-btn tca-btn-ghost" href="#compare">See the full comparison</a>
  </div>

  <p class="tca-microcopy">Free for commercial use · No account · Works offline</p>
</section>

<!-- ──────────────── SIGNATURE: THE LIMIT STRIP ──────────────── -->
<section class="tca-limits" aria-label="Free tier limits compared">

  <div class="tca-limit-row tca-limit-row--them">
    <span class="tca-limit-who">Thunder Client, free</span>
    <div class="tca-limit-cells">
      <div class="tca-cell"><span class="tca-num">0</span><span class="tca-lbl">collections</span></div>
      <div class="tca-cell"><span class="tca-num">0</span><span class="tca-lbl">environments</span></div>
      <div class="tca-cell"><span class="tca-num">0</span><span class="tca-lbl">CLI runs, local or CI</span></div>
      <div class="tca-cell"><span class="tca-num">10</span><span class="tca-lbl">max company size</span></div>
    </div>
  </div>

  <div class="tca-limit-row tca-limit-row--us">
    <span class="tca-limit-who">Postmate Client</span>
    <div class="tca-limit-cells">
      <div class="tca-cell"><span class="tca-num">∞</span><span class="tca-lbl">collections</span></div>
      <div class="tca-cell"><span class="tca-num">∞</span><span class="tca-lbl">environments</span></div>
      <div class="tca-cell"><span class="tca-num">∞</span><span class="tca-lbl">CLI runs, local or CI</span></div>
      <div class="tca-cell"><span class="tca-num">∞</span><span class="tca-lbl">max company size</span></div>
    </div>
  </div>

  <p class="tca-limit-note">
    Collections: what we saw in Thunder Client v2.x on 3 August 2026 — a free install
    refused to create one, logged out and logged in both. The rest is from their
    <a href="https://www.thunderclient.com/terms" target="_blank" rel="noopener">terms</a>
    and <a href="https://www.thunderclient.com/pricing" target="_blank" rel="noopener">pricing</a>.
    Their limits have changed repeatedly and may have changed again —
    <a href="/contact">tell us</a> if this is stale.
  </p>
</section>

<!-- ───────────────────── WHY PEOPLE LEAVE ───────────────────── -->
<section class="tca-section">
  <h2>Where the free plan stops</h2>
  <p class="tca-section-lede">
    Thunder Client is a well-built tool, and for small personal projects the free
    edition still does the job. The friction shows up at work — which is usually when
    people start looking for a Thunder Client alternative.
  </p>

  <div class="tca-reasons">
    <article class="tca-reason">
      <h3>Non-commercial only, above ten people</h3>
      <p>The free version is restricted to non-commercial use. Companies under ten employees are permitted, as are schools and universities — but if your organisation is larger than that, the free tier isn't available to you at any level of use. That threshold was five employees in 2024.</p>
    </article>
    <article class="tca-reason">
      <h3>Zero environments</h3>
      <p>No dev, staging or prod switching on the free version at all. This is the limit that catches people first, and there is no way to work around it.</p>
    </article>
    <article class="tca-reason">
      <h3>The CLI is paid, everywhere</h3>
      <p>A subscription is required to run the Thunder Client CLI locally <em>and</em> on CI and CD build servers — which is exactly when API tests start earning their keep.</p>
    </article>
    <article class="tca-reason">
      <h3>Runs are metered on paid plans too</h3>
      <p>Starter includes 250 local collection runs per user per month, Business 500, and only Enterprise is unlimited. A run budget is a strange thing to think about while debugging.</p>
    </article>
  </div>

  <p class="tca-fairness">
    None of this makes Thunder Client a bad tool. It's a commercial product with a free
    edition — a fair way to build software, just not always the model that fits a team
    that has already had one API client taken away from it.
  </p>
</section>

<!-- ───────────────────────── COMPARISON ───────────────────────── -->
<section class="tca-section" id="compare">
  <h2>Postmate Client vs Thunder Client</h2>

  <div class="tca-table-wrap">

| | Postmate Client | Thunder Client |
|---|---|---|
| Runs inside VS Code | Yes | Yes |
| Local-first storage | Yes | Yes |
| Free for commercial use | Yes | No — non-commercial only, under 10 employees |
| Collections | Unlimited | None on the free version |
| Environments | Unlimited | Paid plans only |
| Collection run limits | None | 250–500 local runs/user/month, unlimited on Enterprise |
| CLI, locally and in CI/CD | Free | Paid plans only |
| Sharing across devices or teammates | Yes | Paid plans only |
| GraphQL | Yes | Yes |
| WebSocket testing | Yes | Paid plans only |
| mTLS / client certificates | Yes | Yes |
| Corporate proxy support | Yes | Yes |
| VS Code Web / Remote / WSL | Yes | Paid plans only |
| JetBrains IDEs | No | Paid plans only |
| Price | Free | $36–$192 per user/year |

  </div>

  <p class="tca-asof">
    Compared 3 August 2026 against Thunder Client's
    <a href="https://www.thunderclient.com/pricing" target="_blank" rel="noopener">published pricing</a>
    and <a href="https://www.thunderclient.com/terms" target="_blank" rel="noopener">terms</a>. Tools
    change — if something here is out of date, <a href="/contact">tell us</a> and we'll correct it.
  </p>
</section>

<!-- ───────────────────────── FEATURES ───────────────────────── -->
<section class="tca-section">
  <h2>What Postmate Client does that most VS Code clients don't</h2>
  <p class="tca-section-lede">
    We tested the API clients available for VS Code before writing this page. These
    didn't turn up anywhere else in that group.
  </p>

  <article class="tca-feature">
    <div class="tca-feature-text">
      <h3>Response comparison, single and bulk</h3>
      <p>
        Run a request twice and diff the two responses with highlighting, or compare
        responses across an entire collection run at once. Filter the diff so noisy
        fields — timestamps, request IDs, trace headers — stop drowning out the change
        you actually care about.
      </p>
      <p class="tca-feature-aside">This is the feature people usually build a throwaway script for.</p>
      <a class="tca-link" href="/testing/compare-api-response#common-use-cases">Read the docs →</a>
    </div>
    <div class="tca-feature-media">
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
      <img
        v-show="compareMode === 'single'"
        src="/compare1.png"
        alt="Postmate Client comparing two API responses side-by-side with diff highlights — Thunder Client alternative for VS Code"
        loading="lazy"
      >
      <img
        v-show="compareMode === 'bulk'"
        src="/compare-api-response-bulk.png"
        alt="Postmate Client running bulk API response comparison across CSV data table rows"
        loading="lazy"
      >
    </div>
  </article>

  <article class="tca-feature tca-feature--flip">
    <div class="tca-feature-text">
      <h3>CSV data tables that live with your environment</h3>
      <p>
        Data files in a collection runner aren't new. Binding a CSV table to an
        environment, picking the data set straight from the request panel, and filtering
        rows with <code>_dtag</code> is the part that's different — the data lives where
        the environment lives, not in a file path you have to remember at run time.
      </p>
      <p class="tca-feature-aside">Unlimited rows.</p>
      <a class="tca-link" href="/data-driven/data-tables">Read the docs →</a>
    </div>
    <div class="tca-feature-media"><img src="/data-table-create-and-list.png" alt="Selecting a CSV data table from the request panel" loading="lazy"></div>
  </article>

  <article class="tca-feature">
    <div class="tca-feature-text">
      <h3>A response panel built for payloads you can't scroll</h3>
      <p>
        One click to copy, save, collapse, expand, or open a response in a new tab. One
        click to generate a JSON schema from it. One click to generate a post-response
        test script instead of writing assertions by hand.
      </p>
      <p>
        And a search that behaves properly on deep JSON: when your term matches a key
        inside a <em>collapsed</em> object, Postmate highlights the collapsed parent so
        you know which node to open. <kbd>Ctrl</kbd>+<kbd>F</kbd> highlights every
        occurrence and leaves you hunting for the hidden ones.
      </p>
    </div>
    <div class="tca-feature-media">
      <ZoomVideo
        src="/public/postmate-client-resposne.mp4"
        label="Searching deep JSON in the Postmate Client response panel, with collapsed parents highlighted"
      />
    </div>
  </article>
  <p class="tca-rest">
    Plus everything you'd expect: collection runner, request chaining, pm scripting
    library, HTML and JSON reports, Postman and OpenAPI/Swagger import, environments and
    variables.
  </p>
</section>

<!-- ───────────────────────── HONEST NOTE ───────────────────────── -->
<section class="tca-section tca-honest">
  <h2>Where Thunder Client is still the better pick</h2>
  <p>
    If you work in JetBrains IDEs, Thunder Client has a plugin on its paid plans and
    Postmate Client doesn't — Postmate is VS Code only. And if you're a solo developer on
    personal projects who fits inside the free tier, there's no urgent reason to switch.
  </p>
</section>

<!-- ───────────────────────── SWITCHING ───────────────────────── -->
<section class="tca-section">
  <h2>Switching over</h2>
       Does Thunder Client export to Postman collection format, or only its own JSON?
       If Postman format works, write this as a two-step import.
       If not, document the manual path honestly or ship a Thunder Client importer first. -->
  <p>
    Your Thunder Client collections sit on your machine, so nothing is locked away.
    Postmate Client imports Postman collections and OpenAPI/Swagger specs directly.
  </p>
  <a class="tca-link" href="/import-export/import-swagger/">Import and export guide →</a>
</section>

<!-- ───────────────────────── FAQ ───────────────────────── -->
<section class="tca-section">
  <h2>Questions</h2>

  <div class="tca-faq">
    <details><summary>Is Postmate Client really free for commercial use?</summary>
      <p>Yes. No paid tier, no seat licence, no separate plan for teams or companies.</p></details>
    <details><summary>Do I need an account?</summary>
      <p>No. Postmate Client is local-first — your collections, environments and data files stay on your machine and never leave it.</p></details>
    <details><summary>Does the CLI cost anything in CI/CD?</summary>
      <p>No. The <code>pmc</code> CLI runs in GitHub Actions, GitLab CI, Jenkins or any other pipeline at no cost.</p></details>
    <details><summary>Is there a limit on collection runs?</summary>
      <p>No.</p></details>
    <details><summary>Can I use it behind a corporate proxy?</summary>
      <p>Yes, including mTLS through a proxy and client certificate authentication per host — the setups that usually force people back to curl.</p></details>
    <details><summary>Does it work offline?</summary>
      <p>Yes, entirely.</p></details>
  </div>
</section>

<!-- ───────────────────────── CLOSE ───────────────────────── -->
<section class="tca-close">
  <h2>Install it and open a collection</h2>
  <p>Nothing to sign up for. If it doesn't fit, uninstalling costs you nothing either.</p>
  <a class="tca-btn tca-btn-primary" href="https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate">Install from the Marketplace</a>
  <p class="tca-microcopy">
    Comparing other tools too? See the <a href="/postman-alternative-vscode">Postman alternative for VS Code</a>.
  </p>
</section>

</div>

<style scoped>
.tca {
  --tca-green: #14532d;
  --tca-green-deep: #0b2e1a;
  --tca-mint: #e8f3ec;
  --tca-ink: #16201a;
  --tca-muted: #5f6b62;
  --tca-line: #d8e2db;
  --tca-locked: #8b9490;

  max-width: 68rem;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
  color: var(--tca-ink);
  font-family: var(--vp-font-family-base);
}
.dark .tca {
  --tca-green: #4ade80;
  --tca-green-deep: #86efac;
  --tca-mint: #14251b;
  --tca-ink: #e6ece8;
  --tca-muted: #9aa89f;
  --tca-line: #26362d;
  --tca-locked: #6b7770;
}

.tca h1, .tca h2, .tca h3 {
  font-family: "DM Serif Display", Georgia, serif;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.12;
  margin: 0;
}

/* ── hero ── */
.tca-hero { padding: 5.5rem 0 3.5rem; max-width: 46rem; }
.tca-eyebrow {
  font-size: .78rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--tca-muted); margin: 0 0 1.25rem;
}
.tca-hero h1 { font-size: clamp(2.4rem, 6vw, 4rem); }
.tca-hl { color: var(--tca-green); }
.tca-lede {
  font-size: 1.15rem; line-height: 1.65; color: var(--tca-muted);
  margin: 1.75rem 0 0; max-width: 36rem;
}
.tca-cta-row { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2.25rem; }
.tca-btn {
  display: inline-block; padding: .8rem 1.5rem; border-radius: 6px;
  font-size: .95rem; font-weight: 600; text-decoration: none;
  transition: transform .15s ease, background .15s ease;
}
.tca-btn-primary { background: var(--tca-green); color: #fff; }
.dark .tca-btn-primary { color: #06170e; }
.tca-btn-primary:hover { background: var(--tca-green-deep); transform: translateY(-1px); }
.tca-btn-ghost { border: 1px solid var(--tca-line); color: var(--tca-ink); }
.tca-btn-ghost:hover { border-color: var(--tca-green); color: var(--tca-green); }
.tca-microcopy { font-size: .85rem; color: var(--tca-muted); margin-top: 1.1rem; }

/* ── signature: limit strip ── */
.tca-limits {
  border: 1px solid var(--tca-line); border-radius: 10px;
  overflow: hidden; margin: 1rem 0 5rem;
}
.tca-limit-row {
  display: grid; grid-template-columns: 12rem 1fr; align-items: center;
  gap: 1rem; padding: 1.5rem 1.75rem;
}
.tca-limit-row--them { border-bottom: 1px solid var(--tca-line); }
.tca-limit-row--us { background: var(--tca-mint); }
.tca-limit-who {
  font-size: .82rem; letter-spacing: .08em; text-transform: uppercase;
  color: var(--tca-muted); font-weight: 600;
}
.tca-limit-row--us .tca-limit-who { color: var(--tca-green); }
.tca-limit-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.tca-cell { display: flex; flex-direction: column; gap: .3rem; }
.tca-num {
  font-family: var(--vp-font-family-mono);
  font-size: 2.1rem; line-height: 1; font-variant-numeric: tabular-nums;
  color: var(--tca-locked);
}
.tca-limit-row--us .tca-num { color: var(--tca-green); }
.tca-lbl { font-size: .78rem; color: var(--tca-muted); }
.tca-limit-note {
  font-size: .8rem; color: var(--tca-muted); margin: 0;
  padding: .9rem 1.75rem; border-top: 1px solid var(--tca-line);
}

/* ── sections ── */
.tca-section { margin: 0 0 5.5rem; }
.tca-section > h2 { font-size: clamp(1.7rem, 3.2vw, 2.35rem); margin-bottom: 1rem; }
.tca-section-lede { color: var(--tca-muted); max-width: 40rem; margin: 0 0 2.5rem; line-height: 1.65; }

.tca-reasons {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 1.75rem 2.5rem;
}
.tca-reason h3 { font-size: 1.2rem; margin-bottom: .55rem; }
.tca-reason p { color: var(--tca-muted); line-height: 1.65; margin: 0; font-size: .95rem; }
.tca-fairness {
  margin: 2.5rem 0 0; padding-left: 1.1rem;
  border-left: 2px solid var(--tca-line);
  color: var(--tca-muted); font-size: .95rem; line-height: 1.7; max-width: 42rem;
}

/* ── table ── */
.tca-table-wrap { overflow-x: auto; }
.tca-table-wrap :deep(table) { width: 100%; border-collapse: collapse; font-size: .93rem; display: table; }
.tca-table-wrap :deep(th),
.tca-table-wrap :deep(td) {
  text-align: left; padding: .8rem 1rem; border: 0;
  border-bottom: 1px solid var(--tca-line);
}
.tca-table-wrap :deep(thead th) { font-size: .78rem; letter-spacing: .07em; text-transform: uppercase; color: var(--tca-muted); }
.tca-table-wrap :deep(td:nth-child(2)) { color: var(--tca-green); font-weight: 600; }
.tca-table-wrap :deep(tr:nth-child(2n)) { background: transparent; }
.tca-asof { font-size: .8rem; color: var(--tca-muted); margin-top: 1.25rem; }

/* ── features ── */
.tca-feature {
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
  align-items: center; margin-bottom: 4.5rem;
}
.tca-feature--flip .tca-feature-text { order: 2; }
.tca-feature h3 { font-size: 1.55rem; margin-bottom: .9rem; }
.tca-feature p { color: var(--tca-muted); line-height: 1.7; margin: 0 0 .9rem; }
.tca-feature-aside { color: var(--tca-green) !important; font-weight: 500; }
.tca-feature-media img,
.tca-feature-media :deep(.zoom-video) {
  width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--tca-line); display: block;
}
.tca-link { color: var(--tca-green); font-weight: 600; font-size: .93rem; text-decoration: none; }
.tca-link:hover { text-decoration: underline; }
.tca-rest { color: var(--tca-muted); font-size: .95rem; line-height: 1.7; max-width: 42rem; }

/* ── honest note ── */
.tca-honest {
  background: var(--tca-mint); border-radius: 10px; padding: 2.25rem 2.5rem;
}
.tca-honest h2 { font-size: 1.5rem; margin-bottom: .75rem; }
.tca-honest p { color: var(--tca-muted); line-height: 1.7; margin: 0; max-width: 44rem; }

/* ── faq ── */
.tca-faq details { border-bottom: 1px solid var(--tca-line); padding: 1.05rem 0; }
.tca-faq summary { cursor: pointer; font-weight: 600; font-size: 1rem; list-style: none; }
.tca-faq summary::-webkit-details-marker { display: none; }
.tca-faq summary::after { content: "+"; float: right; color: var(--tca-green); font-weight: 400; }
.tca-faq details[open] summary::after { content: "–"; }
.tca-faq details p { color: var(--tca-muted); margin: .8rem 0 0; line-height: 1.65; }

/* ── close ── */
.tca-close {
  text-align: center; border-top: 1px solid var(--tca-line); padding-top: 4rem;
}
.tca-close h2 { font-size: clamp(1.7rem, 3.2vw, 2.35rem); margin-bottom: .75rem; }
.tca-close > p { color: var(--tca-muted); margin: 0 0 1.75rem; }
.tca-close .tca-microcopy a {
  color: var(--tca-green);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── inline links in body & footnote copy ── */
.tca-limit-note a,
.tca-asof a,
.tca-reason a,
.tca-honest a,
.tca-faq details a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--tca-green);
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  transition: color .15s ease;
}
.tca-limit-note a:hover,
.tca-asof a:hover,
.tca-reason a:hover,
.tca-honest a:hover,
.tca-faq details a:hover {
  color: var(--tca-green);
  text-decoration-thickness: 2px;
}

/* ── responsive ── */
@media (max-width: 860px) {
  .tca-limit-row { grid-template-columns: 1fr; gap: 1rem; padding: 1.25rem; }
  .tca-limit-cells { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
  .tca-num { font-size: 1.8rem; }
  .tca-feature { grid-template-columns: 1fr; gap: 1.5rem; }
  .tca-feature--flip .tca-feature-text { order: 0; }
  .tca-hero { padding-top: 3.5rem; }
  .tca-honest { padding: 1.75rem; }
}

/* ── a11y floor ── */
.tca a:focus-visible, .tca summary:focus-visible {
  outline: 2px solid var(--tca-green); outline-offset: 3px; border-radius: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .tca * { transition: none !important; }
}
</style>