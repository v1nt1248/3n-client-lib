<script setup lang="ts">
import { ref } from 'vue';

/**
 * Click handling example
 * Demonstrates active breadcrumbs with click event handling for navigation
 */

const currentPath = ref(['Home', 'Products', 'Electronics', 'Smartphones']);

function handleBreadcrumbClick(index: number) {
  // Navigate to the clicked breadcrumb level
  currentPath.value = currentPath.value.slice(0, index + 1);
}
</script>

<template>
  <div class="example-container">
    <ui3n-breadcrumbs>
      <ui3n-breadcrumb
        v-for="(item, index) in currentPath"
        :key="index"
        :is-active="index < currentPath.length - 1"
        @click="handleBreadcrumbClick(index)"
      >
        {{ item }}
      </ui3n-breadcrumb>
    </ui3n-breadcrumbs>

    <div class="current-path">
      Current path: <strong>{{ currentPath.join(' / ') }}</strong>
    </div>

    <ui3n-button
      v-if="currentPath.length < 4"
      size="small"
      @click="currentPath = ['Home', 'Products', 'Electronics', 'Smartphones']"
    >
      Reset path
    </ui3n-button>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.current-path {
  font-size: 12px;
  color: var(--color-text-block-secondary-default);
  padding: 8px 12px;
  background: var(--color-bg-block-secondary-default);
  border-radius: 4px;
}
</style>