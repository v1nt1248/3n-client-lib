<script lang="ts" setup>
  import { computed } from 'vue';
  import { daysMap, DEFAULT_DAYS } from './constants';
  import { generateCalendarGrid } from './utils';
  import type { Ui3nCalendarProps, Ui3nCalendarEmits, Ui3nCalendarDay } from './types';

  const props = withDefaults(defineProps<Ui3nCalendarProps>(), {
    size: 'regular',
    localeConfig: () => ({}),
    firstDayOfWeek: 1,
    disabledDays: () => [],
  });
  const emits = defineEmits<Ui3nCalendarEmits>();

  const locale = computed(() => ({
    ...DEFAULT_DAYS,
    ...props.localeConfig,
  }));

  const weekDays = computed(() => {
    const value: { key: string; label: string }[] = [];
    for (let i = 1; i < 7; i++) {
      const dayToken = daysMap[`${i}`];
      const label = locale.value[dayToken] ?? DEFAULT_DAYS[dayToken];

      value.push({ key: dayToken, label: label.toUpperCase() });
    }

    const sundayLabel = (locale.value.sunday ?? DEFAULT_DAYS.sunday).toUpperCase();
    if (props.firstDayOfWeek === 0) {
      value.unshift({ key: 'sunday', label: sundayLabel });
    } else {
      value.push({ key: 'sunday', label: sundayLabel });
    }

    return value;
  });

  const calendarDays = computed(() =>
    generateCalendarGrid(props.year, props.month, props.disabledDays, props.firstDayOfWeek),
  );

  function isSelected(item: Ui3nCalendarDay) {
    return props.modelValue === item.date;
  }

  function handleSelectDay(item: Ui3nCalendarDay) {
    if (props.disabled || item.disabled || !item.isCurrentMonth) {
      return;
    }

    emits('update:modelValue', item.date);
  }
</script>

<template>
  <div
    data-ui3n="calendar"
    :class="$style.ui3nCalendar"
  >
    <div :class="[$style.days, $style[`daysSize${size}`]]">
      <div
        v-for="day in weekDays"
        :key="day.key"
        :class="$style.weekDay"
      >
        {{ day.label }}
      </div>
    </div>

    <div :class="[$style.days, $style[`daysSize${size}`]]">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        v-bind="{ 'data-date': day.date }"
        :class="[
          $style.day,
          $style[`daySize${size}`],
          highlightWeekends && [0, 6].includes(day.day) && $style.weekend,
          isSelected(day) && $style.daySelected,
          (disabled || day.disabled || !day.isCurrentMonth) && $style.dayDisabled,
        ]"
        @click="handleSelectDay(day)"
      >
        {{ day.dayNumber }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nCalendar {
    position: relative;
    width: 100%;
    user-select: none;
  }

  .days {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    &.daysSizeregular {
      gap: 4px;
      margin-bottom: 4px;
    }

    &.daysSizelarge {
      gap: 6px;
      margin-bottom: 6px;
    }
  }

  .weekDay {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--color-bg-control-secondary-default);
    font-size: 10px;
    font-weight: 800;
    color: var(--color-text-block-secondary-default);
  }

  .day {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-block-secondary-default);

    &.daySizeregular {
      height: 28px;
    }

    &.daySizelarge {
      height: 40px;
    }

    &:not(.dayDisabled) {
      color: var(--color-text-block-primary-default);
      cursor: pointer;

      &.weekend {
        color: var(--error-content-default);
      }

      &.daySelected {
        background-color: var(--color-bg-button-primary-default);
        color: var(--color-text-button-primary-default);
      }

      &:not(.daySelected):hover {
        background-color: var(--color-bg-control-primary-hover);
      }
    }

    &.dayDisabled {
      pointer-events: none;
      color: var(--color-text-block-secondary-default);
    }
  }
</style>
