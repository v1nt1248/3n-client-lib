<script lang="ts" setup>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { Icon } from '@iconify/vue'

  const props = defineProps<{
    icon: string;
    title?: string;
    inline?: boolean;
    width?: string | number;
    height?: string | number;
    horizontalFlip?: boolean;
    verticalFlip?: boolean;
    flip?: string;
    rotate?: number;
    color?: string;
    onLoad?: Function;
  }>()
  const emit = defineEmits<{
    (ev: 'click', value: Event): void;
  }>()

  const onLoad = (value: any) => {
    if (props.onLoad) {
      props.onLoad(value)
    }
  }
  const onClick = (ev: Event) => {
    emit('click', ev)
  }
</script>

<template>
  <icon
    :icon="props.icon"
    :title="props.title || ''"
    :inline="props.inline"
    :width="props.width || 16"
    :height="props.height || 16"
    :horizontal-flip="props.horizontalFlip"
    :vertical-flip="props.verticalFlip"
    :flip="props.flip"
    :rotate="props.rotate || 0"
    :color="props.color || 'var(--gray-90, #444)'"
    :on-load="onLoad"
    @click="onClick"
  />
</template>
