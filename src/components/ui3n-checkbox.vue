<script lang="ts" setup>
import { computed, onMounted, watch, onBeforeMount, ref, useSlots } from 'vue';

type Ui3nCheckboxValue = boolean | string | number;

export interface Ui3nCheckboxProps {
  modelValue: Ui3nCheckboxValue;
  checkedValue?: Ui3nCheckboxValue;
  uncheckedValue?: Ui3nCheckboxValue;
  size?: number | string;
  color?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

export interface Ui3nCheckboxEmits {
  (ev: 'change', value: Ui3nCheckboxValue): void;
  (ev: 'update:modelValue', value: Ui3nCheckboxValue): void;
}

export interface Ui3nCheckboxSlots {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: () => any;
}

const props = withDefaults(
  defineProps<Ui3nCheckboxProps>(),
  {
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: '16',
    color: 'var(--color-icon-control-accent-default)',
    indeterminate: false,
    disabled: false,
  },
);
const emits = defineEmits<Ui3nCheckboxEmits>();
defineSlots<Ui3nCheckboxSlots>();

const slots = useSlots();
const checkboxEl = ref<HTMLDivElement | null>(null);
const val = ref<Ui3nCheckboxValue>(props.uncheckedValue || false);
const uncertain = ref(false);

onBeforeMount(() => {
  const checkedValueType = typeof props.checkedValue;
  const uncheckedValueType = typeof props.uncheckedValue;
  const valueType = typeof props.modelValue;
  if (
    checkedValueType !== uncheckedValueType
    || checkedValueType !== valueType
    || uncheckedValueType !== valueType
  ) {
    throw Error('[Ui3nCheckbox] types of "value", "checkedValue" and "uncheckedValue" are different');
  }
});

onMounted(() => {
  if (checkboxEl.value) {
    checkboxEl.value.style.setProperty('--ui3n-checkbox-size', `${props.size}px`);
  }
});

watch(
  () => props.modelValue,
  newValue => val.value = newValue,
  { immediate: true },
);

watch(
  () => props.indeterminate,
  newValue => uncertain.value = newValue,
  { immediate: true },
);

watch(
  () => props.size,
  newValue => {
    if (checkboxEl.value) {
      checkboxEl.value.style.setProperty('--ui3n-checkbox-size', `${newValue}px`);
    }
  },
);

const checkBoxValue = computed(() => {
  if (uncertain.value) {
    return 'indeterminate';
  }

  return val.value === props.checkedValue
    ? 'checked'
    : 'unchecked';
});

const change = () => {
  val.value = checkBoxValue.value !== 'unchecked'
    ? props.uncheckedValue
    : props.checkedValue;

  if (uncertain.value) {
    uncertain.value = false;
  }

  emits('change', val.value);
  emits('update:modelValue', val.value);
};
</script>

<template>
  <div
    ref="checkboxEl"
    :class="[$style.checkbox, disabled && $style.disabled, !slots.default && $style.noLabel]"
  >
    <div
      :class="[$style.body, checkBoxValue === 'unchecked' ? $style.unfilled : $style.filled]"
      @click="change"
    >
      <svg
        v-if="checkBoxValue === 'checked'"
        :width="Number(size) - 4"
        :height="Number(size) - 4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="$style.icon"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path d="M20.0001 7L9.0001 18L4 13" stroke="#fff" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round"
          />
        </g>
      </svg>

      <svg
        v-if="checkBoxValue === 'indeterminate'"
        :width="Number(size) - 4"
        :height="Number(size) - 4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="$style.icon"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M7 12L17 12" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </svg>
    </div>

    <div
      :class="$style.label"
      @click="change"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../assets/styles/mixins";

.checkbox {
  --ui3n-checkbox-size: 16px;
  --ui3n-checkbox-color: var(--color-icon-control-accent-default);
  --ui3n-checkbox-text-size: 12px;
  --ui3n-checkbox-text-color: var(--color-text-control-primary-default);
  --ui3n-checkbox-text-weight: 500;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: var(--spacing-vl);
  gap: var(--spacing-s);
}

.noLabel {
  gap: 0;
}

.body {
  position: relative;
  display: flex;
  width: var(--ui3n-checkbox-size);
  height: var(--ui3n-checkbox-size);
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--ui3n-checkbox-size) / 10);
  border: calc(var(--ui3n-checkbox-size) / 10) solid var(--ui3n-checkbox-color);
  cursor: pointer;
}

.filled {
  background-color: var(--ui3n-checkbox-color);

  &:hover {
    border-color: hsl(from var(--ui3n-checkbox-color) h s calc(l - 10));
    background-color: hsl(from var(--ui3n-checkbox-color) h s calc(l - 10));
    @include ripple(hsl(from var(--ui3n-checkbox-color) h s calc(l - 10)));
  }
}

.unfilled {
  &:hover {
    border-color: hsl(from var(--ui3n-checkbox-color) h s calc(l - 10));
    background-color: hsl(from transparent h s calc(l - 10));
    @include ripple(hsl(from transparent h s calc(l - 10)));
  }
}

.icon {
  min-height: calc(var(--ui3n-checkbox-size) - 4px);
  min-width: calc(var(--ui3n-checkbox-size) - 4px);
}

.label {
  font-size: var(--ui3n-checkbox-text-size);
  font-weight: var(--ui3n-checkbox-text-weight);
  color: var(--ui3n-checkbox-text-color);
  user-select: none;
  cursor: pointer;
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}
</style>
