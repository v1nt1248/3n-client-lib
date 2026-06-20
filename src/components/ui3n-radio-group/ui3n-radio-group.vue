<script setup lang="ts">
  import { computed, provide, ref, watch } from 'vue';
  import type {
    Ui3nRadioGroupProps,
    Ui3nRadioGroupEmits,
    Ui3nRadioGroupSlots,
    Ui3nRadioGroupExpose,
    Ui3nRadioValue,
  } from './types';

  const props = withDefaults(defineProps<Ui3nRadioGroupProps>(), {
    direction: 'vertical',
    disabled: false,
  });
  const emits = defineEmits<Ui3nRadioGroupEmits>();
  defineSlots<Ui3nRadioGroupSlots>();

  const groupValue = ref<Ui3nRadioValue>(props.modelValue);

  function updateGroupValue(value: Ui3nRadioValue): void {
    groupValue.value = value;
    emits('update:modelValue', value);
    emits('change', value);
  }

  provide(`radio-group-${props.name}`, {
    groupValue: computed(() => groupValue.value),
    updateGroupValue,
  });

  function clear() {
    updateGroupValue('' as unknown as Ui3nRadioValue);
  }

  defineExpose<Ui3nRadioGroupExpose>({
    clear,
  });

  watch(
    () => props.modelValue,
    (val: Ui3nRadioValue) => {
      if (val !== groupValue.value) {
        groupValue.value = val;
      }
    },
  );

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clear();
      }
    },
  );
</script>

<template>
  <div :class="[$style.ui3nRadioGroup, direction === 'horizontal' && $style.horizontal]">
    <slot />
  </div>
</template>

<style lang="scss" module>
  .ui3nRadioGroup {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;

    &.horizontal {
      flex-direction: row;
      column-gap: 8px;
    }
  }
</style>
