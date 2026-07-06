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
    flex: 1;
    height: var(--spacing-xs);
    border-radius: var(--spacing-xs);
    background-color: var(--color-bg-control-secondary-default);
  }

  .active {
    background-color: var(--color-bg-control-accent-default);
  }
</style>
