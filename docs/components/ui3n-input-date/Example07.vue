<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';

  const usDate = ref<Date | null>(new Date(1990, 2, 15));
  const euDate = ref<Date | null>(new Date(1990, 2, 15));

  function formatDate(value: Date | null): string {
    return value ? value.toLocaleDateString() : 'null';
  }
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="usDate"
      label="MM.DD.YYYY"
      format="MM.DD.YYYY"
      clearable
    />

    <Ui3nInputDate
      v-model="euDate"
      label="DD.MM.YYYY"
      format="DD.MM.YYYY"
      clearable
    />

    <p class="result-text">
      Values: <strong>{{ formatDate(usDate) }}</strong> / <strong>{{ formatDate(euDate) }}</strong>
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
