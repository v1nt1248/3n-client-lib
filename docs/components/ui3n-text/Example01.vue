<script setup lang="ts">
  import { ref } from 'vue';

  const text = ref('');
</script>

<template>
  <div class="text-container">
    <Ui3nText v-model="text" />

    <p class="result-text">
      Current Value: <strong>{{ text || 'empty' }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .text-container {
    width: 100%;
    max-width: 400px;
  }
  .result-text {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
