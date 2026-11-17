<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { DEFAULT_LOCALE } from './constants';
  import {
    alignToStep,
    formatTimeParts,
    parseTime,
    resolveTimeVisibility,
  } from './utils';
  import Ui3nTimePickerField from './ui3n-time-picker-field.vue';
  import type { TimeParts, Ui3nTimePickerProps, Ui3nTimePickerEmits } from './types';

  const props = withDefaults(defineProps<Ui3nTimePickerProps>(), {
    config: () => ({}),
    size: 'regular',
    minuteStep: 5,
    secondStep: 1,
    localeConfig: () => ({}),
  });
  const emits = defineEmits<Ui3nTimePickerEmits>();

  const isOpen = defineModel<boolean>('open', { default: false });

  const isHoursPickerOpen = ref(false);
  const isMinutesPickerOpen = ref(false);
  const isSecondsPickerOpen = ref(false);

  const baseDate = new Date();

  const locale = computed(() => ({
    hourShort: props.localeConfig?.hourShort ?? DEFAULT_LOCALE.hourShort,
    minuteShort: props.localeConfig?.minuteShort ?? DEFAULT_LOCALE.minuteShort,
    secondShort: props.localeConfig?.secondShort ?? DEFAULT_LOCALE.secondShort,
  }));

  const is12Hour = computed(() => (props.config.hourFormat ?? '24') === '12');
  const leadingZeros = computed(() => props.config.leadingZeros ?? true);

  const visibility = computed(() => resolveTimeVisibility(props.config));
  const showHours = computed(() => visibility.value.showHours);
  const showMinutes = computed(() => visibility.value.showMinutes);
  const showSeconds = computed(() => visibility.value.showSeconds);

  const parsedTime = computed(() => parseTime(props.modelValue, props.config));

  const alignedParts = computed<TimeParts | null>(() => {
    const parsed = parsedTime.value;
    if (!parsed) {
      return null;
    }

    return {
      hours: parsed.hours ?? baseDate.getHours(),
      minutes: showMinutes.value
        ? alignToStep(parsed.minutes ?? baseDate.getMinutes(), props.minuteStep)
        : (parsed.minutes ?? baseDate.getMinutes()),
      seconds: showSeconds.value
        ? alignToStep(parsed.seconds ?? baseDate.getSeconds(), props.secondStep)
        : (parsed.seconds ?? baseDate.getSeconds()),
    };
  });

  const normalizedValue = computed(() =>
    alignedParts.value ? formatTimeParts(alignedParts.value, props.config) : null,
  );

  const currentHourValue = computed<string | null>(() => {
    if (!showHours.value || !alignedParts.value) {
      return null;
    }

    const { hours } = alignedParts.value;
    if (is12Hour.value) {
      const hour = hours % 12 || 12;
      return `${pad(hour)} ${hours >= 12 ? 'PM' : 'AM'}`;
    }

    return pad(hours);
  });

  const currentMinuteValue = computed<string | null>(() => {
    if (!showMinutes.value || !alignedParts.value) {
      return null;
    }

    return pad(alignedParts.value.minutes);
  });

  const currentSecondValue = computed<string | null>(() => {
    if (!showSeconds.value || !alignedParts.value) {
      return null;
    }

    return pad(alignedParts.value.seconds);
  });

  const cellsCount = computed(
    () => [showHours.value, showMinutes.value, showSeconds.value].filter(Boolean).length,
  );

  const hoursOptions = computed<{ id: string; value: string }[]>(() => {
    if (!showHours.value) {
      return [];
    }

    const options: { id: string; value: string }[] = [];

    if (is12Hour.value) {
      for (const meridiem of ['AM', 'PM']) {
        for (let i = 1; i <= 12; i++) {
          const value = `${pad(i)} ${meridiem}`;
          options.push({ id: value.replaceAll(' ', ''), value });
        }
      }
    } else {
      for (let i = 0; i < 24; i++) {
        const value = pad(i);
        options.push({ id: value, value });
      }
    }

    return options;
  });

  const minutesOptions = computed<{ id: string; value: string }[]>(() => {
    if (!showMinutes.value) {
      return [];
    }

    const options: { id: string; value: string }[] = [];
    const step = Math.max(1, props.minuteStep);

    for (let i = 0; i < 60; i += step) {
      const value = pad(i);
      options.push({ id: value, value });
    }
    return options;
  });

  const secondsOptions = computed<{ id: string; value: string }[]>(() => {
    if (!showSeconds.value) {
      return [];
    }

    const options: { id: string; value: string }[] = [];
    const step = Math.max(1, props.secondStep);

    for (let i = 0; i < 60; i += step) {
      const value = pad(i);
      options.push({ id: value, value });
    }
    return options;
  });

  function pad(value: number): string {
    return leadingZeros.value ? String(value).padStart(2, '0') : String(value);
  }

  function togglePickerField(unit: 'hours' | 'minutes' | 'seconds', value: boolean) {
    const flags = {
      hours: isHoursPickerOpen,
      minutes: isMinutesPickerOpen,
      seconds: isSecondsPickerOpen,
    };
    if (value) {
      (Object.keys(flags) as Array<keyof typeof flags>).forEach(k => (flags[k].value = k === unit));
    } else {
      flags[unit].value = false;
    }
  }

  function hourFieldTransform(value: string): string {
    if (is12Hour.value) {
      return value;
    }

    return `${value} ${locale.value.hourShort}`;
  }

  function minuteFieldTransform(value: string): string {
    return `${value} ${locale.value.minuteShort}`;
  }

  function secondFieldTransform(value: string): string {
    return `${value} ${locale.value.secondShort}`;
  }

  function toInt(value: string | null, max: number): number | null {
    if (!value) {
      return null;
    }

    const num = Number.parseInt(value, 10);
    return Number.isInteger(num) && num >= 0 && num <= max ? num : null;
  }

  function parseMeridiemHour(value: string | null): number | null {
    if (!value) {
      return null;
    }

    const match = /^(\d{1,2})\s*([AaPp][Mm])$/.exec(value.trim());
    if (!match) {
      return null;
    }

    const hour = Number(match[1]);
    if (!Number.isInteger(hour) || hour < 1 || hour > 12) {
      return null;
    }

    return (hour % 12) + (match[2].toUpperCase() === 'PM' ? 12 : 0);
  }

  function currentParts(): TimeParts {
    return (
      alignedParts.value ?? {
        hours: baseDate.getHours(),
        minutes: baseDate.getMinutes(),
        seconds: baseDate.getSeconds(),
      }
    );
  }

  function updateTimeComponent(type: 'hour' | 'minute' | 'second', newValue: string | null) {
    const next = { ...currentParts() };

    if (type === 'hour') {
      const hour = is12Hour.value ? parseMeridiemHour(newValue) : toInt(newValue, 23);
      if (hour === null) {
        return;
      }

      next.hours = hour;
    } else if (type === 'minute') {
      const minute = toInt(newValue, 59);
      if (minute === null) {
        return;
      }

      next.minutes = minute;
    } else {
      const second = toInt(newValue, 59);
      if (second === null) {
        return;
      }

      next.seconds = second;
    }

    emits('update:modelValue', formatTimeParts(next, props.config));
  }

  onMounted(() => {
    if (!props.modelValue || !normalizedValue.value) {
      return;
    }

    if (normalizedValue.value !== props.modelValue) {
      emits('update:modelValue', normalizedValue.value);
    }
  });

  watch(isOpen, value => {
    if (!value) {
      isHoursPickerOpen.value = false;
      isMinutesPickerOpen.value = false;
      isSecondsPickerOpen.value = false;
      return;
    }

    if (isHoursPickerOpen.value || isMinutesPickerOpen.value || isSecondsPickerOpen.value) {
      return;
    }

    togglePickerField('hours', true);
  });

  watch([isHoursPickerOpen, isMinutesPickerOpen, isSecondsPickerOpen], value => {
    isOpen.value = value.some(Boolean);
  });
</script>

<template>
  <div
    :id="id"
    data-ui3n="timepicker"
    :class="[$style.ui3nTimePicker, $style[`cells-${cellsCount}`]]"
  >
    <ui3n-time-picker-field
      v-if="showHours"
      :size="size"
      :model-value="currentHourValue"
      :open="isHoursPickerOpen"
      :items="hoursOptions"
      :selection-transform="hourFieldTransform"
      :disabled="disabled"
      @update:open="v => togglePickerField('hours', v)"
      @update:model-value="v => updateTimeComponent('hour', v)"
    />

    <ui3n-time-picker-field
      v-if="showMinutes"
      :size="size"
      :model-value="currentMinuteValue"
      :open="isMinutesPickerOpen"
      :items="minutesOptions"
      :selection-transform="minuteFieldTransform"
      :disabled="disabled"
      @update:open="v => togglePickerField('minutes', v)"
      @update:model-value="v => updateTimeComponent('minute', v)"
    />

    <ui3n-time-picker-field
      v-if="showSeconds"
      :size="size"
      :model-value="currentSecondValue"
      :open="isSecondsPickerOpen"
      :items="secondsOptions"
      :selection-transform="secondFieldTransform"
      :disabled="disabled"
      @update:open="v => togglePickerField('seconds', v)"
      @update:model-value="v => updateTimeComponent('second', v)"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nTimePicker {
    --_time-picker-gap: var(--ui3n-time-picker-gap, 8px);

    position: relative;
    width: 100%;
    padding: var(--ui3n-time-picker-padding, 8px) 0;
    display: grid;
    gap: var(--_time-picker-gap);

    &.cells-1 {
      grid-template-columns: 1fr;
    }

    &.cells-2 {
      grid-template-columns: 1fr 1fr;
    }

    &.cells-3 {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
