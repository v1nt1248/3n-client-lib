<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';
  import type { Ui3nDateTimeLocaleConfig } from '@/components/ui3n-date-time/types';

  const date = ref<Date | null>(new Date(2026, 10, 17));

  const localeConfig: Ui3nDateTimeLocaleConfig = {
    days: {
      monday: 'пн',
      tuesday: 'вт',
      wednesday: 'ср',
      thursday: 'чт',
      friday: 'пт',
      saturday: 'сб',
      sunday: 'вс',
    },
    months: {
      january: 'январь',
      february: 'февраль',
      march: 'март',
      april: 'апрель',
      may: 'май',
      june: 'июнь',
      july: 'июль',
      august: 'август',
      september: 'сентябрь',
      october: 'октябрь',
      november: 'ноябрь',
      december: 'декабрь',
    },
  };

  function toLocalIso(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const disabledDays = computed(() => {
    const base = date.value ?? new Date();
    return [8, 9, 15, 23].map(day =>
      toLocalIso(new Date(base.getFullYear(), base.getMonth(), day)),
    );
  });
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="date"
      label="Localized date"
      placeholder="YYYY-MM-DD"
      :locale-config="localeConfig"
      :first-day-of-week="1"
      :disabled-days="disabledDays"
      highlight-weekends
      clearable
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
    gap: 8px;
    width: 100%;
    max-width: 320px;
  }

  .result-text {
    font-size: 12px;
    line-height: 1.4;
    color: var(--color-text-control-secondary-default);
  }
</style>
