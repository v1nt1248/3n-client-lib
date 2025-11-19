<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <section class="demo-layout-cell">
    <div class="demo-layout-cell__label" v-html="label" />
    <div class="demo-layout-cell__content">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
.demo-layout-cell {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  padding: 0 10px;

  &__label {
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: darkviolet;
    margin-bottom: 8px;

    i {
      color: var(--orange-40);
    }
  }

  &__content {
    position: relative;
    width: 100%;
  }
}
</style>
