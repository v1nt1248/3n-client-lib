<script lang="ts" setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
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

const iconName = computed(() => `ic:${props.icon}`);

function onLoad(value: unknown) {
  if (props.onLoad) {
    props.onLoad(value);
  }
}

function onClick(ev: Event) {
  emits('click', ev);
}
</script>

<template>
  <icon
    :class="$style.icon"
    :icon="iconName"
    :title="title"
    :inline="inline"
    :width="width"
    :height="height"
    :horizontal-flip="horizontalFlip"
    :vertical-flip="verticalFlip"
    :flip="flip"
    :rotate="rotate"
    :color="color"
    :on-load="onLoad"
    @click="onClick"
  />
</template>

<style lang="scss" module>
.icon {
  min-width: v-bind(width);
  min-height: v-bind(height);
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
