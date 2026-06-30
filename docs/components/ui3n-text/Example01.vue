<template>
  <div class="text-container">
    <Ui3nText v-model="text" />
    <p>Value: {{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<style scoped>
.text-container {
  width: 400px;
}
</style>