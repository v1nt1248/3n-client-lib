<script setup lang="ts">
/**
 * Custom separator slot example
 * Using the separator slot for custom icons or complex separators
 */
</script>

<template>
  <div class="examples">
    <div class="example-section">
      <span class="label">With icon separator:</span>
      <ui3n-breadcrumbs>
        <ui3n-breadcrumb :is-active="true">
          Home
          <template #separator>
            <ui3n-icon
              icon="round-keyboard-arrow-right"
              size="14"
            />
          </template>
        </ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">
          Products
          <template #separator>
            <ui3n-icon
              icon="round-keyboard-arrow-right"
              size="14"
            />
          </template>
        </ui3n-breadcrumb>
        <ui3n-breadcrumb>Details</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <div class="example-section">
      <span class="label">With custom styled separator:</span>
      <ui3n-breadcrumbs>
        <ui3n-breadcrumb :is-active="true">
          Dashboard
          <template #separator>
            <span class="custom-separator">•</span>
          </template>
        </ui3n-breadcrumb>
        <ui3n-breadcrumb :is-active="true">
          Settings
          <template #separator>
            <span class="custom-separator">•</span>
          </template>
        </ui3n-breadcrumb>
        <ui3n-breadcrumb>Profile</ui3n-breadcrumb>
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

.custom-separator {
  color: var(--color-text-block-accent-default);
  font-size: 18px;
  font-weight: bold;
}
</style>