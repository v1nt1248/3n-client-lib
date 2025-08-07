<script lang="ts" setup>
  import { computed, onMounted, ref, watch, useCssModule } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nInputEmits, Ui3nInputProps } from './types';

  const props = defineProps<Ui3nInputProps>();
  const emits = defineEmits<Ui3nInputEmits>();

  const $css = useCssModule();

  const inputElement = ref<HTMLInputElement | null>(null);
  const text = ref<string>('');
  const isDirty = ref(false);
  const isFocused = ref(false);
  const errorMessage = ref('');

  const cssIconColor = computed(() => {
    if (props.disabled) {
      return 'var(--color-icon-control-primary-disabled)';
    }

    return props.iconColor || 'var(--color-icon-control-primary-default)';
  });

  const isValid = computed(() => {
    if (!isDirty.value) {
      return true;
    }

    return !errorMessage.value;
  });

  const mainCssClasses = computed(() => {
    const val = [$css.ui3nInput];
    props.label && val.push($css.withLabel);
    props.icon && val.push($css.withIcon);
    props.clearable && text.value && val.push($css.clearable);
    props.disabled && val.push($css.disabled);
    ((!!errorMessage.value && !isValid.value) || props.displayStateMode === 'error') && val.push($css.error);
    props.displayStateMode === 'success' && val.push($css.success);

    return val;
  });

  const iconCssClasses = computed(() => {
    const val = [$css.ui3nInputIcon];
    props.disabled && val.push($css.ui3nInputIconDisabled);

    return val;
  });

  const messageCssClasses = computed(() => {
    const val = [$css.ui3nInputFieldMessage];
    (errorMessage.value || (props.displayStateMode === 'error' && !!props.displayStateMessage)) &&
    val.push($css.ui3nInputErrorMessage);
    props.displayStateMode === 'success' && props.displayStateMessage && val.push($css.ui3nInputSuccessMessage);

    return val;
  });

  function onFocus(event: Event) {
    isFocused.value = true;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    setTimeout(() => {
      isFocused.value = false;
      emits('blur', event);
    }, 100);
  }

  function onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    validate(value);
    emits('change', value);
  }

  function onInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    text.value = value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('input', value);
  }

  function onEnterKeydown(event: KeyboardEvent) {
    const { altKey, ctrlKey, metaKey, shiftKey, target } = event;
    const value = (target as HTMLInputElement).value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('enter', { value, altKey, ctrlKey, metaKey, shiftKey });
  }

  function onEscapeKeydown(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('escape', event);
  }

  function clearValue() {
    text.value = '';
    isDirty.value = false;
    validate('');
    emits('update:modelValue', '');
    emits('input', '');
    emits('change', '');
    emits('clear');
  }

  function validate(text: string) {
    errorMessage.value = '';
    if (props.rules && props.rules.length) {
      for (const validateFunction of props.rules) {
        if (typeof validateFunction === 'function') {
          const res = validateFunction(text);
          if (typeof res === 'string') {
            errorMessage.value += `${res} `;
          }
        }
      }
    }
  }

  defineExpose({
    isDirty,
    isFocused,
    clearValue,
  });

  onMounted(() => {
    if (props.autofocus && inputElement.value) {
      inputElement.value.focus();
    }

    emits('init', inputElement.value!);
  });

  watch(
    () => props.modelValue,
    val => {
      text.value = val;
      validate(text.value);
    },
    { immediate: true },
  );

  watch(
    () => isValid.value,
    val => {
      emits('update:valid', val);
    },
    { immediate: true },
  );
</script>

<template>
  <div
    ref="wrapperElement"
    :class="mainCssClasses"
  >
    <label
      v-if="label"
      :class="$style.ui3nInputLabel"
    >
      {{ label }}
    </label>

    <input
      ref="inputElement"
      autocomplete="off"
      :type="type || 'text'"
      :value="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="$style.ui3nInputField"
      @input="onInput"
      @keydown.enter="onEnterKeydown"
      @keydown.escape="onEscapeKeydown"
      @focusin="onFocus"
      @focusout="onBlur"
      @change="onChange"
    >

    <ui3n-icon
      v-if="icon"
      :icon="icon"
      :width="16"
      :height="16"
      :class="iconCssClasses"
    />

    <ui3n-icon
      v-if="displayStateMode === 'success' && displayStateWithIcon && !isFocused"
      icon="round-check-circle-outline"
      :width="16"
      :height="16"
      color="var(--success-content-default)"
      :class="$style.ui3nInputSuccessIcon"
    />

    <ui3n-button
      v-if="clearable && !!text && !(displayStateMode === 'success' && displayStateWithIcon && !isFocused)"
      type="icon"
      size="small"
      color="transparent"
      icon="round-close"
      icon-size="16"
      icon-color="var(--color-icon-control-accent-default)"
      :class="$style.clearBtn"
      @click="clearValue"
    />

    <div
      v-if="(isDirty && errorMessage) || (displayStateMode && displayStateMessage)"
      :class="messageCssClasses"
    >
      {{ errorMessage || displayStateMessage }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nInput {
    --ui3n-input-height: var(--spacing-l);
    --ui3n-input-padding-left: var(--spacing-s);
    --ui3n-input-padding-right: var(--spacing-s);

    position: relative;
    width: 100%;
    padding: 1px;
    border-radius: var(--spacing-xs);

    &:hover {
      .ui3nInputField:not(:focus-within) {
        background-color: var(--color-bg-control-secondary-hover);

        &::placeholder {
          color: var(--color-text-control-secondary-hover);
        }
      }
    }

    &:focus-within {
      .ui3nInputField {
        background-color: var(--color-bg-control-secondary-focused);
        outline: 1px solid var(--color-border-control-accent-focused);
      }

      .ui3nInputIcon {
        color: v-bind(cssIconColor) !important;
      }
    }
  }

  .ui3nInputLabel {
    display: block;
    width: 100%;
    font-size: var(--font-12);
    line-height: var(--font-16);
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    margin-bottom: var(--spacing-xs);
  }

  .ui3nInputField {
    display: block;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    border: none;
    outline: none;
    height: var(--ui3n-input-height);
    padding: 0 var(--ui3n-input-padding-right) 0 var(--ui3n-input-padding-left);
    border-radius: var(--spacing-xs);
    background-color: var(--color-bg-control-secondary-default);
    font-size: var(--font-13);
    line-height: var(--font-16);
    font-weight: 400;
    color: var(--color-text-control-primary-default);
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: var(--color-text-control-secondary-default);
      font-style: italic;
      font-size: var(--font-13);
      line-height: var(--font-16);
      font-weight: 400;
    }

    &[disabled] {
      background-color: var(--color-bg-control-secondary-disabled);
      color: var(--color-text-control-secondary-disabled);
    }
  }

  .ui3nInputIcon {
    position: absolute;
    left: var(--half-size, 4px);
    top: calc((var(--ui3n-input-height) - 16px) / 2);
    color: var(--color-icon-control-secondary-default) !important;
  }

  .ui3nInputIconDisabled {
    color: v-bind(cssIconColor) !important;
  }

  .clearBtn {
    position: absolute;
    right: 0;
    top: calc((var(--ui3n-input-height) - 24px) / 2);
    z-index: 2;
  }

  .ui3nInputFieldMessage {
    font-style: italic;
    font-size: var(--font-10);
    font-weight: 400;
    line-height: 1.4;
    margin-top: 2px;

    &.ui3nInputErrorMessage {
      color: var(--error-content-default);
    }

    &.ui3nInputSuccessMessage {
      color: var(--success-content-default);
    }
  }

  .clearable {
    --ui3n-input-padding-right: var(--spacing-ml);
  }

  .withIcon {
    --ui3n-input-padding-left: var(--spacing-ml);
  }

  .error {
    .ui3nInputLabel {
      color: var(--error-content-default) !important;
    }

    .ui3nInputField {
      outline: 1px solid var(--error-content-default) !important;
    }
  }

  .success {
    .ui3nInputLabel {
      color: var(--success-content-default) !important;
    }
  }

  .ui3nInputSuccessIcon {
    position: absolute;
    right: var(--spacing-s);
    bottom: var(--spacing-s);
  }

  .disabled {
    pointer-events: none;
    user-select: none;
  }

  .withLabel {
    .ui3nInputIcon {
      top: calc((var(--ui3n-input-height) - 16px) / 2 + 20px);
    }

    .ui3nInputSuccessIcon {
      bottom: auto;
      top: calc((var(--ui3n-input-height) - 16px) / 2 + 20px);
    }

    .clearBtn {
      top: calc((var(--ui3n-input-height) - 24px) / 2 + 20px);
      z-index: 1;
    }
  }
</style>
