<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nInputEmits, Ui3nInputExpose, Ui3nInputProps, Ui3nInputSlots } from './types';

  const props = withDefaults(defineProps<Ui3nInputProps>(), {
    modelValue: '',
    name: undefined,
    maxlength: undefined,
    minlength: undefined,
    type: 'text',
    size: 'regular',
    label: '',
    placeholder: '',
    displayStateMode: undefined,
    displayStateMessage: '',
    rules: () => [],
    clearable: false,
    autofocus: false,
    readonly: false,
    autocomplete: 'off',
    validateAtStartup: false,
    hideBottomSpace: false,
    displayStateWithIcon: false,
    disabled: false,
  });
  const emits = defineEmits<Ui3nInputEmits>();
  const slots = defineSlots<Ui3nInputSlots>();

  const inputElement = ref<HTMLInputElement | null>(null);
  const internalValue = ref('');
  const isDirty = ref(false);
  const isFocused = ref(false);
  const errorMessage = ref('');

  const hasPrependIcon = computed(() => !!slots['prepend-icon']);
  const hasAppendIcon = computed(() => !!slots['append-icon']);

  const showSuccessIcon = computed(
    () => props.displayStateMode === 'success' && props.displayStateWithIcon && !isFocused.value,
  );

  const showClearButton = computed(
    () => !props.disabled && props.clearable && !!internalValue.value && !showSuccessIcon.value,
  );

  const hasAppendElements = computed(() => showSuccessIcon.value || showClearButton.value || hasAppendIcon.value);

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

  defineExpose<Ui3nInputExpose>({
    inputElement,
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

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clearValue();
      }
    },
  );
</script>

<template>
  <div
    :id="id"
    :class="[
      $style.ui3nInput,
      size === 'large' && $style.large,
      label && $style.withLabel,
      hideBottomSpace && $style.withoutBottomSpace,
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

    <div
      :class="[$style.inputWrapper, hasPrependIcon && $style.withPrepend, hasAppendElements && $style.withAppend]"
    >
      <div
        v-if="hasPrependIcon"
        :class="$style.prependIconSlot"
      >
        <slot name="prepend-icon" />
      </div>

      <input
        ref="inputElement"
        :autocomplete="autocomplete"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        :maxlength="maxlength"
        :minlength="minlength"
        :class="$style.ui3nInputField"
        @input="onInput"
        @keydown.enter="onEnterKeydown"
        @keydown.esc="onEscapeKeydown"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />

      <div
        v-if="hasAppendElements"
        :class="$style.appendIconSlot"
      >
        <ui3n-icon
          v-if="showSuccessIcon"
          icon="round-check-circle-outline"
          :size="16"
          color="var(--success-content-default)"
          :class="$style.appendSlotItem"
        />

        <ui3n-button
          v-if="showClearButton"
          type="icon"
          size="small"
          color="transparent"
          icon="round-close"
          icon-size="16"
          icon-color="var(--color-icon-control-accent-default)"
          :class="$style.appendSlotItem"
          @mousedown.prevent
          @touchstart.prevent
          @click="clearValue"
        />

        <slot
          v-if="hasAppendIcon"
          name="append-icon"
        />
      </div>
    </div>

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
    --ui3n-input-label-font-size: 12px;
    --ui3n-input-font-size: 13px;
    --ui3n-input-message-font-size: 10px;
    --ui3n-input-border-radius: var(--spacing-xs);
    --ui3n-input-padding-x: 8px;
    --ui3n-input-message-top: calc(var(--ui3n-input-height) + var(--spacing-m) + 2px);
    --ui3n-input-outer-padding-top: 1px;
    --ui3n-input-outer-padding-bottom: 15px;
    --ui3n-input-outer-padding-x: 1px;

    &.withLabel {
      --ui3n-input-message-top: calc(
        var(--ui3n-input-height) + calc(var(--ui3n-input-label-font-size) * 1.33) + 6px
      );
    }

    &.large {
      --ui3n-input-height: 48px;
      --ui3n-input-font-size: 16px;
      --ui3n-input-border-radius: 8px;
      --ui3n-input-padding-x: 12px;
    }

    position: relative;
    width: 100%;
    padding: var(--ui3n-input-outer-padding-top) var(--ui3n-input-outer-padding-x)
      var(--ui3n-input-outer-padding-bottom) var(--ui3n-input-outer-padding-x);
    border-radius: var(--ui3n-input-border-radius);

    &.withoutBottomSpace {
      --ui3n-input-outer-padding-bottom: 0;
    }

    &:hover {
      .inputWrapper:not(:focus-within) {
        background-color: var(--color-bg-control-secondary-hover);

        .ui3nInputField::placeholder {
          color: var(--color-text-control-secondary-hover);
        }
      }
    }

    &:focus-within {
      .inputWrapper {
        background-color: var(--color-bg-control-secondary-focused);
        outline: 1px solid var(--color-border-control-accent-focused);
      }
    }
  }

  .ui3nInputLabel {
    display: block;
    width: 100%;
    font-size: var(--ui3n-input-label-font-size);
    line-height: 1.33;
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    margin-bottom: 4px;
  }

  .inputWrapper {
    display: flex;
    align-items: center;
    height: var(--ui3n-input-height);
    border-radius: var(--ui3n-input-border-radius);
    background-color: var(--color-bg-control-secondary-default);
    transition: background-color 0.2s ease-in-out;
  }

  .ui3nInputField {
    flex: 1;
    min-width: 0;
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    padding: 0 var(--ui3n-input-padding-x);
    background-color: transparent;
    font-size: var(--ui3n-input-font-size);
    line-height: 1.23;
    font-weight: 400;
    color: var(--color-text-control-primary-default);
    transition: color 0.2s ease-in-out;

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
      color: var(--color-text-control-secondary-disabled);
      cursor: not-allowed;
    }

    &[readonly] {
      cursor: default;
    }
  }

  .prependIconSlot {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding-left: calc(var(--ui3n-input-padding-x) / 2);
  }

  .appendIconSlot {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 4px;
    padding-right: calc(var(--ui3n-input-padding-x) / 2);
  }

  .withPrepend {
    .ui3nInputField {
      padding-left: calc(var(--ui3n-input-padding-x) / 2);
    }
  }

  .withAppend {
    .ui3nInputField {
      padding-right: calc(var(--ui3n-input-padding-x) / 2);
    }
  }

  .appendSlotItem {
    flex-shrink: 0;
  }

  .ui3nInputFieldMessage {
    position: absolute;
    left: 0;
    width: 100%;
    top: calc(var(--ui3n-input-message-top) + 2px);
    font-style: italic;
    font-size: var(--ui3n-input-message-font-size);
    font-weight: 400;
    line-height: 1.2;
  }

  .ui3nInputErrorMessage {
    color: var(--error-content-default);
  }

  .ui3nInputSuccessMessage {
    color: var(--success-content-default);
  }

  .error {
    .ui3nInputLabel {
      color: var(--error-content-default);
    }

    .inputWrapper {
      outline: 1px solid var(--error-content-default);
    }
  }

  .success {
    .ui3nInputLabel {
      color: var(--success-content-default);
    }
  }

  .disabled {
    pointer-events: none;
    user-select: none;

    .inputWrapper {
      background-color: var(--color-bg-control-secondary-disabled);
      cursor: not-allowed;
    }
  }
</style>
