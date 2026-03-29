<script setup lang="ts">
  import { ThemeMode } from '../composables/useTheme';

  const themes = [
    { id: 'light', label: `Theme 'Default'` },
    { id: 'dark', label: `Theme 'Dark'` },
    { id: 'midnight', label: `Theme 'Midnight'` },
  ];

  const props = defineProps<{
    theme?: ThemeMode;
  }>();
  const emits = defineEmits<{
    (event: 'change', value: ThemeMode): void;
  }>();
</script>

<template>
  <div class="theme-picker">
    <select
      :value="theme || 'light'"
      @change="emits('change', $event.target.value)"
    >
      <option
        v-for="t in themes"
        :key="t.id"
        :value="t.id"
      >
        {{ t.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
  .theme-picker select {
    display: flex;
    width: 160px;
    height: 32px;
    padding: 0 8px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: var(--color-bg-block-primary-default);
    font-size: var(--font-14);
    font-weight: 500;
    color: var(--color-text-block-primary-default);
    border: 1px solid var(--color-border-block-primary-default);
    cursor: pointer;

    &:hover {
      background-color: var(--color-bg-block-primary-hover);
    }
  }
</style>
