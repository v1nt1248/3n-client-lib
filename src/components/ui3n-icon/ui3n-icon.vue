<script lang="ts" setup>
import { computed, onMounted, useTemplateRef } from 'vue';
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

const iconEl = useTemplateRef('icon');

const widthVal = computed(() => props.size || props.width || 16);
const heightVal = computed(() => props.size || props.height || 16);
const widthCss = computed(() => `${widthVal.value}px`);
const heightCss = computed(() => `${heightVal.value}px`);

const iconClass = computed(() => `ui3n-icon__${props.icon}`);
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

onMounted(() => {
  if (iconEl.value) {
    iconEl.value.classList.add(iconClass.value);
  }
});
</script>

<template>
  <div
    ref="icon"
    class="ui3n-icon"
    :class="$style.icon"
    :title="title"
    :style="iconStyle"
    @click="onClick"
  />
</template>

<style lang="scss" module>
.icon {
  --ui3n-icon-color: v-bind(color);

  min-width: v-bind(widthCss);
  width: v-bind(widthCss);
  max-width: v-bind(widthCss);
  min-height: v-bind(heightCss);
  height: v-bind(heightCss);
  max-height: v-bind(heightCss);
  flex-grow: 0;
  flex-shrink: 0;
  color: var(--ui3n-icon-color);
}
</style>
