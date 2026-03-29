import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '3N UI Library',
  description: 'UI Library',
  head: [
    [
      'script',
      {},
      `
      (function() {
        const saved = localStorage.getItem('user-theme') || 'light';
        document.documentElement.classList.add('theme-' + saved);
      })()
    `,
    ],
  ],
});
