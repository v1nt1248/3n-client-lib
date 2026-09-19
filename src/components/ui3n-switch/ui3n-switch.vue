<script lang="ts" setup>
  import { computed, ref, watch, useSlots } from 'vue';
  import { toCssLength } from '../../utils/ui/to-css-length';
  import type { Ui3nSwitchEmits, Ui3nSwitchProps, Ui3nSwitchSlots, Ui3nSwitchExpose } from './types';

  const props = withDefaults(defineProps<Ui3nSwitchProps>(), {
    name: undefined,
    size: 16,
    color: 'var(--color-icon-control-accent-default)',
    disabled: false,
  });

  const emits = defineEmits<Ui3nSwitchEmits>();
  defineSlots<Ui3nSwitchSlots>();

  const slots = useSlots();
  const val = ref<boolean>(false);

  const switchStyle = computed(() => ({
    '--ui3n-switch-color': props.color,
    '--ui3n-switch-size': toCssLength(props.size),
  }));

  function change(ev: Event) {
    ev.preventDefault();
    if (props.disabled) {
      return;
    }

    val.value = !val.value;
    emits('change', val.value);
    emits('update:modelValue', val.value);
  }

  function clear() {
    val.value = false;
    emits('change', false);
    emits('update:modelValue', false);
  }

  defineExpose<Ui3nSwitchExpose>({
    clear,
  });

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clear();
      }
    },
  );

  watch(
    () => props.modelValue,
    newValue => (val.value = newValue),
    { immediate: true },
  );
</script>

<template>
  <div
    :id="id"
    :style="switchStyle"
    :tabindex="disabled ? -1 : 0"
    :class="[
      $style.ui3nSwitch,
      val && $style.checked,
      !slots.default && $style.noLabel,
      disabled && $style.disabled,
    ]"
    @keydown.enter="change"
    @keydown.space="change"
    @click="change"
  >
    <input
      v-if="name"
      type="checkbox"
      hidden
      :name="name"
      :checked="val"
      :disabled="disabled"
      :value="val ? 'on' : ''"
    />

    <div :class="$style.body">
      <div :class="[$style.dot, val ? $style.right : $style.left]" />
    </div>

    <div :class="$style.label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nSwitch {
    --_switch-size: var(--ui3n-switch-size, 16px);
    --_switch-color: var(--ui3n-switch-color, var(--color-icon-control-accent-default));
    --_switch-off-color: var(--ui3n-switch-off-color, var(--color-bg-table-cell-pressed));
    --_switch-font-size: var(--ui3n-switch-font-size, 12px);
    --_switch-font-color: var(--ui3n-switch-font-color, var(--color-text-control-primary-default));
    --_switch-font-weight: var(--ui3n-switch-font-weight, 500);

    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-border-control-accent-focused);
      outline-offset: 4px;
      border-radius: 4px;
    }
  }

  .body {
    position: relative;
    background-color: var(--_switch-off-color);
    height: var(--_switch-size);
    width: calc(var(--_switch-size) * 2);
    border-radius: var(--_switch-size);
    transition: background-color 0.2s ease;
  }

  .checked {
    .body {
      background-color: var(--_switch-color);
    }

    .dot {
      border-color: var(--_switch-color);
    }
  }

  .noLabel {
    gap: 0;
  }

  .dot {
    --_switch-dot-size: var(--ui3n-switch-dot-size, calc(var(--_switch-size) / 4 * 3));
    --_switch-dot-margin: var(--ui3n-switch-dot-margin, calc(var(--_switch-size) / 8));

    position: absolute;
    width: var(--_switch-dot-size);
    height: var(--_switch-dot-size);
    border-radius: 50%;
    background-color: var(--color-bg-control-primary-default);
    top: var(--_switch-dot-margin);
    transition: left 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .left {
    left: var(--_switch-dot-margin);
  }

  .right {
    left: calc(100% - var(--_switch-dot-size) - var(--_switch-dot-margin));
  }

  .label {
    font-size: var(--_switch-font-size);
    font-weight: var(--_switch-font-weight);
    color: var(--_switch-font-color);
    user-select: none;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
