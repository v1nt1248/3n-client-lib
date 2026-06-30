<template>
  <div class="slider-container">
    <Ui3nSlider v-model="value" />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(50);
</script>

<style scoped>
.slider-container {
  width: 300px;
}
</style>