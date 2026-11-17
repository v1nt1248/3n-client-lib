<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';

  const time = ref<string | null>('22:30');
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputTime
      v-model="time"
      label="Time"
      placeholder="HH:mm"
      clearable
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
