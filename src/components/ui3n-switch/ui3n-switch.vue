<script lang="ts" setup>
import { onMounted, ref, watch, useSlots } from 'vue';
import type { Ui3nSwitchEmits, Ui3nSwitchProps, Ui3nSwitchSlots } from './types';

const props = withDefaults(
  defineProps<Ui3nSwitchProps>(),
  {
    size: 16,
    color: 'var(--color-icon-control-accent-default)',
    disabled: false,
  },
);

const emits = defineEmits<Ui3nSwitchEmits>();

defineSlots<Ui3nSwitchSlots>();

const slots = useSlots();
const switchEl = ref<HTMLDivElement | null>(null);
const val = ref<boolean>(false);

onMounted(() => {
  if (switchEl.value) {
    switchEl.value.style.setProperty('--ui3n-switch-color', `${props.color}`);
    props.size && switchEl.value.style.setProperty('--ui3n-switch-size', `${props.size}px`);
  }
});

watch(
  () => props.modelValue,
  newValue => val.value = newValue,
  { immediate: true },
);

function change() {
  val.value = !val.value;
  emits('change', val.value);
  emits('update:modelValue', val.value);
}
</script>

<template>
  <div
    ref="switchEl"
    :class="[$style.switch, val && $style.checked, !slots.default && $style.noLabel, disabled && $style.disabled]"
  >
    <Transition>
      <div :class="$style.body" @click="change">
        <div :class="[$style.dot, val ? $style.right : $style.left]" />
      </div>
    </Transition>

    <div :class="$style.label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.switch {
  --ui3n-switch-size: 16px;
  --ui3n-switch-color: var(--color-icon-control-accent-default);
  --ui3n-switch-off-color: var(--color-bg-table-cell-pressed);
  --ui3n-switch-font-size: 12px;
  --ui3n-switch-font-color: var(--color-text-control-primary-default);
  --ui3n-switch-font-weight: 500;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-s);
}

.body {
  position: relative;
  background-color: var(--ui3n-switch-off-color);
  height: var(--ui3n-switch-size);
  width: calc(var(--ui3n-switch-size) * 2);
  border-radius: var(--ui3n-switch-size);
  cursor: pointer;
}

.checked {
  .body {
    background-color: var(--ui3n-switch-color);
  }

  .dot {
    border-color: var(--ui3n-switch-color);
  }
}

.noLabel {
  gap: 0;
}

.dot {
  --ui3n-switch-dot-size: calc(var(--ui3n-switch-size) / 4 * 3);

  position: absolute;
  width: var(--ui3n-switch-dot-size);
  height: var(--ui3n-switch-dot-size);
  border-radius: 50%;
  background-color: var(--white-0);
  top: 0;
  margin: calc(var(--ui3n-switch-size) / 8);
  transition: all 250ms ease-in-out;
}

.left {
  left: 0;
}

.right {
  left: calc(100% - var(--ui3n-switch-size));
}

.label {
  font-size: var(--ui3n-switch-font-size);
  font-weight: var(--ui3n-switch-font-weight);
  color: var(--ui3n-switch-font-color);
  user-select: none;
  cursor: pointer;
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}
</style>
