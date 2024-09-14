<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, onMounted, ref, watch } from 'vue';
import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
import Ui3nButton from '../ui3n-button/ui3n-button.vue';
import type { Ui3nInputEmits, Ui3nInputProps } from './types';

const props = defineProps<Ui3nInputProps>();
const emits = defineEmits<Ui3nInputEmits>();

const inputElement = ref<HTMLInputElement | null>(null);
const text = ref<string>('');
const isFocused = ref(false);
const errorMessage = ref('');

const cssIconColor = computed(() => {
  if (props.disabled) {
    return 'var(--color-icon-control-primary-disabled)';
  }

  return props.iconColor || 'var(--color-icon-control-primary-default)';
});
const isValid = computed(() => {
  if (!text.value) {
    return true;
  }

  return !errorMessage.value;
});

onMounted(() => {
  if (props.autofocus && inputElement.value) {
    inputElement.value.focus();
  }

  emits('init', inputElement.value!);
});

watch(
  () => props.modelValue,
  val => text.value = val,
  { immediate: true },
);

watch(
  () => isValid.value,
  val => emits('update:valid', val),
  { immediate: true },
);

const onFocus = (event: Event) => {
  isFocused.value = true;
  emits('focus', event);
};

const onBlur = (event: Event) => {
  isFocused.value = false;
  emits('blur', event);
};

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  validate(value);
  emits('change', value);
};

const onInput = (ev: Event) => {
  const value = (ev.target as HTMLInputElement).value;
  text.value = value;
  validate(value);
  emits('update:modelValue', value);
  emits('input', value);
};

const clearValue = () => {
  text.value = '';
  validate('');
  emits('update:modelValue', '');
  emits('input', '');
  emits('change', '');
  emits('clear');
};

const validate = (text: string) => {
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
};
</script>

<template>
  <div
    ref="wrapperElement"
    :class="[
      $style.input,
      label && $style.withLabel,
      icon && $style.withIcon,
      clearable && text && $style.clearable,
      disabled && $style.disabled,
      (!!errorMessage || (displayStateMode === 'error')) && $style.error,
      displayStateMode === 'success' && $style.success,
    ]"
  >
    <label v-if="label" :class="$style.label">
      {{ label }}
    </label>

    <input
      ref="inputElement"
      autocomplete="off"
      :type="type || 'text'"
      :value="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="$style.field"
      @input="onInput"
      @focusin="onFocus"
      @focusout="onBlur"
      @change="onChange"
    >

    <ui3n-icon
      v-if="icon"
      :icon="icon"
      :width="16"
      :height="16"
      :class="[$style.icon, disabled && $style.iconDisabled]"
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

    <ui3n-icon
      v-if="displayStateMode === 'success' && displayStateWithIcon && !isFocused"
      icon="round-check-circle-outline"
      :width="16"
      :height="16"
      color="var(--success-content-default)"
      :class="$style.successIcon"
    />

    <div
      v-if="errorMessage || displayStateMessage"
      :class="[
        $style.fieldMessage,
        errorMessage || (displayStateMode === 'error' && !!displayStateMessage) && $style.errorMessage,
        displayStateMode === 'success' && displayStateMessage && $style.successMessage,
      ]"
    >
      {{ errorMessage || displayStateMessage }}
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins";

.input {
  --ui3n-input-height: var(--spacing-l);
  --ui3n-input-padding-left: var(--spacing-s);
  --ui3n-input-padding-right: var(--spacing-s);

  position: relative;
  width: 100%;
  padding: 1px;
  border-radius: var(--spacing-xs);

  &:hover {
    .field:not(:focus-within) {
      background-color: var(--color-bg-control-secondary-hover);

      &::placeholder {
        color: var(--color-text-control-secondary-hover);
      }
    }
  }

  &:focus-within {
    .field {
      background-color: var(--color-bg-control-secondary-focused);
      outline: 1px solid var(--color-border-control-accent-focused);
    }

    .icon {
      color: v-bind(cssIconColor) !important;
    }
  }
}

.label {
  display: block;
  width: 100%;
  font-size: var(--font-12);
  line-height: var(--font-16);
  font-weight: 500;
  color: var(--color-text-control-primary-default);
  margin-bottom: var(--spacing-xs);
}

.field {
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

.icon {
  position: absolute;
  left: var(--half-size, 4px);
  top: calc((var(--ui3n-input-height) - 16px) / 2);
  color: var(--color-icon-control-secondary-default) !important;
}

.iconDisabled {
  color: v-bind(cssIconColor) !important;
}

.clearBtn {
  position: absolute;
  right: 0;
  top: calc((var(--ui3n-input-height) - 24px) / 2);
  z-index: 1;
}

.fieldMessage {
  font-style: italic;
  font-size: var(--font-10);
  font-weight: 400;
  line-height: 1.4;
  margin-top: 2px;

  &.errorMessage {
    color: var(--error-content-default);
  }

  &.successMessage {
    color: var(--success-content-default)
  }
}

.clearable {
  --ui3n-input-padding-right: var(--spacing-ml);
}

.withIcon {
  --ui3n-input-padding-left: var(--spacing-ml);
}

.error {
  .label {
    color: var(--error-content-default) !important;
  }

  .field {
    outline: 1px solid var(--error-content-default) !important;
  }
}

.success {
  .label {
    color: var(--success-content-default) !important;
  }
}

.successIcon {
  position: absolute;
  right: var(--spacing-s);
  bottom: var(--spacing-s);
}

.disabled {
  pointer-events: none;
  user-select: none;
}

.withLabel {
  .icon {
    top: calc((var(--ui3n-input-height) - 16px) / 2 + 20px);
  }

  .clearBtn {
    top: calc((var(--ui3n-input-height) - 24px) / 2 + 20px);
  }
}
</style>
