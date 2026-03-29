<script setup lang="ts">
  import { useData } from 'vitepress';
  import { useTheme } from './composables/useTheme';
  import ThemeSelector from './components/ThemeSelector.vue';

  // https://vitepress.dev/reference/runtime-api#usedata
  const { site, frontmatter } = useData();
  const { theme, setTheme } = useTheme();
</script>

<template>
  <div class="theme-wrapper">
    <div class="theme-header">
      <h3>3N UI Library</h3>

      <theme-selector
        :theme="theme"
        @change="setTheme"
      />
    </div>

    <section class="theme-body">
      <Content />
    </section>
  </div>
</template>

<style scoped>
  .theme-wrapper {
    --header-height: 64px;

    position: fixed;
    inset: 0;
    background-color: var(--color-bg-block-primary-default);
    padding: var(--spacing-m);
  }

  .theme-header {
    display: flex;
    width: 100%;
    height: var(--header-height);
    padding: 0 var(--spacing-m);
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border-block-primary-default);
  }

  .theme-body {
    position: relative;
    width: 100%;
    height: calc(100% - var(--header-height));
  }
</style>
