<script lang="ts" setup>
import type {
  Ui3nRadioGroupEmits,
  Ui3nRadioGroupProps,
  Ui3nRadioGroupSlots,
  Ui3nRadioValue,
} from './types';

const props = withDefaults(
  defineProps<Ui3nRadioGroupProps>(),
  {
    modelValue: false,
    direction: 'horizontal',
    disabled: false,
  },
);
</script>

<template>
  <div :class="$style.radioGroup">
    <slot />
  </div>
</template>

<style lang="scss" module>
.radioGroup {
  position: relative;
  display: flex;
  width: max-content;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-s);
}
</style>