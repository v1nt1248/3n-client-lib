<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';

  const birthday = ref<Date | null>(new Date(2000, 1, 29));
  const withoutYear = ref(true);

  function formatValue(value: Date | null): string {
    if (!value) {
      return 'null';
    }

    return withoutYear.value
      ? value.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
      : value.toLocaleDateString();
  }
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="birthday"
      v-model:without-year="withoutYear"
      label="Birthday"
      format="MM.DD.YYYY"
      allow-without-year
      clearable
    />

    <p class="result-text">
      Without year: <strong>{{ withoutYear }}</strong>, value: <strong>{{ formatValue(birthday) }}</strong>
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
