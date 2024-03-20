<script lang="ts" setup>
  export interface Ui3nBreadcrumdsProps {
    separator?: string;
    disabled?: boolean;
  }

  withDefaults(
    defineProps<Ui3nBreadcrumdsProps>(),
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
