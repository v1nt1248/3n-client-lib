<script lang="ts" setup>
import type { Ui3nBreadcrumbsProps } from './types';

withDefaults(
  defineProps<Ui3nBreadcrumbsProps>(),
  {
    separator: '/',
    disabled: false,
  },
);
</script>

<template>
  <div :class="$style.breadcrumbs">
    <slot/>
  </div>
</template>

<style lang="scss" module>
.breadcrumbs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
