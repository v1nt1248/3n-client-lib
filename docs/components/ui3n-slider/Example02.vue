<template>
  <div class="slider-container">
    <Ui3nSlider
      v-model="value"
      :min="0"
      :max="100"
      :step="5"
      label-visible="always"
      active-color="#4caf50"
      track-color="#e8f5e9"
      thumb-color="#2e7d32"
    />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref(25);
</script>

<style scoped>
  .slider-container {
    width: 300px;
  }
</style>
