<script lang="ts" setup>
  import { ref, watch, type ComponentPublicInstance, onMounted } from 'vue';
  import Ui3nSelector from '../ui3n-selector/ui3n-selector.vue';
  import vUi3nResize, { type Ui3nResizeCbArg } from '../../directives/ui3n-resize';
  import { FIELD_HEIGHTS } from './constants';
  import type { Ui3nSelectorExpose } from '../ui3n-selector/types';
  import type { Ui3nDateTimePickerSize, Ui3nTimePickerFieldProps } from './types';

  const props = defineProps<Ui3nTimePickerFieldProps>();

  const modelValue = defineModel<string | null>({ required: true });
  const isOpen = defineModel<boolean>('open', { default: false });

  const selector = ref<(ComponentPublicInstance & Ui3nSelectorExpose) | null>(null);
  const selectorRootEl = ref<HTMLDivElement | null>(null);

  function onResize(v: Ui3nResizeCbArg): void {
    if (!selectorRootEl.value) {
      return;
    }

    selectorRootEl.value.style.setProperty('--ui3n-selector-width', `${v.width}px`);
  }

  function getDisplaySelection(v: string | null): string {
    if (v === null || v === '') {
      return '';
    }

    if (props.selectionTransform) {
      return props.selectionTransform(v);
    }

    return v;
  }

  function setElHeight(size?: Ui3nDateTimePickerSize) {
    if (!selectorRootEl.value) {
      return;
    }

    const height = FIELD_HEIGHTS[size ?? 'regular'];
    selectorRootEl.value.style.setProperty('--ui3n-selector-activator-height', `${height}px`);
    selectorRootEl.value.style.setProperty('--ui3n-selector-item-min-height', `${height}px`);
  }

  watch(
    () => props.size,
    (val, oldVal) => {
      if (val !== oldVal) {
        setElHeight(val);
      }
    },
  );

  watch(
    isOpen,
    (val, oldVal) => {
      if (!selector.value || val === oldVal) {
        return;
      }

      if (val) {
        selector.value.open();
      } else {
        selector.value.close();
      }
    },
  );

  onMounted(() => {
    setElHeight(props.size);
  });
</script>

<template>
  <div
    data-ui3n="time-picker-field"
    :class="[$style.ui3nTimePickerField, size === 'large' && $style.large]"
  >
    <ui3n-selector
      ref="selector"
      v-model="modelValue"
      v-ui3n-resize="onResize"
      :items="items"
      item-value="value"
      item-display="value"
      :max-rows="5"
      :disabled="disabled"
      @init="el => (selectorRootEl = el)"
      @list:open="() => (isOpen = true)"
      @list:close="() => (isOpen = false)"
    >
      <template #selection="{ value }">
        <span :class="$style.selection">{{ getDisplaySelection(value) }}</span>
      </template>
    </ui3n-selector>
  </div>
</template>

<style lang="scss" module>
  .ui3nTimePickerField {
    position: relative;
    width: 100%;
  }

  .large {
    div[data-ui3n='menu'] {
      div[data-ui3n='icon'] {
        top: 12px;
      }
    }
  }

  .selection {
    padding-left: 4px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 700;
    color: var(--color-text-button-tritery-default);
  }
</style>
