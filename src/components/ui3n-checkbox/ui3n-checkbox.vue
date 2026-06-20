<script lang="ts" setup>
  import { computed, onMounted, watch, onBeforeMount, ref, useCssModule, useSlots } from 'vue';
  import Ui3nRipple from '../../directives/ui3n-ripple';
  import type {
    Ui3nCheckboxEmits,
    Ui3nCheckboxProps,
    Ui3nCheckboxSlots,
    Ui3nCheckboxValue,
    Ui3nCheckboxExpose,
  } from './types';

  const vUi3nRipple = Ui3nRipple;

  const props = withDefaults(defineProps<Ui3nCheckboxProps>(), {
    name: undefined,
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: '16',
    color: 'var(--color-icon-control-accent-default)',
    indeterminate: false,
    disabled: false,
  });
  const emits = defineEmits<Ui3nCheckboxEmits>();
  defineSlots<Ui3nCheckboxSlots>();

  const slots = useSlots();
  const $css = useCssModule();

  const checkboxEl = ref<HTMLDivElement | null>(null);
  const val = ref<Ui3nCheckboxValue>(props.uncheckedValue || false);
  const uncertain = ref(false);

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

  const mainCssClasses = computed(() => {
    const val = [$css.ui3nCheckbox];

    props.disabled && val.push($css.disabled);
    !slots.default && val.push($css.noLabel);

    return val;
  });

  const bodyCssClasses = computed(() => {
    const val = [$css.ui3nCheckboxBody];

    checkBoxValue.value === 'unchecked' ? val.push($css.unfilled) : val.push($css.filled);

    return val;
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
    { immediate: true },
  );

  watch(
    () => props.indeterminate,
    newValue => (uncertain.value = newValue),
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

  watch(
    () => props.color,
    newValue => {
      if (checkboxEl.value) {
        checkboxEl.value.style.setProperty('--ui3n-checkbox-color', newValue);
      }
    },
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

  onMounted(() => {
    if (checkboxEl.value) {
      checkboxEl.value.style.setProperty('--ui3n-checkbox-size', `${props.size}px`);
      checkboxEl.value.style.setProperty('--ui3n-checkbox-color', props.color);
    }
  });
</script>

<template>
  <div
    ref="checkboxEl"
    :id="id"
    :class="mainCssClasses"
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
        :width="Number(size) - 4"
        :height="Number(size) - 4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="$style.ui3nCheckboxIcon"
      >
        <g
          id="SVGRepo_bgCarrier"
          stroke-width="0"
        />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
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
        :width="Number(size) - 4"
        :height="Number(size) - 4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="$style.ui3nCheckboxIcon"
      >
        <g
          id="SVGRepo_bgCarrier"
          stroke-width="0"
        />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
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
    min-height: calc(var(--ui3n-checkbox-size) - 4px);
    min-width: calc(var(--ui3n-checkbox-size) - 4px);
  }

  .ui3nCheckboxLabel {
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
