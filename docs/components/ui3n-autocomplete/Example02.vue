<script setup lang="ts">
import { ref } from 'vue';

const items = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Grape' },
  { id: '5', name: 'Orange' },
];

const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Select fruits"
      multiple
    />
    <div class="value-display">Selected: {{ value }}</div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 300px;
  }
  .value-display {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
  }
</style>