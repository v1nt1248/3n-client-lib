<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';

  const selected = ref<Date | null>(new Date());

  function toLocalIso(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const disabledDays = computed(() => {
    const base = selected.value ?? new Date();
    return [8, 9, 15, 23].map(day =>
      toLocalIso(new Date(base.getFullYear(), base.getMonth(), day)),
    );
  });
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nDatePicker
      v-model="selected"
      :disabled-days="disabledDays"
      highlight-weekends
      :first-day-of-week="0"
    />

    <p class="result-text">
      Days 8, 9, 15 and 23 of the selected month are disabled.
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .result-text {
    max-width: 264px;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    color: var(--color-text-control-secondary-default);
  }
</style>
