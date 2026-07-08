import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import vueDevTools from 'vite-plugin-vue-devtools';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'node:path';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      cleanVueFileName: true,
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src',
      beforeWriteFile: (filePath, content) => {
        return {
          filePath: filePath.replace('/dist/src/', '/dist/'),
          content,
        };
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/styles/variables.css',
          dest: '.',
          rename: { stripBase: true },
        },
        {
          src: 'src/assets/styles/mixins.scss',
          dest: '.',
          rename: { stripBase: true },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: 'oxc',
    emptyOutDir: true,
    lib: {
      entry: {
        'ui3n-components': resolve(__dirname, 'src/ui3n-components.ts'),
        'ui3n-plugins': resolve(__dirname, 'src/ui3n-plugins.ts'),
        'ui3n-utils': resolve(__dirname, 'src/ui3n-utils.ts'),
      },
      formats: ['es'],
      name: 'Ui3nLib',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}), /^vue/],
      output: {
        exports: 'named',
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
