<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue';
  import type { Ui3nBadgeSimpleProps, Ui3nBadgeSimpleEmits } from './types';

  const props = withDefaults(defineProps<Ui3nBadgeSimpleProps>(), {
    dot: false,
    value: '',
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

  watch(
    [() => props.color, () => props.textColor],
    (newValue: [string | undefined, string | undefined], prevValue: [string | undefined, string | undefined]) => {
      if (!element.value) {
        return;
      }

      const [color, textColor] = newValue;
      const [prevColor, prevTextColor] = prevValue;

      color !== prevColor &&
        element.value.style.setProperty(
          '--ui3n-badge-bg-color',
          color ?? 'var(--color-bg-button-primary-default)',
        );

      textColor !== prevTextColor &&
        element.value.style.setProperty(
          '--ui3n-badge-text-color',
          textColor ?? 'var(--color-text-button-primary-default)',
        );
    },
  );

  onMounted(() => {
    if (element.value) {
      if (props.color) {
        element.value.style.setProperty('--ui3n-badge-bg-color', props.color);
      }

      if (props.textColor) {
        element.value.style.setProperty('--ui3n-badge-text-color', props.textColor);
      }
    }

    getElementSize();
  });
</script>

<template>
  <div
    :id="id"
    ref="element"
    data-ui3n="badge-simple"
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
    --_badge-size: var(--ui3n-badge-size, 20px);
    --_badge-dot-size: var(--ui3n-badge-dot-size, 8px);
    --_badge-padding-inline: var(--ui3n-badge-padding-inline, 6px);
    --_badge-nodot-border-radius: var(--ui3n-badge-nodot-border-radius, 10px);
    --_badge-font-size: var(--ui3n-badge-font-size, 12px);
    --_badge-outline-color: var(--ui3n-badge-outline-color, var(--color-bg-block-primary-default));
    --_badge-bg-color: var(--ui3n-badge-bg-color, var(--color-bg-button-primary-default));
    --_badge-text-color: var(--ui3n-badge-text-color, var(--color-text-button-primary-default));

    position: relative;
    box-sizing: border-box;
    background-color: var(--_badge-bg-color);
    outline: 1px var(--_badge-outline-color) solid;

    &:not(.ui3nBadgeDot) {
      min-height: var(--_badge-size);
      height: var(--_badge-size);
      width: max-content;
      padding: 0 var(--_badge-padding-inline);
      border-radius: var(--_badge-nodot-border-radius);
    }
  }

  .ui3nBadgeDot {
    min-width: var(--_badge-dot-size);
    width: var(--_badge-dot-size);
    max-width: var(--_badge-dot-size);
    min-height: var(--_badge-dot-size);
    height: var(--_badge-dot-size);
    max-height: var(--_badge-dot-size);
    border-radius: 50%;
  }

  .ui3nBadgeText {
    display: block;
    color: var(--_badge-text-color);
    font-size: var(--_badge-font-size);
    line-height: var(--_badge-size);
    text-align: center;
  }
</style>
