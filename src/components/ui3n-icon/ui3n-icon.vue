<script lang="ts" setup>
import { computed } from 'vue';
import type { Ui3nIconEmits, Ui3nIconProps } from './types';

const props = withDefaults(
  defineProps<Ui3nIconProps>(),
  {
    title: '',
    width: 16,
    height: 16,
    rotate: 0,
    color: 'var(--color-icon-control-primary-default)',
  },
);
const emits = defineEmits<Ui3nIconEmits>();

const iconClass = computed(() => `ui3n-icon__${props.icon}`);
const iconStyle = computed(() => {
  const value: Record<string, string> = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    color: props.color,
  };
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
    :class="['ui3n-icon', iconClass]"
    :title="title"
    :style="iconStyle"
    @click="onClick"
  />
</template>

<style lang="scss">
.icon {
  min-width: v-bind(width);
  min-height: v-bind(height);
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
