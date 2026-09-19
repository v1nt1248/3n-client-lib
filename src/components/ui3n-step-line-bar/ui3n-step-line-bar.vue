<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nStepLineBarProps } from './types';

  const props = withDefaults(defineProps<Ui3nStepLineBarProps>(), {
    steps: 1,
    current: 1,
  });

  const validatedSteps = computed(() => Math.max(0, Math.floor(props.steps)));
</script>

<template>
  <div
    :id="id"
    data-ui3n="step-line-bar"
    :class="$style.ui3nStepLineBar"
  >
    <div :class="$style.label">
      {{ label }}
    </div>

    <div :class="$style.body">
      <div
        v-for="step in validatedSteps"
        :key="step"
        :class="[$style.step, step <= current && $style.active]"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nStepLineBar {
    /* the step height doubles as its border radius */
    --_step-line-bar-step-height: var(--ui3n-step-line-bar-step-height, 4px);

    position: relative;
    width: 100%;
  }

  .label {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: var(--ui3n-step-line-bar-label-font-size, 14px);
    font-weight: 500;
    line-height: var(--ui3n-step-line-bar-label-line-height, 20px);
    color: var(--color-text-block-accent-default);
    margin-bottom: var(--ui3n-step-line-bar-label-offset, 16px);
  }

  .body {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: var(--ui3n-step-line-bar-gap, 8px);
  }

  .step {
    position: relative;
    flex: 1;
    height: var(--_step-line-bar-step-height);
    border-radius: var(--_step-line-bar-step-height);
    background-color: var(--color-bg-control-secondary-default);
  }

  .active {
    background-color: var(--color-bg-control-accent-default);
  }
</style>
