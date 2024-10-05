<script lang="ts" setup>
import type { Ui3nStepLineBarProps } from './types';

withDefaults(
  defineProps<Ui3nStepLineBarProps>(),
  {
    current: 1,
  },
);
</script>

<template>
  <div :class="$style.ui3nStepLineBar">
    <div :class="$style.label">
      {{ label }}
    </div>

    <div :class="$style.body">
      <div v-for="step in steps" :class="[$style.step, step <= current && $style.active]" />
    </div>
  </div>
</template>

<style lang="scss" module>
.ui3nStepLineBar {
  --ui3n-step-line-bar-steps: v-bind(steps);

  position: relative;
  width: 100%;
}

.label {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: var(--font-14);
  font-weight: 500;
  line-height: var(--font-20);
  color: var(--color-text-block-accent-default);
  margin-bottom: var(--spacing-m);
}

.body {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-s);
}

.step {
  position: relative;
  width: calc((100% - (calc(var(--ui3n-step-line-bar-steps) - 1) * var(--spacing-s))) / var(--ui3n-step-line-bar-steps));
  height: var(--spacing-xs);
  border-radius: var(--spacing-xs);
  background-color: var(--color-bg-control-secondary-default);
}

.active {
  background-color: var(--color-bg-control-accent-default);
}
</style>
