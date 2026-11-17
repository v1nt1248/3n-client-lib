<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nTimePicker from '@/components/ui3n-date-time/ui3n-time-picker.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const time = ref<string | null>('07:35:15 PM');
  const config: Ui3nTimePickerConfig = {
    hourFormat: '12',
    showSeconds: true,
  };
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nTimePicker
      v-model="time"
      :config="config"
    />

    <p class="result-text">
      Selected time: <strong>{{ time ?? 'null' }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 320px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
