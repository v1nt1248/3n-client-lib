<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    sticky?: boolean;
  }>(), {
    sticky: true,
  })
</script>

<template>
  <div
    :class="[
      'ui3n-list-anchor',
      { 'ui3n-list-anchor--sticky': props.sticky },
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-list-anchor {
    position: relative;
    width: 100%;
    top: 0;
    z-index: 1;

    &--sticky {
      position: sticky;
    }
  }  
</style>
