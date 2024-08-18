<script lang="ts" setup>
import { computed } from 'vue';
import { toNumber } from 'lodash';
import type { Ui3nProgressLinearProps } from './types';

const thresholdHeight = 12;
const thresholdValue = 5;

const props = withDefaults(
  defineProps<Ui3nProgressLinearProps>(),
  {
    value: 0,
    height: 2,
    bgColor: 'var(--color-bg-control-primary-default)',
    color: 'var(--color-bg-control-accent-default)',
  },
);

const isValueShown = computed(() => props.withText && !props.indeterminate);
const innerHeight = computed(() => toNumber(props.height));
const cssHeight = computed(() => `${innerHeight.value}px`);
const innerValue = computed(() => toNumber(props.value));
const displayValue = computed(() => props.indeterminate
  ? `20%`
  : `${Math.min(innerValue.value, 100)}%`,
);
</script>

<template>
  <div :class="[$style.progress, indeterminate && $style.indeterminate]">
    <div
      v-if="isValueShown && innerHeight < thresholdHeight"
      :class="[$style.text, $style.above]"
    >
      {{ displayValue }}
    </div>

    <div :class="$style.body">
      <div :class="$style.value" :style="{ width: displayValue }">
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
.progress {
  --ui3n-progress-linear-height: v-bind(cssHeight);
  --ui3n-progress-linear-bg: v-bind(bgColor);
  --ui3n-progress-linear-color: v-bind(color);

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
}

.text {
  font-size: calc(var(--ui3n-progress-linear-height) - 2px);
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
    animation: 1s linear 0s infinite normal move;
  }
}

@keyframes move {
  from {
    left: -22%
  }
  to {
    left: 122%
  }
}
</style>
