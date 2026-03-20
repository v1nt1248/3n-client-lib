<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { patchTextareaMaxRowsSupport } from '@/utils';
  import type { Ui3nTextEmits, Ui3nTextProps } from './types';

  const props = withDefaults(defineProps<Ui3nTextProps>(), {
    rows: 6,
    maxRows: 6,
    label: '',
    placeholder: '',
    disabled: false,
  });
  const emits = defineEmits<Ui3nTextEmits>();

  const textareaElement = ref<HTMLTextAreaElement | null>(null);
  const text = ref<string>('');
  const isDirty = ref(false);
  const isFocused = ref(false);
  const errorMessage = ref('');

  function validate(text: string) {
    errorMessage.value = '';
    if (props.rules && props.rules.length) {
      for (const validateFunction of props.rules) {
        if (typeof validateFunction === 'function') {
          const res = validateFunction(text);
          if (typeof res === 'string') {
            errorMessage.value += res;
          }
        }
      }
    }

    if (isDirty.value) {
      emits('update:valid', !errorMessage.value);
    }
  }

  function onFocus(event: Event) {
    isFocused.value = true;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    setTimeout(() => {
      isFocused.value = false;
      const value = (event.target as HTMLInputElement).value;
      validate(value);
      emits('blur', event);
      emits('change', value);
      emits('update:modelValue', value);
    }, 100);
  }

  function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    text.value = value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('input', value);
  }

  function onEnterKeydown(event: KeyboardEvent) {
    const { altKey, ctrlKey, shiftKey, metaKey, target } = event;
    const value = (target as HTMLInputElement).value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('enter', { value, altKey, ctrlKey, shiftKey, metaKey });
  }

  function onEscapeKeydown(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    isDirty.value = true;
    validate(value);
    emits('update:modelValue', value);
    emits('escape', event);
  }

  function onKeydown(event: KeyboardEvent) {
    emits('keydown', event);
  }

  onMounted(() => {
    if (textareaElement.value) {
      patchTextareaMaxRowsSupport(textareaElement.value!);
      emits('init', textareaElement.value!);
    }

    if (props.validateAtStartup) {
      validate(text.value);
    }
  });

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if ((val ?? '') !== (oldVal ?? '')) {
        text.value = val ?? '';
        validate(text.value);
      }
    },
    { immediate: true },
  );
</script>

<template>
  <div :class="[$style.ui3nText, disabled && $style.disabled, isFocused && $style.focused]">
    <label
      v-if="label"
      :class="$style.label"
    >
      {{ label }}
    </label>

    <div :class="$style.body">
      <textarea
        ref="textareaElement"
        :class="$style.content"
        :value="text"
        :placeholder="placeholder"
        :readonly="disabled"
        :rows="rows"
        :max-rows="maxRows"
        :disabled="disabled"
        v-bind="$attrs"
        @input="onInput"
        @keydown.enter="onEnterKeydown"
        @keydown.esc="onEscapeKeydown"
        @keydown="onKeydown"
        @focusin="onFocus"
        @focusout="onBlur"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nText {
    position: relative;
    width: 100%;
    border-radius: var(--spacing-xs);
    padding: 1px;
  }

  .label {
    display: block;
    width: 100%;
    font-size: var(--font-12);
    line-height: var(--font-16);
    font-weight: 600;
    color: var(--color-text-control-primary-default);
    margin-bottom: var(--spacing-xs);
  }

  .body {
    position: relative;
    width: 100%;
    padding: var(--spacing-s) 0;
    background-color: var(--color-bg-control-secondary-default);
    border-radius: var(--spacing-xs);
    transition: all 0.2s ease-in-out;

    &:hover {
      &:not(:focus-within) {
        background-color: var(--color-bg-control-secondary-hover);

        .content {
          background-color: var(--color-bg-control-secondary-hover);

          &::placeholder {
            color: var(--color-text-control-secondary-hover);
          }
        }
      }
    }
  }

  .content {
    resize: none;
    display: block;
    border: none;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    border-radius: var(--spacing-xs);
    background-color: var(--color-bg-control-secondary-default);
    padding: 0 var(--spacing-s);
    font-family: Manrope, sans-serif;
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

    &:focus-within {
      outline: none;
    }
  }

  .disabled {
    pointer-events: none;
    user-select: none;

    .body {
      background-color: var(--color-bg-control-secondary-disabled);
    }

    .content {
      background-color: var(--color-bg-control-secondary-disabled);
      color: var(--color-text-control-secondary-disabled);
    }
  }

  .focused {
    .body {
      background-color: var(--color-bg-control-secondary-focused);
      outline: 1px solid var(--color-border-control-accent-focused);
    }

    .content {
      background-color: var(--color-bg-control-secondary-focused);
    }
  }
</style>
