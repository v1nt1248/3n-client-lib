<script setup lang="ts">
import { ref } from 'vue';

const items = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
];

const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="This autocomplete is disabled"
      disabled
    />
  </div>
</template>

<style scoped>
  .demo-container {
    width: 300px;
  }
</style>