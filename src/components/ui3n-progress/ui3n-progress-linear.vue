<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nProgressLinearProps } from './types';

  const thresholdHeight = 12;
  const thresholdValue = 5;

  const props = withDefaults(defineProps<Ui3nProgressLinearProps>(), {
    value: 0,
    height: 2,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
    indeterminate: false,
    withText: false,
  });

  const parseToNumber = (val: number | string): number => {
    const num = parseFloat(String(val));
    return isNaN(num) ? 0 : num;
  };

  const innerHeight = computed(() => parseToNumber(props.height));
  const innerValue = computed(() => {
    const val = parseToNumber(props.value);
    return Math.min(Math.max(val, 0), 100);
  });

  const isValueShown = computed(() => props.withText && !props.indeterminate);
  const displayValue = computed(() => `${innerValue.value}%`);

  const progressStyle = computed(() => ({
    '--ui3n-progress-linear-height': `${innerHeight.value}px`,
    '--ui3n-progress-linear-bg': props.bgColor,
    '--ui3n-progress-linear-color': props.color,
    '--ui3n-progress-linear-font-size': `${Math.max(innerHeight.value - 2, 10)}px`,
  }));
</script>

<template>
  <div
    :style="progressStyle"
    :class="[$style.ui3nProgressLinear, indeterminate && $style.indeterminate]"
  >
    <div
      v-if="isValueShown && innerHeight < thresholdHeight"
      :class="[$style.text, $style.above]"
    >
      {{ displayValue }}
    </div>

    <div :class="$style.body">
      <div
        :class="$style.value"
        :style="indeterminate ? undefined : { width: displayValue }"
      >
        <div
          v-if="isValueShown && innerHeight >= thresholdHeight && innerValue >= thresholdValue"
          :class="$style.text"
        >
          {{ displayValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nProgressLinear {
    position: relative;
    width: 100%;
    user-select: none;
  }

  .body {
    position: relative;
    width: 100%;
    height: var(--ui3n-progress-linear-height);
    border-radius: calc(var(--ui3n-progress-linear-height) - 2px);
    background-color: var(--ui3n-progress-linear-bg);
    overflow: hidden;
  }

  .value {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: calc(var(--ui3n-progress-linear-height) - 2px);
    background-color: var(--ui3n-progress-linear-color);
    transition: width 0.2s ease-in-out;
  }

  .text {
    font-size: var(--ui3n-progress-linear-font-size);
    font-weight: 600;
    line-height: var(--ui3n-progress-linear-height);
    color: var(--ui3n-progress-linear-bg);
    white-space: nowrap;
  }

  .above {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: var(--font-14);
    line-height: var(--font-16);
    color: var(--color-bg-control-accent-default);
    margin-bottom: 4px;
  }

  .indeterminate {
    .value {
      transition: none;
      width: 25%;
      left: 0;
      top: 0;
      height: 100%;
      animation: linear-fly 1.4s linear infinite;
    }
  }

  @keyframes linear-fly {
    0% {
      transform: translateX(-105%);
    }
    100% {
      transform: translateX(405%);
    }
  }
</style>
