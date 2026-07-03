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
      chips
    />
    <div class="value-display">Selected: {{ value }}</div>
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
</style>
