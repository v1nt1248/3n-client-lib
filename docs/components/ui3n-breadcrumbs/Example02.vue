<script setup lang="ts">
  /**
   * Custom separator examples
   * Shows different separator characters: arrow, chevron, pipe
   */
</script>

<template>
  <div class="examples">
    <div class="example-row">
      <span class="label">Arrow separator:</span>
      <ui3n-breadcrumbs separator="→">
        <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">Products</ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <div class="example-row">
      <span class="label">Chevron separator:</span>
      <ui3n-breadcrumbs separator="›">
        <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">Products</ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <div class="example-row">
      <span class="label">Pipe separator:</span>
      <ui3n-breadcrumbs separator="|">
        <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">Products</ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>
  </div>
</template>

<style scoped>
  .examples {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .example-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .label {
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
    min-width: 120px;
  }
</style>
