<script lang="ts" setup>
import { onMounted, ref, SetupContext, useSlots } from 'vue';
// import { isEmpty } from 'lodash';
import type {
  // Ui3nRadioGroupEmits,
  Ui3nRadioGroupProps,
  // Ui3nRadioGroupSlots,
  // Ui3nRadioValue,
} from './types';

const props = withDefaults(
  defineProps<Ui3nRadioGroupProps>(),
  {
    modelValue: false,
    direction: 'horizontal',
    disabled: false,
  },
);

const slots: SetupContext['slots'] = useSlots();
const contentSlot = ref();
const children = ref([]);

function onClick(ev: MouseEvent) {
  console.log('EV: ', ev);
}

onMounted(() => {
  // @ts-ignore
  children.value = slots.default();
  console.log('CH: ', children.value);
});
</script>

<template>
  <div
    ref="contentSlot"
    :class="$style.radioGroup"
    v-on="disabled ? {} : { click: onClick }"
  >
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