<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nTimePicker from '@/components/ui3n-date-time/ui3n-time-picker.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const looseTime = ref<string | null>('8:5:3');
  const looseConfig: Ui3nTimePickerConfig = {
    leadingZeros: false,
    showSeconds: true,
  };

  const disabledTime = ref<string | null>('22:30');
</script>

<template>
  <div class="demo-row">
    <div class="demo-item">
      <p class="demo-label">Without leading zeros</p>
      <Ui3nTimePicker
        v-model="looseTime"
        :config="looseConfig"
      />
      <p class="result-text">Value: {{ looseTime ?? 'null' }}</p>
    </div>

    <div class="demo-item">
      <p class="demo-label">Disabled</p>
      <Ui3nTimePicker
        v-model="disabledTime"
        disabled
      />
    </div>
  </div>
</template>

<style scoped>
  .demo-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
  }

  .demo-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 280px;
  }

  .demo-label {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-control-secondary-default);
  }

  .result-text {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
