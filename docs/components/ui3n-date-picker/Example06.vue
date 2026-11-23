<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';

  const date = ref<Date | null>(new Date(2000, 2, 15));
  const withoutYear = ref(true);
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nDatePicker
      v-model="date"
      v-model:without-year="withoutYear"
      allow-without-year
    />

    <p class="result-text">
      Without year: <strong>{{ withoutYear }}</strong>, value: <strong>{{ date?.toDateString() ?? 'null' }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
