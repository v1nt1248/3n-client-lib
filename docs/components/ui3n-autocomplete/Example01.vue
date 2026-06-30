<script setup lang="ts">
  import { ref } from 'vue';
  import { Ui3nAutocomplete } from '@/components';

  const items = [
    { id: 'Apple', name: 'Apple' },
    { id: 'Banana', name: 'Banana' },
    { id: 'Cherry', name: 'Cherry' },
    { id: 'Grape', name: 'Grape' },
    { id: 'Orange', name: 'Orange' },
  ];

  const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      :lock-scroll="true"
      placeholder="Select a fruit"
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
