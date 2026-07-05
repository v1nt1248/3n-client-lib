<script setup lang="ts">
  import { ref } from 'vue';

  interface SimpleItem {
    id: number;
    text: string;
  }

  const listItems = ref<SimpleItem[]>([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
  ]);

  const selectedLog = ref<string>('');

  const onSelect = ({ value, index }: { value: SimpleItem; index: number }) => {
    selectedLog.value = `Selected: "${value.text}" (Index: ${index}, ID: ${value.id})`;
  };
</script>

<template>
  <div class="example-wrapper">
    <Ui3nList
      :items="listItems"
      key-field="id"
      @select="onSelect"
    />

    <div
      v-if="selectedLog"
      class="selection-preview"
    >
      {{ selectedLog }}
    </div>
  </div>
</template>

<style scoped>
  .example-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .selection-preview {
    font-size: 12px;
    padding: 8px 12px;
    background-color: var(--color-bg-block-darkery-default);
    border-radius: 4px;
    font-weight: 600;
    color: oklch(0.65 0.17 140);
  }
</style>
