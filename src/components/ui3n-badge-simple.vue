<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue'

  export interface Ui3nBadgeSimpleProps {
    dot?: boolean;
    value?: string | number;
    color?: string;
    textColor?: string;
  }

  const props = withDefaults(
    defineProps<Ui3nBadgeSimpleProps>(),
    {
      dot: false,
      value: '',
      color: 'var(--color-bg-button-primary-default)',
      textColor: 'var(--color-text-button-primary-default)',
    },
  )

  const emits = defineEmits<{
    (ev: 'change:size', val: { width: number; height: number }): void;
  }>()

  const element = ref<HTMLDivElement | null>(null)

  watch(
    () => [props.value, props.dot],
    () => getElementSize(),
  )

  onMounted(() => {
    getElementSize()
  })

  function getElementSize() {
    nextTick(() => {
      if (element.value) {
        emits('change:size', { width: element.value.offsetWidth, height: element.value.offsetHeight })
      }
    })
  }
</script>

<template>
  <div
    ref="element"
    :class="[$style.badgeSimple, dot && $style.dot]"
  >
    <span
      v-if="!dot"
      :class="$style.text"
    >
      {{ value }}
    </span>
  </div>
</template>

<style lang="scss" module>
.badgeSimple {
  --ui3n-badge-size: 20px;

  position: relative;
  box-sizing: border-box;
  background-color: v-bind(color);
  outline: 1px var(--white-0) solid;

  &:not(.dot) {
    min-height: var(--ui3n-badge-size);
    height: var(--ui3n-badge-size);
    width: max-content;
    padding: 0 6px;
    border-radius: 10px;
  }
}

.dot {
  min-width: var(--spacing-s);
  width: var(--spacing-s);
  max-width: var(--spacing-s);
  min-height: var(--spacing-s);
  height: var(--spacing-s);
  max-height: var(--spacing-s);
  border-radius: 50%;
}

.text {
  display: block;
  color: v-bind(textColor);
  font-size: var(--font-12);
  line-height: var(--ui3n-badge-size);
  text-align: center;
}
</style>
