<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, ref, useCssModule, watch } from 'vue';
import { toNumber } from 'lodash';

export interface Ui3nProgressCircularProps {
  value?: number | string;
  size?: number | string;
  width?: number | string;
  withText?: boolean;
  bgColor?: string;
  color?: string;
  indeterminate?: boolean;
}

const thresholdSize = 64;
const indeterminateModeValues = [1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 99];

const props = withDefaults(
  defineProps<Ui3nProgressCircularProps>(),
  {
    value: 0,
    size: 64,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
  },
);

const $style = useCssModule();

const element = ref<HTMLDivElement>();
const isValueShown = computed(() => props.withText && !props.indeterminate);

const innerSize = computed(() => toNumber(props.size));
const cssSize = computed(() => `${innerSize.value}px`);
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
const cssWidth = computed(() => `${innerWidth.value}px`);
const innerValue = computed(() => toNumber(props.value));
const fontSize = computed(() => `${Math.floor((innerSize.value - 2 * innerWidth.value) / 3.2)}px`);

const circleRadius = computed(() => Math.round(innerSize.value / 2) - Math.round(innerWidth.value / 2));
const circumference = computed(() => Math.round(Math.PI * 2 * circleRadius.value));

const timerId = ref();
const indeterminateModeValue = ref(0);

const strokeDasharray = computed(() => {
  const value = props.indeterminate ? indeterminateModeValue.value : innerValue.value;
  const dash = Math.round(circumference.value * value! / 100);
  const gap = circumference.value - dash;
  return `${dash} ${gap}`;
});

function changeValueForIndeterminateMode() {
  const indeterminateModeValuesLength = indeterminateModeValues.length;
  let index = 0;
  timerId.value = setInterval(() => {
    indeterminateModeValue.value = indeterminateModeValues[index % indeterminateModeValuesLength];
    index += 1;
    if ((index % indeterminateModeValuesLength) === 1) {
      if (element.value?.classList.contains($style.inverse)) {
        element.value?.classList.remove($style.inverse);
      } else {
        element.value?.classList.add($style.inverse);
      }
    }
  }, 200);
}

onBeforeMount(() => {
  if (props.indeterminate) {
    changeValueForIndeterminateMode();
  }
});

onBeforeUnmount(() => {
  clearInterval(timerId.value);
});
</script>

<template>
  <div ref="element" :class="[$style.progress, indeterminate && $style.indeterminate]">
    <svg :height="innerSize" :width="innerSize" :class="$style.pie" xmlns="http://www.w3.org/2000/svg">
      <circle :class="$style.background" :r="circleRadius" cx="50%" cy="50%" />
      <circle :class="$style.chart" :r="circleRadius" cx="50%" cy="50%" :stroke-dasharray="strokeDasharray" />
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
.progress {
  --ui3n-progress-circular-size: v-bind(cssSize);
  --ui3n-progress-circular-width: v-bind(cssWidth);
  --ui3n-progress-circular-font-size: v-bind(fontSize);
  --ui3n-progress-circular-bg: v-bind(bgColor);
  --ui3n-progress-circular-color: v-bind(color);

  position: relative;
  min-width: var(--ui3n-progress-circular-size);
  width: var(--ui3n-progress-circular-size);
  min-height: var(--ui3n-progress-circular-size);
  height: var(--ui3n-progress-circular-size);
  border-radius: 50%;

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
