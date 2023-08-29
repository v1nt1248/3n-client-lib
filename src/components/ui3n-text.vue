<script lang="ts" setup>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, onMounted, ref, watch } from 'vue'
  import { patchTextareaMaxRowsSupport } from '../helpers/textarea-max-rows'

  const props = defineProps<{
    text: string;
    rows?: number;
    maxRows?: number;
    label?: string;
    placeholder?: string;
    rules?: Array<(v: string) => any>;
    disabled?: boolean;
  }>()
  const emit = defineEmits<{
    (ev: 'init', value: HTMLTextAreaElement): void;
    (ev: 'input', value: string): void;
    (ev: 'focus', value: Event): void;
    (ev: 'blur', value: Event): void;
    (ev: 'update:text', value: string): void;
    (ev: 'update:valid', value: boolean): void;
  }>()

  const textareaElement = ref<HTMLTextAreaElement | null>(null)
  const isFocused = ref(false)
  const errorMessage = ref('')

  const componentProps = computed(() => {
    const { rows = 6, maxRows = 6, label = '', placeholder = '', disabled = false } = props
    return { rows, maxRows, label, placeholder, disabled }
  })

  const isValid = computed(() => {
    if (!props.text) {
      return true
    }

    return !errorMessage.value
  })

  onMounted(() => {
    if (textareaElement.value) {
      patchTextareaMaxRowsSupport(textareaElement.value!)
      emit('init', textareaElement.value!)
    }
  })

  watch(
    () => isValid.value,
    val => emit('update:valid', val),
    { immediate: true },
  )

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

  const onFocus = (event: Event) => {
    isFocused.value = true
    emit('focus', event)
  }

  const onBlur = (event: Event) => {
    isFocused.value = false
    emit('blur', event)
  }

  const onInput = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value
    validate(value)
    emit('update:text', value)
    emit('input', value)
  }
</script>

<template>
  <div
    :class="[
      'ui3n-text',
      { 'ui3n-text--disabled': props.disabled, 'ui3n-text--focused': isFocused },
    ]"
  >
    <label
      v-if="componentProps.label"
      class="ui3n-text__label"
    >
      {{ componentProps.label }}
    </label>
    <div class="ui3n-text__body">
      <textarea
        ref="textareaElement"
        :value="props.text"
        :placeholder="componentProps.placeholder"
        :readonly="componentProps.disabled"
        :rows="componentProps.rows"
        :max-rows="componentProps.maxRows"
        :disabled="componentProps.disabled"
        class="ui3n-text__content"
        v-bind="$attrs"
        @input="onInput"
        @focusin="onFocus"
        @focusout="onBlur"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-text {
    position: relative;
    width: 100%;

    &__label {
      display: block;
      width: 100%;
      font-size: var(--font-12, 12px);
      font-weight: 600;
      color: var(--black-90, #212121);
      margin-bottom: calc(var(--base-size, 8px) / 2);
    }

    &__body {
      position: relative;
      width: 100%;
      padding: var(--base-size, 8px) 0;
      background-color: var(--gray-50, #f2f2f2);
      border-radius: 4px;
    }

    &__content {
      resize: none;
      display: block;
      box-sizing: border-box;
      position: relative;
      width: 100%;
      border-radius: 4px;
      background-color: var(--gray-50, #f2f2f2);
      padding: 0 var(--base-size, 8px);
      font-family: OpenSans, sans-serif;
      font-size: var(--font-13, 13px);
      font-weight: 400;
      line-height: var(--font-16, 16px);
      color: var(--black-90, #212121);
      border: none;

      &::placeholder {
        font-size: var(--font-13, 13px);
        font-weight: 300;
        font-style: italic;
        color: var(--gray-90, #212121);
      }
    }

    &--disabled {
      pointer-events: none;
      user-select: none;
      opacity: 0.5;
    }

    &--focused {
      .ui3n-text {
        &__body, &__content {
          background-color: var(--blue-main-20, #d8edfd);
          outline: none;
          border: none;
        }
      }
    }
  }
</style>
