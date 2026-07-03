<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nIconEmits, Ui3nIconProps } from './types';

  const props = withDefaults(defineProps<Ui3nIconProps>(), {
    title: '',
    rotate: 0,
    color: 'var(--color-icon-control-primary-default)',
  });
  const emits = defineEmits<Ui3nIconEmits>();

  const rawWidth = computed(() => props.size || props.width || 16);
  const rawHeight = computed(() => props.size || props.height || 16);

  const iconStyle = computed(() => {
    const value: Record<string, string> = {
      '--ui3n-icon-width': formatUnit(rawWidth.value),
      '--ui3n-icon-height': formatUnit(rawHeight.value),
      '--ui3n-icon-color': props.color,
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

  function formatUnit(val: string | number): string {
    const isNumeric = !isNaN(Number(val));
    return isNumeric ? `${val}px` : String(val);
  }
</script>

<template>
  <div
    :id="id"
    :class="$style.ui3nIcon"
    :title="title"
    :style="iconStyle"
    v-bind="{ 'data-icon': icon }"
    @click="emits('click', $event)"
  />
</template>

<style lang="scss" module>
  .ui3nIcon {
    display: inline-block;
    vertical-align: middle;
    min-width: var(--ui3n-icon-width);
    width: var(--ui3n-icon-width);

    min-height: var(--ui3n-icon-height);
    height: var(--ui3n-icon-height);
    max-height: var(--ui3n-icon-height);

    flex-grow: 0;
    flex-shrink: 0;
    background-color: currentcolor;
    color: var(--ui3n-icon-color);
    mask-image: var(--svg);
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
  }
</style>
