<script setup lang="ts">
  import { ThemeMode } from '../composables/useTheme';

  const themes = [
    { id: 'light', label: 'Default' },
    { id: 'dark', label: 'Dark' },
    { id: 'midnight', label: 'Midnight' },
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
  .theme-picker {
    position: relative;
    display: inline-block;
  }

  .theme-picker::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);

    width: 24px;
    height: 24px;

    background-color: var(--color-text-block-primary-default);

    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://w3.org' viewBox='0 0 24 24'%3E%3Cpath d='m7 10l5 5l5-5z' /%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://w3.org' viewBox='0 0 24 24'%3E%3Cpath d='m7 10l5 5l5-5z' /%3E%3C/svg%3E");

    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    pointer-events: none;
  }

  .theme-picker select {
    appearance: none;
    -webkit-appearance: none;
    display: flex;
    width: 120px;
    height: 32px;
    padding: 0 12px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
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
