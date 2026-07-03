<script setup lang="ts">
  import { ref } from 'vue';

  const items = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Cherry' },
    { id: '4', name: 'Date' },
    { id: '5', name: 'Elderberry' },
  ];

  const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Select multiple fruits"
      multiple
      chips
      hide-selected
      no-data-text="All fruits selected!"
    />

    <div class="value-display">Selected: {{ value.length > 0 ? value.join(', ') : 'none' }}</div>

    <div class="hint">Selected items are hidden from the dropdown</div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 400px;
  }

  .value-display {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: oklch(0.65 0.17 140);
  }

  .hint {
    margin-top: 4px;
    font-size: 11px;
    color: var(--color-text-block-accent-default);
    font-style: italic;
  }
</style>
