import { defineConfig } from 'vitepress';
import vueDocs from 'vite-plugin-vue-docs';
import fs from 'node:fs';
import path from 'node:path';

function getComponentsSidebar() {
  const componentsPath = path.resolve(__dirname, '../../src/components');
  const folders = fs.readdirSync(componentsPath);

  return folders.map(folder => ({
    text: folder.charAt(0).toUpperCase() + folder.slice(1),
    link: `/components/${folder.toLowerCase()}`,
  }));
}

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
  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: getComponentsSidebar(),
      },
    ],
  },
  vite: {
    plugins: [
      vueDocs({
        base: '/components/',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // Здесь можно подключить глобальные переменные, если они есть
          // additionalData: `@use "@/styles/variables.scss" as *;`
        },
      },
    },
  },
});
