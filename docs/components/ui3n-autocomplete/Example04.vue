<script setup lang="ts">
import { ref } from 'vue';

interface Contact {
  id: string;
  name: string;
  email: string;
}

const items: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com' },
];

const value = ref([]);

function customFilter(item: Contact, query: string): boolean {
  const q = query.toLowerCase();
  return item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q);
}
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Search by name or email"
      :custom-filter="customFilter"
      item-title="name"
      item-value="id"
      multiple
      chips
      clear-on-select
    />
    <div class="value-display">Selected: {{ JSON.stringify(value) }}</div>
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
</style>