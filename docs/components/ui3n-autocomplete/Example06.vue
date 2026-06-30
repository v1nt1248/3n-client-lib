<script setup lang="ts">
import { ref } from 'vue';

const items = [
  { id: '1', name: 'Apple', category: 'Fruit' },
  { id: '2', name: 'Banana', category: 'Fruit' },
  { id: '3', name: 'Carrot', category: 'Vegetable' },
  { id: '4', name: 'Broccoli', category: 'Vegetable' },
];

const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Select items"
      return-object
      multiple
      chips
    />
    <div class="value-display">
      <div>Selected objects:</div>
      <pre>{{ JSON.stringify(value, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 400px;
  }
  .value-display {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
  }
  .value-display pre {
    margin: 4px 0 0;
    padding: 8px;
    background-color: var(--color-bg-block-secondary-default);
    border-radius: 4px;
    font-size: 11px;
    overflow-x: auto;
  }
</style>