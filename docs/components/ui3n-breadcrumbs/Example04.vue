<script setup lang="ts">
  /**
   * Disabled state examples
   * Shows how to disable entire breadcrumbs container or individual items
   */
</script>

<template>
  <div class="examples">
    <div class="example-section">
      <span class="label">All disabled:</span>
      <ui3n-breadcrumbs :disabled="true">
        <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">Products</ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <div class="example-section">
      <span class="label">Individual disabled:</span>
      <ui3n-breadcrumbs>
        <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
        <ui3n-breadcrumb
          :is-active="true"
          :disabled="true"
        >
          Products (disabled)
        </ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">Category</ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>
  </div>
</template>

<style scoped>
  .examples {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .example-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
    font-weight: 500;
  }
</style>
