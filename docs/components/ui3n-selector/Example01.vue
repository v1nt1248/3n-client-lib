<template>
  <Ui3nSelector
    v-model="selected"
    :items="items"
    item-display="name"
    item-value="id"
    placeholder="Select a country"
    label="Country"
  />
  <p>Selected: {{ selected }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(null);

const items = [
  { id: 1, name: 'United States' },
  { id: 2, name: 'United Kingdom' },
  { id: 3, name: 'Germany' },
  { id: 4, name: 'France' },
  { id: 5, name: 'Japan' },
];
</script>