<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import dayjs, { type Dayjs } from 'dayjs';
  import { capitalize } from '../../utils/ui/capitalize';
  import { monthsMap, DEFAULT_DAYS, DEFAULT_LOCALE, DEFAULT_MONTHS } from './constants';
  import { getTimeOutputFormat, parseIsoDate, parseTime, setDateParts } from './utils';
  import Ui3nTimePicker from './ui3n-time-picker.vue';
  import Ui3nDatePickerField from './ui3n-date-picker-field.vue';
  import Ui3nCalendar from './ui3n-calendar.vue';
  import type { Ui3nDatePickerProps, Ui3nDatePickerEmits } from './types';

  const props = withDefaults(defineProps<Ui3nDatePickerProps>(), {
    size: 'regular',
    localeConfig: () => ({}),
    firstDayOfWeek: 1,
    disabledDays: () => [],
  });
  const emits = defineEmits<Ui3nDatePickerEmits>();

  const today = ref(new Date());
  const isYearsPickerOpen = ref(false);
  const isMonthsPickerOpen = ref(false);
  const isTimePickerOpen = ref(false);

  const locale = computed(() => ({
    hourShort: props.localeConfig?.hourShort ?? DEFAULT_LOCALE.hourShort,
    minuteShort: props.localeConfig?.minuteShort ?? DEFAULT_LOCALE.minuteShort,
    secondShort: props.localeConfig?.secondShort ?? DEFAULT_LOCALE.secondShort,
    days: { ...DEFAULT_DAYS, ...props.localeConfig?.days },
    months: { ...DEFAULT_MONTHS, ...props.localeConfig?.months },
  }));

  const baseYear = today.value.getFullYear();

  const currentDate = computed<Dayjs>(() =>
    isDateSafe(props.modelValue) ? dayjs(props.modelValue) : dayjs(today.value),
  );

  const currentYearValue = computed(() => `${currentDate.value.year()}`);

  const currentMonthValue = computed(() => `${currentDate.value.month()}`);

  const currentDateIso = computed(() => currentDate.value.format('YYYY-MM-DD'));

  const currentTimeValue = computed(() => {
    return props.showTimepicker
      ? currentDate.value.format(getTimeOutputFormat(props.timepickerConfig))
      : null;
  });

  const yearsOptions = computed(() => {
    const options: { id: string; value: string; label: string }[] = [];
    const currentYear = currentDate.value.year();
    const minYear = Math.min(baseYear - 100, currentYear);
    const maxYear = Math.max(baseYear + 100, currentYear);

    for (let i = minYear; i <= maxYear; i++) {
      options.push({ id: `${i}`, value: `${i}`, label: `${i}` });
    }

    return options;
  });

  const monthsOptions = computed(() => {
    const options: { id: string; value: string; label: string }[] = [];

    for (let i = 0; i < 12; i++) {
      options.push({
        id: `${i}`,
        value: `${i}`,
        label: capitalize(locale.value.months[monthsMap[`${i}`]] ?? ''),
      });
    }

    return options;
  });

  function isDateSafe(val: unknown): val is Date {
    return (
      Object.prototype.toString.call(val) === '[object Date]' &&
      !Number.isNaN((val as Date).getTime())
    );
  }

  function togglePickerField(unit: 'year' | 'month' | 'time', value: boolean) {
    const flags = {
      year: isYearsPickerOpen,
      month: isMonthsPickerOpen,
      time: isTimePickerOpen,
    };
    if (value) {
      (Object.keys(flags) as Array<keyof typeof flags>).forEach(k => (flags[k].value = k === unit));
    } else {
      flags[unit].value = false;
    }
  }

  function emitDate(next: Dayjs) {
    const value = props.showTimepicker ? next : next.startOf('day');
    emits('update:modelValue', value.toDate());
  }

  function onYearChange(value: string | null) {
    if (!value) {
      return;
    }

    const year = Number(value);
    if (!Number.isInteger(year)) {
      return;
    }

    emitDate(dayjs(setDateParts(currentDate.value.toDate(), { year })));
  }

  function onMonthChange(value: string | null) {
    if (!value) {
      return;
    }

    const month = Number(value);
    if (!Number.isInteger(month) || month < 0 || month > 11) {
      return;
    }

    emitDate(dayjs(setDateParts(currentDate.value.toDate(), { month })));
  }

  function onDateChange(value: string) {
    const date = parseIsoDate(value);
    if (!date) {
      return;
    }

    emitDate(
      dayjs(
        setDateParts(currentDate.value.toDate(), {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        }),
      ),
    );
  }

  function onTimeChange(value: string | null) {
    const parts = parseTime(value, props.timepickerConfig);
    if (!parts) {
      return;
    }

    const base = currentDate.value;
    const next = base
      .hour(parts.hours ?? base.hour())
      .minute(parts.minutes ?? base.minute())
      .second(parts.seconds ?? base.second());

    emitDate(next);
  }
</script>

<template>
  <div
    :id="id"
    data-ui3n="datepicker"
    :class="[$style.ui3nDatePicker, $style[size]]"
  >
    <div :class="$style.row">
      <ui3n-date-picker-field
        :model-value="currentYearValue"
        :size="size"
        :open="isYearsPickerOpen"
        :items="yearsOptions"
        :disabled="disabled"
        @update:open="v => togglePickerField('year', v)"
        @update:model-value="onYearChange"
      />
    </div>

    <div :class="$style.row">
      <ui3n-date-picker-field
        :model-value="currentMonthValue"
        :size="size"
        :open="isMonthsPickerOpen"
        :items="monthsOptions"
        :disabled="disabled"
        @update:open="v => togglePickerField('month', v)"
        @update:model-value="onMonthChange"
      />
    </div>

    <div :class="$style.row">
      <ui3n-calendar
        :model-value="currentDateIso"
        :locale-config="locale.days"
        :year="currentDate.year()"
        :month="currentDate.month() + 1"
        :size="size"
        :first-day-of-week="firstDayOfWeek"
        :highlight-weekends="highlightWeekends"
        :disabled-days="disabledDays"
        :disabled="disabled"
        @update:model-value="onDateChange"
      />
    </div>

    <ui3n-time-picker
      v-if="showTimepicker"
      :model-value="currentTimeValue"
      :config="timepickerConfig"
      :size="size"
      :locale-config="locale"
      :open="isTimePickerOpen"
      :disabled="disabled"
      @update:open="v => togglePickerField('time', v)"
      @update:model-value="onTimeChange"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nDatePicker {
    --_date-picker-background-color: var(
      --ui3n-date-picker-background-color,
      var(--color-bg-block-primary-default)
    );
    --_date-picker-border-radius: var(--ui3n-date-picker-border-radius, 12px);

    position: relative;
    padding: 8px;
    background-color: var(--_date-picker-background-color);
    border-radius: var(--_date-picker-border-radius);
    box-shadow:
      0 4px 12px 0 var(--shadow-far),
      0 0 4px 0 var(--shadow-close);

    &.regular {
      width: 264px;
    }

    &.large {
      width: 332px;
    }

    .row:last-child {
      margin-bottom: 0;
    }
  }

  .row {
    position: relative;
    width: 100%;
    margin-bottom: 8px;
  }
</style>
