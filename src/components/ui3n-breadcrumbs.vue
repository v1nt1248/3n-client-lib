<script lang="ts" setup>
export interface Ui3nBreadcrumbsProps {
  separator?: string;
  disabled?: boolean;
}

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
