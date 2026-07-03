<script lang="ts" setup>
  import { computed, onBeforeMount, ref, useCssModule, useSlots, watch } from 'vue';
  import Ui3nRipple from '../../directives/ui3n-ripple';
  import type {
    Ui3nCheckboxEmits,
    Ui3nCheckboxExpose,
    Ui3nCheckboxProps,
    Ui3nCheckboxSlots,
    Ui3nCheckboxValue,
  } from './types';

  const vUi3nRipple = Ui3nRipple;

  const props = withDefaults(defineProps<Ui3nCheckboxProps>(), {
    name: undefined,
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: 16,
    color: 'var(--color-icon-control-accent-default)',
    indeterminate: false,
    disabled: false,
  });
  const emits = defineEmits<Ui3nCheckboxEmits>();
  defineSlots<Ui3nCheckboxSlots>();

  const slots = useSlots();
  const $css = useCssModule();

  const checkboxEl = ref<HTMLDivElement | null>(null);

  const val = ref<Ui3nCheckboxValue>(props.modelValue);
  const uncertain = ref(props.indeterminate);

  const checkBoxValue = computed(() => {
    if (uncertain.value) {
      return 'indeterminate';
    }
    return val.value === props.checkedValue ? 'checked' : 'unchecked';
  });

  const nativeInputValue = computed(() => {
    if (typeof val.value === 'boolean') {
      return val.value ? 'on' : '';
    }
    return String(val.value);
  });

  const iconSizeInline = computed(() => {
    const numericSize = parseFloat(String(props.size));
    return isNaN(numericSize) ? 12 : numericSize - 4;
  });

  const inlineStyles = computed(() => ({
    '--ui3n-checkbox-size': typeof props.size === 'number' ? `${props.size}px` : props.size,
    '--ui3n-checkbox-color': props.color,
  }));

  const mainCssClasses = computed(() => {
    const classes = [$css.ui3nCheckbox];

    props.disabled && classes.push($css.disabled);
    !slots.default && classes.push($css.noLabel);

    return classes;
  });

  const bodyCssClasses = computed(() => {
    const classes = [$css.ui3nCheckboxBody];

    checkBoxValue.value === 'unchecked' ? classes.push($css.unfilled) : classes.push($css.filled);

    return classes;
  });

  function change(ev: Event) {
    ev.preventDefault();

    val.value = checkBoxValue.value !== 'unchecked' ? props.uncheckedValue : props.checkedValue;

    if (uncertain.value) {
      uncertain.value = false;
    }

    emits('change', val.value);
    emits('update:modelValue', val.value);
  }

  function clear() {
    val.value = props.uncheckedValue;
    uncertain.value = false;

    emits('change', val.value);
    emits('update:modelValue', val.value);
  }

  defineExpose<Ui3nCheckboxExpose>({
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
  );

  watch(
    () => props.indeterminate,
    newValue => (uncertain.value = newValue),
  );

  onBeforeMount(() => {
    const checkedValueType = typeof props.checkedValue;
    const uncheckedValueType = typeof props.uncheckedValue;
    const valueType = typeof props.modelValue;
    if (
      checkedValueType !== uncheckedValueType ||
      checkedValueType !== valueType ||
      uncheckedValueType !== valueType
    ) {
      throw Error('[Ui3nCheckbox] types of "value", "checkedValue" and "uncheckedValue" are different');
    }
  });
</script>

<template>
  <div
    ref="checkboxEl"
    :id="id"
    :class="mainCssClasses"
    :style="inlineStyles"
  >
    <input
      type="checkbox"
      style="display: none"
      :name="name"
      :id="id ? `${id}-native` : undefined"
      :disabled="disabled"
      :checked="checkBoxValue !== 'unchecked'"
      :value="nativeInputValue"
    />

    <div
      v-ui3n-ripple
      :class="bodyCssClasses"
      :tabindex="disabled ? -1 : 0"
      @keydown.space="change"
      @keydown.enter="change"
      @click="change"
    >
      <svg
        v-if="checkBoxValue === 'checked'"
        :width="iconSizeInline"
        :height="iconSizeInline"
        viewBox="0 0 24 24"
        fill="none"
        :class="$style.ui3nCheckboxIcon"
      >
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20.0001 7L9.0001 18L4 13"
            stroke="#fff"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>

      <svg
        v-if="checkBoxValue === 'indeterminate'"
        :width="iconSizeInline"
        :height="iconSizeInline"
        viewBox="0 0 24 24"
        fill="none"
        :class="$style.ui3nCheckboxIcon"
      >
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7 12L17 12"
            stroke="#fff"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>

    <div
      :class="$style.ui3nCheckboxLabel"
      @click="change"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nCheckbox {
    --ui3n-checkbox-size: 16px;
    --ui3n-checkbox-gap: 4px;
    --ui3n-checkbox-color: var(--color-icon-control-accent-default);
    --ui3n-checkbox-text-size: 12px;
    --ui3n-checkbox-text-color: var(--color-text-control-primary-default);
    --ui3n-checkbox-text-weight: 500;

    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--ui3n-checkbox-gap);
  }

  .noLabel {
    gap: 0;
  }

  .ui3nCheckboxBody {
    position: relative;
    display: flex;
    width: var(--ui3n-checkbox-size);
    min-width: var(--ui3n-checkbox-size);
    height: var(--ui3n-checkbox-size);
    min-height: var(--ui3n-checkbox-size);
    justify-content: center;
    align-items: center;
    border-radius: calc(var(--ui3n-checkbox-size) / 6);
    border: calc(var(--ui3n-checkbox-size) / 10) solid var(--ui3n-checkbox-color);
    cursor: pointer;
    overflow: hidden;
    transition:
      border-color 0.2s,
      background-color 0.2s;
  }

  .filled {
    background-color: var(--ui3n-checkbox-color);

    &:hover {
      border-color: oklch(from var(--ui3n-checkbox-color) calc(l - 0.1) c h);
      background-color: oklch(from var(--ui3n-checkbox-color) calc(l - 0.1) c h);
      @include mixins.ripple(oklch(from var(--ui3n-checkbox-color) calc(l - 0.1) c h));
    }
  }

  .unfilled {
    &:hover {
      border-color: oklch(from var(--ui3n-checkbox-color) calc(l - 0.1) c h);
      background-color: oklch(from transparent calc(l - 0.1) c h);
      @include mixins.ripple(oklch(from transparent calc(l - 0.1) c h));
    }
  }

  .ui3nCheckboxIcon {
    display: block;
  }

  .ui3nCheckboxLabel {
    font-size: var(--ui3n-checkbox-text-size);
    font-weight: var(--ui3n-checkbox-text-weight);
    color: var(--ui3n-checkbox-text-color);
    user-select: none;
    cursor: pointer;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
