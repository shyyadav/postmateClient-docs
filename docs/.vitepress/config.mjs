import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Postmate Client',
  description: 'Documentation for Postmate Client — the lightweight REST API testing extension for VS Code.',
  lang: 'en-US',
  ignoreDeadLinks: true,
  // Generates cleaner URLs: /guide/intro instead of /guide/intro.html
  cleanUrls: true,

  sitemap: {
    hostname: 'https://www.postmateclient.com'
  },
  
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: "google-site-verification", content: "TToDQLv0g9hbaJ4irXR95tJrM-W2zr4U8a7Pqor-9Fo" }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'description', content: 'Postmate Client — Lightweight REST API testing client for VS Code. Fast, local-first Postman alternative.' }],
    ['meta', { property: 'og:title', content: 'Postmate Client - VS Code API Client' }],
    ['meta', { property: 'og:description', content: 'Fast and lightweight REST API testing tool for Visual Studio Code.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.postmateclient.com' }],
    ['meta', { property: 'og:image', content: 'https://www.postmateclient.com/runner-results.png' }], 
    ['link', { rel: 'canonical', href: 'https://www.postmateclient.com' }],
    // Twitter Cards
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Postmate Client - VS Code API Client' }],
    ['meta', { name: 'twitter:description', content: 'Fast and lightweight REST API testing tool for Visual Studio Code.' }],
    ['meta', { name: 'twitter:image', content: 'https://www.postmateclient.com/runner-results.png' }], // Replace with your actual image
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
          { text: 'The 3-Second Workflow', link: '/getting-started/three-second-workflow' },
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
        text: 'Data-Driven Testing',
        items: [
          { text: 'Collection Runner', link: '/data-driven/collection-runner' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Variable Resolution', link: '/reference/variable-resolution' },
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
