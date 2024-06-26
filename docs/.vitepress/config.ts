import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '3N Client UI Lib',
  description: '3N Client UI library documentation',
  head: [
    ['link', { rel: 'preconnect', href: 'href="https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap', rel: 'stylesheet' }],
  ],
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/install' },
      { text: 'Components', link: '/components/index' }
    ],

    sidebar: [
      {
        text: 'Installation',
        link: '/install',
      },
      {
        text: 'Components',
        items: [
          { text: 'Ui3nBadge', link: '/components/ui3n-badge' },
          { text: 'Ui3nBreadcmb / Ui3nBreadcrumbs', link: '/components/ui3n-breadcrumbs' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
