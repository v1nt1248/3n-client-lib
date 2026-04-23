import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import vueDevTools from 'vite-plugin-vue-devtools';
import { resolve } from 'node:path';

const config = {
  all: {
    entry: resolve(__dirname, 'src/index.ts'),
    fileName: 'ui3n-lib',
  },
  lib: {
    entry: resolve(__dirname, 'src/ui3n-components.ts'),
    fileName: 'ui3n-components',
  },
  plugins: {
    entry: resolve(__dirname, 'src/ui3n-plugins.ts'),
    fileName: 'ui3n-plugins',
  },
  utils: {
    entry: resolve(__dirname, 'src/ui3n-utils.ts'),
    fileName: 'ui3n-utils',
  },
};

const currentConfig = config[process.env.LIB_NAME as keyof typeof config];

if (currentConfig === undefined) {
  throw new Error('LIB_NAME is not defined or is not valid');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: 'oxc',
    emptyOutDir: false,
    lib: {
      ...currentConfig,
      formats: ['es'],
      name: 'Ui3nLib',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        exports: 'named',
        format: 'es',
      },
    },
  },
});
