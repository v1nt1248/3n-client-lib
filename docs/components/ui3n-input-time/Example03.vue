<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const time = ref<string | null>('22:32:10');
  const config: Ui3nTimePickerConfig = { showSeconds: true };
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputTime
      v-model="time"
      label="Custom steps"
      placeholder="HH:mm:ss"
      :config="config"
      :minute-step="1"
      :second-step="5"
      size="large"
    />

    <p class="result-text">
      Selected time: <strong>{{ time ?? 'null' }}</strong>
    </p>

    <p class="hint-text">
      Opening the picker aligns the current value to the configured steps once.
      Typing is not continuously normalized.
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

  .result-text,
  .hint-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .hint-text {
    line-height: 1.4;
  }
</style>
