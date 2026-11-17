<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';

  const masked = ref<string | null>('22:30:10');
  const free = ref<string | null>('8:5:3');

  const maskedConfig: Ui3nTimePickerConfig = { showSeconds: true };
  const freeConfig: Ui3nTimePickerConfig = {
    leadingZeros: false,
    showSeconds: true,
  };
</script>

<template>
  <div class="demo-grid">
    <div class="demo-field">
      <Ui3nInputTime
        v-model="masked"
        label="Masked input"
        placeholder="HH:mm:ss"
        :config="maskedConfig"
        clearable
      />
      <span class="result-text">v-model: {{ masked ?? 'null' }}</span>
    </div>

    <div class="demo-field">
      <Ui3nInputTime
        v-model="free"
        label="Free input (leadingZeros: false)"
        placeholder="H:m:s"
        :config="freeConfig"
        clearable
      />
      <span class="result-text">v-model: {{ free ?? 'null' }}</span>
    </div>
  </div>
</template>

<style scoped>
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    width: 100%;
  }

  .demo-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
