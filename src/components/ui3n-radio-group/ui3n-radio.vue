<script lang="ts" setup>
  import { computed, getCurrentInstance, inject, onBeforeMount, ref, useSlots, watch } from 'vue';
  import type { ComputedRef } from 'vue';
  import type { Ui3nRadioEmits, Ui3nRadioProps, Ui3nRadioSlots, Ui3nRadioValue, Ui3nRadioExpose } from './types';

  const props = withDefaults(defineProps<Ui3nRadioProps>(), {
    name: undefined,
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: '16',
    color: 'var(--color-icon-control-accent-default)',
    disabled: false,
  });
  const emits = defineEmits<Ui3nRadioEmits>();
  defineSlots<Ui3nRadioSlots>();

  const slots = useSlots();

  const groupContext = inject<{
    groupValue: ComputedRef<Ui3nRadioValue>;
    groupName: ComputedRef<string>;
    updateGroupValue: (value: Ui3nRadioValue) => void;
  } | null>('ui3n-radio-group-context', null);

  const isComponentPartOfGroup = computed(() => groupContext !== null);
  const finalGroupName = computed(() => (groupContext ? groupContext.groupName.value : props.name || ''));

  const val = ref<Ui3nRadioValue>(
    isComponentPartOfGroup.value && groupContext ? groupContext.groupValue.value : props.modelValue,
  );

  const isOn = computed(() => {
    if (isComponentPartOfGroup.value && groupContext) {
      return groupContext.groupValue.value === props.checkedValue;
    }
    return val.value === props.checkedValue;
  });

  const radioStyle = computed(() => ({
    '--ui3n-radio-size': `${props.size}px`,
    '--ui3n-radio-color': props.color,
  }));

  function change(ev: Event) {
    ev.preventDefault();
    if (props.disabled) {
      return;
    }

    if (!isComponentPartOfGroup.value) {
      val.value = isOn.value ? props.uncheckedValue : props.checkedValue;
      emits('change', val.value);
      emits('update:modelValue', val.value);
      return;
    }

    if (isOn.value) {
      return;
    }

    if (groupContext) {
      groupContext.updateGroupValue(props.checkedValue);
    }
  }

  function clear() {
    val.value = props.uncheckedValue;
    if (!isComponentPartOfGroup.value) {
      emits('change', val.value);
      emits('update:modelValue', val.value);
    }
  }

  defineExpose<Ui3nRadioExpose>({
    clear,
  });

  onBeforeMount(() => {
    const hasChecked = !!slots['checkedIcon'];
    const hasUnchecked = !!slots['uncheckedIcon'];

    if ((hasChecked && !hasUnchecked) || (!hasChecked && hasUnchecked)) {
      throw Error('[Ui3nRadio] Both checkedIcon and uncheckedIcon slots must have values defined.');
    }
  });

  watch(
    () => props.name,
    newName => {
      if (!newName && !isComponentPartOfGroup.value) {
        clear();
      }
    },
  );

  watch(
    () => props.modelValue,
    newValue => {
      if (newValue !== val.value) {
        val.value = newValue;
      }
    },
  );
</script>

<template>
  <!-- eslint-disable max-len -->
  <div
    :style="radioStyle"
    :class="[$style.ui3nRadio, disabled && $style.disabled, !slots.default && $style.noLabel]"
  >
    <input
      type="radio"
      hidden
      :name="finalGroupName"
      :checked="isOn"
      :value="String(checkedValue)"
      :disabled="disabled"
    />

    <div
      :class="[$style.body, disabled && $style.bodyDisabled]"
      :tabindex="disabled ? -1 : 0"
      @keydown.enter="change"
      @keydown.space="change"
      @click="change"
    >
      <slot
        v-if="isOn"
        name="checkedIcon"
      >
        <svg
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="[$style.icon, disabled && $style.iconDisabled]"
        >
          <path
            fill="currentColor"
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
          />
        </svg>
      </slot>

      <slot
        v-else
        name="uncheckedIcon"
      >
        <svg
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="[$style.icon, disabled && $style.iconDisabled]"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
          />
        </svg>
      </slot>
    </div>

    <div :class="$style.label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nRadio {
    --ui3n-radio-min-height: 24px;

    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: var(--ui3n-radio-min-height);
    gap: 8px;

    &.disabled {
      --ui3n-radio-color: var(--color-icon-control-primary-disabled) !important;

      pointer-events: none;
      cursor: default;

      .label {
        opacity: 0.7;
      }
    }
  }

  .noLabel {
    gap: 0;
  }

  .body {
    position: relative;
    display: flex;
    width: var(--ui3n-radio-size, 16px);
    min-width: var(--ui3n-radio-size, 16px);
    height: var(--ui3n-radio-size, 16px);
    min-height: var(--ui3n-radio-size, 16px);
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
      background-color: oklch(from transparent calc(l - 0.1) c h);
      @include mixins.ripple(oklch(from transparent calc(l - 0.1) c h));
    }
  }

  .label {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    user-select: none;
  }

  .icon {
    color: var(--ui3n-radio-color);
    min-height: calc(var(--ui3n-radio-size, 16px) - 2px);
    height: calc(var(--ui3n-radio-size, 16px) - 2px);
    min-width: calc(var(--ui3n-radio-size, 16px) - 2px);
    width: calc(var(--ui3n-radio-size, 16px) - 2px);
    cursor: pointer;
  }

  .bodyDisabled,
  .iconDisabled {
    filter: grayscale(1);
    opacity: 0.5;
  }
</style>
