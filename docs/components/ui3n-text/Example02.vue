<script setup lang="ts">
  import { ref } from 'vue';

  const description = ref('');
</script>

<template>
  <div class="text-container">
    <Ui3nText
      v-model="description"
      label="Description"
      placeholder="Enter your description here..."
      :rows="4"
      :max-rows="8"
    />
  </div>
</template>

<style scoped>
  .text-container {
    width: 100%;
    max-width: 400px;
  }
</style>
