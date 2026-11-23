<script lang="ts" setup>
  import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
  import { autoUpdate, flip, useFloating, offset, shift } from '@floating-ui/vue';
  import Ui3nInput from '../ui3n-input/ui3n-input.vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nDatePicker from '../ui3n-date-time/ui3n-date-picker.vue';
  import { createDateMaskOptions } from '../ui3n-date-time/date-mask';
  import { createDateTimeMaskOptions } from '../ui3n-date-time/date-time-mask';
  import {
    formatDate,
    formatTimeParts,
    getDatePatternParts,
    getDateRegexSource,
    isValidDate,
    parseFormattedDate,
    parseTime,
    resolveTimeVisibility,
  } from '../ui3n-date-time/utils';
  import { lockScroll, unlockScroll } from '../../utils/ui/scroll-lock';
  import { default as vClickOutside } from '../../directives/ui3n-click-outside';
  import type { Ui3nInputDateProps, Ui3nInputDateEmits, Ui3nInputDateExpose } from './types';

  const props = withDefaults(defineProps<Ui3nInputDateProps>(), {
    masked: true,
    format: 'YYYY-MM-DD',
    withoutYear: false,
    allowWithoutYear: false,
  });
  const emits = defineEmits<Ui3nInputDateEmits>();

  const input = useTemplateRef<InstanceType<typeof Ui3nInput>>('input');
  const menuTriggerElement = ref<HTMLDivElement | null>(null);
  const menuContentElement = useTemplateRef<HTMLDivElement>('picker');

  const isShow = ref(false);
  let scrollParent: HTMLElement | null = null;

  /** The "without year" mode is not supported together with the time picker */
  const isWithoutYear = computed(() => props.withoutYear && !props.showTimepicker);

  watch(
    () => props.withoutYear && props.showTimepicker,
    value => {
      if (value) {
        console.warn('[Ui3nInputDate] `withoutYear` is ignored when `showTimepicker` is true');
      }
    },
    { immediate: true },
  );

  const inputMask = computed(() => {
    if (!props.masked) {
      return undefined;
    }

    return props.showTimepicker
      ? createDateTimeMaskOptions(props.timepickerConfig, props.format)
      : createDateMaskOptions({ format: props.format, withoutYear: isWithoutYear.value });
  });

  const inputPlaceholder = computed(
    () => props.placeholder ?? getDatePatternParts(props.format, isWithoutYear.value).pattern,
  );

  /**
   * Formats the model value the same way it is displayed and typed in the input.
   */
  function formatModelValue(value: Date): string {
    const date = formatDate(value, props.format, isWithoutYear.value);

    if (!props.showTimepicker) {
      return date;
    }

    const time = formatTimeParts(
      {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      },
      props.timepickerConfig,
    );

    return `${date} ${time}`;
  }

  const inputValue = computed(() =>
    isValidDate(props.modelValue) ? formatModelValue(props.modelValue) : '',
  );

  const { floatingStyles } = useFloating(menuTriggerElement, menuContentElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    middleware: [
      offset({ mainAxis: 4, crossAxis: 0 }),
      flip({ fallbackPlacements: ['top-end', 'bottom-start', 'top-start'], padding: 8 }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  function toggleMenu() {
    if (props.disabled) {
      return;
    }

    isShow.value = !isShow.value;
    isShow.value ? emits('open-picker') : emits('close-picker');
  }

  function onClickOutside(event: MouseEvent) {
    if (menuTriggerElement.value?.contains(event.target as Node)) {
      return;
    }

    isShow.value = false;
    emits('close-picker');
  }

  /**
   * Checks that the time part has the fully padded shape while typing. Without
   * it a single-digit minute (`22:3`) would be committed and the model update
   * would rewrite the text before the user finishes.
   */
  function isStrictTime(value: string): boolean {
    const { showHours, showMinutes, showSeconds } = resolveTimeVisibility(
      props.timepickerConfig,
    );
    const is12Hour = (props.timepickerConfig?.hourFormat ?? '24') === '12';
    const parts: string[] = [];

    if (showHours) {
      parts.push(is12Hour ? '(?:0[1-9]|1[0-2])' : '(?:[01]\\d|2[0-3])');
    }
    if (showMinutes) {
      parts.push('[0-5]\\d');
    }
    if (showSeconds) {
      parts.push('[0-5]\\d');
    }

    const suffix = is12Hour && showHours ? '\\s(?:AM|PM)' : '';

    return new RegExp(`^${parts.join(':')}${suffix}$`, 'i').test(value);
  }

  /**
   * Parses the input text. With `showTimepicker` the value is `<date> HH:mm[:ss]`;
   * otherwise only the date is expected. The date part follows `format` (and has
   * no year in the "without year" mode). On blur (`flexible: true`) single-digit
   * date and time parts are allowed.
   */
  function parseDateTimeInput(value: string, flexible: boolean): Date | null {
    const dateOptions = { withoutYear: isWithoutYear.value, strict: !flexible };

    if (!props.showTimepicker) {
      return parseFormattedDate(value, props.format, dateOptions);
    }

    const dateSource = getDateRegexSource(props.format, false, false).replace(/\((?!\?)/g, '(?:');
    const match = new RegExp(`^(${dateSource})\\s+(.+)$`).exec(value.trim());

    if (!match) {
      return null;
    }

    const parsedDate = parseFormattedDate(match[1], props.format, dateOptions);

    if (!parsedDate) {
      return null;
    }

    if (!flexible && !isStrictTime(match[2])) {
      return null;
    }

    const parts = parseTime(match[2], props.timepickerConfig);

    if (!parts) {
      return null;
    }

    parsedDate.setHours(parts.hours ?? 0, parts.minutes ?? 0, parts.seconds ?? 0, 0);

    return parsedDate;
  }

  /**
   * Converts the input text into the model value. Only complete and valid
   * values are emitted; incomplete input keeps the previous model untouched and
   * the text is not rewritten mid-typing.
   */
  function applyInputValue(value: string, flexible = false) {
    if (!value) {
      if (props.modelValue !== null) {
        emits('update:modelValue', null);
      }
      return;
    }

    const next = parseDateTimeInput(value, flexible);

    if (!next) {
      return;
    }

    if (isValidDate(props.modelValue) && next.getTime() === props.modelValue.getTime()) {
      return;
    }

    emits('update:modelValue', next);
  }

  function onInputModelUpdate(value: string) {
    applyInputValue(value);
  }

  function onInputEvent(value: string) {
    emits('input', value);
  }

  function onChangeEvent(value: string) {
    emits('change', value);
    applyInputValue(value, true);
  }

  function onDateUpdate(value: Date | null) {
    emits('update:modelValue', value);

    if (value) {
      const text = formatModelValue(value);
      emits('input', text);
      emits('change', text);
    }
  }

  defineExpose<Ui3nInputDateExpose>({
    inputElement: computed(() => input.value?.inputElement ?? null),
    isDirty: computed(() => input.value?.isDirty ?? false),
    isFocused: computed(() => input.value?.isFocused ?? false),
    clearValue: () => input.value?.clearValue(),
  });

  watch(isShow, value => {
    if (value) {
      scrollParent = lockScroll(menuTriggerElement.value);
    } else {
      unlockScroll(scrollParent);
      scrollParent = null;
    }
  });

  onBeforeUnmount(() => {
    unlockScroll(scrollParent);
    scrollParent = null;
  });
</script>

<template>
  <div
    data-ui3n="input-date"
    :class="$style.ui3nInputDate"
  >
    <ui3n-input
      :id="id"
      ref="input"
      :name="name"
      :size="size"
      :label="label"
      :placeholder="inputPlaceholder"
      :clearable="clearable"
      :autofocus="autofocus"
      :readonly="readonly"
      :rules="rules"
      :validate-at-startup="validateAtStartup"
      :hide-bottom-space="hideBottomSpace"
      :display-state-mode="displayStateMode"
      :display-state-with-icon="displayStateWithIcon"
      :display-state-message="displayStateMessage"
      :disabled="disabled"
      :model-value="inputValue"
      :mask="inputMask"
      @update:model-value="onInputModelUpdate"
      @input="onInputEvent"
      @change="onChangeEvent"
      @focus="event => emits('focus', event)"
      @blur="event => emits('blur', event)"
      @keydown="event => emits('keydown', event)"
      @init="element => emits('init', element)"
      @clear="emits('clear')"
      @update:valid="value => emits('update:valid', value)"
    >
      <template #append-icon>
        <div>
          <ui3n-icon
            ref="icon"
            icon="outline-calendar-month"
            color="var(--color-icon-control-accent-default)"
            :class="$style.icon"
            @init="el => menuTriggerElement = el"
            @click.stop="toggleMenu"
          />

          <div
            v-if="isShow"
            ref="picker"
            v-click-outside="onClickOutside"
            :style="floatingStyles"
            :class="$style.picker"
          >
            <ui3n-date-picker
              :model-value="modelValue"
              :size="size"
              :locale-config="localeConfig"
              :first-day-of-week="firstDayOfWeek"
              :show-timepicker="showTimepicker"
              :timepicker-config="timepickerConfig"
              :highlight-weekends="highlightWeekends"
              :disabled-days="disabledDays"
              :disabled="disabled"
              :without-year="isWithoutYear"
              :allow-without-year="allowWithoutYear"
              @update:model-value="onDateUpdate"
              @update:without-year="value => emits('update:withoutYear', value)"
            />
          </div>
        </div>
      </template>
    </ui3n-input>
  </div>
</template>

<style lang="scss" module>
  .ui3nInputDate {
    position: relative;
    width: 100%;
  }

  .icon {
    cursor: pointer;
  }

  .picker {
    --_input-date-width: var(--ui3n-input-date-width, max-content);
    --_input-date-z-index: var(--ui3n-input-date-z-index, 1000);

    position: absolute;
    width: var(--_input-date-width);
    z-index: var(--_input-date-z-index);
    overflow: visible;
  }
</style>
