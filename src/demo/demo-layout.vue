<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="demo-layout">
    <div class="demo-layout__title">
      --- {{ title }} ---
    </div>
    <div class="demo-layout__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
.demo-layout {
  position: relative;
  width: 100%;
  margin-bottom: 16px;

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: var(--blue-60);
    margin-bottom: 8px;
  }

  &__body {
    position: relative;
    width: 100%;
  }
}
</style>
