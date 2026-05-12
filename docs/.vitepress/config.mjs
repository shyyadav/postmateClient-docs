import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Postmate Client',
  description: 'Documentation for Postmate Client — the lightweight REST API testing extension for VS Code.',
  lang: 'en-US',
  titleTemplate: ':title',
  ignoreDeadLinks: true,
  cleanUrls: true,

  sitemap: {
    hostname: 'https://www.postmateclient.com'
  },

  // ────────────────────────────────────────────────────────────
  // Site-wide <head> tags
  //   - Favicons in every common size
  //   - Apple touch icon for iOS home screen
  //   - Web app manifest for installable PWA
  //   - theme-color for mobile browser chrome (forest green)
  //   - Default OG image for social previews
  // Drop the matching files in /public/ (from postmate-client-icons-forest.zip)
  // ────────────────────────────────────────────────────────────
  head: [
    // Favicons
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon-16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32.png' }],
// in .vitepress/config.ts head array:
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap' }],
    // iOS home screen
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

    // PWA manifest
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    // Mobile browser chrome — forest green
    ['meta', { name: 'theme-color', content: '#14532d' }],

    // Default OG image (used as fallback when a page doesn't set its own)
    // Create /public/og-image.png at 1200×630 with the envelope + wordmark
    ['meta', { property: 'og:image', content: 'https://www.postmateclient.com/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Postmate Client' }],

    // Twitter card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://www.postmateclient.com/og-image.png' }],
  ],

  transformPageData(pageData) {
    const base = 'https://www.postmateclient.com'
    const canonicalPath = pageData.relativePath
        .replace(/index\.md$/, '')
        .replace(/\.md$/, '')
    const canonicalUrl = `${base}/${canonicalPath}`.replace(/\/$/, '') || base

    const pageTitle = pageData.frontmatter.title
        ? pageData.frontmatter.title
        : 'Postmate Client — Lightweight Postman Alternative for VS Code'

    const pageDescription =
        pageData.frontmatter.description ||
        'Fast and lightweight Postman alternative for VS Code. Test REST APIs locally with collections, environments, variables, data-driven testing & powerful scripting — 100% private, no cloud, no login.'

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
        ['title', {}, pageTitle],
        ['meta', { name: 'description', content: pageDescription }],
        ['meta', { property: 'og:title', content: pageTitle }],
        ['meta', { property: 'og:description', content: pageDescription }],
        ['meta', { property: 'og:url', content: canonicalUrl }],
        ['meta', { name: 'twitter:title', content: pageTitle }],
        ['meta', { name: 'twitter:description', content: pageDescription }],
        ['link', { rel: 'canonical', href: canonicalUrl }],
    )

    // Add article-specific OG tags for blog posts
    if (pageData.relativePath.startsWith('blog/') && pageData.frontmatter.date) {
      pageData.frontmatter.head.push(
          ['meta', { property: 'og:type', content: 'article' }],
          ['meta', { property: 'article:published_time', content: pageData.frontmatter.date }],
      )
      if (pageData.frontmatter.author) {
        pageData.frontmatter.head.push(
            ['meta', { property: 'article:author', content: pageData.frontmatter.author }]
        )
      }
    }
  },

  themeConfig: {
    // No logo in nav — the wordmark in DM Serif Display does brand work cleanly
    // (envelope mark is used as favicon, marketplace icon, social avatar only)
    siteTitle: 'Postmate Client',

    nav: [
      { text: 'Guide', link: '/getting-started/introduction', activeMatch: '^/(getting-started|core-concepts|testing|data-driven|import-export|reference)/' },
      { text: 'pm API', link: '/testing/pm-library' },
      { text: 'CLI', link: '/ci-cd/cli-reference', activeMatch: '/ci-cd/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      {
        text: 'Links',
        items: [
          { text: 'Install Free ↗', link: 'https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate' },
          { text: 'Video Tutorials ↗', link: 'https://www.youtube.com/channel/UCNDd2dOwC80m_2VdGPmwKDQ' },
          { text: 'Report an Issue ↗', link: 'https://github.com/shyyadav/postmate-docs/issues' },
        ]
      }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'How to test api with 50 different inputs', link: '/blog/how-to-test-api-with-50-different-inputs' },
            { text: 'Postmate Client: A Privacy-First Postman Alternative for VS Code', link: '/blog/Privacy-First-Postman-Alternative' },
            { text: '7 Best Free Postman Alternatives for Developers in 2026', link: '/blog/Best-Free-PostmanAlternatives-2026' },
            { text: 'How to Compare JSON Responses: 3 Practical Methods', link: '/blog/How-to-compare-json-response' },
          ]
        }
      ],
      '/': [
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
          text: 'Testing',
          items: [
            { text: 'Tests & Assertions', link: '/testing/tests-assertions' },
            { text: 'pm Library Reference', link: '/testing/pm-library' },
            { text: 'Reporting', link: '/testing/reporting' },
            { text: 'Compare Response', link: '/testing/compare-api-response' },
            { text: 'Compare Response With Bulk Data', link: '/testing/compare-api-response-bulk-data' },
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
            { text: 'Import from Swagger', link: '/import-export/import-swagger' },
            { text: 'Import from Curl', link: '/import-export/Import-curl' },
            { text: 'Migrate from Postman', link: '/import-export/migrate-from-postman' },
          ]
        },
        {
          text: 'CI/CD',
          items: [
            { text: 'CLI Reference', link: '/ci-cd/cli-reference' },
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Variable Resolution', link: '/reference/variable-resolution' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shyyadav/postmate-docs' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCNDd2dOwC80m_2VdGPmwKDQ' },
    ],

    editLink: {
      pattern: 'https://github.com/shyyadav/postmateClient-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the Postmate Client Proprietary License.',
      copyright: 'Copyright © 2026 Postmate Client'
    },

    search: {
      provider: 'local'
    },

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
