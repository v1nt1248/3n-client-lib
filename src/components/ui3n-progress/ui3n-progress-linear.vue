<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nProgressLinearProps } from './types';

  const thresholdHeight = 12;
  const thresholdValue = 5;

  const props = withDefaults(defineProps<Ui3nProgressLinearProps>(), {
    value: 0,
    height: 2,
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

  /* the geometry is computed here; the colours default in CSS */
  const progressStyle = computed(() => {
    const styles: Record<string, string> = {
      '--ui3n-progress-linear-height': `${innerHeight.value}px`,
      '--ui3n-progress-linear-font-size': `${Math.max(innerHeight.value - 2, 10)}px`,
    };

    if (props.bgColor) {
      styles['--ui3n-progress-linear-bg'] = props.bgColor;
    }

    if (props.color) {
      styles['--ui3n-progress-linear-color'] = props.color;
    }

    return styles;
  });
</script>

<template>
  <div
    data-ui3n="progress-linear"
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
    --_progress-linear-bg: var(--ui3n-progress-linear-bg, var(--color-bg-control-primary-default));
    --_progress-linear-color: var(--ui3n-progress-linear-color, var(--color-bg-control-accent-default));

    position: relative;
    width: 100%;
    user-select: none;
  }

  .body {
    position: relative;
    width: 100%;
    height: var(--ui3n-progress-linear-height, 2px);
    border-radius: calc(var(--ui3n-progress-linear-height, 2px) - 2px);
    background-color: var(--_progress-linear-bg);
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
    border-radius: calc(var(--ui3n-progress-linear-height, 2px) - 2px);
    background-color: var(--_progress-linear-color);
    transition: width 0.2s ease-in-out;
  }

  .text {
    font-size: var(--ui3n-progress-linear-font-size, 10px);
    font-weight: 600;
    line-height: var(--ui3n-progress-linear-height, 2px);
    color: var(--_progress-linear-bg);
    white-space: nowrap;
  }

  .above {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: var(--ui3n-progress-linear-label-font-size, 14px);
    line-height: var(--ui3n-progress-linear-label-line-height, 16px);
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
