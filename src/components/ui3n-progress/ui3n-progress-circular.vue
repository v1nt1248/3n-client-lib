<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nProgressCircularProps } from './types';

  const props = withDefaults(defineProps<Ui3nProgressCircularProps>(), {
    value: 0,
    size: 64,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
    indeterminate: false,
    withText: false,
  });

  const parseToNumber = (val: number | string): number => {
    const num = parseFloat(String(val));
    return isNaN(num) ? 0 : num;
  };

  const innerSize = computed(() => parseToNumber(props.size) || 64);
  const innerValue = computed(() => Math.min(Math.max(parseToNumber(props.value), 0), 100));
  const isValueShown = computed(() => props.withText && !props.indeterminate);

  const virtualStrokeWidth = computed(() => {
    if (props.width) {
      return (parseToNumber(props.width) / innerSize.value) * 100;
    }
    return 8;
  });

  const virtualRadius = computed(() => (100 - virtualStrokeWidth.value) / 2);
  const virtualCircumference = computed(() => Math.round(Math.PI * 2 * virtualRadius.value));

  const strokeDasharray = computed(() => {
    const dash = Math.round((virtualCircumference.value * innerValue.value) / 100);
    const gap = virtualCircumference.value - dash;
    return `${dash} ${gap}`;
  });

  const fontSize = computed(() => `${Math.floor(innerSize.value / 3.8)}px`);

  const progressStyle = computed(() => ({
    '--ui3n-progress-circular-size': `${innerSize.value}px`,
    '--ui3n-progress-circular-font-size': fontSize.value,
    '--ui3n-progress-circular-bg': props.bgColor,
    '--ui3n-progress-circular-color': props.color,
    '--ui3n-progress-virtual-width': String(virtualStrokeWidth.value),
  }));
</script>

<template>
  <div
    :style="progressStyle"
    :class="[$style.ui3nProgressCircular, indeterminate && $style.indeterminate]"
  >
    <svg
      :height="innerSize"
      :width="innerSize"
      viewBox="0 0 100 100"
      :class="$style.pie"
    >
      <circle
        :class="$style.background"
        :r="virtualRadius"
        cx="50"
        cy="50"
      />

      <circle
        :class="$style.chart"
        :r="virtualRadius"
        cx="50"
        cy="50"
        :stroke-dasharray="indeterminate ? undefined : strokeDasharray"
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
    display: inline-flex;
    min-width: var(--ui3n-progress-circular-size);
    width: var(--ui3n-progress-circular-size);
    min-height: var(--ui3n-progress-circular-size);
    height: var(--ui3n-progress-circular-size);
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  .pie {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .background {
    fill: none;
    stroke: var(--ui3n-progress-circular-bg);
    stroke-width: var(--ui3n-progress-virtual-width);
    transition: stroke 0.2s ease;
  }

  .chart {
    fill: none;
    stroke: var(--ui3n-progress-circular-color);
    stroke-width: var(--ui3n-progress-virtual-width);
    transition:
      stroke-dasharray 0.2s ease-in-out,
      stroke 0.2s ease;
  }

  .text {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--ui3n-progress-circular-font-size);
    font-weight: 600;
    line-height: 1;
    color: var(--ui3n-progress-circular-color);
  }

  .indeterminate {
    animation: circular-spin 2s linear infinite;

    .chart {
      stroke-linecap: round;
      animation: circular-dash 1.5s cubic-bezier(0.42, 0, 0.58, 1) infinite;
    }
  }

  :global {
    @keyframes circular-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    :global {
      @keyframes circular-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes circular-dash {
        0% {
          stroke-dasharray: 1 289;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 216 289;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 1 289;
          stroke-dashoffset: -289;
        }
      }
    }
  }
</style>
