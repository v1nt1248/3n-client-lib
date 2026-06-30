<script setup lang="ts">
import { ref } from 'vue';

/**
 * Disabled state
 * Disabled checkbox that cannot be interacted with
 */

const enabledChecked = ref(true);
const disabledChecked = ref(true);
const disabledUnchecked = ref(false);
</script>

<template>
  <div class="example-container">
    <ui3n-checkbox v-model="enabledChecked">
      Enabled checkbox
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="disabledChecked"
      :disabled="true"
    >
      Disabled (checked)
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="disabledUnchecked"
      :disabled="true"
    >
      Disabled (unchecked)
    </ui3n-checkbox>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>