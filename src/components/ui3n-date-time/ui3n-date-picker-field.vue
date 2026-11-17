<script lang="ts" setup>
  import { type ComponentPublicInstance, computed, onMounted, ref, watch } from 'vue';
  import { capitalize } from '../../utils/ui/capitalize';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import Ui3nSelector from '../ui3n-selector/ui3n-selector.vue';
  import vUi3nResize, { type Ui3nResizeCbArg } from '../../directives/ui3n-resize';
  import { FIELD_HEIGHTS } from './constants';
  import type { Ui3nSelectorExpose } from '../ui3n-selector/types';
  import type { Ui3nDatePickerFieldProps, Ui3nDateTimePickerSize } from './types';

  const props = defineProps<Ui3nDatePickerFieldProps>();

  const modelValue = defineModel<string | null>({ required: true });
  const isOpen = defineModel<boolean>('open', { default: false });

  const selector = ref<(ComponentPublicInstance & Ui3nSelectorExpose) | null>(null);
  const selectorRootEl = ref<HTMLDivElement | null>(null);

  const currentValueIndex = computed(() => props.items.findIndex(i => i.value === modelValue.value));

  const canGoBack = computed(() => !props.disabled && currentValueIndex.value > 0);
  const canGoForward = computed(
    () => !props.disabled && currentValueIndex.value >= 0 && currentValueIndex.value < props.items.length - 1,
  );

  function onResize(v: Ui3nResizeCbArg): void {
    if (!selectorRootEl.value) {
      return;
    }

    selectorRootEl.value.style.setProperty('--ui3n-selector-width', `${v.width}px`);
  }

  function setElHeight(size?: Ui3nDateTimePickerSize) {
    if (!selectorRootEl.value) {
      return;
    }

    const height = FIELD_HEIGHTS[size ?? 'regular'];
    selectorRootEl.value.style.setProperty('--ui3n-selector-activator-height', `${height}px`);
    selectorRootEl.value.style.setProperty('--ui3n-selector-item-min-height', `${height}px`);
  }

  function getSelection(val: string) {
    const selection = props.items.find(i => i.value === val);
    return selection ? capitalize(selection.label) : '';
  }

  function changeValue(dir: 'back' | 'forward') {
    if (currentValueIndex.value < 0) {
      return;
    }

    const item = props.items[dir === 'back' ? currentValueIndex.value - 1 : currentValueIndex.value + 1];
    if (!item) {
      return;
    }

    modelValue.value = item.value;
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
    data-ui3n="date-picker-field"
    :class="[$style.ui3nDatePickerField, size === 'large' && $style.large]"
  >
    <ui3n-button
      type="icon"
      :size="size"
      icon="round-arrow-back"
      color="var(--color-bg-button-secondary-default)"
      :disabled="!canGoBack"
      @click.stop.prevent="changeValue('back')"
    />

    <ui3n-selector
      ref="selector"
      v-model="modelValue"
      v-ui3n-resize="onResize"
      :items="items"
      item-value="value"
      item-display="label"
      :max-rows="5"
      :disabled="disabled"
      @init="el => (selectorRootEl = el)"
      @list:open="() => (isOpen = true)"
      @list:close="() => (isOpen = false)"
    >
      <template #selection="{ value }">
        <span :class="$style.selection">{{ getSelection(value) }}</span>
      </template>
    </ui3n-selector>

    <ui3n-button
      type="icon"
      :size="size"
      icon="round-arrow-forward"
      color="var(--color-bg-button-secondary-default)"
      :disabled="!canGoForward"
      @click.stop.prevent="changeValue('forward')"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nDatePickerField {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 8px;

    &.large {
      div[data-ui3n='menu'] {
        div[data-ui3n='icon'] {
          top: 12px;
        }
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
