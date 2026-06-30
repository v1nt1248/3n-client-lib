<template>
  <Ui3nSelector
    v-model="selected"
    :items="items"
    item-display="name"
    item-value="id"
    placeholder="Search and select..."
    label="With Search"
    :with-search="true"
    :clearable="true"
  />
  <p>Selected: {{ selected }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(null);

const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
  { id: 5, name: 'Elderberry' },
  { id: 6, name: 'Fig' },
  { id: 7, name: 'Grape' },
  { id: 8, name: 'Honeydew' },
];
</script>