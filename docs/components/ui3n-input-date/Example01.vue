<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';

  const date = ref<Date | null>(new Date(2026, 10, 17));

  function formatDate(value: Date | null): string {
    return value ? value.toLocaleDateString() : 'null';
  }
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="date"
      label="Date"
      placeholder="YYYY-MM-DD"
      clearable
    />

    <p class="result-text">
      Selected value: <strong>{{ formatDate(date) }}</strong>
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
