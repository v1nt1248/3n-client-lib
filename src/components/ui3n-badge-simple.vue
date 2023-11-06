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
      color: '#0090ec',
      textColor: '#fff',
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
    :class="[
      'ui3n-badge-simple',
      { 'ui3n-badge-simple__dot': dot },
    ]"
  >
    <span
      v-if="!dot"
      class="ui3n-badge-simple__text"
    >
      {{ value }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-badge-simple{
    --ui3n-badge-size: 20px;

    position: relative;
    box-sizing: border-box;
    background-color: v-bind(color);
    outline: 1px var(--system-white, #fff) solid;

    &__dot {
      min-width: 8px;
      width: 8px;
      max-width: 8px;
      min-height: 8px;
      height: 8px;
      max-height: 8px;
      border-radius: 50%;
    }

    &__text {
      display: block;
      color: v-bind(textColor);
      font-size: 12px;
      line-height: var(--ui3n-badge-size);
      text-align: center;
    }

    &:not(.ui3n-badge-simple__dot) {
      min-height: var(--ui3n-badge-size);
      height: var(--ui3n-badge-size);
      width: max-content;
      padding: 0 6px;
      border-radius: 10px;
    } 
  }
</style>
