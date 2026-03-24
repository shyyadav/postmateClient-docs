import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Postmate Client',
  description: 'Documentation for Postmate Client — the lightweight REST API testing extension for VS Code.',
  lang: 'en-US',

  // Generates cleaner URLs: /guide/intro instead of /guide/intro.html
  cleanUrls: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    // ─── Logo ────────────────────────────────────────────────────────────────
    logo: { svg: '<svg width="24" height="24" viewBox="0 0 26 26" fill="none"><rect width="26" height="26" rx="7" fill="#6d8aff"/><path d="M7 8h7a4 4 0 0 1 0 8H7V8z" fill="white" opacity=".9"/><circle cx="18" cy="18" r="3.5" fill="white" opacity=".5"/></svg>' },
    siteTitle: 'Postmate Client',

    // ─── Top Nav ─────────────────────────────────────────────────────────────
    nav: [
      { text: 'Guide', link: '/getting-started/introduction' },
      { text: 'pm API', link: '/testing/pm-library' },
      { text: 'CLI', link: '/ci-cd/cli-reference', activeMatch: '/ci-cd/' },
      {
        text: 'Links',
        items: [
          { text: 'Install Free ↗', link: 'https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate' },
          { text: 'Video Tutorials ↗', link: 'https://www.youtube.com/channel/UCNDd2dOwC80m_2VdGPmwKDQ' },
          { text: 'Report an Issue ↗', link: 'https://github.com/shyyadav/postmate-docs/issues' },
        ]
      }
    ],

    // ─── Sidebar ─────────────────────────────────────────────────────────────
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Installation', link: '/getting-started/installation' },
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Building Requests', link: '/core-concepts/building-requests' },
          { text: 'Environments & Variables', link: '/core-concepts/environments' },
          { text: 'Collections & Folders', link: '/core-concepts/collections' },
          { text: 'Headers', link: '/core-concepts/headers' },
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'Tests & Assertions', link: '/testing/tests-assertions' },
          { text: 'pm Library Reference', link: '/testing/pm-library' },
          { text: 'Pre/Post Scripts', link: '/testing/scripts' },
          { text: 'Test Snippets', link: '/testing/test-snippets' },
        ]
      },
      {
        text: 'Data-Driven Testing',
        items: [
          { text: 'Data Tables', link: '/data-driven/data-tables' },
          { text: 'Collection Runner', link: '/data-driven/collection-runner' },
          { text: 'Request Chaining', link: '/data-driven/request-chaining' },
        ]
      },
      {
        text: 'Import & Export',
        items: [
          { text: 'Import cURL / Swagger', link: '/import-export/import-curl-swagger' },
          { text: 'Migrate from Postman', link: '/import-export/migrate-from-postman' },
        ]
      },
      {
        text: 'CI/CD',
        items: [
          { text: 'CLI Reference', link: '/ci-cd/cli-reference' },
          { text: 'Reporting', link: '/ci-cd/reporting' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Variable Resolution', link: '/reference/variable-resolution' },
          { text: 'Autocomplete', link: '/reference/autocomplete' },
          { text: 'Troubleshooting', link: '/reference/troubleshooting' },
        ]
      },
    ],

    // ─── Social / Edit links ─────────────────────────────────────────────────
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shyyadav/postmate-docs' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCNDd2dOwC80m_2VdGPmwKDQ' },
    ],

    editLink: {
      pattern: 'https://github.com/shyyadav/postmateClient-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // ─── Footer ──────────────────────────────────────────────────────────────
    footer: {
      message: 'Released under the Postmate Client Proprietary License.',
      copyright: 'Copyright © 2025 Shyam Narayan Yadav'
    },

    // ─── Search ──────────────────────────────────────────────────────────────
    search: {
      provider: 'local'
    },

    // ─── Prev/Next labels ───────────────────────────────────────────────────
    docFooter: {
      prev: '← Previous',
      next: 'Next →'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },
  }
})
