<template>
  <div class="switch-container">
    <Ui3nSwitch v-model="isEnabled" />
    <p>Enabled: {{ isEnabled }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isEnabled = ref(false);
</script>

<style scoped>
.switch-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>