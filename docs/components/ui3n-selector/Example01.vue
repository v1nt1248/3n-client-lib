<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nSelectorOptionBase } from '@/components/ui3n-selector/types';

  const selected = ref<string | null>(null);

  const items: Ui3nSelectorOptionBase[] = [
    { id: '1', name: 'United States' },
    { id: '2', name: 'United Kingdom' },
    { id: '3', name: 'Germany' },
    { id: '4', name: 'France' },
    { id: '5', name: 'Japan' },
  ];
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nSelector
      v-model="selected"
      :items="items"
      item-display="name"
      item-value="id"
      placeholder="Select a country"
      label="Country"
    />
    <p class="result-text">
      Selected ID Value: <strong>{{ selected ?? 'null' }}</strong>
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
</style>
