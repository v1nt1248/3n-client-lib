<script lang="ts" setup>
  import { computed, onMounted, watch, onBeforeMount, ref, useSlots } from 'vue'
  import Ui3nIcon from './ui3n-icon.vue'

  type Ui3nCheckboxValue = boolean | string | number;
  
  export interface Ui3nCheckboxProps {
    modelValue: Ui3nCheckboxValue;
    checkedValue?: Ui3nCheckboxValue;
    uncheckedValue?: Ui3nCheckboxValue;
    size?: number|string;
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

  const iconMap = {
    checked: 'check-box-checked',
    unchecked: 'check-box',
    indeterminate: 'check-box-inderterminate',
  }

  const props = withDefaults(
    defineProps<Ui3nCheckboxProps>(),
    {
      modelValue: false,
      checkedValue: true,
      uncheckedValue: false,
      size: '16',
      color: '#0090ec',
      indeterminate: false,
      disabled: false,
    },
  )
  const emits = defineEmits<Ui3nCheckboxEmits>()
  defineSlots<Ui3nCheckboxSlots>()

  const slots = useSlots()

  const checkboxEl = ref<HTMLDivElement|null>(null)
  const val = ref<Ui3nCheckboxValue>(props.uncheckedValue || false)
  const uncertain = ref(false)

  onBeforeMount(() => {
    const checkedValueType = typeof props.checkedValue
    const uncheckedValueType = typeof props.uncheckedValue
    const valueType = typeof props.modelValue
    if (
      checkedValueType !== uncheckedValueType
      || checkedValueType !== valueType
      || uncheckedValueType !== valueType
    ) {
      throw Error('[Ui3nCheckbox] types of "value", "checkedValue" and "unchecktdValue" are different')
    }
  })

  onMounted(() => {
    if (checkboxEl.value) {
      checkboxEl.value.style.setProperty('--ui3n-checkbox-size', `${props.size}px`)
    }
  })

  watch(
    () => props.modelValue,
    newValue => val.value = newValue,
    { immediate: true },
  )

  watch(
    () => props.indeterminate,
    newValue => uncertain.value = newValue,
    {  immediate: true},
  )

  watch(
    () => props.size,
    newValue => {
      if (checkboxEl.value) {
        checkboxEl.value.style.setProperty('--ui3n-checkbox-size', `${newValue}px`)
      }
    },
  )

  const checkBoxValue = computed(() => {
    if (uncertain.value) {
      return 'indeterminate'
    }

    return val.value === props.checkedValue
      ? 'checked'
      : 'unchecked'
  } )

  const change = () => {
    val.value = checkBoxValue.value !== 'unchecked'
      ? props.uncheckedValue
      : props.checkedValue

    if (uncertain.value) {
      uncertain.value = false
    }

    emits('change', val.value)
    emits('update:modelValue', val.value)
  }
</script>

<template>
  <div
    ref="checkboxEl"
    :class="[
      'ui3n-checkbox',
      {
        'ui3n-checkbox--disabled': props.disabled,
        'ui3n-checkbox--with-label': slots.default,
      },
    ]"
  >
    <div
      class="ui3n-checkbox__wrapper"
      @click="change"
    >
      <ui3n-icon
        class="ui3n-checkbox__icon"
        :icon="iconMap[checkBoxValue]"
        :width="props.size"
        :height="props.size"
        :color="props.color"
      />
    </div>

    <div
      class="ui3n-checkbox__label"
      @click="change"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-checkbox {
    --ui3n-checkbox-size: 16px;
    --ui3n-checkbox-text-size: 12px;
    --ui3n-checkbox-text-color: var(--black-90, #212121);
    --ui3n-checkbox-text-weight: 500;

    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__wrapper {
      position: relative;
      display: flex;
      width: calc(var(--ui3n-checkbox-size) * 1.5);
      height: calc(var(--ui3n-checkbox-size) * 1.5);
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;

      @include ripple(transparent);
    }

    &__label {
      font-size: var(--ui3n-checkbox-text-size);
      font-weight: var(--ui3n-checkbox-text-weight);
      color: var(--ui3n-checkbox-text-color);
      user-select: none;
      cursor: pointer;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
