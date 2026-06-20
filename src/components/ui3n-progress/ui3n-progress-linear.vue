<script lang="ts" setup>
  import { computed } from 'vue';
  import toNumber from 'lodash/toNumber';
  import type { Ui3nProgressLinearProps } from './types';

  const thresholdHeight = 12;
  const thresholdValue = 5;

  const props = withDefaults(defineProps<Ui3nProgressLinearProps>(), {
    value: 0,
    height: 2,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
  });

  const isValueShown = computed(() => props.withText && !props.indeterminate);
  const innerHeight = computed(() => toNumber(props.height));
  const innerValue = computed(() => toNumber(props.value));
  const displayValue = computed(() => (props.indeterminate ? `20%` : `${Math.min(innerValue.value, 100)}%`));

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
        :style="{ width: displayValue }"
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
  }

  .body {
    position: relative;
    width: 100%;
    height: var(--ui3n-progress-linear-height);
    border-radius: calc(var(--ui3n-progress-linear-height) - 2px);
    background-color: var(--ui3n-progress-linear-bg);
    overflow-x: hidden;
  }

  .value {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    height: var(--ui3n-progress-linear-height);
    border-radius: calc(var(--ui3n-progress-linear-height) - 2px);
    background-color: var(--ui3n-progress-linear-color);
    transition: width 0.2s ease-in-out;
  }

  .text {
    font-size: var(--ui3n-progress-linear-font-size);
    font-weight: 500;
    line-height: var(--ui3n-progress-linear-height);
    color: var(--ui3n-progress-linear-bg);
  }

  .above {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: var(--font-14);
    line-height: var(--font-16);
    color: var(--color-bg-control-accent-default);
  }

  .indeterminate {
    .value {
      transition: none;
      animation: 1s linear 0s infinite normal move;
    }
  }

  @keyframes move {
    from {
      left: -22%;
    }

    to {
      left: 122%;
    }
  }
</style>
