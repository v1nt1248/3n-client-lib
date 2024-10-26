<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import type { Ui3nBadgeSimpleProps } from './types';

const props = withDefaults(
  defineProps<Ui3nBadgeSimpleProps>(),
  {
    dot: false,
    value: '',
    color: 'var(--color-bg-button-primary-default)',
    textColor: 'var(--color-text-button-primary-default)',
  },
);

const emits = defineEmits<{
  (ev: 'change:size', val: { width: number; height: number }): void;
}>();

const element = ref<HTMLDivElement | null>(null);

watch(
  () => [props.value, props.dot],
  () => getElementSize(),
);

onMounted(() => {
  getElementSize();
});

function getElementSize() {
  nextTick(() => {
    if (element.value) {
      emits('change:size', { width: element.value.offsetWidth, height: element.value.offsetHeight });
    }
  });
}
</script>

<template>
  <div
    ref="element"
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

  position: relative;
  box-sizing: border-box;
  background-color: v-bind(color);
  outline: 1px var(--white-100) solid;

  &:not(.ui3nBadgeDot) {
    min-height: var(--ui3n-badge-size);
    height: var(--ui3n-badge-size);
    width: max-content;
    padding: 0 6px;
    border-radius: 10px;
  }
}

.ui3nBadgeDot {
  min-width: var(--spacing-s);
  width: var(--spacing-s);
  max-width: var(--spacing-s);
  min-height: var(--spacing-s);
  height: var(--spacing-s);
  max-height: var(--spacing-s);
  border-radius: 50%;
}

.ui3nBadgeText {
  display: block;
  color: v-bind(textColor);
  font-size: var(--font-12);
  line-height: var(--ui3n-badge-size);
  text-align: center;
}
</style>
