<script lang="ts" setup>
import { computed } from 'vue';
import type { Ui3nIconEmits, Ui3nIconProps } from './types';

const props = withDefaults(
  defineProps<Ui3nIconProps>(),
  {
    title: '',
    rotate: 0,
    color: 'var(--color-icon-control-primary-default)',
  },
);
const emits = defineEmits<Ui3nIconEmits>();

const widthVal = computed(() => props.size || props.width || 16);
const heightVal = computed(() => props.size || props.height || 16);
const widthCss = computed(() => `${widthVal.value}px`);
const heightCss = computed(() => `${heightVal.value}px`);

const iconStyle = computed(() => {
  const value: Record<string, string> = {};
  const transformData = [];
  props.horizontalFlip && transformData.push('rotateY(180deg)');
  props.verticalFlip && transformData.push('rotateX(180deg)');
  props.rotate && transformData.push(`rotate(${props.rotate}deg)`);
  if (transformData.length) {
    value.transform = transformData.join(' ');
  }

  return value;
});

function onClick(ev: Event) {
  emits('click', ev);
}
</script>

<template>
  <div
    :class="$style.ui3nIcon"
    :data-icon="icon"
    :title="title"
    :style="iconStyle"
    @click="onClick"
  />
</template>

<style lang="scss" module>
.ui3nIcon {
  --ui3n-icon-color: v-bind(color);

  display: block;
  min-width: v-bind(widthCss);
  width: v-bind(widthCss);
  max-width: v-bind(widthCss);
  min-height: v-bind(heightCss);
  height: v-bind(heightCss);
  max-height: v-bind(heightCss);
  flex-grow: 0;
  flex-shrink: 0;
  background-color: currentcolor;
  color: var(--ui3n-icon-color);
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}
</style>
