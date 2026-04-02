import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';

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
        const html = document.documentElement;
       
        if (html.classList.contains('dark')) {
          html.classList.remove('dark');
        }
        
        if (html.classList.contains('theme-dark')) {
          html.classList.remove('theme-dark');
        }
        
        if (html.classList.contains('theme-light')) {
          html.classList.remove('theme-light');
        }
        
        if (!html.classList.contains('colors')) {
          html.classList.add('colors');
        }
        
        switch (saved) {
          case 'dark': {
            html.classList.remove('default-theme');
            html.classList.remove('dark-theme');
            html.classList.add('dark2-theme');
            break;
          }
          case 'midnight': {
            html.classList.remove('default-theme');
            html.classList.remove('dark2-theme');
            html.classList.add('dark-theme');
            break;
          }
          default: {
            html.classList.remove('dark-theme');
            html.classList.remove('dark2-theme');
            html.classList.add('default-theme');
            break;
          }
        }
      })()
    `,
    ],
  ],
  appearance: false,
  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Ui3nBadge', link: '/components/ui3n-badge/ui3n-badge' },
          { text: 'Ui3nButton', link: '/components/ui3n-button/ui3n-button' },
          { text: 'Ui3nAutocomplete', link: '/components/ui3n-autocomplete/ui3n-autocomplete' },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
      },
    },
    plugins: [
      {
        name: 'component-meta-loader',
      },
    ],
  },
});
