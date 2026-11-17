<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nSelectorOptionBase, Ui3nSelectorScrollConfig } from '@/components/ui3n-selector/types';

  const selected = ref<string | null>(null);

  const scrollConfig: Ui3nSelectorScrollConfig = {
    thumbColor: '#2196f3',
    thumbHoverColor: '#1976d2',
    thumbActiveColor: '#0d47a1',
    trackWidth: 8,
    trackColor: '#e3f2fd',
  };

  const items: Ui3nSelectorOptionBase[] = [
    { id: '1', name: 'United States' },
    { id: '2', name: 'United Kingdom' },
    { id: '3', name: 'Germany' },
    { id: '4', name: 'France' },
    { id: '5', name: 'Japan' },
    { id: '6', name: 'Italy' },
    { id: '7', name: 'Spain' },
    { id: '8', name: 'Canada' },
    { id: '9', name: 'Australia' },
    { id: '10', name: 'Brazil' },
    { id: '11', name: 'Mexico' },
    { id: '12', name: 'Norway' },
    { id: '13', name: 'Sweden' },
    { id: '14', name: 'Finland' },
    { id: '15', name: 'Poland' },
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
      label="Country (max 4 visible rows)"
      :max-rows="4"
      :scroll-config="scrollConfig"
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
