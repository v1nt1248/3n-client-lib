<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, onMounted, ref, watch } from 'vue';
import Ui3nIcon from './ui3n-icon.vue';
import Ui3nButton from './ui3n-button.vue';

export interface Ui3nInputProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  autofocus?: boolean;
  rules?: Array<(v: string) => any>;
  disabled?: boolean;
  icon?: string;
  iconColor?: string;
}

export interface Ui3nInputEmits {
  (ev: 'input', value: string): void;
  (ev: 'focus', value: Event): void;
  (ev: 'blur', value: Event): void;
  (ev: 'clear'): void;
  (ev: 'change', value: string): void;
  (ev: 'update:modelValue', value: string): void;
  (ev: 'update:valid', value: boolean): void;
}

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

  return props.iconColor || 'var(--color-icon-control-primary-default)'
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
      !!errorMessage && $style.error,
    ]"
  >
    <label v-if="label" :class="$style.label">
      {{ label }}
    </label>

    <input
      ref="inputElement"
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
      v-if="clearable && !!text"
      type="icon"
      size="small"
      color="transparent"
      icon="close"
      icon-size="16"
      icon-color="var(--color-icon-control-accent-default)"
      :class="$style.clearBtn"
      @click="clearValue"
    />

    <div v-if="errorMessage" :class="$style.errorText">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../assets/styles/mixins";

.input {
  --ui3n-input-height: var(--spacing-l);
  --ui3n-input-padding-left: var(--spacing-s);
  --ui3n-input-padding-right: var(--spacing-s);

  position: relative;
  width: 100%;
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
  font-weight: 600;
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

.errorText {
  font-style: italic;
  font-size: var(--font-10);
  font-weight: 400;
  line-height: 1.4;
  color: var(--content-error-default);
}

.clearable {
  --ui3n-input-padding-right: var(--spacing-ml);
}

.withIcon {
  --ui3n-input-padding-left: var(--spacing-ml);
}

.error {
  .field {
    outline: 1px solid var(--content-error-default);
  }
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
