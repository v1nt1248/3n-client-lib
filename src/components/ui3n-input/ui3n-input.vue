<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nInputEmits, Ui3nInputProps } from './types';

  const props = withDefaults(defineProps<Ui3nInputProps>(), {
    modelValue: '',
    type: 'text',
    size: 'regular',
    label: '',
    placeholder: '',
    icon: '',
    iconColor: '',
    displayStateMode: undefined,
    displayStateMessage: '',
    rules: () => [],
    clearable: false,
    autofocus: false,
    validateAtStartup: false,
    hideBottomSpace: false,
    displayStateWithIcon: false,
    disabled: false,
  });
  const emits = defineEmits<Ui3nInputEmits>();

  const inputElement = ref<HTMLInputElement | null>(null);
  const internalValue = ref('');
  const isDirty = ref(false);
  const isFocused = ref(false);
  const errorMessage = ref('');

  const cssIconColor = computed(() => {
    if (props.disabled) {
      return 'var(--color-icon-control-primary-disabled)';
    }
    return props.iconColor || 'var(--color-icon-control-primary-default)';
  });

  const showSuccessIcon = computed(
    () => props.displayStateMode === 'success' && props.displayStateWithIcon && !isFocused.value,
  );

  const showClearButton = computed(
    () => !props.disabled && props.clearable && !!internalValue.value && !showSuccessIcon.value,
  );

  const showMessageBlock = computed(
    () => !!errorMessage.value || !!(props.displayStateMode && props.displayStateMessage),
  );

  const isErrorMessage = computed(
    () => !!errorMessage.value || (props.displayStateMode === 'error' && !!props.displayStateMessage),
  );

  const isSuccessMessage = computed(() => props.displayStateMode === 'success' && !!props.displayStateMessage);

  function getTargetValue(event: Event | KeyboardEvent): string {
    return (event.target as HTMLInputElement).value;
  }

  function validate(value: string) {
    const errors: string[] = [];
    for (const rule of props.rules) {
      if (typeof rule !== 'function') {
        continue;
      }

      const result = rule(value);
      if (typeof result === 'string') {
        errors.push(result);
      } else if (!result) {
        errors.push('Invalid');
      }
    }

    errorMessage.value = errors.join('. ');
    if (isDirty.value || props.validateAtStartup) {
      emits('update:valid', errors.length === 0);
    }
  }

  function onFocus(event: Event) {
    isFocused.value = true;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    nextTick(() => {
      isFocused.value = false;
      emits('blur', event);
    });
  }

  function onChange(event: Event) {
    const value = getTargetValue(event);
    validate(value);
    emits('change', value);
  }

  function onInput(event: Event) {
    const value = getTargetValue(event);
    internalValue.value = value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('input', value);
  }

  function onEnterKeydown(event: KeyboardEvent) {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    isDirty.value = true;
    validate(internalValue.value);
    emits('enter', { value: internalValue.value, altKey, ctrlKey, metaKey, shiftKey });
  }

  function onEscapeKeydown(event: KeyboardEvent) {
    isDirty.value = true;
    validate(internalValue.value);
    emits('escape', event);
  }

  function onKeydown(event: KeyboardEvent) {
    emits('keydown', event);
  }

  function clearValue() {
    internalValue.value = '';
    isDirty.value = false;
    errorMessage.value = '';

    if (inputElement.value) {
      inputElement.value.value = '';
      inputElement.value.focus();
    }

    emits('update:modelValue', '');
    emits('input', '');
    emits('change', '');
    emits('clear');
    emits('update:valid', true);
  }

  defineExpose({
    isDirty,
    isFocused,
    clearValue,
  });

  onMounted(() => {
    internalValue.value = props.modelValue ?? '';
    if (inputElement.value) {
      inputElement.value.value = internalValue.value;
      if (props.autofocus) {
        inputElement.value.focus();
      }
      emits('init', inputElement.value);
    }

    if (props.validateAtStartup) {
      isDirty.value = true;
      validate(internalValue.value);
    }
  });

  watch(
    () => props.modelValue,
    val => {
      const normalized = val ?? '';
      if (normalized !== internalValue.value) {
        internalValue.value = normalized;

        if (inputElement.value) {
          inputElement.value.value = normalized;
        }
        validate(normalized);
      }
    },
  );
</script>

<template>
  <div
    :class="[
      $style.ui3nInput,
      size === 'large' && $style.large,
      label && $style.withLabel,
      hideBottomSpace && $style.withoutBottomSpace,
      icon && $style.withIcon,
      clearable && internalValue && $style.clearable,
      disabled && $style.disabled,
      (!!errorMessage || displayStateMode === 'error') && $style.error,
      displayStateMode === 'success' && $style.success,
    ]"
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
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="$style.ui3nInputField"
      @input="onInput"
      @keydown.enter="onEnterKeydown"
      @keydown.esc="onEscapeKeydown"
      @keydown="onKeydown"
      @focusin="onFocus"
      @focusout="onBlur"
      @change="onChange"
    />

    <ui3n-icon
      v-if="icon"
      :icon="icon"
      :size="16"
      :class="[$style.ui3nInputIcon, disabled && $style.ui3nInputIconDisabled]"
    />

    <ui3n-icon
      v-if="showSuccessIcon"
      icon="round-check-circle-outline"
      :size="16"
      color="var(--success-content-default)"
      :class="$style.ui3nInputSuccessIcon"
    />

    <ui3n-button
      v-if="showClearButton"
      type="icon"
      size="small"
      color="transparent"
      icon="round-close"
      icon-size="16"
      icon-color="var(--color-icon-control-accent-default)"
      :class="$style.clearBtn"
      @mousedown.prevent
      @touchstart.prevent
      @click="clearValue"
    />

    <div
      v-if="showMessageBlock"
      :class="[
        $style.ui3nInputFieldMessage,
        isErrorMessage && $style.ui3nInputErrorMessage,
        isSuccessMessage && $style.ui3nInputSuccessMessage,
      ]"
    >
      {{ errorMessage || displayStateMessage }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nInput {
    --ui3n-input-height: 32px;
    --ui3n-input-font-size: var(--font-13);
    --ui3n-input-border-radius: var(--spacing-xs);
    --ui3n-input-padding-left: var(--spacing-s);
    --ui3n-input-padding-right: var(--spacing-s);
    --ui3n-input-icon-size: 16px;
    --ui3n-input-label-offset: calc(var(--font-16) + var(--spacing-xs));
    --ui3n-input-message-top: calc(var(--ui3n-input-height) + var(--ui3n-input-label-offset) + 2px);

    &:not(.withLabel) {
      --ui3n-input-label-offset: 0;
    }

    &.large {
      --ui3n-input-height: 48px;
      --ui3n-input-font-size: var(--font-16);
      --ui3n-input-border-radius: 8px;
      --ui3n-input-padding-left: 12px;
      --ui3n-input-padding-right: 12px;

      .clearBtn {
        right: 2px;
      }

      &.withIcon {
        .ui3nInputIcon {
          left: 6px;
        }
      }
    }

    position: relative;
    width: 100%;
    padding: 1px 1px 15px 1px;
    border-radius: var(--ui3n-input-border-radius);

    &.withoutBottomSpace {
      padding-bottom: 0;
    }

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
        color: v-bind(cssIconColor);
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
    border-radius: var(--ui3n-input-border-radius);
    background-color: var(--color-bg-control-secondary-default);
    font-size: var(--ui3n-input-font-size);
    line-height: var(--spacing-m);
    font-weight: 400;
    color: var(--color-text-control-primary-default);
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;

    &::placeholder {
      color: var(--color-text-control-secondary-default);
      font-style: italic;
      font-size: var(--ui3n-input-font-size);
      font-weight: 400;
    }

    &:focus {
      outline: none;
    }

    &[disabled] {
      background-color: var(--color-bg-control-secondary-disabled);
      color: var(--color-text-control-secondary-disabled);
    }
  }

  .ui3nInputIcon {
    position: absolute;
    left: var(--spacing-xs);
    top: calc((var(--ui3n-input-height) - var(--ui3n-input-icon-size)) / 2);
    color: var(--color-icon-control-secondary-default);
  }

  .ui3nInputIconDisabled {
    color: v-bind(cssIconColor);
  }

  .clearBtn {
    position: absolute;
    right: 0;
    top: calc((var(--ui3n-input-height) - 24px) / 2);
    z-index: 2;
  }

  .ui3nInputFieldMessage {
    position: absolute;
    left: 0;
    width: 100%;
    top: calc(var(--ui3n-input-message-top) + 2px);
    font-style: italic;
    font-size: var(--font-10);
    font-weight: 400;
    line-height: 1.1;
  }

  .ui3nInputErrorMessage {
    color: var(--error-content-default);
  }

  .ui3nInputSuccessMessage {
    color: var(--success-content-default);
  }

  .clearable {
    --ui3n-input-padding-right: var(--spacing-ml);

    &.large {
      --ui3n-input-padding-right: calc(var(--spacing-ml) + 4px);
    }
  }

  .withIcon {
    --ui3n-input-padding-left: var(--spacing-ml);

    &.large {
      --ui3n-input-padding-left: calc(var(--spacing-ml) + 4px);
    }
  }

  .error {
    .ui3nInputLabel {
      color: var(--error-content-default);
    }

    .ui3nInputField {
      outline: 1px solid var(--error-content-default);
    }
  }

  .success {
    .ui3nInputLabel {
      color: var(--success-content-default);
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
      top: calc((var(--ui3n-input-height) - var(--ui3n-input-icon-size)) / 2 + var(--ui3n-input-label-offset));
    }

    .ui3nInputSuccessIcon {
      bottom: auto;
      top: calc((var(--ui3n-input-height) - var(--ui3n-input-icon-size)) / 2 + var(--ui3n-input-label-offset));
    }

    .clearBtn {
      top: calc((var(--ui3n-input-height) - 24px) / 2 + var(--ui3n-input-label-offset));
      z-index: 1;
    }
  }
</style>
