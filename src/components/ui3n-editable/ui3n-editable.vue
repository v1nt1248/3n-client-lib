<script lang="ts" setup>
  import { computed, nextTick, ref, watch } from 'vue';
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';
  import Ui3nRipple from '@/directives/ui3n-ripple';
  import Ui3nClickOutside from '@/directives/ui3n-click-outside';
  import type { Nullable } from '@/types';
  import type { Ui3nEditableProps, Ui3nEditableEmits, Ui3nEditableExpose } from './types';

  const vUi3nRipple = Ui3nRipple;
  const vUi3nClickOutside = Ui3nClickOutside;

  const props = defineProps<Ui3nEditableProps>();
  const emits = defineEmits<Ui3nEditableEmits>();

  const minWidth = 60;

  const inputEl = ref<Nullable<HTMLInputElement>>(null);
  const hiddenEl = ref<Nullable<HTMLSpanElement>>(null);
  const inputElWidth = ref('auto');
  const contentValueEl = ref<Nullable<HTMLSpanElement>>(null);
  const value = ref<string>(props.modelValue);
  const initialValue = ref<string>(props.modelValue);

  const inEdit = ref(false);

  const cssMinWidth = computed(() => `${minWidth}px`);

  const cssMaxWidth = computed(() => {
    if (!props.maxWidth) {
      return '100%';
    }

    const maxWidthAsNumber = Number(props.maxWidth);
    if (Number.isNaN(maxWidthAsNumber)) {
      return props.maxWidth as string;
    }

    return `${maxWidthAsNumber}px`;
  });

  const isContentTruncated = computed(() => {
    if (!contentValueEl.value) {
      return false;
    }

    return contentValueEl.value.scrollWidth > contentValueEl.value.clientWidth;
  });

  const isValid = computed(() => {
    if (!props.disallowEmptyValue) {
      return true;
    }

    return !!value.value;
  });

  function setInputWidth() {
    hiddenEl.value!.textContent = value.value || props.placeholder || '...';
    const newWidth = Math.max(hiddenEl.value!.scrollWidth, minWidth);
    inputElWidth.value = `${newWidth}px`;
  }

  function turnOnEditMode() {
    if (props.disabled) {
      return;
    }

    inEdit.value = true;
    initialValue.value = value.value;

    nextTick(() => {
      if (inputEl.value) {
        setInputWidth();
        inputEl.value.focus();
        props.selectAllOnFocus && inputEl.value.select();
      }
    });
  }

  function onInput(ev: Event) {
    // @ts-ignore
    value.value = ev.target!.value || '';
    setInputWidth();
  }

  function done() {
    if (props.disabled) {
      return;
    }

    if (props.disallowEmptyValue && !isValid.value) {
      return;
    }

    if (value.value !== initialValue.value) {
      initialValue.value = value.value;
      emits('update:modelValue', value.value);
    }
    emits('done');
    inEdit.value = false;
  }

  function cancel() {
    if (props.disabled) {
      return;
    }

    if (value.value !== initialValue.value) {
      value.value = initialValue.value;
      emits('update:modelValue', value.value);
    }
    emits('cancel');
    inEdit.value = false;
  }

  function onClickOutside() {
    if (props.disabled) {
      return;
    }

    if (inEdit.value) {
      emits('focusout');
      done();
    }
  }

  function clear() {
    value.value = '';
    initialValue.value = '';
    emits('update:modelValue', '');
  }

  defineExpose<Ui3nEditableExpose>({
    clear,
  });

  watch(
    () => props.modelValue,
    (val, oVal) => {
      if (val !== oVal) {
        value.value = val;
        initialValue.value = val;
      }
    },
  );

  watch(
    () => inEdit.value,
    val => {
      !props.disabled && emits('toggle:editMode', val);
    },
  );

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clear();
      }
    },
  );
</script>

<template>
  <div
    :id="id"
    v-ui3n-click-outside="onClickOutside"
    :class="[$style.ui3nEditable, disabled && $style.ui3nEditableDisabled]"
    @focusin="emits('focusin', $event)"
  >
    <input
      v-if="name"
      type="hidden"
      :name="name"
      :value="value"
    />

    <template v-if="inEdit">
      <span
        ref="hiddenEl"
        :class="$style.hidden"
      />

      <input
        ref="inputEl"
        :class="[$style.input, inEdit && $style.inEdit, inEdit && !isValid && $style.inEditWarning]"
        :style="{ width: inputElWidth }"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @keydown.enter="done"
        @keydown.tab="done"
        @keydown.esc="cancel"
      />

      <div
        v-ui3n-ripple
        :class="[$style.btn, $style.doneBtn, disabled && $style.btnDisabled]"
        @click.stop.prevent="done"
      >
        <ui3n-icon
          icon="round-done"
          size="12"
          color="var(--color-icon-table-accent-default)"
        />
      </div>

      <div
        v-ui3n-ripple
        :class="[$style.btn, $style.cancelBtn, disabled && $style.btnDisabled]"
        @click.stop.prevent="cancel"
      >
        <ui3n-icon
          icon="round-close"
          size="12"
          color="var(--color-icon-table-secondary-default)"
        />
      </div>
    </template>

    <template v-else>
      <div
        :class="[$style.content, !value && $style.contentEmpty]"
        :title="isContentTruncated ? value : undefined"
      >
        <span ref="contentValueEl">
          {{ value || placeholder || '...' }}
        </span>

        <div
          v-ui3n-ripple
          :class="[$style.btn, $style.editBtn]"
          @click.stop.prevent="turnOnEditMode"
        >
          <ui3n-icon
            icon="round-edit"
            size="12"
            color="var(--color-icon-control-accent-unselected)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nEditable {
    --ui3n-editable-min-width: v-bind(cssMinWidth);
    --ui3n-editable-max-width: v-bind(cssMaxWidth);
    --ui3n-editable-height: 24px;
    --ui3n-editable-font-size: 12px;
    --ui3n-editable-border-radius: 4px;
    --ui3n-editable-padding-base: 4px;
    --ui3n-editable-padding: 4px 44px 4px 4px;
    --ui3n-editable-button-size: 16px;

    position: relative;
    box-sizing: border-box;
    width: max-content;
    max-width: var(--ui3n-editable-max-width);
    height: var(--ui3n-editable-height);
    border-radius: var(--ui3n-editable-border-radius);
    font-size: var(--ui3n-editable-font-size);
    font-weight: 400;
    line-height: 1.33;
    color: var(--color-text-table-primary-default);
    overflow: hidden;
  }

  .ui3nEditableDisabled {
    cursor: default;
    pointer-events: none;
  }

  .content {
    position: relative;
    height: var(--ui3n-editable-height);
    min-width: var(--ui3n-editable-min-width);
    max-width: var(--ui3n-editable-max-width);
    padding: var(--ui3n-editable-padding);
    border-radius: var(--ui3n-editable-border-radius);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    &.contentEmpty {
      color: var(--color-text-table-secondary-default);
    }

    &:hover {
      background-color: var(--color-bg-control-primary-hover);

      .btn.editBtn {
        opacity: 1;
      }
    }

    span {
      display: block;
      max-width: 100%;
      @include mixins.text-overflow-ellipsis();
    }
  }

  .input {
    position: relative;
    min-width: var(--ui3n-editable-min-width);
    max-width: calc(100% - 52px);
    padding: var(--ui3n-editable-padding);
    font-size: var(--ui3n-editable-font-size);
    font-weight: 400;
    line-height: 1.33;
    border-radius: var(--ui3n-editable-border-radius);

    &::placeholder {
      color: var(--color-text-table-secondary-default);
    }

    &.inEdit {
      padding-top: calc(var(--ui3n-editable-padding-base) - 1px);
      padding-bottom: calc(var(--ui3n-editable-padding-base) - 1px);

      &:not(.inEditWarning) {
        border: 1px solid var(--color-border-table-accent-default);
      }

      &.inEditWarning {
        border: 1px solid var(--error-content-default);
      }
    }

    &:focus-visible {
      border: none;
      outline: none;
    }
  }

  .hidden {
    position: absolute;
    visibility: hidden;
  }

  .btn {
    position: absolute;
    width: var(--ui3n-editable-button-size);
    min-width: var(--ui3n-editable-button-size);
    height: var(--ui3n-editable-button-size);
    min-height: var(--ui3n-editable-button-size);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;

    &:hover {
      cursor: pointer;
      background-color: var(--color-bg-button-secondary-hover);
    }

    &.editBtn {
      top: 4px;
      right: 4px;
      opacity: 0;
    }

    &.cancelBtn {
      top: 4px;
      right: 4px;
      opacity: 1;
    }

    &.doneBtn {
      top: 4px;
      right: 24px;
      opacity: 1;
    }
  }

  .btnDisabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.75;
  }
</style>
