<script lang="ts" setup>
  import { provide, useSlots } from 'vue';
  import type { Ui3nBreadcrumbsProps, Ui3nBreadcrumbsSlots } from './types';

  const props = withDefaults(defineProps<Ui3nBreadcrumbsProps>(), {
    separator: '/',
    disabled: false,
  });

  const slots = useSlots();
  defineSlots<Ui3nBreadcrumbsSlots>();

  provide('ui3n-breadcrumbs-context', {
    separator: () => props.separator,
    disabled: () => props.disabled,
    customSeparatorSlot: slots.separator,
  });
</script>

<template>
  <div :class="$style.ui3nBreadcrumbs">
    <slot />
  </div>
</template>

<style lang="scss" module>
  .ui3nBreadcrumbs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    margin: 0;
  }
</style>
