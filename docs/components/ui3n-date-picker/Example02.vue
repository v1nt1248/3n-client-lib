<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const date = ref<Date | null>(new Date());
  const timepickerConfig: Ui3nTimePickerConfig = { showSeconds: true };

  function formatDateTime(value: Date | null): string {
    if (!value) {
      return 'null';
    }

    return `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
  }
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nDatePicker
      v-model="date"
      show-timepicker
      :timepicker-config="timepickerConfig"
    />

    <p class="result-text">
      Selected value: <strong>{{ formatDateTime(date) }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
