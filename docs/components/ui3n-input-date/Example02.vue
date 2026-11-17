<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const date = ref<Date | null>(new Date(2026, 10, 17, 10, 20, 30));
  const timepickerConfig: Ui3nTimePickerConfig = { showSeconds: true };

  function formatDateTime(value: Date | null): string {
    return value
      ? `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`
      : 'null';
  }
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="date"
      label="Date and time"
      placeholder="YYYY-MM-DD HH:mm:ss"
      show-timepicker
      :timepicker-config="timepickerConfig"
      clearable
    />

    <p class="result-text">
      Selected value: <strong>{{ formatDateTime(date) }}</strong>
    </p>

    <p class="hint-text">
      The input displays and accepts the time part; the panel renders the time
      picker below the calendar.
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 340px;
  }

  .result-text,
  .hint-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .hint-text {
    line-height: 1.4;
  }
</style>
