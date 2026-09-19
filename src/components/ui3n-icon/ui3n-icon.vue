<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nIconEmits, Ui3nIconProps } from './types';

  /* sizes and colour keep their defaults in CSS, so a stylesheet can change them */
  const props = withDefaults(defineProps<Ui3nIconProps>(), {
    title: '',
    rotate: 0,
  });
  const emits = defineEmits<Ui3nIconEmits>();

  const rawWidth = computed(() => props.size || props.width);
  const rawHeight = computed(() => props.size || props.height);

  const iconStyle = computed(() => {
    const value: Record<string, string> = {};

    if (rawWidth.value !== undefined) {
      value['--ui3n-icon-width'] = formatUnit(rawWidth.value);
    }

    if (rawHeight.value !== undefined) {
      value['--ui3n-icon-height'] = formatUnit(rawHeight.value);
    }

    if (props.color) {
      value['--ui3n-icon-color'] = props.color;
    }

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
    data-ui3n="icon"
    :class="$style.ui3nIcon"
    :title="title"
    :style="iconStyle"
    v-bind="{ 'data-icon': icon }"
    @click="emits('click', $event)"
  />
</template>

<style lang="scss" module>
  .ui3nIcon {
    --_icon-width: var(--ui3n-icon-width, 16px);
    --_icon-height: var(--ui3n-icon-height, 16px);

    display: inline-block;
    vertical-align: middle;
    min-width: var(--_icon-width);
    width: var(--_icon-width);
    min-height: var(--_icon-height);
    height: var(--_icon-height);
    max-height: var(--_icon-height);
    flex-grow: 0;
    flex-shrink: 0;
    background-color: currentcolor;
    color: var(--ui3n-icon-color, var(--color-icon-control-primary-default));
    mask-image: var(--svg);
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
  }
</style>
