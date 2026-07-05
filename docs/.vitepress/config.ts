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

  async buildEnd() {
    setTimeout(() => {
      process.exit(0);
    }, 500);
  },

  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Ui3nAutocomplete', link: '/components/ui3n-autocomplete/ui3n-autocomplete' },
          { text: 'Ui3nBadge', link: '/components/ui3n-badge/ui3n-badge' },
          { text: 'Ui3nBreadcrumbs', link: '/components/ui3n-breadcrumbs/ui3n-breadcrumbs' },
          { text: 'Ui3nButton', link: '/components/ui3n-button/ui3n-button' },
          { text: 'Ui3nCheckbox', link: '/components/ui3n-checkbox/ui3n-checkbox' },
          { text: 'Ui3nChip', link: '/components/ui3n-chip/ui3n-chip' },
          { text: 'Ui3nDialog', link: '/components/ui3n-dialog/ui3n-dialog' },
          { text: 'Ui3nDropFiles', link: '/components/ui3n-drop-files/ui3n-drop-files' },
          { text: 'Ui3nEditable', link: '/components/ui3n-editable/ui3n-editable' },
          { text: 'Ui3nEmoji', link: '/components/ui3n-emoji/ui3n-emoji' },
          { text: 'Ui3nIcon', link: '/components/ui3n-icon/ui3n-icon' },
          { text: 'Ui3nInput', link: '/components/ui3n-input/ui3n-input' },
          { text: 'Ui3nInputFile', link: '/components/ui3n-input-file/ui3n-input-file' },
          { text: 'Ui3nList', link: '/components/ui3n-list/ui3n-list' },
          { text: 'Ui3nMenu', link: '/components/ui3n-menu/ui3n-menu' },
          { text: 'Ui3nMobileMenu', link: '/components/ui3n-mobile-menu/ui3n-mobile-menu' },
          { text: 'Ui3nNotification', link: '/components/ui3n-notification/ui3n-notification' },
          { text: 'Ui3nProgress', link: '/components/ui3n-progress/ui3n-progress' },
          { text: 'Ui3nRadioGroup', link: '/components/ui3n-radio-group/ui3n-radio-group' },
          {
            text: 'Ui3nScrollbarHorizontal',
            link: '/components/ui3n-scrollbar-horizontal/ui3n-scrollbar-horizontal',
          },
          { text: 'Ui3nScrollbarVertical', link: '/components/ui3n-scrollbar-vertical/ui3n-scrollbar-vertical' },
          { text: 'Ui3nSelector', link: '/components/ui3n-selector/ui3n-selector' },
          { text: 'Ui3nSlider', link: '/components/ui3n-slider/ui3n-slider' },
          { text: 'Ui3nStepLineBar', link: '/components/ui3n-step-line-bar/ui3n-step-line-bar' },
          { text: 'Ui3nSwitch', link: '/components/ui3n-switch/ui3n-switch' },
          { text: 'Ui3nTable', link: '/components/ui3n-table/ui3n-table' },
          { text: 'Ui3nTabs', link: '/components/ui3n-tabs/ui3n-tabs' },
          { text: 'Ui3nText', link: '/components/ui3n-text/ui3n-text' },
          { text: 'Ui3nTooltip', link: '/components/ui3n-tooltip/ui3n-tooltip' },
          { text: 'Ui3nVirtualScroll', link: '/components/ui3n-virtual-scroll/ui3n-virtual-scroll' },
        ],
      },
    ],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
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
