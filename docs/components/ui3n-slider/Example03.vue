<template>
  <div class="slider-container">
    <Ui3nSlider
      v-model="rangeValue"
      :range="true"
      :min="0"
      :max="100"
      :step="1"
      active-color="#2196f3"
    />
    <p>Range: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const rangeValue = ref([20, 80]);
</script>

<style scoped>
  .slider-container {
    width: 300px;
  }
</style>
