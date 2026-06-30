<script setup lang="ts">
import { ref } from 'vue';

/**
 * Basic checkbox usage
 * Simple checkbox with v-model binding
 */

const isChecked = ref(false);
</script>

<template>
  <div class="example-container">
    <ui3n-checkbox v-model="isChecked" />

    <div class="status">
      Value: <strong>{{ isChecked }}</strong>
    </div>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status {
  font-size: 12px;
  color: var(--color-text-block-secondary-default);
  padding: 8px 12px;
  background: var(--color-bg-block-secondary-default);
  border-radius: 4px;
}
</style>