<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const date = ref<Date | null>(new Date(2026, 10, 17, 19, 35));
  const timepickerConfig: Ui3nTimePickerConfig = { hourFormat: '12' };

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
      label="12-hour date and time"
      placeholder="YYYY-MM-DD hh:mm A"
      show-timepicker
      :timepicker-config="timepickerConfig"
      clearable
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
    gap: 8px;
    width: 100%;
    max-width: 340px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
