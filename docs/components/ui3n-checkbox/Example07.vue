<script setup lang="ts">
  import { ref } from 'vue';

  /**
   * Custom values
   * Using custom checkedValue and uncheckedValue instead of boolean
   */

  // String values
  const status = ref<'active' | 'inactive'>('inactive');

  // Number values
  const priority = ref<number>(0);

  // Object-like values using strings
  const theme = ref<'light' | 'dark'>('light');
</script>

<template>
  <div class="example-container">
    <div class="example-section">
      <span class="label">String values (active/inactive):</span>
      <ui3n-checkbox
        v-model="status"
        checked-value="active"
        unchecked-value="inactive"
      >
        Status: {{ status }}
      </ui3n-checkbox>
    </div>

    <div class="example-section">
      <span class="label">Number values (1/0):</span>
      <ui3n-checkbox
        v-model="priority"
        :checked-value="1"
        :unchecked-value="0"
      >
        High priority: {{ priority }}
      </ui3n-checkbox>
    </div>

    <div class="example-section">
      <span class="label">Theme selection:</span>
      <ui3n-checkbox
        v-model="theme"
        checked-value="dark"
        unchecked-value="light"
      >
        Dark mode: {{ theme === 'dark' ? 'ON' : 'OFF' }}
      </ui3n-checkbox>
    </div>
  </div>
</template>

<style scoped>
  .example-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .example-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
    font-weight: 500;
  }
</style>
