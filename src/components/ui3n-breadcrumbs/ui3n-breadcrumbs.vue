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
  <div :class="$style.ui3nBreadcrumbs">
    <slot/>
  </div>
</template>

<style lang="scss" module>
.ui3nBreadcrumbs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
