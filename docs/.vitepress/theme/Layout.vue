<script setup lang="ts">
  import DefaultTheme from 'vitepress/theme';
  import { useTheme } from './composables/useTheme';
  import ThemeSelector from './components/ThemeSelector.vue';

  // https://vitepress.dev/reference/runtime-api#usedata
  const { Layout } = DefaultTheme;
  const { theme, setTheme } = useTheme();
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="header">
        <b>Theme:</b>
        <theme-selector
          :theme="theme"
          @change="setTheme"
        />
      </div>
    </template>

    <template #layout-bottom>
      <ui3n-dialog-provider />
    </template>
  </Layout>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
</style>
