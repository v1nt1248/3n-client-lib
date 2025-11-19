<script lang="ts" setup>
  import type { Ui3nContentEditableProps, Ui3nContentEditableEmits } from './types';
  import { useContentEditable } from './useContentEditable';

  const props = withDefaults(defineProps<Ui3nContentEditableProps>(), {
    debounceDelay: 100,
  });
  const emits = defineEmits<Ui3nContentEditableEmits>();

  const {
    el,
    isFocused,
    onFocusIn,
    onFocusOut,
    onClick,
    onPaste,
    onKeyDown,
    onInput,
  } = useContentEditable(props, emits);
</script>

<template>
  <span
    ref="el"
    :class="[
      $style.ui3nContentEditable,
      !modelValue && !!placeholder && $style.placeholder,
      isFocused && $style.isFocused,
      disabled && $style.isDisabled
    ]"
    :contenteditable="!disabled"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @click="onClick"
    @paste="onPaste"
    @keydown="onKeyDown"
    @input="onInput"
  />
</template>

<style lang="scss" module>
  .ui3nContentEditable {
    --ui3n-content-editable-color: var(--color-text-control-primary-default);
    --ui3n-content-editable-placeholder-color: var(--color-text-control-secondary-default);
    --ui3n-content-editable-border-color-focused: var(--color-border-table-accent-default);

    position: relative;
    display: inline-block;
    width: fit-content;
    font-size: var(--font-12);
    font-weight: 400;
    line-height: var(--font-16);
    overflow-wrap: break-word;
    color: var(--ui3n-content-editable-color);
    padding: var(--spacing-xs) var(--spacing-s);
    background-color: transparent;
    border-radius: var(--spacing-xs);
  }

  .placeholder {
    color: var(--ui3n-content-editable-placeholder-color);
  }

  .isFocused {
    border: 1px solid var(--ui3n-content-editable-border-color-focused);
  }

  .isDisabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }
</style>
