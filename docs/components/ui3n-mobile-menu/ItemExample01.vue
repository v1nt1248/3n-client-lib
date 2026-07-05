<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nMobileMenuItemBase } from './types';

  const selectedText = ref('');

  const flatItems = ref<Ui3nMobileMenuItemBase[]>([
    { id: 1, name: 'Home Link' },
    { id: 2, name: 'User Profile' },
    { id: 3, name: 'Global Settings' },
  ]);

  function onSelect(item: Ui3nMobileMenuItemBase) {
    selectedText.value = `Selected item index ID: ${item.id} (${item.name})`;
  }
</script>

<template>
  <div class="items-demo-box">
    <div class="menu-container">
      <Ui3nMobileMenuItem
        v-for="item in flatItems"
        :key="item.id"
        :item="item"
        @select-item="onSelect"
      />
    </div>
    <div
      v-if="selectedText"
      class="selection-preview"
    >
      {{ selectedText }}
    </div>
  </div>
</template>

<style scoped>
  .items-demo-box {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .menu-container {
    width: 240px;
    padding: 8px;
    background-color: var(--color-bg-block-primary-hover);
    border-radius: 6px;
  }

  .selection-preview {
    font-size: 11px;
    color: var(--color-text-table-secondary-default);
    font-family: monospace;
  }
</style>
