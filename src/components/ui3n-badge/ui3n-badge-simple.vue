<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue';
  import type { Ui3nBadgeSimpleProps, Ui3nBadgeSimpleEmits } from './types';

  const props = withDefaults(defineProps<Ui3nBadgeSimpleProps>(), {
    dot: false,
    value: '',
    color: 'var(--color-bg-button-primary-default)',
    textColor: 'var(--color-text-button-primary-default)',
  });

  const emits = defineEmits<Ui3nBadgeSimpleEmits>();

  const element = ref<HTMLDivElement | null>(null);

  function getElementSize() {
    nextTick(() => {
      if (element.value) {
        emits('change:size', { width: element.value.offsetWidth, height: element.value.offsetHeight });
      }
    });
  }

  watch(
    () => [props.value, props.dot],
    () => getElementSize(),
  );

  onMounted(() => {
    getElementSize();
  });
</script>

<template>
  <div
    ref="element"
    :id="id"
    :class="[$style.ui3nBadgeSimple, dot && $style.ui3nBadgeDot]"
  >
    <span
      v-if="!dot"
      :class="$style.ui3nBadgeText"
    >
      {{ value }}
    </span>
  </div>
</template>

<style lang="scss" module>
  .ui3nBadgeSimple {
    --ui3n-badge-size: 20px;
    --ui3n-badge-dot-size: 8px;
    --ui3n-badge-padding-inline: 6px;
    --ui3n-badge-nodot-border-radius: 10px;
    --ui3n-badge-font-size: 12px;

    position: relative;
    box-sizing: border-box;
    background-color: v-bind(color);
    outline: 1px var(--color-bg-block-primary-default) solid;

    &:not(.ui3nBadgeDot) {
      min-height: var(--ui3n-badge-size);
      height: var(--ui3n-badge-size);
      width: max-content;
      padding: 0 var(--ui3n-badge-padding-inline);
      border-radius: var(--ui3n-badge-nodot-border-radius);
    }
  }

  .ui3nBadgeDot {
    min-width: var(--ui3n-badge-dot-size);
    width: var(--ui3n-badge-dot-size);
    max-width: var(--ui3n-badge-dot-size);
    min-height: var(--ui3n-badge-dot-size);
    height: var(--ui3n-badge-dot-size);
    max-height: var(--ui3n-badge-dot-size);
    border-radius: 50%;
  }

  .ui3nBadgeText {
    display: block;
    color: v-bind(textColor);
    font-size: var(--ui3n-badge-font-size);
    line-height: var(--ui3n-badge-size);
    text-align: center;
  }
</style>
