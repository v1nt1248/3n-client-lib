<script setup lang="ts">
  import Ui3nDialogProvider from './components/ui3n-dialog/ui3n-dialog-provider.vue';
  import Demo from './demo/demo.vue';
</script>

<template>
  <div class="app">
    <demo />

    <ui3n-dialog-provider />
  </div>
</template>

<style>
  /* for the demo page */
  #ui-3n-lib {
    position: fixed;
    inset: 0;
    background-color: var(--color-bg-block-primary-default);
  }
</style>

<style lang="scss" scoped>
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('./assets/fonts/InterVariable.woff2') format('woff2');
  }

  @font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url('./assets/fonts/InterVariable-Italic.woff2') format('woff2');
  }

  .app {
    position: fixed;
    inset: 0;
    padding: 8px;
    font-family: Inter, system-ui, sans-serif;
    background-color: var(--shadow-key-1);
    color: var(--color-text-block-primary-default);
    overflow: auto;
  }
</style>
