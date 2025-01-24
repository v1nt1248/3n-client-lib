<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import Ui3nRipple from '@/directives/ui3n-ripple';
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';
  import type { Ui3nEditableProps, Ui3nEditableEmits } from './types';
  import type { Nullable } from '@/components/types';

  const vUi3nRipple = Ui3nRipple;

  const props = defineProps<Ui3nEditableProps>();
  const emits = defineEmits<Ui3nEditableEmits>();

  const inputEl = ref<Nullable<HTMLInputElement>>(null);
  const contentEl = ref<Nullable<HTMLSpanElement>>(null);
  const value = ref<string>(props.modelValue);
  const initialValue = ref<string>(props.modelValue);

  const inEdit = ref(false);

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

  const isTruncated = computed(() => {
    if (!contentEl.value) {
      return false;
    }

    return contentEl.value.scrollWidth > contentEl.value.clientWidth;
  })

  function onInput(ev: InputEvent) {
    // @ts-ignore
    value.value = ev.target!.value || '';
  }

  function done() {
    if (value.value !== initialValue.value) {
      initialValue.value = value.value;
      emits('update:modelValue', value.value)
    }
    emits('done');
    inEdit.value = false;
  }

  function cancel() {
    if (value.value !== initialValue.value) {
      value.value = initialValue.value
      emits('update:modelValue', value.value)
    }
    emits('cancel');
    inEdit.value = false;
  }

  onMounted(() => {
    inputEl.value && props.autoFocus && inputEl.value.focus();
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
    () => isTruncated.value,
    () => {
      console.log('isTruncated: ', isTruncated.value);
    }, {
      immediate: true,
    }
  );
</script>

<template>
  <div :class="[$style.ui3nEditable, inEdit && $style.inEdit]">
    <template v-if="inEdit">
      <input
        ref="inputEl"
        :class="$style.input"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
      />

      <div v-ui3n-ripple :class="[$style.btn, $style.doneBtn]" @click.stop.prevent="done">
        <ui3n-icon icon="round-done" size="12" color="var(--color-icon-table-accent-default)" />
      </div>

      <div v-ui3n-ripple :class="[$style.btn, $style.cancelBtn]" @click.stop.prevent="cancel">
        <ui3n-icon icon="round-close" size="12" color="var(--color-icon-table-secondary-default)" />
      </div>
    </template>

    <template v-else>
      <span ref="contentEl" :class="$style.content">
        {{ value }}
      </span>

      <div v-ui3n-ripple :class="[$style.btn, $style.editBtn]" @click.stop.prevent="inEdit = true">
        <ui3n-icon icon="round-edit" size="12" color="var(--color-icon-control-accent-unselected)" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nEditable {
    --ui3n-editable-min-width: 104px;
    --ui3n-editable-max-width: v-bind(cssMaxWidth);

    position: relative;
    box-sizing: border-box;
    min-width: var(--ui3n-editable-min-width);
    width: max-content;
    max-width: var(--ui3n-editable-max-width);
    padding: var(--spacing-xs) 44px var(--spacing-xs) var(--spacing-xs);
    border-radius: var(--spacing-xs);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-s);
    font-size: var(--font-12);
    font-weight: 400;
    line-height: var(--font-16);
    color: var(--color-text-table-primary-default);

    &:hover {
      .btn.editBtn {
        opacity: 1;
      }

      &:not(.inEdit) {
        background-color: var(--color-bg-control-primary-hover);
      }
    }
  }

  .inEdit {
    padding-top: calc(var(--spacing-xs) - 1px);
    padding-bottom: calc(var(--spacing-xs) - 1px);
    border: 1px solid var(--color-border-table-accent-default);
  }

  .content {
    display: inline-block;
    @include mixins.text-overflow-ellipsis();
  }

  .input {
    padding: 0;
    font-size: var(--font-12);
    font-weight: 400;
    line-height: var(--font-16);
    border: none;
    outline: none;
  }

  .btn {
    position: absolute;
    width: var(--spacing-m);
    min-width: var(--spacing-m);
    height: var(--spacing-m);
    min-height: var(--spacing-m);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: var(--color-bg-button-secondary-hover);
    }

    &.editBtn {
      top: var(--spacing-xs);
      right: var(--spacing-xs);
      opacity: 0;
    }

    &.cancelBtn {
      top: var(--spacing-xs);
      right: var(--spacing-xs);
      opacity: 1;
    }

    &.doneBtn {
      top: var(--spacing-xs);
      right: var(--spacing-ml);
      opacity: 1;
    }
  }
</style>
