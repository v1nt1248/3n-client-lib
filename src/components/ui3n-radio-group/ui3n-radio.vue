<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import type {
  Ui3nRadioEmits,
  Ui3nRadioProps,
  Ui3nRadioSlots,
  Ui3nRadioValue,
} from './types';

const props = withDefaults(
  defineProps<Ui3nRadioProps>(),
  {
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: '16',
    color: 'var(--color-icon-control-accent-default)',
    disabled: false,
  },
);
const emits = defineEmits<Ui3nRadioEmits>();
defineSlots<Ui3nRadioSlots>();

const slots = useSlots();
const radioEl = ref<HTMLDivElement | null>(null);
const val = ref<Ui3nRadioValue>(props.uncheckedValue || false);
const instance = getCurrentInstance();

const radioValue = computed(() => {
  return val.value === props.checkedValue
    ? 'checked'
    : 'unchecked';
});

onBeforeMount(() => {
  if (
    (slots.checkedIcon && !slots.uncheckedIcon) ||
    (!slots.checkedIcon && slots.uncheckedIcon)
  ) {
    throw Error('[Ui3nRadio] Both checkedIcon and uncheckedIcon slots must have values ​​defined.');
  }

  if (instance?.parent?.type.__name !== 'ui3n-radio-group') {
    const checkedValueType = typeof props.checkedValue;
    const uncheckedValueType = typeof props.uncheckedValue;
    const valueType = typeof props.modelValue;
    if (
      checkedValueType !== uncheckedValueType
      || checkedValueType !== valueType
      || uncheckedValueType !== valueType
    ) {
      throw Error('[Ui3nRadio] types of "value", "checkedValue" and "uncheckedValue" are different');
    }
  } else {
    const groupModelValue = instance?.parent.props.modelValue;
    if (groupModelValue === props.checkedValue) {
      val.value = groupModelValue as Ui3nRadioValue;
    }
  }
});

onMounted(() => {
  if (radioEl.value) {
    radioEl.value.style.setProperty('--ui3n-radio-size', `${props.size}px`);
    radioEl.value.style.setProperty('--ui3n-radio-color', props.color);
  }
});

watch(
  () => props.modelValue,
  newValue => val.value = newValue,
  { immediate: true },
);

watch(
  () => props.size,
  newValue => {
    if (radioEl.value) {
      radioEl.value.style.setProperty('--ui3n-radio-size', `${newValue}px`);
    }
  },
);

watch(
  () => props.color,
  newValue => {
    if (radioEl.value) {
      radioEl.value.style.setProperty('--ui3n-radio-color', newValue);
    }
  },
);


function change() {
  val.value = radioValue.value !== 'unchecked'
    ? props.uncheckedValue
    : props.checkedValue;

  emits('change', val.value);
  emits('update:modelValue', val.value);
};

defineExpose({ change, radioEl });
</script>

<template>
  <div
    ref="radioEl"
    :class="[
      $style.radio,
      disabled && $style.disabled,
      !slots.default && $style.noLabel,
    ]"
  >
    <div
      :class="$style.body"
      @click="change"
    >
      <slot
        v-if="radioValue === 'checked'
        "name="checkedIcon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="$style.icon"
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
          xmlns="http://www.w3.org/2000/svg"
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="$style.icon"
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
@import "../../assets/styles/mixins";

.radio {
  --ui3n-radio-size: 16px;
  --ui3n-radio-color: var(--color-icon-control-accent-default);
  --ui3n-radio-text-size: 12px;
  --ui3n-radio-text-color: var(--color-text-control-primary-default);
  --ui3n-radio-text-weight: 500;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: var(--spacing-vl);
  gap: var(--spacing-s);

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
  width: var(--ui3n-radio-size);
  min-width: var(--ui3n-radio-size);
  height: var(--ui3n-radio-size);
  min-height: var(--ui3n-radio-size);
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background-color: hsl(from transparent h s calc(l - 10));
    @include ripple(hsl(from transparent h s calc(l - 10)));
  }
}

.label {
  font-size: var(--ui3n-radio-text-size);
  font-weight: var(--ui3n-radio-text-weight);
  color: var(--ui3n-radio-text-color);
  user-select: none;
}

.icon {
  color: var(--ui3n-radio-color);
  min-height: calc(var(--ui3n-radion-size) - 2px);
  min-width: calc(var(--ui3n-checkbox-size) - 2px);
  cursor: pointer;
}
</style>
