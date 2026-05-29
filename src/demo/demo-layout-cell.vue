<script setup lang="ts">
  defineProps<{
    label: string;
  }>();
</script>

<template>
  <section class="demo-layout-cell">
    <div
      class="demo-layout-cell__label"
      v-html="label"
    />
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
    justify-content: flex-start;
    align-items: stretch;
    padding: 0 10px;

    &__label {
      position: relative;
      min-height: 32px;
      font-size: 13px;
      font-weight: 400;
      font-style: italic;
      line-height: 16px;
      color: oklch(from var(--color-text-block-warning-default) calc(l * 0.9) calc(c * 0.6) h);
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
