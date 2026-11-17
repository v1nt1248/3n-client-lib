<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';
  import type {
    Ui3nDateTimeLocaleConfig,
    Ui3nTimePickerConfig,
  } from '@/components/ui3n-date-time/types';

  const date = ref<Date | null>(new Date());

  const localeConfig: Ui3nDateTimeLocaleConfig = {
    hourShort: 'ч',
    minuteShort: 'мин',
    secondShort: 'сек',
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

  const timepickerConfig: Ui3nTimePickerConfig = { showSeconds: true };
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nDatePicker
      v-model="date"
      :locale-config="localeConfig"
      :first-day-of-week="1"
      show-timepicker
      :timepicker-config="timepickerConfig"
    />
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
