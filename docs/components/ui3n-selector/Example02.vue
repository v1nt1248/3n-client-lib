<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nSelectorOptionBase } from '@/components/ui3n-selector/types';

  const selectedItem = ref<Ui3nSelectorOptionBase | null>(null);

  const items: Ui3nSelectorOptionBase[] = [
    { id: 'f-1', name: 'Apple' },
    { id: 'f-2', name: 'Banana' },
    { id: 'f-3', name: 'Cherry' },
    { id: 'f-4', name: 'Date' },
    { id: 'f-5', name: 'Elderberry' },
    { id: 'f-6', name: 'Fig' },
  ];
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nSelector
      v-model="selectedItem"
      :items="items"
      item-display="name"
      placeholder="Select fruit (Returns full object)"
      label="Clearable Fruit Selector"
      :clearable="true"
      :return-object="true"
    />
    <p class="result-text">
      Selected Object Output: <code class="code-box">{{ selectedItem ?? 'null' }}</code>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 400px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .code-box {
    font-family: monospace;
    font-size: 11px;
    background-color: var(--color-bg-control-secondary-default);
    padding: 2px 4px;
    border-radius: 4px;
  }
</style>
