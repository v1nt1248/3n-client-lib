<script lang="ts" setup>
  import type { Ui3nBreadcrumbsProps, Ui3nBreadcrumbsSlots } from './types';

  withDefaults(defineProps<Ui3nBreadcrumbsProps>(), {
    separator: '/',
    disabled: false,
  });

  defineSlots<Ui3nBreadcrumbsSlots>();
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
  }
</style>
