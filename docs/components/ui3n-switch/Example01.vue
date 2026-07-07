<script setup lang="ts">
  import { ref } from 'vue';

  const isEnabled = ref(false);
</script>

<template>
  <div class="switch-container">
    <Ui3nSwitch v-model="isEnabled" />

    <p class="status-text">
      Enabled state: <strong>{{ isEnabled }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .switch-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .status-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
