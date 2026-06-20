<script lang="ts" setup>
  import { computed, onBeforeUnmount, ref, useCssModule, watch } from 'vue';
  import toNumber from 'lodash/toNumber';
  import type { Ui3nProgressCircularProps } from './types';

  const thresholdSize = 64;
  const indeterminateModeValues = [1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 99];

  const props = withDefaults(defineProps<Ui3nProgressCircularProps>(), {
    value: 0,
    size: 64,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
  });

  const $style = useCssModule();

  const element = ref<HTMLDivElement>();
  const isValueShown = computed(() => props.withText && !props.indeterminate);

  const innerSize = computed(() => toNumber(props.size));
  const innerWidth = computed(() => {
    if (props.width) {
      return toNumber(props.width);
    }

    const diff = innerSize.value - thresholdSize;
    if (diff <= 0) {
      return Math.round(innerSize.value / 10);
    }

    return 6 + Math.round(diff / 20);
  });

  const innerValue = computed(() => toNumber(props.value));
  const fontSize = computed(() => `${Math.floor((innerSize.value - 2 * innerWidth.value) / 3.2)}px`);

  const circleRadius = computed(() => Math.round(innerSize.value / 2) - Math.round(innerWidth.value / 2));
  const circumference = computed(() => Math.round(Math.PI * 2 * circleRadius.value));

  const timerId = ref<ReturnType<typeof setInterval> | null>(null);
  const indeterminateModeValue = ref(0);
  const isInverse = ref(false);

  const progressStyle = computed(() => ({
    '--ui3n-progress-circular-size': `${innerSize.value}px`,
    '--ui3n-progress-circular-width': `${innerWidth.value}px`,
    '--ui3n-progress-circular-font-size': fontSize.value,
    '--ui3n-progress-circular-bg': props.bgColor,
    '--ui3n-progress-circular-color': props.color,
  }));

  const strokeDasharray = computed(() => {
    const value = props.indeterminate ? indeterminateModeValue.value : innerValue.value;
    const dash = Math.round((circumference.value * value!) / 100);
    const gap = circumference.value - dash;
    return `${dash} ${gap}`;
  });

  function changeValueForIndeterminateMode() {
    if (timerId.value) {
      return;
    }

    const indeterminateModeValuesLength = indeterminateModeValues.length;
    let index = 0;

    timerId.value = setInterval(() => {
      indeterminateModeValue.value = indeterminateModeValues[index % indeterminateModeValuesLength];
      index += 1;
      if (index % indeterminateModeValuesLength === 1) {
        isInverse.value = !isInverse.value;
      }
    }, 200);
  }

  function clearIndeterminateTimer() {
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  }

  watch(
    () => props.indeterminate,
    isIndeterminate => {
      if (isIndeterminate) {
        changeValueForIndeterminateMode();
      } else {
        clearIndeterminateTimer();
        isInverse.value = false;
        indeterminateModeValue.value = 0;
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    clearIndeterminateTimer();
  });
</script>

<template>
  <div
    ref="element"
    :style="progressStyle"
    :class="[$style.ui3nProgressCircular, indeterminate && $style.indeterminate, isInverse && $style.inverse]"
  >
    <svg
      :height="innerSize"
      :width="innerSize"
      :class="$style.pie"
    >
      <circle
        :class="$style.background"
        :r="circleRadius"
        cx="50%"
        cy="50%"
      />

      <circle
        :class="$style.chart"
        :r="circleRadius"
        cx="50%"
        cy="50%"
        :stroke-dasharray="strokeDasharray"
      />
    </svg>

    <div
      v-if="isValueShown"
      :class="$style.text"
    >
      {{ innerValue }}%
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nProgressCircular {
    position: relative;
    min-width: var(--ui3n-progress-circular-size);
    width: var(--ui3n-progress-circular-size);
    min-height: var(--ui3n-progress-circular-size);
    height: var(--ui3n-progress-circular-size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.inverse {
      .background {
        stroke: var(--ui3n-progress-circular-color) !important;
      }

      .chart {
        stroke: var(--ui3n-progress-circular-bg) !important;
      }
    }

    &:not(.indeterminate) {
      .chart {
        transition: 0.2s ease-in-out all;
      }
    }
  }

  .pie {
    min-width: var(--ui3n-progress-circular-size);
    width: var(--ui3n-progress-circular-size);
    min-height: var(--ui3n-progress-circular-size);
    height: var(--ui3n-progress-circular-size);
    border-radius: 50%;
    transform: rotate(-90deg);
  }

  .background {
    fill: none;
    stroke: var(--ui3n-progress-circular-bg);
    stroke-width: var(--ui3n-progress-circular-width);
  }

  .chart {
    fill: none;
    stroke: var(--ui3n-progress-circular-color);
    stroke-width: var(--ui3n-progress-circular-width);
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--ui3n-progress-circular-font-size);
    font-weight: 500;
    color: var(--ui3n-progress-circular-color);
  }

  .indeterminate {
    .pie {
      animation: 0.75s linear 0s infinite normal spin;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(-90deg);
    }

    100% {
      transform: rotate(270deg);
    }
  }
</style>
