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

  const inlineStyles = computed(() => {
    let maxWidthStr = '100%';
    if (props.maxWidth) {
      const maxWidthAsNumber = Number(props.maxWidth);
      maxWidthStr = Number.isNaN(maxWidthAsNumber) ? (props.maxWidth as string) : `${maxWidthAsNumber}px`;
    }

    return {
      '--ui3n-editable-min-width': `${minWidth}px`,
      '--ui3n-editable-max-width': maxWidthStr,
    };
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
    if (!hiddenEl.value) {
      return;
    }

    hiddenEl.value.textContent = value.value || props.placeholder || '';
    const newWidth = Math.max(hiddenEl.value.scrollWidth + 48, minWidth);
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
    value.value = (ev.target as HTMLInputElement).value || '';
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
    :class="[
      $style.ui3nEditable,
      disabled && $style.ui3nEditableDisabled,
      inEdit && $style.ui3nEditableInEdit,
      inEdit && !isValid && $style.ui3nEditableInEditWarning,
    ]"
    :style="inlineStyles"
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
        :class="$style.input"
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
    --ui3n-editable-min-width: 60px;
    --ui3n-editable-max-width: 100%;
    --ui3n-editable-height: 24px;
    --ui3n-editable-font-size: 12px;
    --ui3n-editable-border-radius: 4px;
    //--ui3n-editable-padding-base: 4px;
    //--ui3n-editable-padding: 0 4px;
    //--ui3n-editable-padding: 4px 44px 4px 4px;
    --ui3n-editable-button-size: 16px;

    position: relative;
    box-sizing: border-box;
    width: max-content;
    max-width: var(--ui3n-editable-max-width);
    height: var(--ui3n-editable-height);
    border-radius: var(--ui3n-editable-border-radius);
    font-size: var(--ui3n-editable-font-size);
    font-weight: 400;
    line-height: var(--ui3n-editable-height);
    color: var(--color-text-table-primary-default);
    overflow: hidden;
    border: 1px solid transparent;

    &.ui3nEditableInEdit {
      background-color: var(--color-bg-control-primary-default, #fff);

      &:not(.ui3nEditableInEditWarning) {
        border: 1px solid var(--color-border-table-accent-default);
      }

      &.ui3nEditableInEditWarning {
        border: 1px solid var(--error-content-default);
      }
    }
  }

  .ui3nEditableDisabled {
    cursor: default;
    pointer-events: none;
  }

  .content {
    position: relative;
    box-sizing: border-box;
    height: var(--ui3n-editable-height);
    min-width: var(--ui3n-editable-min-width);
    max-width: var(--ui3n-editable-max-width);
    padding: 0 24px 0 4px;
    border-radius: var(--ui3n-editable-border-radius);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;

    span {
      display: block;
      max-width: 100%;
      @include mixins.text-overflow-ellipsis();
    }

    &.contentEmpty {
      color: var(--color-text-table-secondary-default);
    }

    &:hover {
      background-color: var(--color-bg-control-primary-hover);

      .btn.editBtn {
        opacity: 1;
      }
    }
  }

  .input {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    min-width: var(--ui3n-editable-min-width);
    max-width: 100%;
    padding: 0 44px 0 4px;
    font-family: inherit;
    font-size: var(--ui3n-editable-font-size);
    font-weight: 400;
    line-height: var(--ui3n-editable-height);
    border-radius: var(--ui3n-editable-border-radius);
    background-color: transparent;
    border: none;

    &::placeholder {
      color: var(--color-text-table-secondary-default);
    }

    &:focus-visible {
      outline: none;
    }
  }

  .hidden {
    position: absolute;
    visibility: hidden;
    padding: 0;
    font-family: inherit;
    font-size: var(--ui3n-editable-font-size);
    font-weight: 400;
    line-height: var(--ui3n-editable-height);
    white-space: pre;
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
