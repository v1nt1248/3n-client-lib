<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';

  const time = ref<string | null>('10:30');
  const rules = [
    (value: unknown) => Boolean(value) || 'Time is required',
    (value: unknown) => {
      if (typeof value !== 'string' || !value) {
        return true;
      }

      return (
        (value >= '09:00' && value <= '18:00') ||
        'Time must be between 09:00 and 18:00'
      );
    },
  ];
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputTime
      v-model="time"
      label="Working hours"
      placeholder="HH:mm"
      clearable
      validate-at-startup
      :rules="rules"
    />

    <p class="result-text">
      Selected time: <strong>{{ time ?? 'null' }}</strong>
    </p>
    <p class="hint-text">
      Try clearing the field or entering a time outside 09:00–18:00.
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
