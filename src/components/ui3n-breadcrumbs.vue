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
  )
</script>

<template>
  <div :class="['ui3n-breadcrumbs']">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-breadcrumbs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>
