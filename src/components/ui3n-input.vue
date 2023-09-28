<script lang="ts" setup>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, onMounted, ref, watch } from 'vue'
  import Ui3nIcon from './ui3n-icon.vue'
  import Ui3nButton from './ui3n-button.vue'

  export interface Ui3nInputProps {
    value: string;
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
    (ev: 'clear', value: string): void;
    (ev: 'change', value: string): void;
    (ev: 'update:value', value: string): void;
    (ev: 'update:valid', value: boolean): void;
  }

  const props = defineProps<Ui3nInputProps>()
  const emit = defineEmits<Ui3nInputEmits>()

  const inputElement = ref<HTMLInputElement|null>(null)
  const text = ref<string>('')
  const isFocused = ref(false)
  const errorMessage = ref('')

  const isValid = computed(() => {
    if (!text.value) {
      return true
    }

    return !errorMessage.value
  })

  onMounted(() => {
    if (props.autofocus && inputElement.value) {
      inputElement.value.focus()
    }
  })

  watch(
    () => props.value,
    val => text.value = val,
    { immediate: true },
  )

  watch(
    () => isValid.value,
    val => emit('update:valid', val),
    { immediate: true },
  )

  const onFocus = (event: Event) => {
    isFocused.value = true
    emit('focus', event)
  }

  const onBlur = (event: Event) => {
    isFocused.value = false
    emit('blur', event)
  }

  const onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    validate(value)
    emit('update:value', value)
    emit('change', value)
  }

  const onInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    text.value = value
    validate(value)
    emit('update:value', value)
    emit('input', value)
  }

  const clearValue = () => {
    text.value = ''
    validate('')
    emit('update:value', '')
    emit('input', '')
    emit('change', '')
  }

  const validate = (text: string) => {
    errorMessage.value = ''
    if (props.rules && props.rules.length) {
      for (const validateFunction of props.rules) {
        if (typeof validateFunction === 'function') {
          const res = validateFunction(text)
          if (typeof res === 'string') {
            errorMessage.value += res
          }
        }
      }
    }
  }
</script>

<template>
  <div
    ref="wrapperElement"
    :class="[
      'ui3n-input',
      {
        'ui3n-input--with-label': props.label,
        'ui3n-input--with-icon': props.icon,
        'ui3n-input--clearable': props.clearable && !!text,
        'ui3n-input--disabled': props.disabled,
        'ui3n-input--error': !!errorMessage,
      },
    ]"
  >
    <label
      v-if="props.label"
      class="ui3n-input__label"
    >
      {{ props.label }}
    </label>

    <input
      ref="inputElement"
      :value="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      class="ui3n-input__input"
      @input="onInput"
      @focusin="onFocus"
      @focusout="onBlur"
      @change="onChange"
    >

    <ui3n-icon
      v-if="props.icon"
      :icon="props.icon"
      :width="16"
      :height="16"
      :color="props.iconColor || 'var(--black-30, #b3b3b3)'"
      class="ui3n-input__icon"
    />

    <ui3n-button
      v-if="props.clearable && !!text"
      round
      color="transparent"
      icon="close"
      icon-size="16"
      icon-color="var(----black-30, #b3b3b3)"
      class="ui3n-input__clear-btn"
      @click="clearValue"
    />

    <div
      v-if="errorMessage"
      class="ui3n-input__error-text"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-input {
    --ui3n-input-height: calc(var(--base-size, 8px) * 4);
    --ui3n-input-padding-left: var(--base-size, 8px);
    --ui3n-input-padding-right: var(--base-size, 8px);

    position: relative;
    width: 100%;

    &__label {
      display: block;
      width: 100%;
      font-size: var(--font-12, 12px);
      line-height: var(--font-16, 16px);
      font-weight: 600;
      color: var(--black-90, #212121);
      margin-bottom: calc(var(--base-size, 8px) / 2);
    }

    &__input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      position: relative;
      border: none;
      outline: none;
      height: var(--ui3n-input-height);
      padding: 0 var(--ui3n-input-padding-right) 0 var(--ui3n-input-padding-left);
      border-radius: var(--half-size, 4px);
      background-color: var(--gray-50, #f2f2f2);
      font-size: var(--font-13, 13px);
      font-weight: 400;
      line-height: 1;
      color: var(--black-90, #212121);

      &::placeholder {
        color: var(--black-30, #b3b3b3);
        font-style: italic;
        font-size: var(--font-13, 13px);
        font-weight: 400;
      }

      &:focus-within {
        background-color: var(--blue-main-20, #d8edfd);
      }
    }

    &__icon {
      position: absolute;
      left: var(--half-size, 4px);
      top: var(--base-size, 8px);
    }

    &__clear-btn {
      position: absolute;
      right: 0;
      top: var(--half-size, 4px);
    }

    &__error-text {
      font-style: italic;
      font-size: var(--font-10, 10px);
      font-weight: 400;
      line-height: 1.5;
      color: var(--pear-100, #f75d53);
    }

    &--clearable {
      --ui3n-input-padding-right: calc(var(--base-size, 8px) * 3);
    }

    &--with-icon {
      --ui3n-input-padding-left: calc(var(--base-size, 8px) * 3);
    }

    &--error {
      --ui3n-input-padding-left: calc(var(--base-size, 8px) - 1px);
      --ui3n-input-padding-right: calc(var(--base-size, 8px) - 1px);

      .ui3n-input__input {
        border: 1px solid var(--pear-100, #f75d53)
      }

      &.ui3n-input--clearable {
        --ui3n-input-padding-right: calc(var(--base-size, 8px) * 2 - 1px);
      }

      &.ui3n-input--with-icon {
        --ui3n-input-padding-left: calc(var(--base-size, 8px) * 2 - 1px);
      }
    }

    &--disabled {
      pointer-events: none;
      user-select: none;
      opacity: 0.5;
    }

    &--with-label {
      .ui3n-input__icon {
        top: calc(var(--base-size, 8px) * 3.5 + 1px);
      }

      .ui3n-input__clear-btn {
        top: calc(var(--base-size, 8px) * 3 + 1px);
      }
    }
  }
</style>
